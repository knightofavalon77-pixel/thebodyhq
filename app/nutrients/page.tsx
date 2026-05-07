'use client';
// @ts-nocheck

import React, { useState } from "react";

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --deep:#152e1e; --forest:#1f5c3a; --mid:#2d8653; --mint:#52b788;
      --light:#a8dabc; --cream:#fdf8f0; --parch:#f5ede0; --gold:#c9922a;
      --gold-lt:#f7e6c4; --ink:#1e2620; --muted:#6b7c72; --warn:#c0392b;
      --warn-lt:#fdecea;
    }
    body { background:var(--cream); font-family:'DM Sans',sans-serif; color:var(--ink); }
    .app { min-height:100vh; }
    .hero {
      background:linear-gradient(135deg,var(--deep) 0%,var(--forest) 60%,var(--mid) 100%);
      padding:40px 24px 36px; text-align:center; position:relative; overflow:hidden;
    }
    .hero::before {
      content:''; position:absolute; inset:0;
      background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E");
    }
    .hero-leaf { font-size:36px; display:block; margin-bottom:10px; position:relative; }
    .hero h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,4vw,38px); font-weight:700; color:#fff; line-height:1.15; position:relative; }
    .hero-sub { font-size:16px; color:var(--light); margin-top:8px; font-weight:300; position:relative; }
    .hero-badges { display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin-top:14px; position:relative; }
    .badge { background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2); color:var(--light); font-size:16px; padding:3px 10px; border-radius:20px; font-weight:500; }
    .steps-bar { display:flex; align-items:center; justify-content:center; padding:18px 24px 0; max-width:420px; margin:0 auto; }
    .step-dot { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:600; transition:all .3s; flex-shrink:0; }
    .step-dot.done { background:var(--mint); color:#fff; }
    .step-dot.active { background:var(--gold); color:#fff; box-shadow:0 0 0 4px var(--gold-lt); }
    .step-dot.idle { background:var(--parch); color:var(--muted); border:2px solid #ddd; }
    .step-line { flex:1; height:2px; background:#e0e0e0; min-width:20px; }
    .step-line.done { background:var(--mint); }
    .step-labels { display:flex; justify-content:space-between; max-width:420px; margin:5px auto 0; padding:0 4px; }
    .step-label { font-size:16px; color:var(--muted); font-weight:500; text-align:center; width:56px; }
    .step-label.active { color:var(--gold); font-weight:600; }
    .card { background:#fff; border-radius:14px; box-shadow:0 2px 20px rgba(0,0,0,.07); max-width:520px; margin:20px auto; padding:24px 20px; }
    .card-title { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:var(--deep); margin-bottom:3px; }
    .card-sub { font-size:15px; color:var(--muted); margin-bottom:18px; }
    .field { margin-bottom:16px; }
    label { display:block; font-size:14px; font-weight:600; color:var(--forest); letter-spacing:0.6px; text-transform:uppercase; margin-bottom:6px; }
    select, input[type=number] { width:100%; padding:10px 13px; border:1.5px solid #dde8e2; border-radius:9px; font-family:'DM Sans',sans-serif; font-size:16px; color:var(--ink); background:var(--cream); transition:border-color .2s; appearance:none; }
    select:focus, input:focus { outline:none; border-color:var(--mint); box-shadow:0 0 0 3px rgba(82,183,136,.15); }
    .select-wrap { position:relative; }
    .select-wrap::after { content:'▾'; position:absolute; right:13px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; font-size:14px; }
    .pill-group { display:flex; gap:7px; flex-wrap:wrap; }
    .pill { padding:7px 16px; border-radius:22px; border:2px solid #b8d4c4; font-size:15px; font-weight:600; cursor:pointer; transition:all .2s; background:#fff; color:var(--forest); user-select:none; font-family:'DM Sans',sans-serif; }
    .pill:hover { border-color:var(--mint); background:var(--parch); }
    .pill.sel { background:#d4edda; border:2px solid #52b788; color:#1a5c38; font-weight:700; }
    .unit-toggle { display:inline-flex; border:2px solid #b8d4c4; border-radius:10px; overflow:hidden; background:#fff; margin-bottom:10px; }
    .unit-btn { padding:9px 22px; border:none; border-right:2px solid #b8d4c4; font-family:'DM Sans',sans-serif; font-size:16px; font-weight:600; cursor:pointer; background:#ffffff; color:#6b7c72; transition:all .2s; }
    .unit-btn.active { background:#d4edda; border-left:2px solid #52b788; color:#1a5c38; font-weight:700; }
    .btn-row { display:flex; gap:10px; justify-content:flex-end; margin-top:20px; }
    .btn { padding:11px 24px; border-radius:9px; font-family:'DM Sans',sans-serif; font-size:16px; font-weight:600; cursor:pointer; border:none; transition:all .2s; }
    .btn-back { background:var(--parch); color:var(--muted); }
    .btn-back:hover { background:#ede3d1; }
    .btn-next { background:linear-gradient(135deg,var(--forest),var(--mid)); color:#fff; box-shadow:0 4px 14px rgba(31,92,58,.3); }
    .btn-next:hover { transform:translateY(-1px); }
    .btn-calc { background:linear-gradient(135deg,var(--gold),#e6a830); color:#fff; box-shadow:0 4px 14px rgba(201,146,42,.35); width:100%; padding:13px; font-size:14px; }
    .btn-calc:hover { transform:translateY(-1px); }
    .btn-reset { background:var(--parch); color:var(--muted); font-size:15px; padding:9px 18px; }
    .results-wrap { max-width:760px; margin:0 auto; padding:0 14px 40px; }
    .results-hero { background:linear-gradient(135deg,var(--deep),var(--forest)); border-radius:14px; padding:20px; margin-bottom:20px; color:#fff; margin-top:20px; }
    .results-hero h2 { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; margin-bottom:3px; }
    .results-hero p { font-size:15px; color:var(--light); margin-bottom:12px; }
    .profile-chips { display:flex; gap:6px; flex-wrap:wrap; }
    .profile-chip { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.2); color:#fff; font-size:16px; padding:4px 10px; border-radius:18px; font-weight:500; }
    .risk-box { background:var(--warn-lt); border:1px solid #f5c6c2; border-left:4px solid var(--warn); border-radius:9px; padding:12px 14px; margin-bottom:18px; }
    .risk-box h3 { font-size:15px; font-weight:700; color:var(--warn); margin-bottom:5px; }
    .risk-tags { display:flex; gap:5px; flex-wrap:wrap; margin-top:6px; }
    .risk-tag { background:#fff; border:1px solid #f5c6c2; color:var(--warn); font-size:16px; font-weight:600; padding:3px 9px; border-radius:11px; }
    .tip-box { background:var(--gold-lt); border:1px solid #e8d5a0; border-left:4px solid var(--gold); border-radius:9px; padding:11px 14px; margin-bottom:14px; font-size:14px; color:#7a5a1a; line-height:1.6; }
    .cat-section { margin-bottom:16px; }
    .cat-header { display:flex; align-items:center; gap:8px; padding:11px 14px; border-radius:9px 9px 0 0; cursor:pointer; user-select:none; }
    .cat-icon { font-size:16px; }
    .cat-title { font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:700; color:#fff; flex:1; }
    .cat-count { font-size:16px; color:rgba(255,255,255,.75); font-weight:500; }
    .cat-chevron { color:rgba(255,255,255,.8); font-size:16px; transition:transform .3s; }
    .cat-chevron.open { transform:rotate(180deg); }
    .cat-body { background:#fff; border:1px solid #e8f0eb; border-top:none; border-radius:0 0 9px 9px; overflow:hidden; }
    .col-hdr { display:grid; grid-template-columns:1fr 100px 90px; padding:6px 14px; background:#f7faf8; border-bottom:1px solid #e8f0eb; }
    .col-hdr span { font-size:15px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.6px; }
    .col-hdr span:nth-child(2) { text-align:right; }
    .col-hdr span:nth-child(3) { text-align:center; }
    .nut-row { display:grid; grid-template-columns:1fr 100px 90px; align-items:center; padding:9px 14px; border-bottom:1px solid #f0f4f1; gap:6px; transition:background .15s; }
    .nut-row:last-child { border-bottom:none; }
    .nut-row:hover { background:var(--cream); }
    .nut-name { font-size:15px; font-weight:600; color:var(--deep); }
    .nut-func { font-size:16px; color:var(--muted); margin-top:2px; line-height:1.4; }
    .nut-note { font-size:15px; color:var(--muted); font-style:italic; margin-top:2px; }
    .nut-amount { font-size:16px; font-weight:700; color:var(--forest); text-align:right; line-height:1.3; }
    .nut-unit { font-size:15px; font-weight:400; color:var(--muted); }
    .nut-source { font-size:15px; color:var(--muted); background:var(--parch); padding:3px 7px; border-radius:7px; text-align:center; line-height:1.4; }
    .risk-nut .nut-name { color:var(--warn); }
    .disclaimer { background:var(--parch); border-radius:11px; padding:14px 16px; margin:20px 0; font-size:14px; color:var(--muted); line-height:1.6; }
    
    .seo-section{max-width:740px;margin:0 auto;padding:0 12px 48px}
    .seo-intro{background:var(--card);border:1px solid #e8f0eb;border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-intro h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--deep);margin-bottom:14px}
    .seo-intro p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-intro p:last-child{margin-bottom:0}
    .seo-intro strong{color:var(--deep)}
    .how-works{background:var(--card);border:1px solid #e8f0eb;border-radius:16px;padding:28px;margin-bottom:20px}
    .how-works h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--deep);margin-bottom:16px}
    .step-row{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .step-num{background:var(--forest);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .step-txt{font-size:16px;color:var(--muted);line-height:1.7}
    .step-txt strong{color:var(--deep)}
    .faq-wrap{background:var(--card);border:1px solid #e8f0eb;border-radius:16px;padding:28px;margin-bottom:20px}
    .faq-wrap h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--deep);margin-bottom:16px}
    .faq-row{border-bottom:1px solid #e8f0eb;padding:16px 0}
    .faq-row:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:16px;font-weight:700;color:var(--deep);margin-bottom:8px}
    .faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .faq-a strong{color:var(--deep)}
    .int-links{background:rgba(31,92,58,.08);border:1px solid rgba(31,92,58,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .int-links h3{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--forest);margin-bottom:14px}
    .links-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .int-link{background:#fff;border:1px solid #e8f0eb;border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .int-link:hover{border-color:var(--mint)}
    .int-link-name{font-size:15px;font-weight:600;color:var(--deep)}
    .int-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disc{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid #e8f0eb;border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.links-grid{grid-template-columns:1fr}}

    @media(max-width:480px){
      .col-hdr { grid-template-columns:1fr 90px; }
      .col-hdr span:nth-child(3) { display:none; }
      .nut-row { grid-template-columns:1fr 90px; }
      .nut-source { display:none; }
    }
  `}</style>
);

const CATEGORIES = [
  { id:"fat", label:"Fat-Soluble Vitamins", icon:"☀️", bg:"#b71c1c",
    nutrients:[
      { name:"Vitamin A", unit:"µg RAE", func:"Vision, immunity, cell growth", src:"Liver, carrots, sweet potato, eggs", risk:["vegan"] },
      { name:"Vitamin D3", unit:"µg (IU)", func:"Bone health, immunity, mood — very commonly deficient", src:"Sunlight, fatty fish, fortified foods", risk:["vegan","indoor","senior"] },
      { name:"Vitamin E", unit:"mg", func:"Antioxidant, skin health, anti-inflammatory", src:"Almonds, sunflower seeds, avocado, spinach", risk:[] },
      { name:"Vitamin K1 + K2 (MK-7)", unit:"µg", func:"Blood clotting, bone health, artery protection", src:"Leafy greens (K1), natto & hard cheese (K2)", risk:["vegan"] },
    ]},
  { id:"water", label:"Water-Soluble Vitamins", icon:"💧", bg:"#0d47a1",
    nutrients:[
      { name:"Vitamin C", unit:"mg", func:"Antioxidant, collagen, immune support, iron absorption", src:"Bell peppers, citrus, kiwi, broccoli, strawberries", risk:[] },
      { name:"Vitamin B1 (Thiamin)", unit:"mg", func:"Energy metabolism, nerve & muscle function", src:"Pork, whole grains, legumes, nuts, seeds", risk:[] },
      { name:"Vitamin B2 (Riboflavin)", unit:"mg", func:"Energy production, cell growth, antioxidant", src:"Dairy, lean meat, eggs, almonds, mushrooms", risk:["vegan"] },
      { name:"Vitamin B3 (Niacin)", unit:"mg NE", func:"Energy metabolism, DNA repair, skin health", src:"Chicken, tuna, turkey, peanuts, mushrooms", risk:[] },
      { name:"Vitamin B5 (Pantothenic Acid)", unit:"mg", func:"Hormone production, fatty acid metabolism", src:"Chicken, potatoes, sunflower seeds, avocado", risk:[] },
      { name:"Vitamin B6", unit:"mg", func:"Brain health, mood, protein metabolism, immunity", src:"Poultry, fish, bananas, chickpeas, potatoes", risk:[] },
      { name:"Vitamin B7 (Biotin)", unit:"µg", func:"Fatty acid synthesis, hair & nail health, metabolism", src:"Egg yolk, salmon, avocado, sweet potato, nuts", risk:[] },
      { name:"Folate (B9)", unit:"µg DFE", func:"DNA synthesis, cell division — critical in pregnancy", src:"Dark leafy greens, legumes, asparagus, avocado", risk:["pregnant"] },
      { name:"Vitamin B12 (Cobalamin)", unit:"µg", func:"Nerve function, red blood cells, brain health", src:"Meat, fish, eggs, dairy, fortified plant foods", risk:["vegan","senior"] },
      { name:"Choline", unit:"mg", func:"Brain development, cell membranes, liver function", src:"Egg yolk, beef liver, soybeans, fish, chicken", risk:["vegan"] },
    ]},
  { id:"major", label:"Major Minerals", icon:"⚙️", bg:"#00695c",
    nutrients:[
      { name:"Calcium", unit:"mg", func:"Bones, teeth, muscle contraction, nerve signaling", src:"Dairy, fortified plant milk, kale, sardines, tofu", risk:["vegan","senior"] },
      { name:"Phosphorus", unit:"mg", func:"Bone mineralization, energy storage (ATP)", src:"Meat, dairy, fish, eggs, nuts, whole grains", risk:[] },
      { name:"Magnesium", unit:"mg", func:"300+ enzymes, sleep, stress response, blood sugar", src:"Pumpkin seeds, almonds, spinach, dark chocolate", risk:["senior"] },
      { name:"Potassium", unit:"mg", func:"Heart rhythm, blood pressure, muscle & nerve function", src:"Bananas, avocado, sweet potato, spinach, beans", risk:[] },
      { name:"Sodium", unit:"mg", func:"Fluid balance, nerve transmission — most consume far too much", src:"Naturally: 1500 mg. Avoid excess processed foods.", risk:[] },
    ]},
  { id:"trace", label:"Trace Minerals", icon:"🔬", bg:"#4a148c",
    nutrients:[
      { name:"Iron", unit:"mg", func:"Oxygen transport in blood, energy, cognitive performance", src:"Red meat, shellfish, legumes, spinach, tofu", risk:["vegan","female"] },
      { name:"Zinc", unit:"mg", func:"Immune defense, wound healing, taste & smell, DNA repair", src:"Oysters, red meat, beans, nuts, pumpkin seeds", risk:["vegan"] },
      { name:"Selenium", unit:"µg", func:"Antioxidant enzyme, thyroid function, DNA repair", src:"Brazil nuts (1–2 daily!), seafood, organ meats", risk:[] },
      { name:"Iodine", unit:"µg", func:"Thyroid hormones, metabolic rate, fetal brain development", src:"Iodized salt, seafood, seaweed, dairy", risk:["vegan"] },
      { name:"Copper", unit:"µg", func:"Iron metabolism, connective tissue, antioxidant enzymes", src:"Shellfish, organ meats, nuts, seeds, dark chocolate", risk:[] },
      { name:"Manganese", unit:"mg", func:"Antioxidant enzymes, bone formation, carb metabolism", src:"Whole grains, legumes, nuts, seeds, tea", risk:[] },
      { name:"Chromium", unit:"µg", func:"Enhances insulin action, glucose & fat metabolism", src:"Broccoli, whole grains, meat, grape juice, cheese", risk:[] },
    ]},
  { id:"omega", label:"Omega-3s & Macronutrients", icon:"🐟", bg:"#1a5276",
    nutrients:[
      { name:"Protein", unit:"g/day", func:"Tissue repair, enzymes, hormones, muscle mass", src:"Meat, fish, eggs, dairy, legumes, tofu, tempeh", risk:[] },
      { name:"Dietary Fiber", unit:"g/day", func:"Gut health, blood sugar, cholesterol, microbiome", src:"Vegetables, fruits, legumes, whole grains, oats", risk:[] },
      { name:"Omega-3 ALA", unit:"g/day", func:"Essential fat; precursor to EPA/DHA (conversion is poor)", src:"Flaxseeds, chia seeds, walnuts, hemp seeds", risk:[] },
      { name:"Omega-3 EPA + DHA", unit:"mg/day", func:"Heart, brain, inflammation, eye health — often deficient", src:"Fatty fish (salmon, sardines), algae oil for vegans", risk:["vegan"] },
      { name:"Water (Total Daily)", unit:"L/day", func:"Every metabolic process — kidneys, temperature, digestion", src:"Water, herbal teas + ~20% from fruits & vegetables", risk:[] },
    ]},
  { id:"bonus", label:"Evidence-Backed Beneficial Compounds", icon:"🌿", bg:"#2e7d32",
    nutrients:[
      { name:"CoQ10 (Ubiquinol form)", unit:"mg/day", func:"Mitochondrial energy, antioxidant, heart health", src:"Organ meats, sardines, mackerel, spinach, peanuts", risk:["statin","senior"] },
      { name:"Lutein + Zeaxanthin", unit:"mg/day", func:"Macular pigment, eye protection, blue light defense", src:"Kale, spinach, collard greens, egg yolks, corn", risk:[] },
      { name:"Lycopene", unit:"mg/day", func:"Antioxidant, prostate health (men), cardiovascular", src:"Cooked tomatoes, tomato paste, watermelon, guava", risk:[] },
      { name:"Probiotics", unit:"Billion CFU", func:"Gut microbiome, immunity, mood (gut-brain axis)", src:"Yogurt, kefir, kimchi, sauerkraut, miso, tempeh", risk:[] },
      { name:"Vitamin D3 + K2 (MK-7) Pair", unit:"combo", func:"Synergistic: D3 raises calcium; K2 directs it to bones", src:"D3: fatty fish/supplements. K2: natto, hard cheese", risk:["senior"] },
    ]},
];

function getRDA(name, p) {
  const { ageGroup:ag, sex, lifestage:ls, diet, activity } = p;
  const male = sex==="male", female=sex==="female";
  const preg = ls==="pregnant", lac = ls==="lactating";
  const senior = ag==="51-70"||ag==="70+";
  const teen = ag==="9-13"||ag==="14-18";
  const child = ag==="1-3"||ag==="4-8";
  const athlete = activity==="athlete"||activity==="very_active";

  const lkp = {
    "Vitamin A":()=>preg?{v:"770",n:"RDA"}:lac?{v:"1300",n:"RDA"}:ag==="1-3"?{v:"300",n:"RDA"}:ag==="4-8"?{v:"400",n:"RDA"}:ag==="9-13"?{v:"600",n:"RDA"}:ag==="14-18"?{v:male?"900":"700",n:"RDA"}:{v:male?"900":"700",n:"RDA"},
    "Vitamin D3":()=>({v:senior?"20 µg (800 IU)":"15 µg (600 IU)",n:senior?"RDA — consider testing; many need 25–50 µg":"RDA — many experts suggest 25–50 µg; test 25(OH)D level"}),
    "Vitamin E":()=>lac?{v:"19",n:"RDA"}:ag==="1-3"?{v:"6",n:"RDA"}:ag==="4-8"?{v:"7",n:"RDA"}:ag==="9-13"?{v:"11",n:"RDA"}:{v:"15",n:"RDA"},
    "Vitamin K1 + K2 (MK-7)":()=>ag==="1-3"?{v:"30",n:"AI"}:ag==="4-8"?{v:"55",n:"AI"}:ag==="9-13"?{v:"60",n:"AI"}:ag==="14-18"?{v:"75",n:"AI"}:{v:male?"120":"90",n:"AI — experts recommend K2 MK-7 90–360 µg alongside"},
    "Vitamin C":()=>preg?{v:"85",n:"RDA"}:lac?{v:"120",n:"RDA"}:ag==="1-3"?{v:"15",n:"RDA"}:ag==="4-8"?{v:"25",n:"RDA"}:ag==="9-13"?{v:"45",n:"RDA"}:ag==="14-18"?{v:male?"75":"65",n:"RDA"}:{v:male?"90":"75",n:"RDA — smokers add 35 mg/day"},
    "Vitamin B1 (Thiamin)":()=>(preg||lac)?{v:"1.4",n:"RDA"}:ag==="1-3"?{v:"0.5",n:"RDA"}:ag==="4-8"?{v:"0.6",n:"RDA"}:ag==="9-13"?{v:"0.9",n:"RDA"}:ag==="14-18"?{v:male?"1.2":"1.0",n:"RDA"}:{v:male?"1.2":"1.1",n:"RDA"},
    "Vitamin B2 (Riboflavin)":()=>preg?{v:"1.4",n:"RDA"}:lac?{v:"1.6",n:"RDA"}:ag==="1-3"?{v:"0.5",n:"RDA"}:ag==="4-8"?{v:"0.6",n:"RDA"}:ag==="9-13"?{v:"0.9",n:"RDA"}:ag==="14-18"?{v:male?"1.3":"1.0",n:"RDA"}:{v:male?"1.3":"1.1",n:"RDA"},
    "Vitamin B3 (Niacin)":()=>preg?{v:"18",n:"RDA"}:lac?{v:"17",n:"RDA"}:ag==="1-3"?{v:"6",n:"RDA"}:ag==="4-8"?{v:"8",n:"RDA"}:ag==="9-13"?{v:"12",n:"RDA"}:ag==="14-18"?{v:male?"16":"14",n:"RDA"}:{v:male?"16":"14",n:"RDA"},
    "Vitamin B5 (Pantothenic Acid)":()=>preg?{v:"6",n:"AI"}:lac?{v:"7",n:"AI"}:ag==="1-3"?{v:"2",n:"AI"}:ag==="4-8"?{v:"3",n:"AI"}:ag==="9-13"?{v:"4",n:"AI"}:{v:"5",n:"AI"},
    "Vitamin B6":()=>preg?{v:"1.9",n:"RDA"}:lac?{v:"2.0",n:"RDA"}:ag==="1-3"?{v:"0.5",n:"RDA"}:ag==="4-8"?{v:"0.6",n:"RDA"}:ag==="9-13"?{v:"1.0",n:"RDA"}:ag==="14-18"?{v:male?"1.3":"1.2",n:"RDA"}:senior?{v:male?"1.7":"1.5",n:"RDA"}:{v:"1.3",n:"RDA"},
    "Vitamin B7 (Biotin)":()=>preg?{v:"30",n:"AI"}:lac?{v:"35",n:"AI"}:ag==="1-3"?{v:"8",n:"AI"}:ag==="4-8"?{v:"12",n:"AI"}:ag==="9-13"?{v:"20",n:"AI"}:ag==="14-18"?{v:"25",n:"AI"}:{v:"30",n:"AI"},
    "Folate (B9)":()=>preg?{v:"600",n:"RDA — start BEFORE conception!"}:lac?{v:"500",n:"RDA"}:ag==="1-3"?{v:"150",n:"RDA"}:ag==="4-8"?{v:"200",n:"RDA"}:ag==="9-13"?{v:"300",n:"RDA"}:ag==="14-18"?{v:"400",n:"RDA"}:{v:"400",n:female?"RDA — women who may become pregnant: +400 µg folic acid supplement":"RDA"},
    "Vitamin B12 (Cobalamin)":()=>preg?{v:"2.6",n:"RDA"}:lac?{v:"2.8",n:"RDA"}:ag==="1-3"?{v:"0.9",n:"RDA"}:ag==="4-8"?{v:"1.2",n:"RDA"}:ag==="9-13"?{v:"1.8",n:"RDA"}:ag==="14-18"?{v:"2.4",n:"RDA"}:{v:"2.4",n:senior?"RDA — use supplements; absorption declines after 50":diet==="vegan"?"RDA — MUST supplement; no reliable plant sources":"RDA"},
    "Choline":()=>preg?{v:"450",n:"AI"}:lac?{v:"550",n:"AI"}:ag==="1-3"?{v:"200",n:"AI"}:ag==="4-8"?{v:"250",n:"AI"}:ag==="9-13"?{v:"375",n:"AI"}:ag==="14-18"?{v:male?"550":"400",n:"AI"}:{v:male?"550":"425",n:"AI"},
    "Calcium":()=>ag==="1-3"?{v:"700",n:"RDA"}:ag==="4-8"?{v:"1000",n:"RDA"}:(ag==="9-13"||ag==="14-18")?{v:"1300",n:"RDA"}:(senior&&female)||ag==="70+"?{v:"1200",n:"RDA"}:{v:"1000",n:"RDA"},
    "Phosphorus":()=>ag==="1-3"?{v:"460",n:"RDA"}:ag==="4-8"?{v:"500",n:"RDA"}:(teen)?{v:"1250",n:"RDA"}:{v:"700",n:"RDA"},
    "Magnesium":()=>preg?{v:ag==="14-18"?"400":"350",n:"RDA"}:lac?{v:ag==="14-18"?"360":"310",n:"RDA"}:ag==="1-3"?{v:"80",n:"RDA"}:ag==="4-8"?{v:"130",n:"RDA"}:ag==="9-13"?{v:"240",n:"RDA"}:ag==="14-18"?{v:male?"410":"360",n:"RDA"}:ag==="19-30"?{v:male?"400":"310",n:"RDA"}:{v:male?"420":"320",n:"RDA"},
    "Potassium":()=>ag==="1-3"?{v:"2000",n:"AI"}:ag==="4-8"?{v:"2300",n:"AI"}:ag==="9-13"?{v:male?"2500":"2300",n:"AI"}:ag==="14-18"?{v:male?"3000":"2300",n:"AI"}:{v:male?"3400":"2600",n:"AI — most people get far too little"},
    "Sodium":()=>ag==="1-3"?{v:"≤1200",n:"AI 1000; aim under this"}:ag==="4-8"?{v:"≤1500",n:"AI; limit processed foods"}:ag==="51-70"?{v:"≤1300",n:"AI"}:ag==="70+"?{v:"≤1200",n:"AI"}:{v:"1500",n:"AI — most people consume 3400+ mg (dangerous!)"},
    "Iron":()=>preg?{v:"27",n:"RDA"}:lac?{v:ag==="14-18"?"10":"9",n:"RDA"}:ag==="1-3"?{v:"7",n:"RDA"}:ag==="4-8"?{v:"10",n:"RDA"}:ag==="9-13"?{v:"8",n:"RDA"}:ag==="14-18"?{v:male?"11":"15",n:"RDA"}:(senior&&female)?{v:"8",n:"RDA (post-menopausal)"}:{v:male?"8":"18",n:"RDA"+(diet==="vegan"?" — vegans need ~1.8× more; pair with Vit C":"")},
    "Zinc":()=>preg?{v:ag==="14-18"?"12":"11",n:"RDA"}:lac?{v:ag==="14-18"?"13":"12",n:"RDA"}:ag==="1-3"?{v:"3",n:"RDA"}:ag==="4-8"?{v:"5",n:"RDA"}:ag==="9-13"?{v:"8",n:"RDA"}:ag==="14-18"?{v:male?"11":"9",n:"RDA"}:{v:male?"11":"8",n:"RDA"+(diet==="vegan"?" — vegans may need 50% more":"")},
    "Selenium":()=>preg?{v:"60",n:"RDA"}:lac?{v:"70",n:"RDA"}:ag==="1-3"?{v:"20",n:"RDA"}:ag==="4-8"?{v:"30",n:"RDA"}:ag==="9-13"?{v:"40",n:"RDA"}:{v:"55",n:"RDA — 1–2 Brazil nuts daily is all you need"},
    "Iodine":()=>preg?{v:"220",n:"RDA — critical for fetal brain"}:lac?{v:"290",n:"RDA"}:ag==="1-3"?{v:"90",n:"RDA"}:ag==="4-8"?{v:"90",n:"RDA"}:ag==="9-13"?{v:"120",n:"RDA"}:{v:"150",n:"RDA"},
    "Copper":()=>preg?{v:"1000",n:"RDA"}:lac?{v:"1300",n:"RDA"}:ag==="1-3"?{v:"340",n:"RDA"}:ag==="4-8"?{v:"440",n:"RDA"}:ag==="9-13"?{v:"700",n:"RDA"}:ag==="14-18"?{v:"890",n:"RDA"}:{v:"900",n:"RDA"},
    "Manganese":()=>preg?{v:"2.0",n:"AI"}:lac?{v:"2.6",n:"AI"}:ag==="1-3"?{v:"1.2",n:"AI"}:ag==="4-8"?{v:"1.5",n:"AI"}:ag==="9-13"?{v:male?"1.9":"1.6",n:"AI"}:ag==="14-18"?{v:male?"2.2":"1.6",n:"AI"}:{v:male?"2.3":"1.8",n:"AI"},
    "Chromium":()=>preg?{v:ag==="14-18"?"29":"30",n:"AI"}:lac?{v:ag==="14-18"?"44":"45",n:"AI"}:ag==="1-3"?{v:"11",n:"AI"}:ag==="4-8"?{v:"15",n:"AI"}:senior?{v:male?"30":"20",n:"AI"}:ag==="9-13"?{v:male?"25":"21",n:"AI"}:ag==="14-18"?{v:male?"35":"24",n:"AI"}:{v:male?"35":"25",n:"AI"},
    "Protein":()=>{const wt=p.weight||70;const g=athlete?Math.round(wt*1.7):senior?Math.round(wt*1.1):preg?Math.round(wt*0.8)+25:Math.round(wt*0.8);return{v:`~${g}`,n:athlete?"1.4–2.0 g/kg (athlete)":senior?"1.0–1.2 g/kg (muscle preservation)":preg?"RDA 0.8 g/kg + 25 g/day":"RDA 0.8 g/kg body weight"};},
    "Dietary Fiber":()=>ag==="1-3"?{v:"19",n:"AI"}:ag==="4-8"?{v:"25",n:"AI"}:ag==="9-13"?{v:male?"31":"26",n:"AI"}:ag==="14-18"?{v:male?"38":"26",n:"AI"}:preg?{v:"28",n:"AI"}:lac?{v:"29",n:"AI"}:senior?{v:male?"30":"21",n:"AI"}:{v:male?"38":"25",n:"AI — most people get only 10–15 g!"},
    "Omega-3 ALA":()=>preg?{v:"1.4",n:"AI"}:lac?{v:"1.3",n:"AI"}:ag==="1-3"?{v:"0.7",n:"AI"}:ag==="4-8"?{v:"0.9",n:"AI"}:ag==="9-13"?{v:male?"1.2":"1.0",n:"AI"}:ag==="14-18"?{v:male?"1.6":"1.1",n:"AI"}:{v:male?"1.6":"1.1",n:"AI — conversion to EPA/DHA is only ~5–10%"},
    "Omega-3 EPA + DHA":()=>preg?{v:"≥200 DHA",n:"Expert consensus — critical for fetal brain development"}:lac?{v:"200 DHA",n:"Expert consensus"}:{v:"250–500",n:"No official RDA; 1000+ mg/day if heart disease. Algae oil for vegans."},
    "Water (Total Daily)":()=>preg?{v:"3.0",n:"AI (incl. ~20% from food)"}:lac?{v:"3.8",n:"AI"}:ag==="1-3"?{v:"1.3",n:"AI"}:ag==="4-8"?{v:"1.7",n:"AI"}:ag==="9-13"?{v:male?"2.4":"2.1",n:"AI"}:ag==="14-18"?{v:male?"3.3":"2.3",n:"AI"}:{v:male?"3.7":"2.7",n:"AI — increases with heat, exercise & illness"},
    "CoQ10 (Ubiquinol form)":()=>({v:senior?"100–300":"100–200",n:"No official RDA. Ubiquinol > ubiquinone. Statins deplete CoQ10."}),
    "Lutein + Zeaxanthin":()=>({v:"10 + 2",n:"Expert consensus for macular health. No official RDA."}),
    "Lycopene":()=>({v:male?"10–21":"8–10",n:"No official RDA. Cooking tomatoes increases bioavailability."}),
    "Probiotics":()=>({v:"5–10 B CFU",n:"No official RDA. Strain & consistency matter. Look for multi-strain."}),
    "Vitamin D3 + K2 (MK-7) Pair":()=>({v:`D3: ${senior?"20":"15"} µg\nK2: ${senior?"150–360":"90–180"} µg`,n:"Expert consensus — especially important 50+"}),
  };
  const fn=lkp[name];
  return fn?fn():{v:"—",n:""};
}

function getRisks(profile){
  const r=[];
  const {sex,ageGroup:ag,diet,lifestage:ls,activity}=profile;
  const senior=ag==="51-70"||ag==="70+";
  if(diet==="vegan"||diet==="vegetarian") r.push({label:diet==="vegan"?"🌱 Vegan":"🥦 Vegetarian",key:"vegan"});
  if(ls==="pregnant") r.push({label:"🤰 Pregnant",key:"pregnant"});
  if(ls==="lactating") r.push({label:"🤱 Lactating",key:"pregnant"});
  if(senior) r.push({label:"👴👵 Age 50+",key:"senior"});
  if(sex==="female"&&!senior&&ls==="none") r.push({label:"👩 Childbearing Age",key:"female"});
  if(activity==="athlete") r.push({label:"🏃 Athlete",key:"athlete"});
  return r;
}

function StepsBar({step}){
  const labels=["Profile","Lifestyle","Results"];
  return(<>
    <div className="steps-bar">
      {labels.map((_,i)=>(<React.Fragment key={i}>
        {i>0&&<div className={`step-line${step>i?" done":""}`}/>}
        <div className={`step-dot ${step>i+1?"done":step===i+1?"active":"idle"}`}>{step>i+1?"✓":i+1}</div>
      </React.Fragment>))}
    </div>
    <div className="step-labels">
      {labels.map((l,i)=><span key={l} className={`step-label${step===i+1?" active":""}`}>{l}</span>)}
    </div>
  </>);
}

function Pill({options,value,onChange}){
  return(<div className="pill-group">{options.map(o=><button key={o.value} className={`pill${value===o.value?" sel":""}`} onClick={()=>onChange(o.value)}>{o.label}</button>)}</div>);
}

export default function App(){
  const [step,setStep]=useState(1);
  const [open,setOpen]=useState({fat:true,water:true,major:false,trace:false,omega:false,bonus:false});
  const [p,setP]=useState({sex:"male",ageGroup:"19-30",weight:70,lifestage:"none",diet:"omnivore",activity:"moderate"});
  const [weightUnit,setWeightUnit]=useState("lbs");
  const set=k=>v=>setP(prev=>({...prev,[k]:v}));
  const AGE=[{value:"1-3",label:"1–3 yrs"},{value:"4-8",label:"4–8 yrs"},{value:"9-13",label:"9–13 yrs"},{value:"14-18",label:"14–18 yrs"},{value:"19-30",label:"19–30 yrs"},{value:"31-50",label:"31–50 yrs"},{value:"51-70",label:"51–70 yrs"},{value:"70+",label:"70+ yrs"}];
  const isChild=["1-3","4-8","9-13","14-18"].includes(p.ageGroup);
  const risks=getRisks(p);
  const riskKeys=risks.map(r=>r.key);
  const tog=id=>setOpen(o=>({...o,[id]:!o[id]}));

  return(<div className="app">
    <FontLink/>
    <div className="hero">
      <span className="hero-leaf">🌿</span>
      <h1>Optimal Daily Nutrient<br/>Intake Calculator</h1>
      <p className="hero-sub">Personalized recommendations for 40+ essential vitamins, minerals & compounds</p>
      <div className="hero-badges">
        <span className="badge">📚 NIH DRI Data</span>
        <span className="badge">🏛 National Academies</span>
        <span className="badge">🔬 Evidence-Based</span>
      </div>
    </div>

    {step===1&&(<>
      <StepsBar step={1}/>
      <div className="card">
        <div className="card-title">Tell us about yourself</div>
        <div className="card-sub">We use this to personalize your nutrient targets</div>
        <div className="field"><label>Biological Sex</label><Pill options={[{value:"male",label:"♂ Male"},{value:"female",label:"♀ Female"}]} value={p.sex} onChange={set("sex")}/></div>
        <div className="field"><label>Age Group</label><div className="select-wrap"><select value={p.ageGroup} onChange={e=>set("ageGroup")(e.target.value)}>{AGE.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div></div>
        <div className="field">
          <label>Body Weight — used for protein target</label>
          <div className="unit-toggle">
            <button className={`unit-btn${weightUnit==="lbs"?" active":""}`} onClick={()=>setWeightUnit("lbs")}>lbs</button>
            <button className={`unit-btn${weightUnit==="kg"?" active":""}`} onClick={()=>setWeightUnit("kg")}>kg</button>
          </div>
          <input type="number" min={weightUnit==="lbs"?10:5} max={weightUnit==="lbs"?550:250} value={weightUnit==="lbs"?Math.round(p.weight*2.205):p.weight} onChange={e=>{
            const val=Number(e.target.value);
            const kg=weightUnit==="lbs"?Math.round(val/2.205):val;
            setP(prev=>({...prev,weight:kg}));
          }} placeholder={weightUnit==="lbs"?"e.g. 154 lbs":"e.g. 70 kg"}/>
          <div style={{fontSize:14,color:"var(--muted)",marginTop:4}}>{weightUnit==="lbs"?`${Math.round(p.weight*2.205)} lbs = ${p.weight} kg`:`${p.weight} kg = ${Math.round(p.weight*2.205)} lbs`}</div>
        </div>
        {!isChild&&<div className="field"><label>Life Stage</label><Pill options={[{value:"none",label:"Standard"},{value:"pregnant",label:"🤰 Pregnant"},{value:"lactating",label:"🤱 Breastfeeding"}]} value={p.lifestage} onChange={set("lifestage")}/></div>}
        <div className="btn-row"><button className="btn btn-next" onClick={()=>setStep(2)}>Continue →</button></div>
      </div>
    </>)}

    {step===2&&(<>
      <StepsBar step={2}/>
      <div className="card">
        <div className="card-title">Diet & Lifestyle</div>
        <div className="card-sub">Helps us flag nutrients needing extra attention</div>
        <div className="field"><label>Diet Type</label><Pill options={[{value:"omnivore",label:"🍖 Omnivore"},{value:"vegetarian",label:"🥦 Vegetarian"},{value:"vegan",label:"🌱 Vegan"},{value:"pescatarian",label:"🐟 Pescatarian"}]} value={p.diet} onChange={set("diet")}/></div>
        <div className="field"><label>Activity Level</label><Pill options={[{value:"sedentary",label:"🪑 Sedentary"},{value:"light",label:"🚶 Light"},{value:"moderate",label:"🏊 Moderate"},{value:"very_active",label:"💪 Very Active"},{value:"athlete",label:"🏆 Athlete"}]} value={p.activity} onChange={set("activity")}/></div>
        <div className="btn-row">
          <button className="btn btn-back" onClick={()=>setStep(1)}>← Back</button>
          <button className="btn btn-calc" onClick={()=>setStep(3)}>🌿 Calculate My Nutrients</button>
        </div>
      </div>
    </>)}

    {step===3&&(<div className="results-wrap">
      <StepsBar step={3}/>
      <div className="results-hero">
        <h2>Your Personalized Nutrient Plan</h2>
        <p>40+ nutrients tailored to your profile — tap any category to expand</p>
        <div className="profile-chips">
          <span className="profile-chip">{p.sex==="male"?"♂ Male":"♀ Female"}</span>
          <span className="profile-chip">{AGE.find(a=>a.value===p.ageGroup)?.label}</span>
          <span className="profile-chip">{p.weight} kg</span>
          <span className="profile-chip">{p.diet}</span>
          <span className="profile-chip">{p.activity.replace("_"," ")}</span>
          {p.lifestage!=="none"&&<span className="profile-chip">{p.lifestage}</span>}
        </div>
      </div>

      {risks.length>0&&<div className="risk-box">
        <h3>⚠️ Watch These Nutrients for Your Profile</h3>
        <p style={{fontSize:14,color:"#7b241c",lineHeight:1.5}}>Nutrients marked ⚠️ in the tables below are where people in your group are statistically most at risk of deficiency.</p>
        <div className="risk-tags">{risks.map(r=><span key={r.label} className="risk-tag">{r.label}</span>)}</div>
      </div>}

      <div className="tip-box">💡 <strong>AI* = Adequate Intake</strong> (target without full RDA data). <strong>RDA = Recommended Dietary Allowance</strong> (meets 97–98% of healthy people's needs). Always prioritise whole food sources over supplements.</div>

      {CATEGORIES.map(cat=>{
        const isOpen=open[cat.id];
        return(<div className="cat-section" key={cat.id}>
          <div className="cat-header" style={{background:cat.bg}} onClick={()=>tog(cat.id)}>
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-title">{cat.label}</span>
            <span className="cat-count">{cat.nutrients.length} nutrients</span>
            <span className={`cat-chevron${isOpen?" open":""}`}>▾</span>
          </div>
          {isOpen&&<div className="cat-body">
            <div className="col-hdr"><span>Nutrient</span><span>Daily Target</span><span>Best Sources</span></div>
            {cat.nutrients.map(nut=>{
              const rda=getRDA(nut.name,p);
              const isRisk=nut.risk&&nut.risk.some(r=>riskKeys.includes(r));
              return(<div className={`nut-row${isRisk?" risk-nut":""}`} key={nut.name}>
                <div>
                  <div className="nut-name">{isRisk?"⚠️ ":""}{nut.name}</div>
                  <div className="nut-func">{nut.func}</div>
                  {rda.n&&<div className="nut-note">{rda.n}</div>}
                </div>
                <div className="nut-amount">{rda.v} <span className="nut-unit">{nut.unit}</span></div>
                <div className="nut-source">{nut.src}</div>
              </div>);
            })}
          </div>}
        </div>);
      })}

      <div className="disclaimer"><strong>⚕️ Medical Disclaimer:</strong> This tool provides general educational information based on Dietary Reference Intakes (DRIs) from the National Academies of Sciences, Engineering, and Medicine and the NIH Office of Dietary Supplements. Individual requirements vary. This is not a substitute for professional medical advice. Consult a registered dietitian or physician before starting any supplement program.</div>
      <div className="btn-row" style={{justifyContent:"center"}}><button className="btn btn-reset" onClick={()=>{setStep(1);setOpen({fat:true,water:true,major:false,trace:false,omega:false,bonus:false});}}>← Start Over</button></div>
    </div>)}
  </div>);
}
