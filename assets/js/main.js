/* ============================================================
   Wadi Clay — main script
   Settings live in assets/js/config.js
   ============================================================ */

const CONFIG = Object.assign({ whatsapp: "", instagram: "#", supabaseUrl: "", supabaseAnonKey: "" }, window.SITE_CONFIG || {});
CONFIG.currency = { ar: "د.أ", en: "JOD" };

/* ---------- Translations ---------- */
const I18N = {
  ar: {
    "brand": "الوادي كلادي",
    "nav.benefits": "فوائد الفخار", "nav.collection": "المنتجات", "nav.story": "قصتنا", "nav.guide": "طريقة الاستخدام", "nav.contact": "تواصل",
    "hero.eyebrow": "فخار صحي مصنوع باليد · Crafted by Nature",
    "hero.t1": "ماءٌ أبرد", "hero.t2": "من طين الوادي", "hero.t3": "إلى بيتك",
    "hero.lead": "فخاريات مشغولة باليد تبرّد الماء طبيعياً بلا كهرباء، وتمنحه طعماً أعذب — كما شرب أجدادنا، بتصميم يليق ببيتك اليوم.",
    "hero.shop": "تسوّق المنتجات", "hero.wa": "اطلب عبر واتساب",
    "trust.1": "الدفع عند الاستلام", "trust.2": "توصيل لكل المحافظات", "trust.3": "صُنع يدوياً في الأردن",
    "marquee": "تبريد طبيعي ✦ بلا بلاستيك ✦ صُنع باليد ✦ طعم أعذب ✦ الدفع عند الاستلام ✦ Crafted by Nature ✦",
    "ben.eyebrow": "لماذا الفخار؟", "ben.title": "حكمة الأجداد، في كأس ماء",
    "ben.lead": "الطين يتنفّس. مسامّه الدقيقة تسمح لقطرات صغيرة بالتبخّر من سطحه، فتنخفض حرارة الماء بداخله طبيعياً — من غير ثلاجة ولا كهرباء.",
    "ben.1": "تبريد طبيعي", "ben.1p": "ماء بارد ومنعش بدرجة لطيفة على الحلق، بفضل التبخّر الطبيعي عبر مسامّ الطين.",
    "ben.2": "طعم أعذب", "ben.2p": "الطين يمنح الماء طعماً طبيعياً نقياً يعيدك لذكريات بيت الجدّة.",
    "ben.3": "بلا بلاستيك", "ben.3p": "بديل صحي وصديق للبيئة لقوارير البلاستيك — خامة طبيعية مئة بالمئة.",
    "ben.4": "صُنع يدوياً", "ben.4p": "كل قطعة تُشكَّل وتُحرق بعناية، فلا تتكرر قطعتان بنفس التفاصيل.",
    "col.eyebrow": "منتجاتنا", "col.title": "اختر فخارتك",
    "story.eyebrow": "قصتنا", "story.title": "من الطبيعة صُنعت، وإليها ننتمي",
    "story.p1": "«الوادي كلادي» وُلدت من إيمان بسيط: أن أجمل الأشياء وأصحّها هي التي تصنعها الطبيعة وتشكّلها يد إنسان صبور. لذلك شعارنا شجرة تحملها يدان — Crafted by Nature.",
    "story.p2": "نختار طيننا بعناية، نشكّله ببطء، ونحرقه على درجات عالية ليصبح قوياً ونظيفاً وآمناً للماء — ثم يصلك مغلّفاً كهدية.",
    "stat.fire": "درجة حرارة الحرق", "stat.natural": "خامة طبيعية", "stat.gov": "محافظة نوصل لها",
    "proc.eyebrow": "الحِرفة", "proc.title": "من حفنة طين إلى فخارة تعيش معك",
    "proc.s1": "اختيار الطين", "proc.s1p": "نختار خامات طينية نقية وننقّيها ونتركها ترتاح حتى تصبح ليّنة ومطواعة.",
    "proc.s2": "التشكيل باليد", "proc.s2p": "تدور العجلة وتتحرك الأيدي بصبر، فتولد الفخارة من دائرة واحدة.",
    "proc.s3": "التجفيف", "proc.s3p": "تجفّ القطعة ببطء في الظل لأيام، كي تبقى متماسكة بلا تشقق.",
    "proc.s4": "الحرق العالي", "proc.s4p": "حرق على حرارة عالية يجعل الفخارة قوية ونظيفة وجاهزة للماء.",
    "proc.s5": "التغليف والتوصيل", "proc.s5p": "نغلّف كل قطعة بعناية كأنها هدية، ونوصلها لباب بيتك والدفع عند الاستلام.",
    "guide.eyebrow": "طريقة الاستخدام", "guide.title": "فخارتك وصلت؟ ابدأ من هنا",
    "guide.1": "انقع الفخارة بالماء ١٢–٢٤ ساعة قبل أول استخدام.",
    "guide.2": "اسكب الماء الأول والثاني، ثم املأها واستمتع.",
    "guide.3": "ضعها في مكان فيه تهوية وبعيداً عن الشمس المباشرة.",
    "guide.4": "نظّفها بالماء وفرشاة ناعمة فقط — بدون صابون.",
    "faq.q1": "ليش الفخارة \"بتعرق\" من برّا؟", "faq.a1": "هذا طبيعي وهو سرّ التبريد: قطرات صغيرة تخرج عبر مسامّ الطين وتتبخر فتبرّد الماء. ضع صحناً تحتها.",
    "faq.q2": "كم مرة لازم أغيّر الماء؟", "faq.a2": "ننصح بتغيير الماء يومياً، وتنظيف الفخارة مرة أسبوعياً.",
    "faq.q3": "كيف بتم الطلب والدفع؟", "faq.a3": "اختار القطع وأرسل طلبك عبر واتساب، نتواصل معك لتأكيد العنوان، والدفع عند الاستلام.",
    "faq.q4": "شو بصير إذا وصلت القطعة مكسورة؟", "faq.a4": "نغلّف كل قطعة بعناية، وإذا وصلت بأي ضرر نستبدلها لك فوراً.",
    "rev.eyebrow": "قالوا عنّا",
    "rev.1": "«من أول يوم صرنا نشرب من الفخارة بدل الثلاجة. الماء بارد وطعمه غير.»", "rev.1n": "— رنا، عمّان",
    "rev.2": "«طلبت فخارة هدية لأمي، وصلت بنفس الأسبوع بتغليف بيجنن.»", "rev.2n": "— محمد، إربد",
    "rev.3": "«الشغل اليدوي واضح بكل تفصيلة. قطعة فخمة على طاولة المكتب.»", "rev.3n": "— سارة، الزرقاء",
    "gal.eyebrow": "من المشغل", "gal.title": "لحظات من بين الطين والنار", "gal.ig": "تابعنا على إنستغرام",
    "ct.eyebrow": "تواصل معنا", "ct.title": "جاهز لماءٍ أبرد وأطيب؟ راسلنا الآن.", "ct.wa": "راسلنا على واتساب",
    "ct.loc": "الموقع", "ct.locv": "الأردن — توصيل لكل المحافظات",
    "ct.pay": "الدفع", "ct.payv": "نقداً عند الاستلام", "ct.follow": "تابعنا",
    "footer.made": "صُنع بحب، من الطين إلى القلب.",
    "cart.add": "أضف إلى الطلب", "cart.quick": "أضف للطلب +", "cart.title": "طلبك",
    "cart.name": "الاسم", "cart.city": "المدينة / العنوان", "cart.total": "المجموع",
    "cart.send": "إرسال الطلب عبر واتساب",
    "cart.note": "سيفتح واتساب برسالة جاهزة فيها طلبك، ونرد عليك لتأكيد التوصيل. الدفع عند الاستلام.",
    "cart.empty": "سلّتك فارغة — اختر فخارتك من المنتجات.", "cart.remove": "إزالة",
    "cart.added": "أُضيفت إلى طلبك ✓", "cart.needItems": "أضف قطعة واحدة على الأقل",
    "stock.out": "نفد من المخزون", "stock.outBtn": "غير متوفر حالياً", "gift.label": "مع هدية", "mini.name": "رحّال", "mini.meta": "٨٠٠ مل · 18 د.أ", "gift.title": "الهدية مع المنتج",
    "wa.hello": "مرحباً الوادي كلادي 👋", "wa.order": "أرغب بطلب:",
    "wa.total": "المجموع", "wa.name": "الاسم", "wa.city": "العنوان", "wa.pay": "الدفع عند الاستلام",
    "wa.general": "مرحباً الوادي كلادي 👋 حابب أستفسر عن منتجاتكم.",
    "menu": "القائمة", "cartLabel": "سلة الطلب",
    "title": "الوادي كلادي | Wadi Clay — فخار صحي مصنوع باليد"
  },
  en: {
    "brand": "Wadi Clay",
    "nav.benefits": "Why clay", "nav.collection": "Shop", "nav.story": "Our Story", "nav.guide": "How to use", "nav.contact": "Contact",
    "hero.eyebrow": "Handmade healthy pottery · Crafted by Nature",
    "hero.t1": "Cooler water,", "hero.t2": "from valley clay", "hero.t3": "to your home",
    "hero.lead": "Hand-thrown clay that cools water naturally — no electricity — and gives it a sweeter taste. The way our grandparents drank, designed for today's home.",
    "hero.shop": "Shop now", "hero.wa": "Order on WhatsApp",
    "trust.1": "Cash on delivery", "trust.2": "Delivery across Jordan", "trust.3": "Handmade in Jordan",
    "marquee": "Natural cooling ✦ Plastic-free ✦ Handmade ✦ Sweeter taste ✦ Cash on delivery ✦ Crafted by Nature ✦",
    "ben.eyebrow": "Why clay?", "ben.title": "Ancestral wisdom, in a glass of water",
    "ben.lead": "Clay breathes. Its tiny pores let droplets evaporate from the surface, naturally lowering the temperature of the water inside — no fridge, no electricity.",
    "ben.1": "Natural cooling", "ben.1p": "Refreshingly cool water that's gentle on the throat, thanks to evaporation through the clay.",
    "ben.2": "Sweeter taste", "ben.2p": "Clay gives water a pure, natural taste that takes you back to grandma's house.",
    "ben.3": "Plastic-free", "ben.3p": "A healthy, eco-friendly alternative to plastic bottles — 100% natural material.",
    "ben.4": "Handmade", "ben.4p": "Every piece is shaped and fired with care, so no two are ever alike.",
    "col.eyebrow": "Our products", "col.title": "Choose your clay",
    "story.eyebrow": "Our Story", "story.title": "Made by nature, and we belong to it",
    "story.p1": "Wadi Clay was born from a simple belief: the most beautiful and healthy things are made by nature and shaped by patient hands. That's why our emblem is a tree held by two hands — Crafted by Nature.",
    "story.p2": "We choose our clay carefully, shape it slowly and fire it at high temperatures so it becomes strong, clean and water-safe — then we wrap it for you like a gift.",
    "stat.fire": "Firing temperature", "stat.natural": "Natural material", "stat.gov": "Governorates we deliver to",
    "proc.eyebrow": "The Craft", "proc.title": "From a handful of clay to a piece that lives with you",
    "proc.s1": "Choosing the clay", "proc.s1p": "We select pure clay, refine it and let it rest until it is soft and willing.",
    "proc.s2": "Shaping by hand", "proc.s2p": "The wheel turns, the hands move patiently, and the vessel is born from a single circle.",
    "proc.s3": "Drying", "proc.s3p": "Each piece dries slowly in the shade for days so it keeps its form without cracking.",
    "proc.s4": "High firing", "proc.s4p": "High-temperature firing makes the piece strong, clean and ready for water.",
    "proc.s5": "Wrapping & delivery", "proc.s5p": "We wrap every piece like a gift and bring it to your door — pay on delivery.",
    "guide.eyebrow": "How to use", "guide.title": "Your clay has arrived? Start here",
    "guide.1": "Soak it in water for 12–24 hours before first use.",
    "guide.2": "Pour out the first two fills, then fill it up and enjoy.",
    "guide.3": "Keep it somewhere airy, away from direct sunlight.",
    "guide.4": "Clean with water and a soft brush only — no soap.",
    "faq.q1": "Why does the clay \"sweat\" on the outside?", "faq.a1": "That's normal — it's the secret of cooling: tiny droplets seep through the pores and evaporate, cooling the water. Keep a plate underneath.",
    "faq.q2": "How often should I change the water?", "faq.a2": "We recommend fresh water daily and a gentle clean once a week.",
    "faq.q3": "How do ordering and payment work?", "faq.a3": "Pick your pieces and send the order on WhatsApp. We'll confirm your address — you pay cash on delivery.",
    "faq.q4": "What if a piece arrives broken?", "faq.a4": "We pack every piece carefully, and if anything arrives damaged we replace it right away.",
    "rev.eyebrow": "Kind words",
    "rev.1": "“Since day one we drink from the clay instead of the fridge. The water is cool and tastes different.”", "rev.1n": "— Rana, Amman",
    "rev.2": "“I ordered one as a gift for my mother. It arrived the same week, beautifully wrapped.”", "rev.2n": "— Mohammad, Irbid",
    "rev.3": "“The handwork shows in every detail. A gorgeous piece on my desk.”", "rev.3n": "— Sara, Zarqa",
    "gal.eyebrow": "From the workshop", "gal.title": "Moments between clay and fire", "gal.ig": "Follow us on Instagram",
    "ct.eyebrow": "Get in touch", "ct.title": "Ready for cooler, sweeter water? Message us.", "ct.wa": "Message us on WhatsApp",
    "ct.loc": "Location", "ct.locv": "Jordan — delivery to every governorate",
    "ct.pay": "Payment", "ct.payv": "Cash on delivery", "ct.follow": "Follow",
    "footer.made": "Made with love, from clay to heart.",
    "cart.add": "Add to order", "cart.quick": "Add to order +", "cart.title": "Your order",
    "cart.name": "Name", "cart.city": "City / address", "cart.total": "Total",
    "cart.send": "Send order on WhatsApp",
    "cart.note": "WhatsApp will open with your order ready to send; we'll reply to confirm delivery. Cash on delivery.",
    "cart.empty": "Your order is empty — pick a piece from the shop.", "cart.remove": "Remove",
    "cart.added": "Added to your order ✓", "cart.needItems": "Add at least one piece",
    "stock.out": "Out of stock", "stock.outBtn": "Currently unavailable", "gift.label": "Free gift", "mini.name": "Rahhal", "mini.meta": "800 ml · JOD 18", "gift.title": "Comes with a free gift",
    "wa.hello": "Hello Wadi Clay 👋", "wa.order": "I'd like to order:",
    "wa.total": "Total", "wa.name": "Name", "wa.city": "Address", "wa.pay": "Cash on delivery",
    "wa.general": "Hello Wadi Clay 👋 I'd like to ask about your products.",
    "menu": "Menu", "cartLabel": "Order basket",
    "title": "Wadi Clay | الوادي كلادي — Handmade Healthy Pottery"
  }
};

