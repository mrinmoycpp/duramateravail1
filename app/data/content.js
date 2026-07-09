// ---------------------------------------------------------------------------
// Central content for the DuraMater landing page.
// Design follows the live prototype; copy/numbers follow the supplied
// screenshots (₹10,800 pricing, 120+ markers, custom comparison + FAQs).
// ---------------------------------------------------------------------------

export const BRAND = {
  wordmark: 'duramater',     // lowercase logo
  display: 'DuraMater',      // camelCase display text
  markers: '120+',
  pricePerYear: '₹10,800',
  pricePerDay: '₹30',
}

// Matches hundred.com's live nav exactly (4 links + Start Testing CTA).
export const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Test', href: '#what-we-test' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQs', href: '#faqs' },
]
// --- "How it works" 5-card carousel (designed card images) ----------------
export const HIW_CARDS = [
  {
    n: 1,
    title: '100+ Biomarker Testing',
    body: 'Comprehensive testing of 100+ biomarkers for deep health insights, mapping your entire internal ecosystem.',
    img: '/assets/hiw/card1.png',
  },
  {
    n: 2,
    title: 'Organ-wise Disease Risk',
    body: 'Personalized risk analysis for major organ systems, allowing for targeted and preemptive interventions.',
    img: '/assets/hiw/card2.png',
  },
  {
    n: 3,
    title: 'Biological Age Calculation',
    body: 'Understand your true biological age, not just your chronological years, through advanced methylation analysis.',
    img: '/assets/hiw/card3.png',
  },
  {
    n: 4,
    title: 'Overall Health Score',
    body: 'A single, powerful score to track your total health trajectory over time, updated with every clinical visit.',
    img: '/assets/hiw/card4.png',
  },
  {
    n: 5,
    title: 'Medical Records History',
    body: 'A secure, comprehensive timeline of your health data and medical records, accessible anytime for you and your healthcare providers.',
    img: '/assets/hiw/card5.png',
  },
]

// --- "What we test" category cards ---------------------------------------
export const TEST_CATEGORIES = [
  {
    key: 'heart',
    name: 'Heart Health',
    markers: 19,
    texture: '/assets/textures/heart.png',
    chips: ['Apolipoprotein B (ApoB)', 'LDL Cholesterol', 'HDL Cholesterol', 'Total Cholesterol', 'Triglycerides', 'Lipoprotein (a)', 'hs-CRP'],
    more: 12,
    why: 'cardiovascular markers are the highest-recognition category.',
  },
  {
    key: 'metabolic',
    name: 'Metabolic Health',
    markers: 15,
    texture: '/assets/textures/metabolic.png',
    chips: ['Glucose', 'Hemoglobin A1c (HbA1c)', 'Insulin', 'Leptin', 'TyG Index', 'HOMA-IR'],
    more: 9,
    why: 'insulin resistance / metabolic health resonates with a huge population.',
  },
  {
    key: 'hormones',
    name: 'Hormones',
    markers: 18,
    texture: '/assets/textures/hormones.png',
    chips: ['Testosterone, Total', 'Testosterone, Free', 'Estradiol', 'Progesterone', 'Prolactin', 'SHBG', 'Cortisol'],
    more: 11,
    why: 'hormone optimisation is a massive consumer interest driver.',
  },
  {
    key: 'thyroid',
    name: 'Thyroid',
    markers: 8,
    texture: '/assets/textures/thyroid.webp',
    chips: ['TSH', 'Free T4', 'Free T3', 'T4 Total'],
    more: 4,
    why: 'thyroid disorders are widespread and badly underdiagnosed.',
  },
  {
    key: 'kidney',
    name: 'Kidney & Electrolytes',
    markers: 14,
    texture: '/assets/textures/kidney.webp',
    tint: true, // CSS dark-blue tint over the reused texture
    chips: ['Creatinine', 'eGFR', 'BUN', 'BUN/Creatinine', 'Uric Acid', 'Sodium', 'Potassium'],
    more: 7,
    why: 'kidney markers increase credibility and clinical seriousness.',
  },
]

