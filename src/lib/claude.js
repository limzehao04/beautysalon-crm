export async function generatePromoText(salonName, promotion, targetAudience) {
  const res = await fetch('/api/generate-promo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salonName, promotion, targetAudience }),
  })
  if (!res.ok) throw new Error('Failed to generate promo text')
  return res.json()
}
