import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const VerifyOldDocument = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a PDF or image file (JPEG, PNG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setVerificationResult(null);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleVerify = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setVerificationResult(null);

    try {
      // Simulate OCR processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock OCR extraction
      const mockExtractedData = {
        studentName: 'Jane Smith',
        studentId: 'STU002',
        degreeName: 'Master of Business Administration',
        instituteName: 'Business School University',
        graduationYear: '2023',
        gpa: '3.8',
        extractedAt: new Date().toISOString()
      };

      // Simulate database verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock verification result (80% success rate)
      const isVerified = Math.random() > 0.2;
      
      const result = {
        id: `DOC_${Date.now()}`,
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size,
        fileType: uploadedFile.type,
        extractedData: mockExtractedData,
        verified: isVerified,
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'Current Verifier',
        verificationMethod: 'OCR Analysis',
        confidence: Math.floor(Math.random() * 30) + 70 // 70-100% confidence
      };

      setVerificationResult(result);

      if (isVerified) {
        toast.success('Document verified successfully!');
      } else {
        toast.error('Document verification failed!');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setVerificationResult(null);
    setUploadedFile(null);
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
      {/* File Upload Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verify Old Document</h2>
            <p className="text-gray-600 text-sm">Upload document for OCR analysis and verification</p>
          </div>
        </div>

        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-purple-400 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
          } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInputChange}
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
                {isDragActive ? 'Drop file here' : 'Drag & drop file here'}
              </p>
              <p className="text-gray-500 text-sm">
                or click to select file
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Supports PDF and image files up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded File Info */}
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Processing Progress */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Processing Document...</span>
                <span className="text-sm text-gray-500">OCR Analysis</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Extracting text and analyzing document...</p>
            </div>
          </motion.div>
        )}

        {/* Verify Button */}
        {uploadedFile && !isProcessing && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleVerify}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 hover:scale-105 transition-all duration-200"
            >
              Verify Document
            </button>
          </div>
        )}
      </motion.div>

      {/* Verification Result Card */}
      {verificationResult && (
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                verificationResult.verified ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {verificationResult.verified ? (
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {verificationResult.verified ? 'Document Verified' : 'Verification Failed'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {verificationResult.verified ? 'This document is authentic' : 'This document could not be verified'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                verificationResult.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {verificationResult.verified ? '✅ Verified' : '❌ Invalid'}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Confidence: {verificationResult.confidence}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Extracted Information</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-gray-900">{verificationResult.extractedData.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Student ID</label>
                  <p className="text-gray-900">{verificationResult.extractedData.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Degree</label>
                  <p className="text-gray-900">{verificationResult.extractedData.degreeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Institute</label>
                  <p className="text-gray-900">{verificationResult.extractedData.instituteName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Graduation Year</label>
                  <p className="text-gray-900">{verificationResult.extractedData.graduationYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">GPA</label>
                  <p className="text-gray-900">{verificationResult.extractedData.gpa}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Verification Details</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">File Name</label>
                  <p className="text-gray-900">{verificationResult.fileName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">File Size</label>
                  <p className="text-gray-900">{formatFileSize(verificationResult.fileSize)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verification Method</label>
                  <p className="text-gray-900">{verificationResult.verificationMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verified By</label>
                  <p className="text-gray-900">{verificationResult.verifiedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verified At</label>
                  <p className="text-gray-900">{new Date(verificationResult.verifiedAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Document ID</label>
                  <p className="text-gray-900 font-mono text-sm">{verificationResult.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Verify Another Document
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VerifyOldDocument;
