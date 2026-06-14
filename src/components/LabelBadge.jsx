const LABEL_STYLES = {
  VIP: { bg: '#D4AF70', color: '#1C2B25' },
  新客: { bg: '#2D4A3E', color: '#F7F4EF' },
  跟进中: { bg: '#3D5A50', color: '#F7F4EF' },
  流失客: { bg: '#6B7C74', color: '#F7F4EF' },
}

export default function LabelBadge({ label }) {
  const style = LABEL_STYLES[label] || { bg: '#EDE8E0', color: '#1C2B25' }
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 20,
      letterSpacing: '0.3px',
    }}>
      {label}
    </span>
  )
}
