export default function TopBar({ title }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      background: 'var(--color-green)',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      zIndex: 50,
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--color-gold)',
      }} />
      <span style={{ color: 'var(--color-cream)', fontWeight: 600, fontSize: 17 }}>
        {title}
      </span>
    </header>
  )
}
