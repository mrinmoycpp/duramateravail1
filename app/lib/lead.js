export const WEB3FORMS_KEY = '91f3be97-0e87-4c37-9030-f69d28f70f93'

export function emailViaWeb3Forms(subject, data) {
  if (!WEB3FORMS_KEY) return
  const fd = new FormData()
  fd.append('access_key', WEB3FORMS_KEY)
  fd.append('subject', subject)
  fd.append('from_name', 'DuraMater site')
  Object.entries(data).forEach(([k, v]) => fd.append(k, v ?? ''))
  fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd }).catch(() => {})
}

export async function submitLead(data) {
  const kind = data.source === 'waitlist-modal' ? 'waitlist signup' : 'lead'
  const who = data.name || data.email || 'someone'
  emailViaWeb3Forms(`New DuraMater ${kind}: ${who}`, data)

  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
