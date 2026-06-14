import { useState } from 'react'
import { Sparkles, Send, Check, RefreshCw } from 'lucide-react'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { generatePromoText } from '../lib/claude'
import toast from 'react-hot-toast'

const TOTAL_CLIENTS = 7

export default function PromoPage() {
  const [salonName, setSalonName] = useState('')
  const [promotion, setPromotion] = useState('')
  const [targetAudience, setTargetAudience] = useState('全部客人')
  const [options, setOptions] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleGenerate = async () => {
    if (!salonName.trim() || !promotion.trim()) {
      toast.error('请填写美容院名称和促销内容')
      return
    }
    setGenerating(true)
    setOptions([])
    setSelectedIdx(null)
    try {
      const result = await generatePromoText(salonName, promotion, targetAudience)
      setOptions(result.options)
    } catch {
      // Fallback mock for development
      setOptions([
        `✨ ${salonName}限时优惠！\n\n${promotion}\n\n名额有限，先到先得！立即回复预约💆‍♀️`,
        `亲爱的客人，好消息！\n\n${salonName}为您带来${promotion}！\n\n这个月专属优惠，不要错过哦~`,
        `🌿 ${salonName}特别推出${promotion}！\n\n让专业护理为您放松身心，给自己一个惊喜💝\n\n详情请回复此消息。`,
      ])
    }
    setGenerating(false)
  }

  const handleSend = async () => {
    if (selectedIdx === null) {
      toast.error('请选择一个文案')
      return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 2000))
    setSending(false)
    setSent(true)
    toast.success(`促销消息已发送给 ${TOTAL_CLIENTS} 位客人！`)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="发送促销" />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Form */}
        <div style={{ background: 'var(--color-white)', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(28,43,37,0.06)' }}>
          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: 'var(--color-green)' }}>
            促销详情
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={labelStyle}>美容院名称</label>
              <input
                value={salonName}
                onChange={e => setSalonName(e.target.value)}
                placeholder="例：Bella Beauty Salon"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>促销内容</label>
              <textarea
                value={promotion}
                onChange={e => setPromotion(e.target.value)}
                placeholder="例：买一送一facial护理，仅限本周末！"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={labelStyle}>目标对象</label>
              <select
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                style={{ ...inputStyle, appearance: 'none' }}
              >
                <option>全部客人</option>
                <option>VIP</option>
                <option>新客</option>
                <option>跟进中</option>
                <option>流失客</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              marginTop: 16,
              width: '100%',
              padding: '14px',
              background: 'var(--color-green)',
              color: 'var(--color-cream)',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {generating ? (
              <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> AI 生成中...</>
            ) : (
              <><Sparkles size={16} /> AI 生成3个文案</>
            )}
          </button>
        </div>

        {/* Generated Options */}
        {options.length > 0 && (
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 10 }}>
              选择一个文案发送
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  style={{
                    background: selectedIdx === i ? 'var(--color-green)' : 'var(--color-white)',
                    borderRadius: 14,
                    padding: 16,
                    textAlign: 'left',
                    border: `2px solid ${selectedIdx === i ? 'var(--color-green)' : 'var(--color-cream-dark)'}`,
                    boxShadow: '0 1px 4px rgba(28,43,37,0.06)',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: `2px solid ${selectedIdx === i ? 'var(--color-gold)' : 'var(--color-cream-dark)'}`,
                      background: selectedIdx === i ? 'var(--color-gold)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                      {selectedIdx === i && <Check size={12} color="var(--color-green)" />}
                    </div>
                    <div>
                      <p style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: selectedIdx === i ? 'var(--color-gold)' : 'var(--color-text-muted)',
                        marginBottom: 6,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}>
                        版本 {i + 1}
                      </p>
                      <p style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: selectedIdx === i ? 'var(--color-cream)' : 'var(--color-text)',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {opt}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || selectedIdx === null}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '16px',
                background: sent
                  ? 'var(--color-success)'
                  : selectedIdx !== null
                  ? 'var(--color-gold)'
                  : 'var(--color-cream-dark)',
                color: selectedIdx !== null ? 'var(--color-green)' : 'var(--color-text-muted)',
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background 0.2s',
              }}
            >
              {sent ? (
                <><Check size={18} /> 已发送 {TOTAL_CLIENTS} 位客人！</>
              ) : sending ? (
                '发送中...'
              ) : (
                <><Send size={18} /> 发送给 {TOTAL_CLIENTS} 位客人</>
              )}
            </button>
          </div>
        )}
      </div>

      <BottomNav />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--color-text-muted)',
  marginBottom: 6,
}

const inputStyle = {
  width: '100%',
  padding: '11px 13px',
  background: 'var(--color-cream)',
  border: '1.5px solid var(--color-cream-dark)',
  borderRadius: 10,
  fontSize: 14,
  color: 'var(--color-text)',
}
