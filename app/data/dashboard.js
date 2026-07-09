// ---------------------------------------------------------------------------
// Dashboard static config — all biomarker values and scores come from the API.
// ---------------------------------------------------------------------------

export const CATEGORY_TABS = [
  'Blood', 'Genetic', 'Gut', 'Toxins', 'Allergies', 'VO2 Max', 'Cancer', 'Glucose', 'MRI', 'DEXA',
]

// status colour/label map — not mock data, safe to keep
export const STATUS_META = {
  optimal: { label: 'Optimal', color: '#3a9c63' },
  normal:  { label: 'Normal',  color: '#d8a93a' },
  out:     { label: 'Out of Range', color: '#d56aa6' },
}
