import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('uploaders');
  const [isLoading, setIsLoading] = useState(true);
  const [uploaders, setUploaders] = useState([]);
  const [verifiers, setVerifiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  // const loadUsers = async () => {
  //   setIsLoading(true);
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   // Mock data
  //   setUploaders([
  //     {
  //       id: 1,
  //       name: 'John Smith',
  //       email: 'john.smith@university.edu',
  //       status: 'active',
  //       role: 'uploader',
  //       lastActive: '2024-01-15',
  //       documentsUploaded: 45,
  //       joinDate: '2023-06-15'
  //     },
  //     {
  //       id: 2,
  //       name: 'Sarah Johnson',
  //       email: 'sarah.j@college.edu',
  //       status: 'pending',
  //       role: 'uploader',
  //       lastActive: '2024-01-10',
  //       documentsUploaded: 0,
  //       joinDate: '2024-01-10'
  //     },
  //     {
  //       id: 3,
  //       name: 'Mike Wilson',
  //       email: 'mike.w@institute.edu',
  //       status: 'disabled',
  //       role: 'uploader',
  //       lastActive: '2023-12-20',
  //       documentsUploaded: 23,
  //       joinDate: '2023-08-20'
  //     }
  //   ]);

  //   setVerifiers([
  //     {
  //       id: 1,
  //       name: 'Dr. Emily Davis',
  //       email: 'emily.davis@university.edu',
  //       status: 'active',
  //       role: 'verifier',
  //       lastActive: '2024-01-15',
  //       documentsVerified: 156,
  //       joinDate: '2023-05-10'
  //     },
  //     {
  //       id: 2,
  //       name: 'Prof. Robert Brown',
  //       email: 'robert.b@college.edu',
  //       status: 'active',
  //       role: 'verifier',
  //       lastActive: '2024-01-14',
  //       documentsVerified: 89,
  //       joinDate: '2023-07-15'
  //     },
  //     {
  //       id: 3,
  //       name: 'Dr. Lisa Garcia',
  //       email: 'lisa.g@institute.edu',
  //       status: 'pending',
  //       role: 'verifier',
  //       lastActive: '2024-01-12',
  //       documentsVerified: 0,
  //       joinDate: '2024-01-12'
  //     }
  //   ]);

  //   setIsLoading(false);
  // };
  const loadUsers = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Uploaders (Jharkhand context)
    setUploaders([
      {
        id: 1,
        name: 'Amit Kumar',
        email: 'amit.kumar@ranchiuniversity.ac.in',
        status: 'active',
        role: 'uploader',
        lastActive: '2024-02-10',
        documentsUploaded: 42,
        joinDate: '2023-07-01'
      },
      {
        id: 2,
        name: 'Priya Singh',
        email: 'priya.singh@bitmesra.ac.in',
        status: 'pending',
        role: 'uploader',
        lastActive: '2024-02-09',
        documentsUploaded: 0,
        joinDate: '2024-02-09'
      },
      {
        id: 3,
        name: 'Ravi Prasad',
        email: 'ravi.prasad@kolhanuniversity.ac.in',
        status: 'disabled',
        role: 'uploader',
        lastActive: '2023-12-18',
        documentsUploaded: 27,
        joinDate: '2023-08-12'
      }
    ]);
  
    // Mock Verifiers (Jharkhand context)
    setVerifiers([
      {
        id: 1,
        name: 'Dr. Sandeep Das',
        email: 'sandeep.das@ranchiuniversity.ac.in',
        status: 'active',
        role: 'verifier',
        lastActive: '2024-02-10',
        documentsVerified: 163,
        joinDate: '2023-05-20'
      },
      {
        id: 2,
        name: 'Prof. Anjali Kumari',
        email: 'anjali.kumari@vinobabhaveuniversity.ac.in',
        status: 'active',
        role: 'verifier',
        lastActive: '2024-02-09',
        documentsVerified: 95,
        joinDate: '2023-07-30'
      },
      {
        id: 3,
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@bitmesra.ac.in',
        status: 'pending',
        role: 'verifier',
        lastActive: '2024-02-08',
        documentsVerified: 0,
        joinDate: '2024-02-08'
      }
    ]);
  
    setIsLoading(false);
  };
  

  const handleUserAction = async (userId, action, userType) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (userType === 'uploader') {
        setUploaders(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, status: action === 'approve' ? 'active' : action === 'disable' ? 'disabled' : user.status }
            : user
        ));
      } else {
        setVerifiers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, status: action === 'approve' ? 'active' : action === 'disable' ? 'disabled' : user.status }
            : user
        ));
      }
      
      toast.success(`User ${action}d successfully!`);
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (userId, userType) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Password reset email sent successfully!');
    } catch (error) {
      toast.error('Failed to send password reset email');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      disabled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredUsers = (users) => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const UserTable = ({ users, userType }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {userType} ({filteredUsers(users).length})
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers(users).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {userType === 'uploader' ? user.documentsUploaded : user.documentsVerified} documents
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {user.status === 'pending' && (
                      <button
                        onClick={() => handleUserAction(user.id, 'approve', userType)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    {user.status === 'active' && (
                      <button
                        onClick={() => handleUserAction(user.id, 'disable', userType)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Disable
                      </button>
                    )}
                    {user.status === 'disabled' && (
                      <button
                        onClick={() => handleUserAction(user.id, 'approve', userType)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Enable
                      </button>
                    )}
                    <button
                      onClick={() => handleResetPassword(user.id, userType)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Reset Password
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading && uploaders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage uploaders and verifiers in your system</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('uploaders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'uploaders'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Uploaders ({uploaders.length})
            </button>
            <button
              onClick={() => setActiveTab('verifiers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'verifiers'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Verifiers ({verifiers.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'uploaders' ? (
                <UserTable users={uploaders} userType="uploaders" />
              ) : (
                <UserTable users={verifiers} userType="verifiers" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
