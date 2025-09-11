import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { ErrorProvider } from './context/ErrorContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import UploaderDashboard from './dashboard/uploader/UploaderDashboard'
import VerifierDashboard from './dashboard/verifier/VerifierDashboard'
import AdminDashboard from './dashboard/admin/AdminDashboard'
import ConfigError from './components/ConfigError'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import RoleBasedRedirect from './components/RoleBasedRedirect'

// Component to handle auth configuration errors
const AppContent = () => {
  const { authError, checkAuthStatus } = useAuth();

  if (authError) {
    return <ConfigError error={authError} onRetry={checkAuthStatus} />;
  }

  return (
    <Routes>
      {/* Public routes - accessible without authentication */}
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      {/* Protected routes - require authentication */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <RoleBasedRedirect />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/uploader/*" element={
        <RoleProtectedRoute allowedRoles={['uploader']}>
          <UploaderDashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/verifier/*" element={
        <RoleProtectedRoute allowedRoles={['verifier']}>
          <VerifierDashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/dashboard/admin/*" element={
        <RoleProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <ErrorProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </ErrorProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  )
}

export default App
