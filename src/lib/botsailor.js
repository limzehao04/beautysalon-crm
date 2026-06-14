const BOTSAILOR_BASE = 'https://app.botsailor.com/api/v1'

function getHeaders() {
  return {
    'Authorization': `Bearer ${import.meta.env.VITE_BOTSAILOR_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function getSubscribers(label = null) {
  const params = new URLSearchParams()
  if (label) params.set('label', label)
  const res = await fetch(`${BOTSAILOR_BASE}/subscribers?${params}`, {
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error('Failed to fetch subscribers')
  return res.json()
}

export async function sendWhatsAppMessage(phone, message) {
  const res = await fetch(`${BOTSAILOR_BASE}/messages/send`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ phone, message }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}

export async function sendBulkMessage(phones, message) {
  const res = await fetch(`${BOTSAILOR_BASE}/messages/bulk`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ phones, message }),
  })
  if (!res.ok) throw new Error('Failed to send bulk message')
  return res.json()
}

export async function verifyWhatsAppNumber(phone, code) {
  const res = await fetch(`${BOTSAILOR_BASE}/verify`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ phone, code }),
  })
  if (!res.ok) throw new Error('Verification failed')
  return res.json()
}
