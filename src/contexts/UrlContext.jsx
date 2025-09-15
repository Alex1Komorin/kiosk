// src/contexts/UrlContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useActivity } from './ActivityContext';

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
  const { extendSession } = useActivity();

  // Функция для установки URL с продлением сессии
  const setUrlWithActivity = useCallback((url) => {
    setCurrentUrl(url);
    // Продлеваем сессию при открытии любой ссылки
    extendSession();
    console.log('URL установлен, сессия продлена:', url);
  }, [extendSession]);

  const value = {
    currentUrl,
    setCurrentUrl: setUrlWithActivity,
  };

  return (
    <UrlContext.Provider value={value}>
      {children}
    </UrlContext.Provider>
  );
};