// --- "What we test" detailed accordion -----------------------------------
export const TEST_DETAIL = [
  {
    group: 'Primary Test Panels',
    markers: [
      'Cholesterol-Total, Serum',
      'HDL Cholesterol Direct',
      'LDL Cholesterol Direct',
      'Triglycerides, Serum',
      'Non-HDL Cholesterol, Serum',
      'VLDL',
      'LDL/HDL Ratio',
      'CHOL/HDL Ratio',
      'HDL/LDL Cholesterol Ratio',
      'Albumin, Serum',
      'Alkaline Phosphatase, Serum',
      'Bilirubin Direct, Serum',
      'Bilirubin Total, Serum',
      'GGTP (Gamma GT)',
      'Proteins, Serum',
      'SGOT/AST',
      'SGPT/ALT',
      'Bilirubin Indirect, Serum',
      'Globulin',
      'A/G Ratio',
      'SGOT/SGPT Ratio',
      'T3, Total Triiodothyronine',
      'T4, Total Thyroxine',
      'TSH Ultra-Sensitive',
      'Iron, Serum',
      'TIBC',
      'UIBC, Serum',
      'Transferrin Saturation',
      'BUN Urea Nitrogen, Serum',
      'Calcium Total, Serum',
      'Chlorides, Serum',
      'Creatinine, Serum',
      'Phosphorus-Inorganic, Serum',
      'Sodium, Serum',
      'Urea, Serum',
      'Uric Acid, Serum',
      'BUN/Creatinine Ratio',
      'Urea/Creatinine Ratio',
      'EGFR',
      'Glycated Hemoglobin (HbA1c)',
      'Average blood glucose',
      'pH Urine',
      'Specific gravity',
      'Urobilinogen',
      'Colour',
      'Transparency',
      'Sugar',
      'Blood',
      'Red Blood Cells',
      'Pus cells (Leukocytes)',
      'Epithelial cells',
      'Crystals',
      'Cast',
      'Bacteria',
      'Yeast Cells',
      'Nitrate',
      'Urine Ketone',
      'Urine Protein',
      'Leucocyte Esterase',
      'Bile Pigments (Bilirubin)',
      'Others - Urine',
      'Volume - Urine',
      'Apolipoproteins A1, Serum',
      'Apolipoproteins B, Serum',
      'Apolipoproteins B/A1, Serum (Apolipoproteins B, A1, B/A1 Ratio)',
      'Absolute Basophils Count, Blood',
      'Absolute Eosinophil Count, Blood',
      'Absolute Lymphocyte Count, Blood',
      'Absolute Monocyte Count, Blood',
      'Absolute Neutrophil Count, Blood',
      'Hemoglobin Hb',
      'MCH',
      'MCHC',
      'MCV',
      'MPV Mean Platelet Volume',
      'PCV Haematocrit',
      'Platelet Count Thrombocyte count',
      'WBC-Total Counts Leucocytes',
      'RDW (Red Cell Distribution Width)',
      'Neutrophils',
      'Eosinophils',
      'Lymphocytes',
      'Monocytes',
      'Basophils',
      'RDW-CV',
      'MENTZER INDEX 9MCV/RCC',
      'Red Blood Cells - Blood',
      'RDWI',
      'GK Index',
      'NLR (Neutrophil Lymphocyte Ratio)',
      'PLR (Platelet Lymphocyte Ratio)',
    ],
  },
  {
    group: 'Standalone Markers',
    markers: [
      'RA Test Rheumatoid Arthritis Factor, Quantitative',
      'Amylase Enzymatic, Serum',
      'CA-125 (Ovarian Cancer Marker Test)',
      'CA-15.3 (Breast Cancer Marker Test)',
      'CA-19.9 (Pancreatic Cancer Marker Test)',
      'CEA-Carcino Embryonic Antigen (Colorectal Cancer Marker Test)',
      'CPK, Total',
      'CRP (C Reactive Protein) Quantitative, Serum',
      'ESR Automated',
      'Ferritin',
      'FSH-Follicle Stimulating Hormone',
      'Blood Glucose Fasting',
      'Hepatitis B Virus (HBV) HbsAg-Screening Surface Antigen',
      'Homocysteine',
      'hs-CRP High Sensitivity CRP',
      'LH-Luteinizing Hormone',
      'Lipase, Serum',
      'Magnesium, Serum',
      'Potassium, Serum',
      'Vitamin B12 Cyanocobalamin',
      'Vitamin D Total-25 Hydroxy',
    ],
  },
  {
    group: 'Additional Markers',
    markers: [
      'Lipoprotein (a)',
      'Bicarbonate',
      'Cystatin-C',
      'Folate',
      'Anti TPO Antibodies',
      'Free T3 & Free T4*',
      'Fasting Insulin',
      'Fasting C peptide',
      'Parathyroid hormone (PTH)',
      'Urine albumin protein/creatinine ratio',
      'Anti-HCV Test',
      'HIV 1 and 2 Test',
      'VDRL Test',
      'Total Testosterone',
      'Sex hormone binding globulin',
      'Estradiol [E2]',
    ],
  },
  {
    group: 'Optional Marker',
    markers: ['PSA Total Test & PSA free only in male above 40'],
  },
]

