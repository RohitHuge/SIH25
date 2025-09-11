import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const VerifyQR = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [qrData, setQrData] = useState('');

  // Mock QR data for testing
  const mockQRData = {
    studentName: 'John Doe',
    studentId: 'STU001',
    degreeName: 'Bachelor of Computer Science',
    instituteName: 'University of Technology',
    generatedAt: '2024-01-15T10:30:00Z',
    id: 'QR_1705312200000'
  };

  const handleScanQR = async () => {
    setIsScanning(true);
    setVerificationResult(null);

    try {
      // Simulate QR scanning delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate QR data extraction
      const scannedData = JSON.stringify(mockQRData);
      setQrData(scannedData);

      // Simulate database verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock verification result (90% success rate)
      const isVerified = Math.random() > 0.1;
      
      const result = {
        id: mockQRData.id,
        studentName: mockQRData.studentName,
        studentId: mockQRData.studentId,
        degreeName: mockQRData.degreeName,
        instituteName: mockQRData.instituteName,
        verified: isVerified,
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'Current Verifier',
        verificationMethod: 'QR Code Scan'
      };

      setVerificationResult(result);

      if (isVerified) {
        toast.success('Document verified successfully!');
      } else {
        toast.error('Document verification failed!');
      }
    } catch (error) {
      console.error('QR scan error:', error);
      toast.error('Failed to scan QR code. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setVerificationResult(null);
    setQrData('');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-6">
      {/* QR Scanner Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verify Document with QR Code</h2>
            <p className="text-gray-600 text-sm">Scan QR code to verify document authenticity</p>
          </div>
        </div>

        <div className="text-center">
          <div className="w-64 h-64 bg-gray-100 rounded-xl mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
            {isScanning ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Scanning QR Code...</p>
                <p className="text-gray-500 text-sm">Position QR code within the frame</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">QR Code Scanner</p>
                <p className="text-gray-500 text-sm">Click to start scanning</p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleScanQR}
              disabled={isScanning}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isScanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105'
              }`}
            >
              {isScanning ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </div>
              ) : (
                'Start QR Scan'
              )}
            </button>

            {verificationResult && (
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Scan Another
              </button>
            )}
          </div>
        </div>
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              verificationResult.verified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {verificationResult.verified ? '✅ Verified' : '❌ Invalid'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Document Details</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-gray-900">{verificationResult.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Student ID</label>
                  <p className="text-gray-900">{verificationResult.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Degree</label>
                  <p className="text-gray-900">{verificationResult.degreeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Institute</label>
                  <p className="text-gray-900">{verificationResult.instituteName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Verification Info</h4>
              <div className="space-y-2">
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

          {qrData && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">QR Code Data</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-600 break-all">{qrData}</code>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default VerifyQR;