/* ---------- Small helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

let lang = store.get("wadi-lang", "ar") === "en" ? "en" : "ar";
const t = k => (I18N[lang][k] ?? I18N.ar[k] ?? k);
const money = n => lang === "ar" ? `${n} ${CONFIG.currency.ar}` : `${CONFIG.currency.en} ${n}`;

/* ============================================================
   Pottery illustrations (placeholders until real photos arrive)
   ============================================================ */
const GLAZES = {
  terracotta: { base: "#B5552B", light: "#E09A70", dark: "#6E2E12", pat: "#F3E2CB" },
  sand:       { base: "#D9C3A5", light: "#F4EBDD", dark: "#9C8261", pat: "#9A4524" },
  olive:      { base: "#6F7A4B", light: "#A5AE7A", dark: "#3F4626", pat: "#EFE4CF" },
  cream:      { base: "#EFE6D8", light: "#FFFCF6", dark: "#BFAE93", pat: "#B5552B" },
  indigo:     { base: "#2F4A6B", light: "#5F7FA6", dark: "#172638", pat: "#F1E6D6" },
  charcoal:   { base: "#3A302A", light: "#66584D", dark: "#17120F", pat: "#C9A46A" }
};

const SHAPES = {
  zeer: {
    body: "M70 18h60v12q-4 4 0 8 40 18 42 72 2 50-32 80H60q-34-30-32-80 2-54 42-72 4-4 0-8z",
    front: '<path d="M60 190h80l10 30H50z" fill="DARK"/><path d="M50 220h100v6H50z" fill="DARK" opacity=".7"/>' +
           '<rect x="140" y="146" width="24" height="9" rx="3" fill="#C9A04A"/><rect x="155" y="152" width="7" height="13" rx="2" fill="#9C7A33"/>',
    rim: [100, 18, 30, 5], bands: [74, 118]
  },
  bottle: {
    body: "M64 44h72l-6 164q-1 14-15 14H85q-14 0-15-14z",
    back: '<path d="M134 72q34 0 34 40t-34 40" />',
    front: '<rect x="60" y="28" width="80" height="20" rx="7" fill="DARK"/><rect x="88" y="16" width="24" height="14" rx="5" fill="DARK"/>',
    bands: [96, 150]
  },
  amphora: {
    body: "M80 22h40v10q-5 3-5 10 0 8 8 12 44 18 47 70 3 56-36 94H66q-39-38-36-94 3-52 47-70 8-4 8-12 0-7-5-10z",
    back: '<path d="M86 56q-34-2-32 44" /><path d="M114 56q34-2 32 44" />',
    rim: [100, 22, 20, 4], bands: [104, 150]
  },
  vase: {
    body: "M88 20h24v8q-4 3-4 12 0 30 26 62 24 30 22 70-2 36-26 50H70q-24-14-26-50-2-40 22-70 26-32 26-62 0-9-4-12z",
    rim: [100, 20, 12, 3], bands: [146, 182]
  },
  jar: {
    body: "M70 30h60v12q-4 4 0 8 44 20 46 80 2 60-40 92H64q-42-32-40-92 2-60 46-80 4-4 0-8z",
    rim: [100, 30, 30, 5], bands: [92, 136]
  },
  pitcher: {
    body: "M76 26h48q6 4 2 16 34 28 34 86 0 56-36 94H76q-36-38-36-94 0-58 34-86-4-12 2-16z",
    back: '<path d="M126 58q44 4 34 78" />',
    front: '<path d="M78 24 54 14l18 26z" fill="BASE"/>',
    rim: [100, 26, 24, 4], bands: [118, 160]
  },
  mug: {
    body: "M48 76h104v124q0 22-22 22H70q-22 0-22-22z",
    back: '<path d="M150 108q38 0 38 38t-38 38" />',
    rim: [100, 76, 52, 8], raw: true, bands: [124, 164]
  },
  bowl: {
    body: "M18 116h164q-4 66-62 96H80q-58-30-62-96z",
    front: '<path d="M80 210h40v12H80z" fill="DARK"/>',
    rim: [100, 116, 82, 15], inner: true, bands: [146, 172]
  },
  plate: { body: "M100 38a90 90 0 1 0 .1 0z", plate: true },
  lantern: {
    body: "M66 78q34-48 68 0v116q0 22-22 28H88q-22-6-22-28z",
    back: '<circle cx="100" cy="36" r="10" />',
    lantern: true
  },
  tagine: {
    body: "M30 168C70 156 92 118 96 52h8c4 66 26 104 66 116v6H30z",
    front: '<path d="M18 172h164q-6 38-44 48H62q-38-10-44-48z" fill="DARK"/><circle cx="100" cy="46" r="11" fill="BASE"/>',
    bands: [120, 146]
  }
};