// --- Membership ----------------------------------------------------------
export const MEMBERSHIP_FEATURES = [
  '120+ advanced blood markers tested',
  'Organ health scores (Heart, Liver, Kidney, Brain, Hormones, and more)',
  'Biological Age calculation',
  'Personalised 100-day action plan (diet, lifestyle, supplements)',
  'Doctor review on every report',
  'Lifetime health data storage — all your results, forever',
  'Upload and integrate past lab reports',
  'Home blood collection available',
  'NABL-accredited partner labs',
  'DPDP-compliant data privacy — your data is never sold',
]
export const PRESS = ['Liver Dysfunction', 'Type 2 Diabetes', 'Pre-diabetes', 'Heart Disease', 'High Cholesterol', 'Fatty Liver (NAFLD)', 'Thyroid Disorders', 'Anaemia']
// --- Comparison table ----------------------------------------------------
export const COMPARISON = {
  columns: ['DuraMater', 'Local Lab (NABL)', 'Private Doctor Checkup'],
  rows: [
    { feature: 'Tests included', values: ['120+ markers', '40–60 tests', '5–10 basic tests'] },
    { feature: 'Organ scores', values: ['Yes', 'No', 'No'] },
    { feature: 'Doctor review', values: ['Yes — every report', 'No', 'Only at visit'] },
    { feature: 'Personalised plan', values: ['100-day plan', 'No', 'Generic advice'] },
    { feature: 'Lifetime data', values: ['Yes', 'PDF only', 'Paper records'] },
    { feature: 'Annual cost', values: ['₹10,800', '₹7,000–8,000 (tests only)', '₹20,000–50,000'] },
  ],
}

// --- FAQ -----------------------------------------------------------------
export const FAQS = [
  {
    q: 'Is this a replacement for my doctor?',
    a: 'No — and we want to be clear about this. DuraMater provides risk scores and preventive insights based on your blood markers. We work alongside your doctor, not instead of them. Every report is reviewed by a certified MBBS/MD doctor, and we flag anything that needs urgent follow-up.',
  },
  {
    q: 'Is my health data safe and private?',
    a: "Yes. DuraMater is compliant with India's Digital Personal Data Protection (DPDP) Act 2023. Your health data is encrypted, stored securely, and never sold or shared with third parties without your explicit consent. You own your data.",
  },
  {
    q: 'Which lab collects my blood?',
    a: 'We partner with NABL-accredited laboratories. Home collection is available in select cities — a trained phlebotomist comes to you.',
  },
  {
    q: 'When will I get my results?',
    a: 'Results are typically delivered within 72 hours of sample collection.',
  },
  {
    q: 'Can I share my DuraMater report with my family doctor?',
    a: 'Yes. You can download a clean PDF of your full report at any time and share it with any doctor.',
  },
  {
    q: 'I already got a health checkup through my company. Why do I need DuraMater?',
    a: 'Corporate health checkups typically test 50–60 basic markers and give you a PDF with no context. DuraMater runs 120+ markers, gives every organ a score from 0–100, explains what each result means, and builds a personalised plan — all from one blood draw.',
  },
]

