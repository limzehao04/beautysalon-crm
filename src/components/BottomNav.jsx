import { NavLink } from 'react-router-dom'
import { Users, MessageCircle, Megaphone } from 'lucide-react'

const navItems = [
  { to: '/clients', icon: Users, label: '客人名单' },
  { to: '/followup', icon: MessageCircle, label: '跟进客人' },
  { to: '/promo', icon: Megaphone, label: '发送促销' },
]

export default function BottomNav() {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 64,
      background: 'var(--color-green)',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid var(--color-green-light)',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 0',
            color: isActive ? 'var(--color-gold)' : 'rgba(247,244,239,0.5)',
            transition: 'color 0.2s',
          })}
        >
          <Icon size={22} />
          <span style={{ fontSize: 11, fontWeight: 500 }}>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
