import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ role = 'uploader' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Role-specific navigation items
  const getNavigationItems = (userRole) => {
    const baseItems = [
      {
        id: 'profile',
        label: 'Profile & Settings',
        icon: '⚙️',
        path: `/dashboard/${userRole}/profile`
      }
    ];

    switch (userRole) {
      case 'uploader':
        return [
          {
            id: 'upload',
            label: 'Upload Data',
            icon: '📂',
            path: `/dashboard/${userRole}/upload`
          },
          {
            id: 'generate-qr',
            label: 'Generate QR',
            icon: '🆕',
            path: `/dashboard/${userRole}/generate-qr`
          },
          {
            id: 'my-uploads',
            label: 'My Uploads',
            icon: '📋',
            path: `/dashboard/${userRole}/my-uploads`
          },
          ...baseItems
        ];
      case 'verifier':
        return [
          {
            id: 'verify-qr',
            label: 'Verify with QR',
            icon: '🔍',
            path: `/dashboard/${userRole}/verify-qr`
          },
          {
            id: 'verify-old-document',
            label: 'Verify Old Document',
            icon: '📑',
            path: `/dashboard/${userRole}/verify-old-document`
          },
          {
            id: 'verification-history',
            label: 'Verification History',
            icon: '🕑',
            path: `/dashboard/${userRole}/verification-history`
          },
          ...baseItems
        ];
      case 'admin':
        return [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: '📊',
            path: `/dashboard/${userRole}/dashboard`
          },
          {
            id: 'user-management',
            label: 'User Management',
            icon: '👥',
            path: `/dashboard/${userRole}/user-management`
          },
          {
            id: 'fraud-reports',
            label: 'Fraud Reports',
            icon: '⚠️',
            path: `/dashboard/${userRole}/fraud-reports`
          },
          {
            id: 'document-analytics',
            label: 'Document Analytics',
            icon: '📑',
            path: `/dashboard/${userRole}/document-analytics`
          },
          {
            id: 'system-settings',
            label: 'System Settings',
            icon: '⚙️',
            path: `/dashboard/${userRole}/system-settings`
          },
          {
            id: 'audit-logs',
            label: 'Audit Logs',
            icon: '🕑',
            path: `/dashboard/${userRole}/audit-logs`
          },
          ...baseItems
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems(role);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  const itemVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: '#f0f9ff',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col"
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 capitalize">{role} Dashboard</h2>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                isActive 
                  ? 'bg-green-100 text-green-700 border-l-4 border-green-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="text-xl">{item.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="text-xl">🚪</span>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
