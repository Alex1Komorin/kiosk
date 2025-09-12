// src/contexts/UrlContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UrlContext = createContext();

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrl must be used within an UrlProvider');
  }
  return context;
};

export const UrlProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  const value = {
    currentUrl,
    setCurrentUrl
  };

  return (
    <UrlContext.Provider value={value}>
      {children}
    </UrlContext.Provider>
  );
};