let uid = 0;
function vessel(shape = "jar", glaze = "terracotta") {
  const s = SHAPES[shape] || SHAPES.jar;
  const g = GLAZES[glaze] || GLAZES.terracotta;
  const id = `v${++uid}`;

  let pattern = "";
  if (s.bands) {
    const [a, b] = s.bands;
    let zig = `M-40 ${a + 8}`;
    for (let x = -40, up = true; x <= 260; x += 10, up = !up) zig += ` L${x} ${up ? a + 2 : a + 14}`;
    pattern = `
      <g class="v-pat" stroke="${g.pat}" fill="none" stroke-width="2.2" opacity=".85">
        <path d="M-40 ${a - 6}H260M-40 ${a + 20}H260M-40 ${b}H260M-40 ${b + 5}H260" stroke-width="1.6"/>
        <path d="${zig}"/>
        ${Array.from({ length: 16 }, (_, i) => `<circle cx="${-40 + i * 20}" cy="${b + 18}" r="2.4" fill="${g.pat}" stroke="none"/>`).join("")}
      </g>`;
  }
  if (s.plate) {
    const petals = Array.from({ length: 12 }, (_, i) =>
      `<ellipse cx="100" cy="76" rx="9" ry="26" transform="rotate(${i * 30} 100 128)" />`).join("");
    pattern = `
      <circle cx="100" cy="128" r="74" fill="none" stroke="${g.pat}" stroke-width="1.5" opacity=".7"/>
      <circle cx="100" cy="128" r="80" fill="none" stroke="${g.pat}" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
      <g class="v-pat-rot" fill="${g.pat}" opacity=".9">${petals}</g>
      <circle cx="100" cy="128" r="18" fill="${g.base}" stroke="${g.pat}" stroke-width="3"/>
      <circle cx="100" cy="128" r="6" fill="${g.pat}"/>`;
  }
  if (s.lantern) {
    const holes = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
      const x = 76 + c * 16 + (r % 2 ? 8 : 0), y = 104 + r * 20;
      if (x < 128) holes.push(`<path d="M${x} ${y - 7}q6 7 0 14q-6-7 0-14z" fill="${g.dark}"/><circle cx="${x}" cy="${y + 1}" r="2" class="v-glow" fill="#F6C36A"/>`);
    }
    pattern = `<g>${holes.join("")}</g>`;
  }

  const rim = s.rim ? `
    <ellipse cx="${s.rim[0]}" cy="${s.rim[1]}" rx="${s.rim[2]}" ry="${s.rim[3]}" fill="${s.raw ? "#E9D2B4" : g.light}"/>
    <ellipse cx="${s.rim[0]}" cy="${s.rim[1] + (s.inner ? 2 : 1)}" rx="${s.rim[2] * (s.inner ? .9 : .75)}" ry="${s.rim[3] * (s.inner ? .75 : .6)}" fill="${g.dark}"/>` : "";
  const rawBand = s.raw ? `<rect x="0" y="${s.rim[1]}" width="200" height="16" fill="#E9D2B4"/>` : "";

  return `
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="${id}s" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".42"/>
        <stop offset=".3" stop-color="#000" stop-opacity="0"/>
        <stop offset=".42" stop-color="#fff" stop-opacity=".28"/>
        <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </linearGradient>
      <clipPath id="${id}c"><path d="${s.body}"/></clipPath>
    </defs>
    <g fill="none" stroke="${g.dark}" stroke-width="9" stroke-linecap="round">${s.back || ""}</g>
    <path d="${s.body}" fill="${g.base}"/>
    <g clip-path="url(#${id}c)">
      ${rawBand}
      ${pattern}
      <rect width="200" height="240" fill="url(#${id}s)"/>
    </g>
    ${(s.front || "").replace(/BASE/g, g.base).replace(/DARK/g, g.dark)}
    ${rim}
  </svg>`;
}

