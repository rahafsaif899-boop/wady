/* ============================================================
   Wadi Clay — admin panel
   Products + images live in Supabase. Who may edit is decided by
   the database rules in supabase/setup.sql (admins table).
   ============================================================ */

const CFG = window.SITE_CONFIG || {};
const BUCKET = "product-images";
const CATS = (window.CATEGORIES || []).filter(c => c.id !== "all");

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const show = id => ["#setupScreen", "#loginScreen", "#appScreen"].forEach(s => { $(s).hidden = s !== id; });
const catName = id => CATS.find(c => c.id === id)?.ar || id;
const money = n => `${Number(n || 0).toFixed(2).replace(/\.00$/, "")} د.أ`;

let sb = null;
let products = [];
let editing = null;          // product being edited, or null for a new one
let pendingFile = null;      // compressed image waiting to be uploaded
let removeExisting = false;  // admin removed the current image

/* ---------- Boot ---------- */
(async function init() {
  if (!CFG.supabaseUrl || !CFG.supabaseAnonKey || !window.supabase) { show("#setupScreen"); return; }
  sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);

  $("#f_category").innerHTML = CATS.map(c => `<option value="${c.id}">${esc(c.ar)}</option>`).join("");
  $("#catFilter").innerHTML = `<option value="">كل التصنيفات</option>` + CATS.map(c => `<option value="${c.id}">${esc(c.ar)}</option>`).join("");
  bind();

  const { data } = await sb.auth.getSession();
  if (data.session) await enter(); else show("#loginScreen");
})();

async function enter() {
  const { data: ok, error } = await sb.rpc("is_admin");
  if (error || !ok) {
    await sb.auth.signOut();
    show("#loginScreen");
    $("#loginError").textContent = "هذا الحساب ليس له صلاحية إدارة المنتجات.";
    return;
  }
  show("#appScreen");
  await loadProducts();
}

/* ---------- Data ---------- */
async function loadProducts() {
  $("#list").innerHTML = `<div class="empty">جاري التحميل…</div>`;
  const { data, error } = await sb.from("products").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) { $("#list").innerHTML = `<div class="empty">تعذّر تحميل المنتجات: ${esc(error.message)}</div>`; return; }
  products = data || [];
  renderList();
}

function renderList() {
  const q = $("#search").value.trim().toLowerCase();
  const cat = $("#catFilter").value;
  const rows = products.filter(p =>
    (!cat || p.category === cat) &&
    (!q || `${p.name_ar} ${p.name_en || ""}`.toLowerCase().includes(q)));

  $("#countLabel").textContent = `${products.length} منتج · ${products.filter(p => p.is_active).length} ظاهر على الموقع`;

  if (!rows.length) {
    $("#list").innerHTML = `<div class="empty">${products.length ? "لا توجد نتائج." : "لا توجد منتجات بعد — اضغطي «منتج جديد» للبدء."}</div>`;
    return;
  }

  $("#list").innerHTML = rows.map(p => `
    <article class="row ${p.is_active ? "" : "is-hidden"}" data-id="${esc(p.id)}">
      <div class="row__img">${p.image_url ? `<img src="${esc(p.image_url)}" alt="" loading="lazy">` : `<span>بدون صورة</span>`}</div>
      <div class="row__main">
        <h3>${esc(p.name_ar)}</h3>
        <p class="muted">${esc(catName(p.category))}${p.capacity_ar ? ` · ${esc(p.capacity_ar)}` : ""}${p.gifts_ar ? ` · 🎁 ${esc(p.gifts_ar)}` : ""}</p>
        <p class="row__price">${Number(p.old_price) > Number(p.price) ? `<s>${money(p.old_price)}</s> ` : ""}<b>${money(p.price)}</b></p>
      </div>
      <div class="row__toggles">
        <label class="switch sm"><input type="checkbox" data-toggle="in_stock" ${p.in_stock ? "checked" : ""}><span></span>متوفر</label>
        <label class="switch sm"><input type="checkbox" data-toggle="is_active" ${p.is_active ? "checked" : ""}><span></span>ظاهر</label>
      </div>
      <div class="row__actions">
        <button class="btn btn--ghost sm" data-edit type="button">تعديل</button>
        <button class="btn btn--danger sm" data-delete type="button">حذف</button>
      </div>
    </article>`).join("");
}

