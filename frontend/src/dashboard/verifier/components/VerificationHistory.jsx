import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const VerificationHistory = () => {
  const [verifications, setVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock data
  // const mockVerifications = [
  //   {
  //     id: 'VER001',
  //     documentId: 'DOC_1705312200000',
  //     studentName: 'John Doe',
  //     studentId: 'STU001',
  //     degree: 'Bachelor of Computer Science',
  //     status: 'verified',
  //     method: 'QR Code',
  //     verifiedAt: '2024-01-15T10:30:00Z',
  //     verifiedBy: 'Alice Johnson',
  //     confidence: 95
  //   },
  //   {
  //     id: 'VER002',
  //     documentId: 'DOC_1705312200001',
  //     studentName: 'Jane Smith',
  //     studentId: 'STU002',
  //     degree: 'Master of Business Administration',
  //     status: 'verified',
  //     method: 'OCR Analysis',
  //     verifiedAt: '2024-01-14T14:20:00Z',
  //     verifiedBy: 'Bob Wilson',
  //     confidence: 87
  //   },
  //   {
  //     id: 'VER003',
  //     documentId: 'DOC_1705312200002',
  //     studentName: 'Mike Johnson',
  //     studentId: 'STU003',
  //     degree: 'Bachelor of Engineering',
  //     status: 'failed',
  //     method: 'QR Code',
  //     verifiedAt: '2024-01-13T09:15:00Z',
  //     verifiedBy: 'Alice Johnson',
  //     confidence: 0
  //   },
  //   {
  //     id: 'VER004',
  //     documentId: 'DOC_1705312200003',
  //     studentName: 'Sarah Wilson',
  //     studentId: 'STU004',
  //     degree: 'Master of Science',
  //     status: 'verified',
  //     method: 'OCR Analysis',
  //     verifiedAt: '2024-01-12T16:45:00Z',
  //     verifiedBy: 'Bob Wilson',
  //     confidence: 92
  //   },
  //   {
  //     id: 'VER005',
  //     documentId: 'DOC_1705312200004',
  //     studentName: 'David Brown',
  //     studentId: 'STU005',
  //     degree: 'Bachelor of Arts',
  //     status: 'pending',
  //     method: 'OCR Analysis',
  //     verifiedAt: '2024-01-11T11:30:00Z',
  //     verifiedBy: 'Alice Johnson',
  //     confidence: 0
  //   },
  //   {
  //     id: 'VER006',
  //     documentId: 'DOC_1705312200005',
  //     studentName: 'Emily Davis',
  //     studentId: 'STU006',
  //     degree: 'Master of Fine Arts',
  //     status: 'verified',
  //     method: 'QR Code',
  //     verifiedAt: '2024-01-10T08:15:00Z',
  //     verifiedBy: 'Bob Wilson',
  //     confidence: 98
  //   }
  // ];
  const mockVerifications = [
    {
      id: 'VER001',
      documentId: 'DOC_1705402200000',
      studentName: 'Amit Kumar',
      studentId: 'JHK001',
      degree: 'Bachelor of Arts in History',
      status: 'verified',
      method: 'QR Code',
      verifiedAt: '2024-02-10T10:20:00Z',
      verifiedBy: 'Ritika Sharma',
      confidence: 94
    },
    {
      id: 'VER002',
      documentId: 'DOC_1705402200001',
      studentName: 'Priya Singh',
      studentId: 'JHK002',
      degree: 'Master of Science in Physics',
      status: 'verified',
      method: 'OCR Analysis',
      verifiedAt: '2024-02-09T15:40:00Z',
      verifiedBy: 'Sandeep Das',
      confidence: 89
    },
    {
      id: 'VER003',
      documentId: 'DOC_1705402200002',
      studentName: 'Ravi Prasad',
      studentId: 'JHK003',
      degree: 'Bachelor of Technology in Civil Engineering',
      status: 'failed',
      method: 'QR Code',
      verifiedAt: '2024-02-08T09:25:00Z',
      verifiedBy: 'Ritika Sharma',
      confidence: 0
    },
    {
      id: 'VER004',
      documentId: 'DOC_1705402200003',
      studentName: 'Anjali Kumari',
      studentId: 'JHK004',
      degree: 'Master of Commerce',
      status: 'verified',
      method: 'OCR Analysis',
      verifiedAt: '2024-02-07T18:00:00Z',
      verifiedBy: 'Sandeep Das',
      confidence: 91
    },
    {
      id: 'VER005',
      documentId: 'DOC_1705402200004',
      studentName: 'Saurav Kumar',
      studentId: 'JHK005',
      degree: 'Bachelor of Computer Applications',
      status: 'pending',
      method: 'OCR Analysis',
      verifiedAt: '2024-02-06T11:10:00Z',
      verifiedBy: 'Ritika Sharma',
      confidence: 0
    },
    {
      id: 'VER006',
      documentId: 'DOC_1705402200005',
      studentName: 'Sunita Devi',
      studentId: 'JHK006',
      degree: 'Master of Social Work',
      status: 'verified',
      method: 'QR Code',
      verifiedAt: '2024-02-05T08:30:00Z',
      verifiedBy: 'Sandeep Das',
      confidence: 97
    }
  ];
  

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setVerifications(mockVerifications);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.documentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || verification.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || verification.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const sortedVerifications = [...filteredVerifications].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.studentName.localeCompare(b.studentName);
      case 'date':
        return new Date(b.verifiedAt) - new Date(a.verifiedAt);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'confidence':
        return b.confidence - a.confidence;
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return '✅';
      case 'failed':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'QR Code':
        return '📱';
      case 'OCR Analysis':
        return '🔍';
      default:
        return '📄';
    }
  };

  const handleDelete = (verificationId) => {
    setVerifications(prev => prev.filter(verification => verification.id !== verificationId));
    toast.success('Verification record deleted successfully');
  };

  const handleRetry = (verificationId) => {
    toast.success('Retrying verification...');
    // Implement retry logic
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  if (isLoading) {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Verification History</h3>
            <p className="text-gray-600">Fetching your verification records...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verification History</h2>
            <p className="text-gray-600 text-sm">Track and manage all document verifications</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{verifications.length}</p>
            <p className="text-sm text-gray-500">Total Verifications</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or degree..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Methods</option>
              <option value="QR Code">QR Code</option>
              <option value="OCR Analysis">OCR Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Verification Date</option>
              <option value="name">Student Name</option>
              <option value="status">Status</option>
              <option value="confidence">Confidence</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Verifications Table Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedVerifications.map((verification) => (
                <motion.tr
                  key={verification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{verification.documentId}</div>
                    <div className="text-xs text-gray-500">ID: {verification.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{verification.studentName}</div>
                      <div className="text-sm text-gray-500">{verification.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{verification.degree}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                      <span className="mr-1">{getStatusIcon(verification.status)}</span>
                      {verification.status}
                    </span>
                    {verification.confidence > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {verification.confidence}% confidence
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{getMethodIcon(verification.method)}</span>
                      <span className="text-sm text-gray-900">{verification.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {verification.verifiedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(verification.verifiedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {verification.status === 'failed' && (
                        <button
                          onClick={() => handleRetry(verification.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          Retry
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(verification.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedVerifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No verifications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerificationHistory;