/* Scenes: a pottery piece on a warm backdrop — stand-ins for real workshop photos */
function scene(shape, glaze, bg = ["#C9875D", "#7A3B1C"], ratio = 1.25) {
  const w = 400, h = Math.round(w * ratio), id = `sc${++uid}`;
  const vw = 230, vh = vw * 1.2;
  return `
  <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
      <radialGradient id="${id}l" cx=".7" cy=".2" r=".7"><stop offset="0" stop-color="#FFE9C7" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9C7" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${id})"/>
    <rect width="${w}" height="${h}" fill="url(#${id}l)"/>
    <rect y="${h * .72}" width="${w}" height="${h * .28}" fill="#000" opacity=".14"/>
    <ellipse cx="${w / 2}" cy="${h * .72 + 4}" rx="${vw * .42}" ry="12" fill="#000" opacity=".28"/>
    <svg x="${(w - vw) / 2}" y="${h * .72 - vh + 8}" width="${vw}" height="${vh}" viewBox="0 0 200 240">${vessel(shape, glaze).replace(/^[\s\S]*?<svg[^>]*>|<\/svg>\s*$/g, "")}</svg>
  </svg>`;
}

/* Line icons for the craft steps */
const STEP_ART = {
  clay: `<svg viewBox="0 0 200 160" fill="none" stroke="#C9A46A" stroke-width="2" stroke-linecap="round"><path d="M30 130q20-70 70-74 50 4 70 74z"/><path d="M58 104q22-10 42-4M96 84q20-6 34 6" opacity=".6"/><path d="M20 140h160"/><circle cx="150" cy="40" r="4" fill="#C9A46A"/><circle cx="40" cy="60" r="2.5" fill="#C9A46A"/></svg>`,
  wheel: `<svg viewBox="0 0 200 160" fill="none" stroke="#C9A46A" stroke-width="2" stroke-linecap="round"><ellipse cx="100" cy="128" rx="80" ry="16"/><path d="M76 120q-8-30 12-44 0-14-6-20h36q-6 6-6 20 20 14 12 44z"/><path d="M40 70q16 6 22 22M160 70q-16 6-22 22" stroke-dasharray="3 6"/><path class="spin" d="M100 128m-50 0a50 10 0 1 0 100 0" stroke-dasharray="4 8"/></svg>`,
  sun: `<svg viewBox="0 0 200 160" fill="none" stroke="#C9A46A" stroke-width="2" stroke-linecap="round"><circle cx="140" cy="50" r="18"/><g class="rays"><path d="M140 18v-8M140 90v-8M108 50h-8M180 50h-8M117 27l-6-6M169 79l-6-6M163 27l6-6M111 79l6-6"/></g><path d="M40 136q-4-34 14-46-2-10-6-14h28q-4 4-6 14 18 12 14 46z"/><path d="M20 140h160"/></svg>`,
  fire: `<svg viewBox="0 0 200 160" fill="none" stroke="#C9A46A" stroke-width="2" stroke-linecap="round"><path d="M50 140V70q50-50 100 0v70z"/><path d="M72 140v-40a28 28 0 0 1 56 0v40"/><path class="flame" d="M100 136c-16-6-18-22-6-34 0 10 6 12 8 8 4-8 0-16-4-22 18 8 24 30 10 46" fill="rgba(201,164,106,.18)"/><path d="M30 140h140"/></svg>`,
  gift: `<svg viewBox="0 0 200 160" fill="none" stroke="#C9A46A" stroke-width="2" stroke-linecap="round"><rect x="50" y="64" width="100" height="72" rx="4"/><path d="M44 64h112v-18H44zM100 46v90"/><path d="M100 46c-10-20-40-20-30 0M100 46c10-20 40-20 30 0"/><path d="M20 140h160"/></svg>`
};