// --- Crisis chart --------------------------------------------------------
// Values in crore (Cr). 4 series per condition.
// series order: yetToBeFound, knownCases, annualDeaths, burdenWithDuraMater
export const CHART = {
  yMax: 30,
  ticks: [0, 6, 12, 18, 24, 30],
  legend: [
    { key: 'yet', label: 'Yet to be found' },
    { key: 'known', label: 'Known cases' },
    { key: 'deaths', label: 'Annual deaths' },
    { key: 'burden', label: 'Burden with DuraMater' },
  ],
  groups: {
    '30+': [
      { label: 'Heart Disease', yet: 8.5, known: 6.0, deaths: 2.8, burden: 1.2 },
      { label: 'Respiratory', yet: 7.0, known: 5.0, deaths: 1.5, burden: 0.9 },
      { label: 'Diabetes', yet: 14.0, known: 10.1, deaths: 1.6, burden: 2.0 },
      { label: 'Kidney', yet: 5.5, known: 3.2, deaths: 0.9, burden: 0.6 },
      { label: 'Liver (NAFLD)', yet: 13.0, known: 9.0, deaths: 1.1, burden: 1.5 },
      { label: 'Stroke', yet: 2.6, known: 1.8, deaths: 0.7, burden: 0.3 },
    ],
    '18-30': [
      { label: 'Heart Disease', yet: 3.2, known: 1.4, deaths: 0.5, burden: 0.4 },
      { label: 'Respiratory', yet: 3.8, known: 2.1, deaths: 0.4, burden: 0.5 },
      { label: 'Diabetes', yet: 6.5, known: 2.8, deaths: 0.3, burden: 0.9 },
      { label: 'Kidney', yet: 2.0, known: 0.9, deaths: 0.2, burden: 0.25 },
      { label: 'Liver (NAFLD)', yet: 7.5, known: 3.0, deaths: 0.3, burden: 0.9 },
      { label: 'Stroke', yet: 1.0, known: 0.5, deaths: 0.15, burden: 0.1 },
    ],
  },
}

export const STAT_PILLS = [
  { icon: '', text: '1 Indian dies of heart disease every 33 seconds', src: 'Indian Heart Association' },
  { icon: '', text: '1 in 4 Indians has diabetes or pre-diabetes', src: 'ICMR-INDIAB 2023' },
  { icon: '', text: 'Most are discovered too late, or not at all', src: '' },
]

// --- Press strip (placeholder Indian outlets — swap for real coverage) ----

// --- Conditions we detect ------------------------------------------------
export const CONDITIONS = [
  'Type 2 Diabetes', 'Pre-diabetes', 'Heart Disease', 'High Cholesterol', 'Fatty Liver (NAFLD)',
  'Thyroid Disorders', 'Chronic Kidney Disease', 'PCOS', 'Hormonal Imbalance', 'Anaemia',
  'Vitamin D Deficiency', 'Vitamin B12 Deficiency', 'Metabolic Syndrome', 'Insulin Resistance',
  'Inflammation', 'Gout / High Uric Acid', 'Cardiovascular Risk', 'Iron Overload',
  'Liver Dysfunction', 'Electrolyte Imbalance',
]

// --- Medical team (placeholder clinicians — replace with real team) -------
export const TEAM = [
  { name: 'Dr. Ananya Rao', role: 'Chief Medical Officer', cred: 'MD, Internal Medicine', initials: 'AR' },
  { name: 'Dr. Vikram Menon', role: 'Cardiology Lead', cred: 'DM, Cardiology', initials: 'VM' },
  { name: 'Dr. Priya Nair', role: 'Endocrinology', cred: 'DM, Endocrinology', initials: 'PN' },
  { name: 'Dr. Arjun Kapoor', role: 'Preventive Health', cred: 'MD, Community Medicine', initials: 'AK' },
]
export const TEAM_INSTITUTES = ['AIIMS', 'PGIMER', 'CMC Vellore', 'NIMHANS', 'Apollo']
