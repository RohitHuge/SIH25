import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../shared/Sidebar';
import SystemOverview from './components/SystemOverview';
import UserManagement from './components/UserManagement';
import FraudReports from './components/FraudReports';
import DocumentAnalytics from './components/DocumentAnalytics';
import SystemSettings from './components/SystemSettings';
import AuditLogs from './components/AuditLogs';
import ProfileSecurity from './components/ProfileSecurity';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to default route if on base path
  useEffect(() => {
    if (location.pathname === '/dashboard/admin' || location.pathname === '/dashboard/admin/') {
      navigate('/dashboard/admin/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex">
      {/* Sidebar */}
      <Sidebar role="admin" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {location.pathname.split('/').pop()?.replace('-', ' ') || 'Admin Dashboard'}
              </h1>
              <p className="text-gray-600 text-sm">
                Manage system settings, users, and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">Admin Account</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <Routes>
                <Route path="/dashboard" element={<SystemOverview />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/fraud-reports" element={<FraudReports />} />
                <Route path="/document-analytics" element={<DocumentAnalytics />} />
                <Route path="/system-settings" element={<SystemSettings />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/profile" element={<ProfileSecurity />} />
                <Route path="*" element={<SystemOverview />} /> {/* Catch-all route */}
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