/* Icons for the benefits section */
const BEN_ICONS = {
  cool: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M32 6v52M10 19l44 26M54 19 10 45"/><path d="M26 10l6 6 6-6M26 54l6-6 6 6M10 27l8-2-2-8M54 37l-8 2 2 8M54 27l-8-2 2-8M10 37l8 2-2 8"/></svg>`,
  taste: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M32 6C22 22 14 31 14 40a18 18 0 0 0 36 0c0-9-8-18-18-34z"/><path d="M24 42a8 8 0 0 0 8 8"/></svg>`,
  leaf: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 52C12 24 30 10 54 10c0 26-16 42-42 42z"/><path d="M12 52 38 26"/></svg>`,
  hand: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 14h16v4q-2 2-2 4 12 4 12 18 0 12-10 18H24q-10-6-10-18 0-14 12-18 0-2-2-4z"/><path d="M8 50q10 10 24 8M56 50q-10 10-24 8"/></svg>`
};

/* ============================================================
   Products: Supabase (admin panel) with a local fallback
   ============================================================ */
let activeCat = "all";
const SHAPE_BY_CAT = { family: "zeer", lifestyle: "bottle", personal: "vase", accessories: "mug" };

// field in the current language, falling back to Arabic
const L = (p, f) => (p[`${f}_${lang}`] || p[`${f}_ar`] || "");
const safeUrl = u => (typeof u === "string" && /^(https:\/\/|assets\/)/.test(u) ? u : "");
const hasSale = p => Number(p.old_price) > Number(p.price);

function normalise(p) {
  return {
    ...p,
    id: String(p.id),
    price: Number(p.price) || 0,
    old_price: Number(p.old_price) || 0,
    in_stock: p.in_stock !== false,
    image_url: safeUrl(p.image_url || p.img || ""),
    shape: p.shape || SHAPE_BY_CAT[p.category] || "jar",
    glaze: p.glaze || "terracotta"
  };
}

let PRODUCT_LIST = (window.PRODUCTS || []).map(normalise);

async function loadProducts() {
  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) return false;
  try {
    const url = `${CONFIG.supabaseUrl.replace(/\/$/, "")}/rest/v1/products?select=*&is_active=eq.true&order=sort_order.asc,created_at.desc`;
    const res = await fetch(url, { headers: { apikey: CONFIG.supabaseAnonKey, Authorization: `Bearer ${CONFIG.supabaseAnonKey}` } });
    if (!res.ok) throw new Error(res.status);
    const rows = await res.json();
    if (!Array.isArray(rows)) return false;
    PRODUCT_LIST = rows.map(normalise);
    return true;
  } catch (err) {
    console.warn("Products: using local list —", err);
    return false;
  }
}

/* ============================================================
   Rendering
   ============================================================ */
function renderFilters() {
  const used = new Set(PRODUCT_LIST.map(p => p.category));
  $("#filters").innerHTML = CATEGORIES.filter(c => c.id === "all" || used.has(c.id)).map(c =>
    `<button class="filter ${c.id === activeCat ? "is-active" : ""}" data-cat="${c.id}" role="tab" aria-selected="${c.id === activeCat}">${esc(c[lang])}</button>`
  ).join("");
}

function productArt(p) {
  return p.image_url ? `<img src="${esc(p.image_url)}" alt="${esc(L(p, "name"))}" loading="lazy">` : vessel(p.shape, p.glaze);
}

function priceHTML(p) {
  return hasSale(p)
    ? `<span class="price"><s>${money(p.old_price)}</s> ${money(p.price)}</span>`
    : `<span class="price">${money(p.price)}</span>`;
}