/* ---------- Editor ---------- */
const FIELDS = ["name_ar", "name_en", "price", "old_price", "category", "capacity_ar", "capacity_en", "gifts_ar", "gifts_en", "desc_ar", "desc_en", "tag_ar", "tag_en", "sort_order"];

function openSheet(p = null) {
  editing = p; pendingFile = null; removeExisting = false;
  $("#sheetTitle").textContent = p ? "تعديل المنتج" : "منتج جديد";
  FIELDS.forEach(f => { $(`#f_${f}`).value = p ? (p[f] ?? "") : ""; });
  if (!p) $("#f_category").value = CATS[0]?.id || "";
  if (p && !Number(p.old_price)) $("#f_old_price").value = "";
  $("#f_in_stock").checked = p ? p.in_stock : true;
  $("#f_is_active").checked = p ? p.is_active : true;
  setPreview(p?.image_url || "");
  $("#formError").textContent = "";
  $("#sheet").classList.add("is-open");
  $("#sheet").setAttribute("aria-hidden", "false");
  setTimeout(() => $("#f_name_ar").focus(), 100);
}

function closeSheet() {
  $("#sheet").classList.remove("is-open");
  $("#sheet").setAttribute("aria-hidden", "true");
  $("#imageInput").value = "";
}

function setPreview(src) {
  $("#preview").hidden = !src;
  $("#uploaderEmpty").hidden = !!src;
  $("#removeImage").hidden = !src;
  if (src) $("#preview").src = src; else $("#preview").removeAttribute("src");
}

// Resize to max 1400px and convert to WebP so uploads stay small and pages load fast.
function compressImage(file, max = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => (b ? resolve(b) : reject(new Error("compress failed"))), "image/webp", quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("not an image")); };
    img.src = url;
  });
}

async function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) { toast("الملف ليس صورة"); return; }
  try {
    pendingFile = await compressImage(file);
    removeExisting = false;
    setPreview(URL.createObjectURL(pendingFile));
  } catch {
    toast("تعذّر قراءة الصورة، جرّبي صورة أخرى");
  }
}

const storagePath = url => {
  const marker = `/object/public/${BUCKET}/`;
  const i = (url || "").indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
};

async function save(e) {
  e.preventDefault();
  const err = $("#formError");
  err.textContent = "";

  const name = $("#f_name_ar").value.trim();
  const price = parseFloat($("#f_price").value);
  if (!name) { err.textContent = "اكتبي اسم المنتج بالعربي."; return; }
  if (!(price >= 0)) { err.textContent = "اكتبي سعراً صحيحاً."; return; }
  const oldPrice = parseFloat($("#f_old_price").value) || 0;
  if (oldPrice && oldPrice <= price) { err.textContent = "السعر قبل الخصم لازم يكون أكبر من السعر الحالي."; return; }

  const btn = $("#saveBtn");
  btn.disabled = true; btn.textContent = "جاري الحفظ…";

  try {
    let image_url = editing?.image_url || null;
    const oldPath = storagePath(image_url);

    if (pendingFile) {
      const path = `${crypto.randomUUID()}.webp`;
      const { error: upErr } = await sb.storage.from(BUCKET).upload(path, pendingFile, { contentType: "image/webp", cacheControl: "31536000" });
      if (upErr) throw upErr;
      image_url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    } else if (removeExisting) {
      image_url = null;
    }

    const row = {
      name_ar: name,
      name_en: $("#f_name_en").value.trim() || null,
      price,
      old_price: oldPrice,
      category: $("#f_category").value,
      capacity_ar: $("#f_capacity_ar").value.trim() || null,
      capacity_en: $("#f_capacity_en").value.trim() || null,
      gifts_ar: $("#f_gifts_ar").value.trim() || null,
      gifts_en: $("#f_gifts_en").value.trim() || null,
      desc_ar: $("#f_desc_ar").value.trim() || null,
      desc_en: $("#f_desc_en").value.trim() || null,
      tag_ar: $("#f_tag_ar").value.trim() || null,
      tag_en: $("#f_tag_en").value.trim() || null,
      sort_order: parseInt($("#f_sort_order").value, 10) || 0,
      in_stock: $("#f_in_stock").checked,
      is_active: $("#f_is_active").checked,
      image_url
    };

    const { error } = editing
      ? await sb.from("products").update(row).eq("id", editing.id)
      : await sb.from("products").insert(row);
    if (error) throw error;

    // the old image is no longer used — clean it up (best effort)
    if (oldPath && image_url !== editing?.image_url) await sb.storage.from(BUCKET).remove([oldPath]);

    closeSheet();
    toast(editing ? "تم حفظ التعديلات ✓" : "تمت إضافة المنتج ✓");
    await loadProducts();
  } catch (ex) {
    err.textContent = `لم يتم الحفظ: ${ex.message || ex}`;
  } finally {
    btn.disabled = false; btn.textContent = "حفظ المنتج";
  }
}

