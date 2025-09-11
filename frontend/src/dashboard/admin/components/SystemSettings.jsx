import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    qrVerificationEnabled: true,
    ocrProvider: 'google',
    autoVerification: false,
    fraudDetectionSensitivity: 'medium',
    emailNotifications: true,
    systemMaintenance: false,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'jpg', 'png'],
    sessionTimeout: 30
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setSettings({
        qrVerificationEnabled: true,
        ocrProvider: 'google',
        autoVerification: false,
        fraudDetectionSensitivity: 'medium',
        emailNotifications: true,
        systemMaintenance: false,
        maxFileSize: 10,
        allowedFileTypes: ['pdf', 'jpg', 'png'],
        sessionTimeout: 30
      });
      toast.success('Settings reset to defaults!');
    } catch (error) {
      toast.error('Failed to reset settings');
    } finally {
      setIsLoading(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          enabled ? 'bg-green-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, description }) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const NumberField = ({ label, value, onChange, min, max, unit, description }) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          min={min}
          max={max}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );

  if (isLoading && !settings.qrVerificationEnabled) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Loading system settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      {/* Verification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Settings</h2>
        
        <ToggleSwitch
          enabled={settings.qrVerificationEnabled}
          onChange={(value) => handleSettingChange('qrVerificationEnabled', value)}
          label="QR Code Verification"
          description="Enable QR code-based document verification"
        />
        
        <SelectField
          label="OCR Provider"
          value={settings.ocrProvider}
          onChange={(value) => handleSettingChange('ocrProvider', value)}
          options={[
            { value: 'google', label: 'Google Vision API' },
            { value: 'aws', label: 'Amazon Textract' },
            { value: 'azure', label: 'Azure Computer Vision' }
          ]}
          description="Choose the OCR service for document text extraction"
        />
        
        <ToggleSwitch
          enabled={settings.autoVerification}
          onChange={(value) => handleSettingChange('autoVerification', value)}
          label="Auto Verification"
          description="Automatically verify documents that pass all checks"
        />
        
        <SelectField
          label="Fraud Detection Sensitivity"
          value={settings.fraudDetectionSensitivity}
          onChange={(value) => handleSettingChange('fraudDetectionSensitivity', value)}
          options={[
            { value: 'low', label: 'Low - Fewer false positives' },
            { value: 'medium', label: 'Medium - Balanced detection' },
            { value: 'high', label: 'High - Maximum security' }
          ]}
          description="Adjust the sensitivity of fraud detection algorithms"
        />
      </div>

      {/* File Upload Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">File Upload Settings</h2>
        
        <NumberField
          label="Maximum File Size"
          value={settings.maxFileSize}
          onChange={(value) => handleSettingChange('maxFileSize', value)}
          min={1}
          max={100}
          unit="MB"
          description="Maximum allowed file size for document uploads"
        />
        
        <div className="py-4 border-b border-gray-200 last:border-b-0">
          <label className="block text-sm font-medium text-gray-900 mb-2">Allowed File Types</label>
          <p className="text-sm text-gray-500 mb-3">Select file types that can be uploaded</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['pdf', 'jpg', 'png', 'jpeg', 'doc', 'docx'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.allowedFileTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleSettingChange('allowedFileTypes', [...settings.allowedFileTypes, type]);
                    } else {
                      handleSettingChange('allowedFileTypes', settings.allowedFileTypes.filter(t => t !== type));
                    }
                  }}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 uppercase">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
        
        <ToggleSwitch
          enabled={settings.emailNotifications}
          onChange={(value) => handleSettingChange('emailNotifications', value)}
          label="Email Notifications"
          description="Send email notifications for important events"
        />
        
        <ToggleSwitch
          enabled={settings.systemMaintenance}
          onChange={(value) => handleSettingChange('systemMaintenance', value)}
          label="System Maintenance Mode"
          description="Enable maintenance mode to restrict user access"
        />
        
        <NumberField
          label="Session Timeout"
          value={settings.sessionTimeout}
          onChange={(value) => handleSettingChange('sessionTimeout', value)}
          min={5}
          max={120}
          unit="minutes"
          description="Automatic logout after period of inactivity"
        />
      </div>

      {/* OCR Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">OCR Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <input
              type="password"
              placeholder="Enter your OCR API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">API Endpoint</label>
            <input
              type="url"
              placeholder="https://api.example.com/v1/ocr"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Confidence Threshold</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="flex-1"
              />
              <span className="text-sm text-gray-500">80%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
          
          <button
            onClick={handleResetSettings}
            disabled={isLoading}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