function renderGrid() {
  if (!PRODUCT_LIST.length) { $("#grid").innerHTML = ""; return; }
  $("#grid").innerHTML = PRODUCT_LIST.map(p => {
    const off = hasSale(p) ? Math.round((1 - p.price / p.old_price) * 100) : 0;
    const tag = !p.in_stock ? `<span class="card__tag card__tag--out">${t("stock.out")}</span>`
      : L(p, "tag") ? `<span class="card__tag">${esc(L(p, "tag"))}</span>` : "";
    return `
    <article class="card ${activeCat !== "all" && p.category !== activeCat ? "is-hidden" : ""} ${p.in_stock ? "" : "is-out"}" data-id="${esc(p.id)}" tabindex="0" aria-label="${esc(L(p, "name"))}">
      <div class="card__media ${p.image_url ? "has-photo" : ""}">
        ${tag}
        ${off > 0 && p.in_stock ? `<span class="card__off">-${off}%</span>` : ""}
        <div class="card__art">${productArt(p)}</div>
        ${p.in_stock ? `<button class="card__quick" type="button" data-add="${esc(p.id)}">${t("cart.quick")}</button>` : ""}
      </div>
      <div class="card__info">
        <div><h3>${esc(L(p, "name"))}</h3><small>${esc(L(p, "capacity"))}</small></div>
        ${priceHTML(p)}
      </div>
      ${L(p, "gifts") ? `<p class="card__gift"><span aria-hidden="true">🎁</span> ${t("gift.label")}: ${esc(L(p, "gifts"))}</p>` : ""}
    </article>`;
  }).join("");
}

const IMG = n => `assets/img/products/${n}.jpg`;
function renderStatic() {
  // Hero: real product photo in an arch frame + a small floating product card
  $(".hero__stage").classList.add("is-photo");
  $("#heroVessel").innerHTML = `<img src="${IMG("ghaith-15")}" alt="غيث — Ghaith 15L" fetchpriority="high">`;
  $(".hero__stage").insertAdjacentHTML("beforeend",
    `<div class="hero__mini" aria-hidden="true"><img src="${IMG("rahhal")}" alt=""><span><b data-i18n="mini.name">رحّال</b><small data-i18n="mini.meta">٨٠٠ مل · 18 د.أ</small></span></div>`);
  $(".story__img--a").innerHTML = `<img src="${IMG("naqaa")}" alt="" loading="lazy">`;
  $(".story__img--b").innerHTML = `<img src="${IMG("nada")}" alt="" loading="lazy">`;
  $$(".step__art").forEach(el => { el.innerHTML = STEP_ART[el.dataset.art] || ""; });
  $$(".benefit__ico").forEach(el => { el.innerHTML = BEN_ICONS[el.dataset.ico] || ""; });

  const gallery = ["rawaq", "ghaith-6", "irwaa", "qarora", "thara", "naqaa", "rahhal", "ghaith-15"];
  $("#masonry").innerHTML = gallery.map(n => `<figure><img src="${IMG(n)}" alt="" loading="lazy"></figure>`).join("");
}

/* ---------- Language ---------- */
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map(w => `<span class="w"><span class="wi">${esc(w)}</span></span>`).join(" ");
}

function applyLang() {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
    if (el.classList.contains("split")) splitWords(el);
  });
  $("#langBtn").textContent = lang === "ar" ? "EN" : "ع";
  $("#cartBtn").setAttribute("aria-label", t("cartLabel"));
  $("#menuBtn").setAttribute("aria-label", t("menu"));
  document.title = t("title");
  renderFilters();
  renderGrid();
  renderCart();
}

/* ============================================================
   Order basket → WhatsApp
   ============================================================ */
let cart = store.get("wadi-cart", {});
const byId = id => PRODUCT_LIST.find(p => p.id === id);

function saveCart() { store.set("wadi-cart", cart); renderCart(); }

function addToCart(id, qty = 1) {
  const p = byId(id);
  if (!p || !p.in_stock) return;
  cart[id] = (cart[id] || 0) + qty;
  saveCart();
  toast(t("cart.added"));
  const btn = $("#cartBtn");
  btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
}

const cartEntries = () => Object.entries(cart).filter(([id, q]) => byId(id) && q > 0);
function cartTotal() { return cartEntries().reduce((s, [id, q]) => s + byId(id).price * q, 0); }

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((s, [, q]) => s + q, 0);
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.classList.toggle("has-items", count > 0);

  $("#cartItems").innerHTML = entries.length ? entries.map(([id, q]) => {
    const p = byId(id);
    return `
      <div class="line-item">
        <div class="line-item__art">${productArt(p)}</div>
        <div>
          <h4>${esc(L(p, "name"))}</h4>
          <small class="line-item__cap">${esc(L(p, "capacity"))}</small>
          <div class="mini-qty"><button type="button" data-dec="${esc(id)}" aria-label="-">−</button><span>${q}</span><button type="button" data-inc="${esc(id)}" aria-label="+">+</button></div>
        </div>
        <div class="line-item__end">
          <span class="price">${money(round(p.price * q))}</span><br>
          <button type="button" class="line-item__remove" data-remove="${esc(id)}">${t("cart.remove")}</button>
        </div>
      </div>`;
  }).join("") : `<div class="drawer__empty">${vessel("vase", "sand")}<p>${t("cart.empty")}</p></div>`;
  $("#cartTotal").textContent = money(round(cartTotal()));
}

