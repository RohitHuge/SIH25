import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock data
  const mockUploads = [
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'STU001',
      degree: 'Bachelor of Computer Science',
      status: 'processed',
      uploadedAt: '2024-01-15T10:30:00Z',
      fileSize: '2.5 MB',
      fileName: 'john_doe_transcript.pdf'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'STU002',
      degree: 'Master of Business Administration',
      status: 'processing',
      uploadedAt: '2024-01-14T14:20:00Z',
      fileSize: '1.8 MB',
      fileName: 'jane_smith_degree.pdf'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      degree: 'Bachelor of Engineering',
      status: 'pending',
      uploadedAt: '2024-01-13T09:15:00Z',
      fileSize: '3.2 MB',
      fileName: 'mike_johnson_certificate.pdf'
    },
    {
      id: 4,
      studentName: 'Sarah Wilson',
      studentId: 'STU004',
      degree: 'Master of Science',
      status: 'processed',
      uploadedAt: '2024-01-12T16:45:00Z',
      fileSize: '2.1 MB',
      fileName: 'sarah_wilson_transcript.pdf'
    },
    {
      id: 5,
      studentName: 'David Brown',
      studentId: 'STU005',
      degree: 'Bachelor of Arts',
      status: 'failed',
      uploadedAt: '2024-01-11T11:30:00Z',
      fileSize: '1.5 MB',
      fileName: 'david_brown_degree.pdf'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUploads(mockUploads);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredUploads = uploads.filter(upload => {
    const matchesSearch = upload.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.degree.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || upload.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedUploads = [...filteredUploads].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.studentName.localeCompare(b.studentName);
      case 'date':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'pending':
        return '⏸️';
      case 'failed':
        return '❌';
      default:
        return '❓';
    }
  };

  const handleRetry = (uploadId) => {
    toast.success('Retrying upload...');
    // Implement retry logic
  };

  const handleDelete = (uploadId) => {
    setUploads(prev => prev.filter(upload => upload.id !== uploadId));
    toast.success('Upload deleted successfully');
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
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Uploads</h3>
            <p className="text-gray-600">Fetching your upload history...</p>
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
            <h2 className="text-xl font-semibold text-gray-900">My Uploads</h2>
            <p className="text-gray-600 text-sm">Manage and track your document uploads</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{uploads.length}</p>
            <p className="text-sm text-gray-500">Total Uploads</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or degree..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="processed">Processed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="date">Upload Date</option>
              <option value="name">Student Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Uploads Table Card */}
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
                  Student Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUploads.map((upload) => (
                <motion.tr
                  key={upload.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{upload.studentName}</div>
                      <div className="text-sm text-gray-500">{upload.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{upload.degree}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                      <span className="mr-1">{getStatusIcon(upload.status)}</span>
                      {upload.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(upload.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{upload.fileName}</div>
                    <div className="text-sm text-gray-500">{upload.fileSize}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {upload.status === 'failed' && (
                        <button
                          onClick={() => handleRetry(upload.id)}
                          className="text-green-600 hover:text-green-900 transition-colors duration-200"
                        >
                          Retry
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(upload.id)}
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

        {sortedUploads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No uploads found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyUploads;
