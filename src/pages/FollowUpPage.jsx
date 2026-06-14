import { useState } from 'react'
import { Send, Users, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import LabelBadge from '../components/LabelBadge'
import toast from 'react-hot-toast'

const GROUPS = [
  {
    label: '跟进中',
    count: 2,
    description: '超过30天未回来的客人',
    defaultMsg: '亲爱的客人，好久不见！最近有没有想做护理？这个月我们有优惠，欢迎回来💆‍♀️',
  },
  {
    label: '流失客',
    count: 1,
    description: '超过90天未回来的客人',
    defaultMsg: '您好！我们想念您了😊 特别为您准备了回头礼，详情请回复我们~',
  },
  {
    label: '新客',
    count: 2,
    description: '首次到访的客人',
    defaultMsg: '感谢您上次的光临！希望您对我们的服务满意，期待您再次到来✨',
  },
  {
    label: 'VIP',
    count: 2,
    description: 'VIP 尊贵客户',
    defaultMsg: '亲爱的VIP客人，感谢您一直以来的支持！本月VIP专属优惠等您来享用👑',
  },
]

function GroupCard({ group }) {
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState(group.defaultMsg)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('请输入消息内容')
      return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    toast.success(`已发送给 ${group.count} 位${group.label}客人`)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div style={{
      background: 'var(--color-white)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(28,43,37,0.06)',
    }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '16px',
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'var(--color-cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Users size={18} color="var(--color-green)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <LabelBadge label={group.label} />
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500 }}>
              {group.count} 位客人
            </span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{group.description}</p>
        </div>
        {expanded ? <ChevronUp size={18} color="var(--color-text-muted)" /> : <ChevronDown size={18} color="var(--color-text-muted)" />}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--color-cream-dark)' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 12, marginBottom: 8 }}>
            消息内容
          </p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--color-cream)',
              border: '1.5px solid var(--color-cream-dark)',
              borderRadius: 10,
              fontSize: 14,
              color: 'var(--color-text)',
              resize: 'vertical',
              lineHeight: 1.6,
            }}
          />
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6, marginBottom: 12 }}>
            {message.length} 字符
          </p>

          <button
            onClick={handleSend}
            disabled={sending}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: sent ? 'var(--color-success)' : 'var(--color-green)',
              color: 'var(--color-cream)',
              transition: 'background 0.2s',
            }}
          >
            {sent ? (
              <><CheckCircle2 size={16} /> 已发送！</>
            ) : sending ? (
              '发送中...'
            ) : (
              <><Send size={16} /> 发送给 {group.count} 位客人</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default function FollowUpPage() {
  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="跟进客人" />

      <div style={{ padding: '16px' }}>
        <div style={{
          background: 'var(--color-green)',
          borderRadius: 16,
          padding: '16px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: 24 }}>💡</div>
          <div>
            <p style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: 14 }}>小提示</p>
            <p style={{ color: 'rgba(247,244,239,0.7)', fontSize: 12, marginTop: 2 }}>
              选择客人群组，编辑消息，一键发送 WhatsApp！
            </p>
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: 12 }}>
          选择群组发送消息
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GROUPS.map(group => (
            <GroupCard key={group.label} group={group} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