const round = n => Math.round(n * 100) / 100;
function waLink(text) { return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`; }

function sendOrder() {
  const entries = cartEntries();
  if (!entries.length) { toast(t("cart.needItems")); return; }
  const lines = entries.map(([id, q]) => {
    const p = byId(id), cap = L(p, "capacity");
    const gifts = L(p, "gifts");
    return `• ${L(p, "name")}${cap ? ` (${cap})` : ""} × ${q} — ${money(round(p.price * q))}${gifts ? `\n   🎁 ${gifts}` : ""}`;
  });
  const name = $("#custName").value.trim(), city = $("#custCity").value.trim();
  const msg = [
    t("wa.hello"), "", t("wa.order"), ...lines, "",
    `${t("wa.total")}: ${money(round(cartTotal()))} — ${t("wa.pay")}`,
    name ? `${t("wa.name")}: ${name}` : null,
    city ? `${t("wa.city")}: ${city}` : null
  ].filter(v => v !== null).join("\n");
  window.open(waLink(msg), "_blank", "noopener");
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-show"), 2200);
}

/* ============================================================
   Modal + drawer
   ============================================================ */
let lenis = null;
let modalProduct = null, modalQty = 1, lastFocus = null;

function lockScroll(on) {
  document.body.classList.toggle("no-scroll", on);
  if (lenis) on ? lenis.stop() : lenis.start();
}

function openModal(id) {
  const p = byId(id); if (!p) return;
  modalProduct = p; modalQty = 1; lastFocus = document.activeElement;
  const media = $("#modalMedia");
  media.innerHTML = productArt(p);
  media.classList.toggle("has-photo", !!p.image_url);
  $("#modalCat").textContent = CATEGORIES.find(c => c.id === p.category)?.[lang] || "";
  $("#modalName").textContent = L(p, "name");
  $("#modalSize").textContent = L(p, "capacity");
  $("#modalDesc").textContent = L(p, "desc");
  $("#modalGifts").hidden = !L(p, "gifts");
  $("#modalGiftsText").textContent = L(p, "gifts");
  $("#modalPrice").innerHTML = hasSale(p) ? `<s>${money(p.old_price)}</s> ${money(p.price)}` : money(p.price);
  $("#qtyVal").textContent = modalQty;
  $("#modalQty").hidden = !p.in_stock;
  $("#modalAdd").disabled = !p.in_stock;
  $("#modalAdd span").textContent = p.in_stock ? t("cart.add") : t("stock.outBtn");
  $("#modal").classList.add("is-open");
  $("#modal").setAttribute("aria-hidden", "false");
  lockScroll(true);
  setTimeout(() => $("#modal .modal__close").focus(), 50);
}
function closeModal() {
  $("#modal").classList.remove("is-open");
  $("#modal").setAttribute("aria-hidden", "true");
  lockScroll(false);
  lastFocus?.focus?.();
}
function openDrawer() {
  lastFocus = document.activeElement;
  $("#drawer").classList.add("is-open");
  $("#drawer").setAttribute("aria-hidden", "false");
  lockScroll(true);
  setTimeout(() => $("#drawer .icon-btn").focus(), 50);
}
function closeDrawer() {
  $("#drawer").classList.remove("is-open");
  $("#drawer").setAttribute("aria-hidden", "true");
  lockScroll(false);
  lastFocus?.focus?.();
}

/* ============================================================
   Events
   ============================================================ */
function bindEvents() {
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) { e.stopPropagation(); addToCart(add.dataset.add); return; }
    const card = e.target.closest(".card");
    if (card) { openModal(card.dataset.id); return; }

    const filter = e.target.closest(".filter");
    if (filter) {
      activeCat = filter.dataset.cat;
      renderFilters();
      $$(".card").forEach(c => {
        const show = activeCat === "all" || byId(c.dataset.id)?.category === activeCat;
        c.classList.toggle("is-hidden", !show);
      });
      if (hasGSAP && !reduceMotion) gsap.fromTo(".card:not(.is-hidden)", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .06, ease: "expo.out" });
      if (hasGSAP) ScrollTrigger.refresh();
      return;
    }

    if (e.target.closest("[data-close]")) { closeModal(); return; }
    if (e.target.closest("[data-close-cart]")) { closeDrawer(); return; }
    const inc = e.target.closest("[data-inc]"); if (inc) { cart[inc.dataset.inc]++; saveCart(); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) { const id = dec.dataset.dec; cart[id]--; if (cart[id] <= 0) delete cart[id]; saveCart(); return; }
    const rm = e.target.closest("[data-remove]"); if (rm) { delete cart[rm.dataset.remove]; saveCart(); return; }

    const wa = e.target.closest(".js-wa");
    if (wa) { e.preventDefault(); window.open(waLink(t("wa.general")), "_blank", "noopener"); return; }

    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute("href").length > 1) {
      const target = $(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        closeMenu();
        lenis ? lenis.scrollTo(target, { offset: -60, duration: 1.4 }) : target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if ($("#modal").classList.contains("is-open")) closeModal();
      if ($("#drawer").classList.contains("is-open")) closeDrawer();
      closeMenu();
    }
    if (e.key === "Enter" && e.target.classList?.contains("card")) openModal(e.target.dataset.id);
  });

  $("#qtyPlus").addEventListener("click", () => { modalQty++; $("#qtyVal").textContent = modalQty; });
  $("#qtyMinus").addEventListener("click", () => { modalQty = Math.max(1, modalQty - 1); $("#qtyVal").textContent = modalQty; });
  $("#modalAdd").addEventListener("click", () => { addToCart(modalProduct.id, modalQty); closeModal(); });
  $("#cartBtn").addEventListener("click", openDrawer);
  $("#sendOrder").addEventListener("click", sendOrder);

  $("#langBtn").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    store.set("wadi-lang", lang);
    applyLang();
    if (hasGSAP) { buildProcessScroll(); ScrollTrigger.refresh(); }
  });

  $("#menuBtn").addEventListener("click", () => {
    const open = $("#menuBtn").getAttribute("aria-expanded") !== "true";
    $("#menuBtn").setAttribute("aria-expanded", open);
    $("#nav").classList.toggle("is-open", open);
    lockScroll(open);
  });

  $$(".js-ig").forEach(a => { a.href = CONFIG.instagram; });

  // Header: solid after scroll, hides on scroll down
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    $("#header").classList.toggle("is-scrolled", y > 40);
    $("#header").classList.toggle("is-hidden", y > 400 && y > lastY && !$("#nav").classList.contains("is-open"));
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function closeMenu() {
  if ($("#menuBtn").getAttribute("aria-expanded") === "true") {
    $("#menuBtn").setAttribute("aria-expanded", "false");
    $("#nav").classList.remove("is-open");
    lockScroll(false);
  }
}

/* ---------- Reviews slider ---------- */
function initReviews() {
  const slides = $$(".review"), dots = $("#reviewDots");
  let i = 0, timer;
  dots.innerHTML = slides.map((_, k) => `<button type="button" aria-label="${k + 1}"></button>`).join("");
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    $$("button", dots).forEach((d, k) => { d.classList.remove("is-active"); if (k === i) { void d.offsetWidth; d.classList.add("is-active"); } });
    clearTimeout(timer);
    timer = setTimeout(() => go(i + 1), 6000);
  };
  $$("button", dots).forEach((d, k) => d.addEventListener("click", () => go(k)));
  go(0);
}

/* ============================================================
   Motion
   ============================================================ */
function initPointerFX() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion) return;
  const cursor = $(".cursor");
  let cx = 0, cy = 0, x = 0, y = 0;
  window.addEventListener("mousemove", e => { cx = e.clientX; cy = e.clientY; cursor.style.opacity = 1; });
  (function loop() { x += (cx - x) * .18; y += (cy - y) * .18; cursor.style.transform = `translate(${x}px, ${y}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", e => cursor.classList.toggle("is-big", !!e.target.closest("a, button, .card")));

  // Magnetic buttons
  $$(".magnetic").forEach(b => {
    b.addEventListener("mousemove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener("mouseleave", () => { b.style.transform = ""; });
  });

  // Card tilt
  document.addEventListener("mousemove", e => {
    const card = e.target.closest?.(".card");
    $$(".card__media.tilting").forEach(m => { if (!card || m !== $(".card__media", card)) { m.classList.remove("tilting"); m.style.transform = ""; } });
    if (!card) return;
    const m = $(".card__media", card), r = m.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    m.classList.add("tilting");
    m.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  });
}

let processTween = null;
function buildProcessScroll() {
  if (processTween) { processTween.scrollTrigger?.kill(); processTween.kill(); processTween = null; gsap.set("#processTrack", { x: 0 }); }
  if (reduceMotion || window.innerWidth <= 860) return;
  const track = $("#processTrack");
  const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
  const dir = document.documentElement.dir === "rtl" ? 1 : -1;
  processTween = gsap.to(track, {
    x: () => dir * dist(), ease: "none",
    scrollTrigger: { trigger: "#process", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
  });
}

function initMotion() {
  if (!hasGSAP) return;
  gsap.registerPlugin(ScrollTrigger);
  if (reduceMotion) return;

  if (typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ lerp: .09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Hero parallax
  gsap.to(".hero__stage", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__sun", { yPercent: 40, scale: 1.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".dune--1", { y: -30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__content", { yPercent: -12, opacity: .2, ease: "none", scrollTrigger: { trigger: ".hero", start: "center center", end: "bottom top", scrub: true } });

  // Section titles: word-by-word rise
  $$(".split").forEach(el => {
    gsap.from($$(".wi", el), { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: .06, scrollTrigger: { trigger: el, start: "top 85%" } });
  });
  $$(".eyebrow:not(.hero__eyebrow)").forEach(el => gsap.from(el, { opacity: 0, x: document.documentElement.dir === "rtl" ? 30 : -30, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
  $$(".fade-up").forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));

  // Image curtain reveals
  $$(".reveal-img").forEach((el, i) => {
    gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, delay: i * .15, ease: "expo.inOut", scrollTrigger: { trigger: ".story", start: "top 70%" } });
    gsap.fromTo(el.firstElementChild, { scale: 1.35 }, { scale: 1, duration: 1.8, delay: i * .15, ease: "expo.out", scrollTrigger: { trigger: ".story", start: "top 70%" } });
  });
  gsap.to(".story__img--b", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true } });

  // Counters
  $$(".counter").forEach(el => {
    const to = +el.dataset.to, suffix = el.dataset.suffix || "";
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US") + suffix; } });
  });

  animateCards();

  // Process
  buildProcessScroll();
  if (window.innerWidth <= 860) $$(".step").forEach(s => gsap.from(s, { y: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 88%" } }));

  // Gallery + contact
  ScrollTrigger.batch(".masonry figure", { start: "top 92%", once: true, onEnter: b => gsap.fromTo(b, { y: 60, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: .08, ease: "expo.out" }) });
  gsap.from(".contact__inner", { scale: .9, borderRadius: "120px", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".contact", start: "top 85%" } });

  let resizeT;
  window.addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(() => { buildProcessScroll(); ScrollTrigger.refresh(); }, 250); });
}

/* Product cards rise in as they scroll into view (re-run after the grid is rebuilt) */
let cardTriggers = [];
function animateCards() {
  if (!hasGSAP || reduceMotion) return;
  cardTriggers.forEach(st => st.kill());
  cardTriggers = ScrollTrigger.batch(".card", {
    start: "top 90%", once: true,
    onEnter: b => gsap.fromTo(b, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: .1, ease: "expo.out" })
  });
}

