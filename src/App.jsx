import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import ClientsPage from './pages/ClientsPage'
import FollowUpPage from './pages/FollowUpPage'
import PromoPage from './pages/PromoPage'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--color-green)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(212,175,112,0.3)',
        borderTop: '3px solid var(--color-gold)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/clients" replace /> : <LoginPage />} />
      <Route path="/onboarding" element={
        <ProtectedRoute><OnboardingPage /></ProtectedRoute>
      } />
      <Route path="/clients" element={
        <ProtectedRoute><ClientsPage /></ProtectedRoute>
      } />
      <Route path="/followup" element={
        <ProtectedRoute><FollowUpPage /></ProtectedRoute>
      } />
      <Route path="/promo" element={
        <ProtectedRoute><PromoPage /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to={user ? '/clients' : '/login'} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--color-green)',
              color: 'var(--color-cream)',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
            },
            success: {
              iconTheme: { primary: 'var(--color-gold)', secondary: 'var(--color-green)' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}
