import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onClose: null
  });

  const showError = useCallback((title, message, onClose = null) => {
    setErrorModal({
      isOpen: true,
      title,
      message,
      onClose
    });
  }, []);

  const hideError = useCallback(() => {
    setErrorModal(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const clearError = useCallback(() => {
    setErrorModal({
      isOpen: false,
      title: '',
      message: '',
      onClose: null
    });
  }, []);

  const value = {
    errorModal,
    showError,
    hideError,
    clearError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModal />
    </ErrorContext.Provider>
  );
};

const ErrorModal = () => {
  const { errorModal, hideError } = useError();

  if (!errorModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 border-2 border-red-500 transform transition-all duration-300 ease-in-out animate-pulse">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{errorModal.title}</h3>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-6 leading-relaxed">
            {errorModal.message}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={hideError}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (errorModal.onClose) errorModal.onClose();
                hideError();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
