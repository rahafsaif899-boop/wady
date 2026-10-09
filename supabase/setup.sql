-- ============================================================
-- Wadi Clay — database setup
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- Safe to re-run.
-- ============================================================

-- 1) Products -------------------------------------------------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name_ar      text not null,
  name_en      text,
  desc_ar      text,
  desc_en      text,
  capacity_ar  text,
  capacity_en  text,
  tag_ar       text,
  tag_en       text,
  gifts_ar     text,
  gifts_en     text,
  category     text not null default 'family'
               check (category in ('family', 'lifestyle', 'personal', 'accessories')),
  price        numeric(10,2) not null default 0 check (price >= 0),
  old_price    numeric(10,2) not null default 0 check (old_price >= 0),
  image_url    text,
  in_stock     boolean not null default true,
  is_active    boolean not null default true,
  sort_order   integer not null default 0
);

-- columns added after the first version (safe if they already exist)
alter table public.products add column if not exists gifts_ar text;
alter table public.products add column if not exists gifts_en text;

-- 2) Who is an admin ------------------------------------------
-- Only e-mails listed here can add/edit/delete products,
-- even if someone else manages to create an account.
create table if not exists public.admins (
  email text primary key
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- 3) Row level security ---------------------------------------
alter table public.products enable row level security;
alter table public.admins   enable row level security;   -- no policies = nobody reads it from the browser

drop policy if exists "Public can read visible products" on public.products;
create policy "Public can read visible products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Admins read all products" on public.products;
create policy "Admins read all products"
  on public.products for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins insert products" on public.products;
create policy "Admins insert products"
  on public.products for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Admins update products" on public.products;
create policy "Admins update products"
  on public.products for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete products" on public.products;
create policy "Admins delete products"
  on public.products for delete to authenticated
  using (public.is_admin());

-- 4) Image storage --------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update
  set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins update product images" on storage.objects;
create policy "Admins update product images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins delete product images" on storage.objects;
create policy "Admins delete product images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

-- 5) Add your admin e-mail(s) ---------------------------------
-- Replace with the real e-mail of the person who will manage products,
-- then create the same user in Authentication → Users → Add user.
insert into public.admins (email) values ('admin@example.com')
on conflict do nothing;

-- 6) Your products (only inserted when the table is empty) -----
-- Photos point to the images shipped with the site; the admin can replace them anytime.
insert into public.products
  (name_ar, name_en, capacity_ar, capacity_en, price, category, gifts_ar, gifts_en, tag_ar, tag_en, image_url, sort_order, desc_ar, desc_en)
select * from (values
  ('غيث', 'Ghaith', '١٥ لتر', '15 L', 99, 'family', 'كوب فخار، قاعدة فخار، صحن ترشيح', 'Clay cup, clay stand, drip plate', 'الحجم العائلي', 'Family size', 'assets/img/products/ghaith-15.jpg', 1,
   'موزّع ماء عائلي بتصميم القُلّة المزدوجة وحنفية ستانلس، يرتكز على قاعدة فخار — ماء بارد وطبيعي لكل البيت طوال اليوم.', 'A family water dispenser in a double-gourd shape with a stainless tap, standing on a clay base.'),
  ('القارورة', 'Al Qarora', '١٢ لتر', '12 L', 79, 'family', 'كوب فخار، مضخة، صحن ترشيح', 'Clay cup, pump, drip plate', 'مع مضخة', 'Pump included', 'assets/img/products/qarora.jpg', 2,
   'قارورة فخار كبيرة على شكل قطرة ماء، تأتي مع مضخة كهربائية تسحب الماء البارد بلمسة زر.', 'A large drop-shaped clay vessel that comes with an electric pump.'),
  ('غيث', 'Ghaith', '٦ لتر', '6 L', 59, 'family', 'صحن ترشيح، كوب فخار، قاعدة فخار', 'Drip plate, clay cup, clay stand', '', '', 'assets/img/products/ghaith-6.jpg', 3,
   'الحجم الأصغر من غيث بغطاء فخاري وحنفية ستانلس — مثالي للمطبخ أو المكتب أو العائلة الصغيرة.', 'The compact Ghaith with a clay lid and stainless tap.'),
  ('رواق', 'Rawaq', '١٥٠٠ مل', '1500 ml', 25, 'personal', 'كوب فخار', 'Clay cup', 'تصميم حصري', 'Signature design', 'assets/img/products/rawaq.jpg', 4,
   'فخارة بتصميم هندسي عصري وغطاء يتحوّل إلى كوب — قطعة فنية على طاولتك تبرّد الماء طبيعياً.', 'A modern geometric carafe whose lid doubles as a cup.'),
  ('نقاء', 'Naqaa', '١٤٠٠ مل', '1400 ml', 22, 'personal', 'كوب فخار، صحن ترشيح', 'Clay cup, drip plate', '', '', 'assets/img/products/naqaa.jpg', 5,
   'فخارة كلاسيكية بعنق طويل وسدّادة فخارية دائرية، تحفظ برودة الماء وطعمه النقي على مائدتك.', 'A classic long-neck carafe with a round clay stopper.'),
  ('إرواء', 'Irwaa', '١٣٠٠ مل', '1300 ml', 20, 'personal', 'كوب فخار، صحن ترشيح', 'Clay cup, drip plate', '', '', 'assets/img/products/irwaa.jpg', 6,
   'قارورة انسيابية طويلة بسدّادة فخارية، أنيقة على المائدة وسهلة الحمل والسكب.', 'A tall, flowing bottle with a clay stopper.'),
  ('ندى', 'Nada', '٩٠٠ مل', '900 ml', 20, 'lifestyle', 'صحن ترشيح', 'Drip plate', '', '', 'assets/img/products/nada.jpg', 7,
   'مَج فخار كبير بمقبض مريح وغطاء، يرافقك على المكتب ويبقي ماءك بارداً لساعات.', 'A large clay mug with a handle and lid.'),
  ('ثرى', 'Thara', '٩٠٠ مل', '900 ml', 19, 'lifestyle', 'صحن ترشيح، شنطة', 'Drip plate, carry bag', 'مع شنطة', 'Bag included', 'assets/img/products/thara.jpg', 8,
   'فخارة بخصر منحوت يسهّل الإمساك بها، تأتي مع شنطة قماش لتأخذها معك أينما ذهبت.', 'A carafe with a sculpted waist and a canvas carry bag.'),
  ('رحّال', 'Rahhal', '٨٠٠ مل', '800 ml', 18, 'lifestyle', 'كوب فخار، صحن ترشيح، شنطة', 'Clay cup, drip plate, carry bag', 'مع شنطة', 'Bag included', 'assets/img/products/rahhal.jpg', 9,
   'تمبلر فخار بغطاء، رفيق السفر والسيارة والجامعة — ماء بارد طبيعياً من غير بلاستيك.', 'A lidded clay tumbler for travel, the car or campus.')
) as v(name_ar, name_en, capacity_ar, capacity_en, price, category, gifts_ar, gifts_en, tag_ar, tag_en, image_url, sort_order, desc_ar, desc_en)
where not exists (select 1 from public.products);
