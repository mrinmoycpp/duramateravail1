const fs = require('fs')
const path = require('path')
const { PDFParse } = require('pdf-parse')

const BIOMARKER_PATTERNS = [
  { name: 'Total Cholesterol', aliases: ['total cholesterol', 'cholesterol total', 'serum cholesterol'], unit: 'mg/dL', category: 'LIPID_PANEL', refMin: 0, refMax: 200 },
  { name: 'LDL Cholesterol', aliases: ['ldl cholesterol', 'ldl', 'low density lipoprotein', 'vldl'], unit: 'mg/dL', category: 'LIPID_PANEL', refMin: 0, refMax: 130 },
  { name: 'HDL Cholesterol', aliases: ['hdl cholesterol', 'hdl', 'high density lipoprotein'], unit: 'mg/dL', category: 'LIPID_PANEL', refMin: 40, refMax: 60 },
  { name: 'Triglycerides', aliases: ['triglycerides', 'triglyceride', 'tg'], unit: 'mg/dL', category: 'LIPID_PANEL', refMin: 0, refMax: 150 },
  { name: 'Hemoglobin', aliases: ['hemoglobin', 'haemoglobin', 'hb', 'hgb'], unit: 'g/dL', category: 'CBC', refMin: 12, refMax: 17.5 },
  { name: 'Hematocrit', aliases: ['hematocrit', 'haematocrit', 'hct', 'packed cell volume', 'pcv'], unit: '%', category: 'CBC', refMin: 36, refMax: 50 },
  { name: 'RBC Count', aliases: ['rbc', 'red blood cell', 'red cell count', 'erythrocyte'], unit: 'million/uL', category: 'CBC', refMin: 4.5, refMax: 5.5 },
  { name: 'WBC Count', aliases: ['wbc', 'white blood cell', 'leucocyte', 'total leucocyte', 'tlc', 'total count'], unit: 'cells/uL', category: 'CBC', refMin: 4000, refMax: 11000 },
  { name: 'Platelet Count', aliases: ['platelet', 'platelets', 'plt'], unit: 'lakhs/uL', category: 'CBC', refMin: 1.5, refMax: 4.0 },
  { name: 'MCV', aliases: ['mcv', 'mean corpuscular volume'], unit: 'fL', category: 'CBC', refMin: 80, refMax: 100 },
  { name: 'MCH', aliases: ['mch', 'mean corpuscular hemoglobin'], unit: 'pg', category: 'CBC', refMin: 27, refMax: 32 },
  { name: 'MCHC', aliases: ['mchc'], unit: 'g/dL', category: 'CBC', refMin: 32, refMax: 36 },
  { name: 'RDW', aliases: ['rdw', 'red cell distribution'], unit: '%', category: 'CBC', refMin: 11.5, refMax: 14.5 },
  { name: 'MPV', aliases: ['mpv', 'mean platelet volume'], unit: 'fL', category: 'CBC', refMin: 7.5, refMax: 11.5 },
  { name: 'Neutrophils', aliases: ['neutrophils', 'neutrophil', 'neutrophil count', 'neutrophil %'], unit: '%', category: 'CBC', refMin: 40, refMax: 70 },
  { name: 'Lymphocytes', aliases: ['lymphocytes', 'lymphocyte', 'lymphocyte count', 'lymphocyte %'], unit: '%', category: 'CBC', refMin: 20, refMax: 40 },
  { name: 'Monocytes', aliases: ['monocytes', 'monocyte', 'monocyte count', 'monocyte %'], unit: '%', category: 'CBC', refMin: 2, refMax: 8 },
  { name: 'Eosinophils', aliases: ['eosinophils', 'eosinophil', 'eosinophil count', 'eosinophil %'], unit: '%', category: 'CBC', refMin: 1, refMax: 6 },
  { name: 'Basophils', aliases: ['basophils', 'basophil', 'basophil count', 'basophil %'], unit: '%', category: 'CBC', refMin: 0, refMax: 2 },
  { name: 'Ferritin', aliases: ['ferritin'], unit: 'ng/mL', category: 'VITAMINS', refMin: 12, refMax: 300 },
  { name: 'Vitamin D', aliases: ['vitamin d', '25-hydroxyvitamin d', '25 oh vitamin d', 'calcidiol', 'vit d'], unit: 'ng/mL', category: 'VITAMINS', refMin: 30, refMax: 100 },
  { name: 'Vitamin B12', aliases: ['vitamin b12', 'b12', 'cobalamin'], unit: 'pg/mL', category: 'VITAMINS', refMin: 200, refMax: 900 },
  { name: 'Folate', aliases: ['folate', 'folic acid', 'vitamin b9'], unit: 'ng/mL', category: 'VITAMINS', refMin: 3, refMax: 17 },
  { name: 'Iron', aliases: ['serum iron', 'iron'], unit: 'ug/dL', category: 'VITAMINS', refMin: 60, refMax: 170 },
  { name: 'TSH', aliases: ['tsh', 'thyroid stimulating hormone'], unit: 'uIU/mL', category: 'THYROID', refMin: 0.4, refMax: 4.0 },
  { name: 'Free T3', aliases: ['ft3', 'free t3'], unit: 'pg/mL', category: 'THYROID', refMin: 2.3, refMax: 4.2 },
  { name: 'Free T4', aliases: ['ft4', 'free t4'], unit: 'ng/dL', category: 'THYROID', refMin: 0.9, refMax: 1.7 },
  { name: 'Total T3', aliases: ['total t3', 't3'], unit: 'ng/dL', category: 'THYROID', refMin: 80, refMax: 200 },
  { name: 'Total T4', aliases: ['total t4', 't4', 'thyroxine'], unit: 'ug/dL', category: 'THYROID', refMin: 5.1, refMax: 14.1 },
  { name: 'Glucose', aliases: ['glucose', 'blood glucose', 'fasting glucose', 'fasting blood sugar', 'fbs', 'rbs', 'random blood sugar', 'sugar'], unit: 'mg/dL', category: 'METABOLIC', refMin: 70, refMax: 100 },
  { name: 'HbA1c', aliases: ['hba1c', 'glycated hemoglobin', 'a1c'], unit: '%', category: 'METABOLIC', refMin: 4, refMax: 5.7 },
  { name: 'Insulin', aliases: ['insulin', 'serum insulin', 'fasting insulin'], unit: 'uIU/mL', category: 'METABOLIC', refMin: 2, refMax: 25 },
  { name: 'Uric Acid', aliases: ['uric acid', 'serum uric acid'], unit: 'mg/dL', category: 'METABOLIC', refMin: 3.5, refMax: 7.0 },
  { name: 'Creatinine', aliases: ['creatinine', 'serum creatinine', 's. creatinine'], unit: 'mg/dL', category: 'KIDNEY_FUNCTION', refMin: 0.6, refMax: 1.2 },
  { name: 'BUN', aliases: ['bun', 'blood urea nitrogen', 'urea nitrogen'], unit: 'mg/dL', category: 'KIDNEY_FUNCTION', refMin: 7, refMax: 20 },
  { name: 'Blood Urea', aliases: ['blood urea', 'urea', 's. urea', 'serum urea'], unit: 'mg/dL', category: 'KIDNEY_FUNCTION', refMin: 15, refMax: 40 },
  { name: 'eGFR', aliases: ['egfr', 'estimated gfr'], unit: 'mL/min/1.73m2', category: 'KIDNEY_FUNCTION', refMin: 90, refMax: 999 },
  { name: 'Sodium', aliases: ['sodium', 'na+'], unit: 'mEq/L', category: 'ELECTROLYTES', refMin: 136, refMax: 145 },
  { name: 'Potassium', aliases: ['potassium', 'k+'], unit: 'mEq/L', category: 'ELECTROLYTES', refMin: 3.5, refMax: 5.0 },
  { name: 'Chloride', aliases: ['chloride', 'cl-'], unit: 'mEq/L', category: 'ELECTROLYTES', refMin: 98, refMax: 106 },
  { name: 'Calcium', aliases: ['calcium', 'serum calcium', 'total calcium'], unit: 'mg/dL', category: 'ELECTROLYTES', refMin: 8.5, refMax: 10.5 },
  { name: 'Phosphorus', aliases: ['phosphorus', 'phosphate'], unit: 'mg/dL', category: 'ELECTROLYTES', refMin: 2.5, refMax: 4.5 },
  { name: 'Magnesium', aliases: ['magnesium', 'serum magnesium'], unit: 'mg/dL', category: 'ELECTROLYTES', refMin: 1.7, refMax: 2.2 },
  { name: 'ALT', aliases: ['alt', 'sgpt', 'alanine aminotransferase'], unit: 'U/L', category: 'LIVER_FUNCTION', refMin: 7, refMax: 56 },
  { name: 'AST', aliases: ['ast', 'sgot', 'aspartate aminotransferase'], unit: 'U/L', category: 'LIVER_FUNCTION', refMin: 10, refMax: 40 },
  { name: 'ALP', aliases: ['alp', 'alkaline phosphatase'], unit: 'U/L', category: 'LIVER_FUNCTION', refMin: 44, refMax: 147 },
  { name: 'GGT', aliases: ['ggt', 'gamma glutamyl', 'gamma gt'], unit: 'U/L', category: 'LIVER_FUNCTION', refMin: 9, refMax: 48 },
  { name: 'Bilirubin Total', aliases: ['bilirubin total', 'total bilirubin', 's. bilirubin'], unit: 'mg/dL', category: 'LIVER_FUNCTION', refMin: 0.1, refMax: 1.2 },
  { name: 'Direct Bilirubin', aliases: ['direct bilirubin', 'conjugated bilirubin'], unit: 'mg/dL', category: 'LIVER_FUNCTION', refMin: 0, refMax: 0.3 },
  { name: 'Total Protein', aliases: ['total protein', 'serum total protein'], unit: 'g/dL', category: 'LIVER_FUNCTION', refMin: 6.0, refMax: 8.3 },
  { name: 'Albumin', aliases: ['albumin', 'serum albumin'], unit: 'g/dL', category: 'LIVER_FUNCTION', refMin: 3.5, refMax: 5.0 },
  { name: 'Globulin', aliases: ['globulin'], unit: 'g/dL', category: 'LIVER_FUNCTION', refMin: 2.0, refMax: 3.5 },
  { name: 'A/G Ratio', aliases: ['a/g ratio', 'albumin globulin ratio'], unit: '', category: 'LIVER_FUNCTION', refMin: 1.1, refMax: 2.0 },
  { name: 'CRP', aliases: ['crp', 'c-reactive protein', 'hs-crp'], unit: 'mg/L', category: 'INFLAMMATION', refMin: 0, refMax: 3.0 },
  { name: 'ESR', aliases: ['esr', 'erythrocyte sedimentation'], unit: 'mm/hr', category: 'INFLAMMATION', refMin: 0, refMax: 20 },
  { name: 'Homocysteine', aliases: ['homocysteine'], unit: 'umol/L', category: 'INFLAMMATION', refMin: 5, refMax: 15 },
  { name: 'Testosterone', aliases: ['testosterone', 'total testosterone'], unit: 'ng/dL', category: 'HORMONES', refMin: 300, refMax: 1000 },
  { name: 'Estradiol', aliases: ['estradiol', 'e2'], unit: 'pg/mL', category: 'HORMONES', refMin: 20, refMax: 250 },
  { name: 'PSA', aliases: ['psa', 'prostate specific antigen'], unit: 'ng/mL', category: 'TUMOR_MARKERS', refMin: 0, refMax: 4.0 },
  { name: 'AFP', aliases: ['afp', 'alpha fetoprotein'], unit: 'ng/mL', category: 'TUMOR_MARKERS', refMin: 0, refMax: 10 },
  { name: 'CEA', aliases: ['cea', 'carcinoembryonic antigen'], unit: 'ng/mL', category: 'TUMOR_MARKERS', refMin: 0, refMax: 3.0 },
]

