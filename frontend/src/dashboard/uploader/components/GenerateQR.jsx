import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

const GenerateQR = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    degreeName: '',
    instituteName: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQR, setGeneratedQR] = useState(null);
  const [qrData, setQrData] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['studentName', 'studentId', 'degreeName', 'instituteName'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create QR data object
      const qrDataObject = {
        studentName: formData.studentName,
        studentId: formData.studentId,
        degreeName: formData.degreeName,
        instituteName: formData.instituteName,
        generatedAt: new Date().toISOString(),
        id: `QR_${Date.now()}`
      };

      const qrDataString = JSON.stringify(qrDataObject);
      setQrData(qrDataString);
      setGeneratedQR(qrDataObject);
      
      toast.success('QR code generated successfully!');
    } catch (error) {
      toast.error('Failed to generate QR code. Please try again.');
      console.error('QR generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedQR) return;

    const svg = document.getElementById('qr-code-canvas');
    if (svg) {
      // Convert SVG to canvas for download
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `degree-qr-${generatedQR.studentId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        URL.revokeObjectURL(url);
        toast.success('QR code downloaded successfully!');
      };
      
      img.src = url;
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      studentId: '',
      degreeName: '',
      instituteName: ''
    });
    setGeneratedQR(null);
    setQrData('');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Generate QR for New Degree</h2>
            <p className="text-gray-600 text-sm">Create a QR code for degree verification</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter student name"
                required
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID *
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter student ID"
                required
              />
            </div>

            <div>
              <label htmlFor="degreeName" className="block text-sm font-medium text-gray-700 mb-2">
                Degree Name *
              </label>
              <input
                type="text"
                id="degreeName"
                name="degreeName"
                value={formData.degreeName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter degree name"
                required
              />
            </div>

            <div>
              <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700 mb-2">
                Institute Name *
              </label>
              <input
                type="text"
                id="instituteName"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter institute name"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isGenerating}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                'Generate QR Code'
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </motion.div>

      {/* QR Code Preview Card */}
      {generatedQR && (
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generated QR Code</h3>
              <p className="text-gray-600 text-sm">Scan this QR code to verify the degree</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <QRCodeSVG
                  id="qr-code-canvas"
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-gray-900 font-medium">{generatedQR.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Student ID</label>
                  <p className="text-gray-900 font-medium">{generatedQR.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Degree Name</label>
                  <p className="text-gray-900 font-medium">{generatedQR.degreeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Institute</label>
                  <p className="text-gray-900 font-medium">{generatedQR.instituteName}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <label className="text-sm font-medium text-gray-500">QR Code Data</label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-xs text-gray-600 break-all">{qrData}</code>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GenerateQR;
