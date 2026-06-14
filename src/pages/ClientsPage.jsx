import { useState, useEffect } from 'react'
import { Search, RefreshCw, Phone } from 'lucide-react'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import LabelBadge from '../components/LabelBadge'
import toast from 'react-hot-toast'

const LABELS = ['全部', 'VIP', '新客', '跟进中', '流失客']

// Mock data for UI development
const MOCK_CLIENTS = [
  { id: 1, name: '林美玲', phone: '+60122345678', label: 'VIP', last_visit: '2026-06-10' },
  { id: 2, name: '黄晓芳', phone: '+60133456789', label: '新客', last_visit: '2026-06-12' },
  { id: 3, name: '陈淑华', phone: '+60144567890', label: '跟进中', last_visit: '2026-05-20' },
  { id: 4, name: '张雪莲', phone: '+60155678901', label: 'VIP', last_visit: '2026-06-08' },
  { id: 5, name: '李珊珊', phone: '+60166789012', label: '流失客', last_visit: '2026-03-15' },
  { id: 6, name: 'Nurul Ain', phone: '+60177890123', label: '新客', last_visit: '2026-06-13' },
  { id: 7, name: 'Siti Rahmah', phone: '+60188901234', label: '跟进中', last_visit: '2026-05-28' },
]

export default function ClientsPage() {
  const [clients, setClients] = useState(MOCK_CLIENTS)
  const [activeLabel, setActiveLabel] = useState('全部')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = clients.filter(c => {
    const matchLabel = activeLabel === '全部' || c.label === activeLabel
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    return matchLabel && matchSearch
  })

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    toast.success('已更新客人名单')
  }

  const labelCounts = LABELS.reduce((acc, l) => {
    acc[l] = l === '全部' ? clients.length : clients.filter(c => c.label === l).length
    return acc
  }, {})

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="客人名单" />

      {/* Search + Refresh */}
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--color-white)',
          borderRadius: 12,
          padding: '10px 14px',
          border: '1.5px solid var(--color-cream-dark)',
        }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索客人名字或号码..."
            style={{ flex: 1, border: 'none', background: 'none', fontSize: 14, color: 'var(--color-text)' }}
          />
        </div>
        <button
          onClick={handleRefresh}
          style={{
            background: 'var(--color-green)',
            color: 'var(--color-cream)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
        </button>
      </div>

      {/* Label Filter */}
      <div style={{
        display: 'flex',
        gap: 8,
        padding: '12px 16px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {LABELS.map(label => (
          <button
            key={label}
            onClick={() => setActiveLabel(label)}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              background: activeLabel === label ? 'var(--color-green)' : 'var(--color-white)',
              color: activeLabel === label ? 'var(--color-cream)' : 'var(--color-text-muted)',
              border: `1.5px solid ${activeLabel === label ? 'var(--color-green)' : 'var(--color-cream-dark)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {label}
            <span style={{
              background: activeLabel === label ? 'rgba(247,244,239,0.2)' : 'var(--color-cream-dark)',
              borderRadius: 10,
              padding: '1px 6px',
              fontSize: 11,
              fontWeight: 600,
            }}>
              {labelCounts[label]}
            </span>
          </button>
        ))}
      </div>

      {/* Client List */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
            没有找到客人
          </div>
        ) : (
          filtered.map(client => (
            <div key={client.id} style={{
              background: 'var(--color-white)',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 1px 4px rgba(28,43,37,0.06)',
            }}>
              {/* Avatar */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--color-cream-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--color-green)',
                flexShrink: 0,
              }}>
                {client.name[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{client.name}</span>
                  <LabelBadge label={client.label} />
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{client.phone}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 2 }}>
                  上次到访：{client.last_visit}
                </p>
              </div>

              {/* Call Icon */}
              <a href={`tel:${client.phone}`} style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--color-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-green)',
              }}>
                <Phone size={16} />
              </a>
            </div>
          ))
        )}
      </div>

      <BottomNav />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
