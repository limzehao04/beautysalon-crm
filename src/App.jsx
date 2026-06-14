import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ClientsPage from './pages/ClientsPage'
import FollowUpPage from './pages/FollowUpPage'
import PromoPage from './pages/PromoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/followup" element={<FollowUpPage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="*" element={<Navigate to="/clients" replace />} />
      </Routes>
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
    </BrowserRouter>
  )
}
