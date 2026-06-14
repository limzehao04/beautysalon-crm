import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password)
      if (error) throw error
      if (isSignUp) {
        toast.success('账号创建成功！请检查邮件确认。')
      } else {
        navigate('/clients')
      }
    } catch (err) {
      toast.error(err.message || '登入失败，请再试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--color-green)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: 'var(--color-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28,
        }}>
          💆
        </div>
        <h1 style={{ color: 'var(--color-cream)', fontSize: 24, fontWeight: 700 }}>
          BeautyCRM
        </h1>
        <p style={{ color: 'rgba(247,244,239,0.6)', fontSize: 13, marginTop: 4 }}>
          马来西亚美容院客户管理系统
        </p>
      </div>

      {/* Form Card */}
      <div style={{
        width: '100%',
        maxWidth: 380,
        background: 'var(--color-cream)',
        borderRadius: 20,
        padding: '28px 24px',
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: 'var(--color-green)' }}>
          {isSignUp ? '创建新账号' : '欢迎回来'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>电子邮件</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="salon@example.com"
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 6,
              padding: '14px',
              background: loading ? 'var(--color-green-muted)' : 'var(--color-green)',
              color: 'var(--color-cream)',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              transition: 'background 0.2s',
            }}
          >
            {loading ? '处理中...' : isSignUp ? '注册' : '登入'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              color: 'var(--color-green-muted)',
              fontSize: 13,
              textDecoration: 'underline',
            }}
          >
            {isSignUp ? '已有账号？登入' : '没有账号？注册'}
          </button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--color-text-muted)',
  marginBottom: 6,
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--color-white)',
  border: '1.5px solid var(--color-cream-dark)',
  borderRadius: 10,
  fontSize: 15,
  color: 'var(--color-text)',
}
