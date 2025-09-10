import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UploadData = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      const isValidType = file.type === 'text/csv' || file.type === 'application/pdf';
      if (!isValidType) {
        toast.error(`${file.name} is not a valid file type. Only CSV and PDF files are allowed.`);
      }
      return isValidType;
    });

    if (validFiles.length > 0) {
      handleUpload(validFiles);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      const isValidType = file.type === 'text/csv' || file.type === 'application/pdf';
      if (!isValidType) {
        toast.error(`${file.name} is not a valid file type. Only CSV and PDF files are allowed.`);
      }
      return isValidType;
    });

    if (validFiles.length > 0) {
      handleUpload(validFiles);
    }
  };

  const handleUpload = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'success',
        uploadedAt: new Date().toISOString()
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upload Data</h2>
            <p className="text-gray-600 text-sm">Upload CSV or PDF files for processing</p>
          </div>
        </div>

        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            multiple
            accept=".csv,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
              </p>
              <p className="text-gray-500 text-sm">
                or click to select files
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Supports CSV and PDF files up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Uploading...</span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
            <span className="text-sm text-gray-500">{uploadedFiles.length} file(s)</span>
          </div>
          
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {file.status}
                  </span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadData;