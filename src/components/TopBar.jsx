import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      background: 'var(--color-green)',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--color-gold)',
        }} />
        <span style={{ color: 'var(--color-cream)', fontWeight: 600, fontSize: 17 }}>
          {title}
        </span>
      </div>
      <button onClick={handleSignOut} style={{
        background: 'none',
        color: 'rgba(247,244,239,0.6)',
        padding: 6,
        borderRadius: 8,
      }}>
        <LogOut size={18} />
      </button>
    </header>
  )
}
