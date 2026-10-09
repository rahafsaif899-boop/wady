/* ============================================================
   Wadi Clay — categories + products
   ------------------------------------------------------------
   Once Supabase is connected (config.js), products come from the
   admin panel (admin.html) and this list is only a fallback.
   Prices in JOD.
   ============================================================ */

window.CATEGORIES = [
  { id: "all",         ar: "الكل",                  en: "All" },
  { id: "family",      ar: "موزّعات عائلية",        en: "Family dispensers" },
  { id: "personal",    ar: "فخاريات المائدة",       en: "Table carafes" },
  { id: "lifestyle",   ar: "للتنقل والمكتب",        en: "On the go" },
  { id: "accessories", ar: "ملحقات",                en: "Accessories" }
];

window.PRODUCTS = [
  {
    id: "ghaith-15", category: "family", price: 99, old_price: 0, in_stock: true,
    image_url: "assets/img/products/ghaith-15.jpg",
    name_ar: "غيث", name_en: "Ghaith",
    capacity_ar: "١٥ لتر", capacity_en: "15 L",
    desc_ar: "موزّع ماء عائلي بتصميم القُلّة المزدوجة وحنفية ستانلس، يرتكز على قاعدة فخار — ماء بارد وطبيعي لكل البيت طوال اليوم.",
    desc_en: "A family water dispenser in a double-gourd shape with a stainless tap, standing on a clay base — cool, natural water for the whole home all day.",
    gifts_ar: "كوب فخار، قاعدة فخار، صحن ترشيح", gifts_en: "Clay cup, clay stand, drip plate",
    tag_ar: "الحجم العائلي", tag_en: "Family size"
  },
  {
    id: "qarora-12", category: "family", price: 79, old_price: 0, in_stock: true,
    image_url: "assets/img/products/qarora.jpg",
    name_ar: "القارورة", name_en: "Al Qarora",
    capacity_ar: "١٢ لتر", capacity_en: "12 L",
    desc_ar: "قارورة فخار كبيرة على شكل قطرة ماء، تأتي مع مضخة كهربائية تسحب الماء البارد بلمسة زر.",
    desc_en: "A large drop-shaped clay vessel that comes with an electric pump — cool water at the touch of a button.",
    gifts_ar: "كوب فخار، مضخة، صحن ترشيح", gifts_en: "Clay cup, pump, drip plate",
    tag_ar: "مع مضخة", tag_en: "Pump included"
  },
  {
    id: "ghaith-6", category: "family", price: 59, old_price: 0, in_stock: true,
    image_url: "assets/img/products/ghaith-6.jpg",
    name_ar: "غيث", name_en: "Ghaith",
    capacity_ar: "٦ لتر", capacity_en: "6 L",
    desc_ar: "الحجم الأصغر من غيث بغطاء فخاري وحنفية ستانلس — مثالي للمطبخ أو المكتب أو العائلة الصغيرة.",
    desc_en: "The compact Ghaith with a clay lid and stainless tap — ideal for the kitchen, office or a small family.",
    gifts_ar: "صحن ترشيح، كوب فخار، قاعدة فخار", gifts_en: "Drip plate, clay cup, clay stand",
    tag_ar: "", tag_en: ""
  },
  {
    id: "rawaq", category: "personal", price: 25, old_price: 0, in_stock: true,
    image_url: "assets/img/products/rawaq.jpg",
    name_ar: "رواق", name_en: "Rawaq",
    capacity_ar: "١٥٠٠ مل", capacity_en: "1500 ml",
    desc_ar: "فخارة بتصميم هندسي عصري وغطاء يتحوّل إلى كوب — قطعة فنية على طاولتك تبرّد الماء طبيعياً.",
    desc_en: "A modern geometric carafe whose lid doubles as a cup — a sculptural piece that cools water naturally.",
    gifts_ar: "كوب فخار", gifts_en: "Clay cup",
    tag_ar: "تصميم حصري", tag_en: "Signature design"
  },
  {
    id: "naqaa", category: "personal", price: 22, old_price: 0, in_stock: true,
    image_url: "assets/img/products/naqaa.jpg",
    name_ar: "نقاء", name_en: "Naqaa",
    capacity_ar: "١٤٠٠ مل", capacity_en: "1400 ml",
    desc_ar: "فخارة كلاسيكية بعنق طويل وسدّادة فخارية دائرية، تحفظ برودة الماء وطعمه النقي على مائدتك.",
    desc_en: "A classic long-neck carafe with a round clay stopper that keeps water cool and pure on your table.",
    gifts_ar: "كوب فخار، صحن ترشيح", gifts_en: "Clay cup, drip plate",
    tag_ar: "", tag_en: ""
  },
  {
    id: "irwaa", category: "personal", price: 20, old_price: 0, in_stock: true,
    image_url: "assets/img/products/irwaa.jpg",
    name_ar: "إرواء", name_en: "Irwaa",
    capacity_ar: "١٣٠٠ مل", capacity_en: "1300 ml",
    desc_ar: "قارورة انسيابية طويلة بسدّادة فخارية، أنيقة على المائدة وسهلة الحمل والسكب.",
    desc_en: "A tall, flowing bottle with a clay stopper — elegant on the table and easy to pour.",
    gifts_ar: "كوب فخار، صحن ترشيح", gifts_en: "Clay cup, drip plate",
    tag_ar: "", tag_en: ""
  },
  {
    id: "nada", category: "lifestyle", price: 20, old_price: 0, in_stock: true,
    image_url: "assets/img/products/nada.jpg",
    name_ar: "ندى", name_en: "Nada",
    capacity_ar: "٩٠٠ مل", capacity_en: "900 ml",
    desc_ar: "مَج فخار كبير بمقبض مريح وغطاء، يرافقك على المكتب ويبقي ماءك بارداً لساعات.",
    desc_en: "A large clay mug with a comfortable handle and lid — your desk companion that keeps water cool for hours.",
    gifts_ar: "صحن ترشيح", gifts_en: "Drip plate",
    tag_ar: "", tag_en: ""
  },
  {
    id: "thara", category: "lifestyle", price: 19, old_price: 0, in_stock: true,
    image_url: "assets/img/products/thara.jpg",
    name_ar: "ثرى", name_en: "Thara",
    capacity_ar: "٩٠٠ مل", capacity_en: "900 ml",
    desc_ar: "فخارة بخصر منحوت يسهّل الإمساك بها، تأتي مع شنطة قماش لتأخذها معك أينما ذهبت.",
    desc_en: "A carafe with a sculpted waist for an easy grip, with a canvas bag to take it wherever you go.",
    gifts_ar: "صحن ترشيح، شنطة", gifts_en: "Drip plate, carry bag",
    tag_ar: "مع شنطة", tag_en: "Bag included"
  },
  {
    id: "rahhal", category: "lifestyle", price: 18, old_price: 0, in_stock: true,
    image_url: "assets/img/products/rahhal.jpg",
    name_ar: "رحّال", name_en: "Rahhal",
    capacity_ar: "٨٠٠ مل", capacity_en: "800 ml",
    desc_ar: "تمبلر فخار بغطاء، رفيق السفر والسيارة والجامعة — ماء بارد طبيعياً من غير بلاستيك.",
    desc_en: "A lidded clay tumbler for travel, the car or campus — naturally cool water, no plastic.",
    gifts_ar: "كوب فخار، صحن ترشيح، شنطة", gifts_en: "Clay cup, drip plate, carry bag",
    tag_ar: "مع شنطة", tag_en: "Bag included"
  }
];