/* Loader out + hero intro */
function intro() {
  const loader = $("#loader");
  const done = () => { document.body.classList.remove("is-loading"); loader.remove(); if (hasGSAP) ScrollTrigger.refresh(); };

  if (!hasGSAP || reduceMotion) { loader.style.transition = "opacity .5s"; loader.style.opacity = 0; setTimeout(done, 500); return; }

  const tl = gsap.timeline({ onComplete: done });
  tl.to(loader, { yPercent: -100, duration: 1.1, ease: "expo.inOut" })
    .from(".hero__title .word", { yPercent: 115, duration: 1.3, stagger: .1, ease: "expo.out" }, "-=.45")
    .from(".hero__eyebrow, .hero__lead, .hero__cta", { y: 30, opacity: 0, duration: 1, stagger: .1, ease: "expo.out" }, "-=1")
    .from(".hero__vessel", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)", duration: 1.6, ease: "expo.inOut" }, "-=1.3")
    .from(".hero__vessel img", { scale: 1.3, duration: 2, ease: "expo.out" }, "<")
    .from(".hero__mini", { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=1")
    .from(".hero__wheel", { scaleX: 0, opacity: 0, duration: 1, ease: "expo.out" }, "<")
    .from(".badge", { scale: 0, rotate: -90, opacity: 0, duration: 1.2, ease: "back.out(1.6)" }, "-=1")
    .from(".header > *", { y: -30, opacity: 0, duration: .9, stagger: .08, ease: "expo.out" }, "-=1.1")
    .from(".hero__dunes", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out" }, "-=1.2");
}

/* ============================================================
   Boot
   ============================================================ */
$("#year").textContent = new Date().getFullYear();
renderStatic();
applyLang();
bindEvents();
initReviews();
initPointerFX();
initMotion();

// Live products from the admin panel (if Supabase is configured)
loadProducts().then(ok => {
  if (!ok) return;
  renderFilters();
  renderGrid();
  renderCart();
  animateCards();
  if (hasGSAP) ScrollTrigger.refresh();
});

const MIN_LOADER = 2100, started = performance.now();
let introStarted = false;
const startIntro = () => { if (introStarted) return; introStarted = true; setTimeout(intro, Math.max(0, MIN_LOADER - (performance.now() - started))); };
if (document.readyState === "complete") startIntro(); else window.addEventListener("load", startIntro);
setTimeout(startIntro, 4500); // safety net if a font or CDN is slow