function parseBiomarkersFromText(text) {
  const results = []
  const lines = text.split('\n')
  for (const pattern of BIOMARKER_PATTERNS) {
    let value = null
    for (const alias of pattern.aliases) {
      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const tablePattern = new RegExp(escapedAlias + '[\\s:|]+(-?\\d+\\.?\\d*)', 'i')
      const tableMatch = text.match(tablePattern)
      if (tableMatch) { value = parseFloat(tableMatch[1]); break }
      const linePattern = new RegExp(escapedAlias + '[^\\d]*?(\\d+\\.?\\d*)', 'i')
      for (const line of lines) {
        const lineMatch = line.toLowerCase().match(linePattern)
        if (lineMatch) { value = parseFloat(lineMatch[1]); break }
      }
      if (value !== null) break
    }
    if (value !== null && !isNaN(value)) {
      let status = 'NORMAL'
      if (value > pattern.refMax) status = value > pattern.refMax * 2 ? 'CRITICAL_HIGH' : 'HIGH'
      else if (value < pattern.refMin) status = value < pattern.refMin * 0.5 ? 'CRITICAL_LOW' : 'LOW'
      results.push({ rawName: pattern.name, parsedValue: value, unit: pattern.unit, status, appliedRefMin: pattern.refMin, appliedRefMax: pattern.refMax, biomarkerDefinition: { category: pattern.category } })
    }
  }
  return results
}