async function removeProduct(p) {
  if (!confirm(`حذف «${p.name_ar}» نهائياً؟ لا يمكن التراجع.`)) return;
  const { error } = await sb.from("products").delete().eq("id", p.id);
  if (error) { toast(`تعذّر الحذف: ${error.message}`); return; }
  const path = storagePath(p.image_url);
  if (path) await sb.storage.from(BUCKET).remove([path]);
  toast("تم حذف المنتج");
  await loadProducts();
}

async function toggle(p, field, value) {
  const { error } = await sb.from("products").update({ [field]: value }).eq("id", p.id);
  if (error) { toast(`تعذّر التحديث: ${error.message}`); renderList(); return; }
  p[field] = value;
  renderList();
  toast("تم التحديث ✓");
}

/* ---------- Events ---------- */
function bind() {
  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const btn = $("#loginBtn");
    $("#loginError").textContent = "";
    btn.disabled = true; btn.textContent = "جاري الدخول…";
    const { error } = await sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#password").value });
    btn.disabled = false; btn.textContent = "تسجيل الدخول";
    if (error) { $("#loginError").textContent = "البريد أو كلمة السر غير صحيحة."; return; }
    $("#password").value = "";
    await enter();
  });

  $("#logoutBtn").addEventListener("click", async () => { await sb.auth.signOut(); show("#loginScreen"); });
  $("#addBtn").addEventListener("click", () => openSheet());
  $("#search").addEventListener("input", renderList);
  $("#catFilter").addEventListener("change", renderList);
  $("#productForm").addEventListener("submit", save);

  $("#list").addEventListener("click", e => {
    const row = e.target.closest(".row"); if (!row) return;
    const p = products.find(x => String(x.id) === row.dataset.id); if (!p) return;
    if (e.target.closest("[data-edit]")) openSheet(p);
    if (e.target.closest("[data-delete]")) removeProduct(p);
  });
  $("#list").addEventListener("change", e => {
    const input = e.target.closest("[data-toggle]"); if (!input) return;
    const p = products.find(x => String(x.id) === input.closest(".row").dataset.id);
    if (p) toggle(p, input.dataset.toggle, input.checked);
  });

  document.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeSheet(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

  // image picker + drag & drop
  $("#imageInput").addEventListener("change", e => handleFile(e.target.files[0]));
  const up = $("#uploader");
  ["dragenter", "dragover"].forEach(ev => up.addEventListener(ev, e => { e.preventDefault(); up.classList.add("is-drag"); }));
  ["dragleave", "drop"].forEach(ev => up.addEventListener(ev, e => { e.preventDefault(); up.classList.remove("is-drag"); }));
  up.addEventListener("drop", e => handleFile(e.dataTransfer.files[0]));
  $("#removeImage").addEventListener("click", e => {
    e.stopPropagation();
    pendingFile = null; removeExisting = true;
    $("#imageInput").value = "";
    setPreview("");
  });
}

let toastT;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("is-show"), 2400);
}
