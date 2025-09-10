import React from 'react';

const ConfigError = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuration Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Quick Fix:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in the frontend directory</li>
            <li>Add your Appwrite credentials:
              <pre className="mt-2 bg-gray-200 p-2 rounded text-xs overflow-x-auto">
{`VITE_APPWRITE_PROJECT_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id`}
              </pre>
            </li>
            <li>Restart your development server</li>
          </ol>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Try Again
          </button>
          <a
            href="https://appwrite.io/docs/getting-started-for-web"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View Appwrite Setup Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfigError;