function computeHealthScores(biomarkers) {
  const scores = {}, counts = {}
  for (const b of biomarkers) {
    const cat = b.biomarkerDefinition?.category
    if (!cat) continue
    if (!scores[cat]) { scores[cat] = 0; counts[cat] = 0 }
    counts[cat]++
    if (b.status === 'NORMAL') scores[cat] += 100
    else if (b.status === 'HIGH' || b.status === 'LOW') scores[cat] += 60
    else scores[cat] += 20
  }
  const result = []
  for (const [cat, total] of Object.entries(scores)) {
    const avg = Math.round(total / counts[cat])
    result.push({ category: cat, score: avg, summary: `${cat.replace(/_/g, ' ').toLowerCase()} score: ${avg}/100` })
  }
  const overallScore = result.length > 0 ? Math.round(result.reduce((s, r) => s + r.score, 0) / result.length) : null
  if (overallScore !== null) result.unshift({ category: 'OVERALL', score: overallScore, summary: `Overall wellness score: ${overallScore}/100` })
  return result
}

async function main() {
  const filePath = process.argv[2]
  if (!filePath || !fs.existsSync(filePath)) {
    console.log(JSON.stringify({ error: 'File not found' }))
    process.exit(1)
  }

  const buffer = fs.readFileSync(filePath)
  const parser = new PDFParse({ data: buffer })
  await parser.load()
  const textResult = await parser.getText()
  await parser.destroy()
  const text = textResult?.text || ''

  const biomarkers = parseBiomarkersFromText(text)
  const healthScores = computeHealthScores(biomarkers)
  const riskFlags = biomarkers
    .filter(b => b.status !== 'NORMAL')
    .slice(0, 5)
    .map(b => ({
      biomarkerName: b.rawName,
      value: b.parsedValue,
      status: b.status,
      referenceRange: `${b.appliedRefMin} - ${b.appliedRefMax} ${b.unit}`,
    }))

  console.log(JSON.stringify({ biomarkers, healthScores, riskFlags }))
}

main().catch(err => {
  console.log(JSON.stringify({ error: err.message }))
  process.exit(1)
})
