import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Shield, CheckCircle, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

const STEPS = ['号码', '验证', '完成']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [phone, setPhone] = useState('+60')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (phone.length < 10) {
      toast.error('请输入正确的号码')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    toast.success('验证码已发送！')
    setStep(1)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (code.length < 4) {
      toast.error('请输入验证码')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep(2)
  }

  const handleComplete = () => {
    navigate('/clients')
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--color-green)',
      display: 'flex',
      flexDirection: 'column',
      padding: '48px 20px 32px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ color: 'var(--color-gold)', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          设置 {step + 1} / {STEPS.length}
        </p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= step ? 'var(--color-gold)' : 'rgba(247,244,239,0.2)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
        <h1 style={{ color: 'var(--color-cream)', fontSize: 26, fontWeight: 700, lineHeight: 1.3 }}>
          {step === 0 && '输入您的\nWhatsApp 号码'}
          {step === 1 && '输入验证码'}
          {step === 2 && '连接成功！'}
        </h1>
        <p style={{ color: 'rgba(247,244,239,0.6)', fontSize: 14, marginTop: 8 }}>
          {step === 0 && '我们将发送验证码到您的 WhatsApp Business 号码'}
          {step === 1 && `验证码已发送到 ${phone}`}
          {step === 2 && '您的 WhatsApp Business 已连接'}
        </p>
      </div>

      {/* Step 0 - Phone */}
      {step === 0 && (
        <form onSubmit={handleSendCode} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'rgba(247,244,239,0.08)',
            borderRadius: 14,
            border: '1.5px solid rgba(247,244,239,0.15)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <Phone size={20} color="var(--color-gold)" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+60 12-345 6789"
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: 'var(--color-cream)',
                fontSize: 17,
                letterSpacing: 0.5,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={btnStyle}
          >
            {loading ? '发送中...' : '发送验证码'}
            {!loading && <ChevronRight size={18} />}
          </button>
        </form>
      )}

      {/* Step 1 - OTP */}
      {step === 1 && (
        <form onSubmit={handleVerify} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'rgba(247,244,239,0.08)',
            borderRadius: 14,
            border: '1.5px solid rgba(247,244,239,0.15)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <Shield size={20} color="var(--color-gold)" />
            <input
              type="number"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="6位数验证码"
              maxLength={6}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: 'var(--color-cream)',
                fontSize: 22,
                letterSpacing: 6,
              }}
            />
          </div>
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? '验证中...' : '验证'}
            {!loading && <ChevronRight size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            style={{ background: 'none', color: 'rgba(247,244,239,0.5)', fontSize: 13, padding: 8 }}
          >
            重新发送
          </button>
        </form>
      )}

      {/* Step 2 - Success */}
      {step === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: 20 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(39,174,96,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle size={40} color="var(--color-success)" />
          </div>

          <div style={{
            background: 'rgba(247,244,239,0.08)',
            borderRadius: 14,
            padding: '16px 20px',
            width: '100%',
          }}>
            <p style={{ color: 'rgba(247,244,239,0.6)', fontSize: 12, marginBottom: 4 }}>已连接号码</p>
            <p style={{ color: 'var(--color-cream)', fontWeight: 600, fontSize: 16 }}>{phone}</p>
          </div>

          <button onClick={handleComplete} style={{ ...btnStyle, marginTop: 'auto' }}>
            进入主界面
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

const btnStyle = {
  padding: '16px',
  background: 'var(--color-gold)',
  color: 'var(--color-green)',
  borderRadius: 14,
  fontWeight: 700,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  marginTop: 'auto',
}
