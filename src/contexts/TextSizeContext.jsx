// src/contexts/TextSizeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const TextSizeContext = createContext();

export const useTextSize = () => {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  return context;
};

export const TextSizeProvider = ({ children }) => {
  const { width, height } = useWindowSize();
  const [textScale, setTextScale] = useState(1);
  const [baseFontSize, setBaseFontSize] = useState('16px');

  // Вычисляем масштаб текста на основе размера экрана
  useEffect(() => {
    // Базовая ширина для референса (1920px)
    const referenceWidth = 1920;
    const referenceHeight = 1080;
    
    // Вычисляем масштаб на основе ширины и высоты
    const widthScale = width / referenceWidth;
    const heightScale = height / referenceHeight;
    
    // Берем среднее значение, но ограничиваем диапазон
    let scale = (widthScale + heightScale) / 2;
    
    // Ограничиваем масштаб от 0.6 до 1.2
    scale = Math.min(Math.max(scale, 0.6), 1.2);
    
    setTextScale(scale);
    
    // Устанавливаем базовый размер шрифта
    const newBaseSize = Math.max(12, Math.min(20, 16 * scale));
    setBaseFontSize(`${newBaseSize}px`);
    
    // Обновляем CSS переменную для глобального использования
    document.documentElement.style.setProperty('--text-scale', scale);
    document.documentElement.style.setProperty('--base-font-size', `${newBaseSize}px`);
  }, [width, height]);

  // Динамические размеры текста
  const getFontSize = (size) => {
    const sizes = {
      xs: `calc(${baseFontSize} * 0.75)`,
      sm: `calc(${baseFontSize} * 0.875)`,
      base: baseFontSize,
      lg: `calc(${baseFontSize} * 1.125)`,
      xl: `calc(${baseFontSize} * 1.25)`,
      '2xl': `calc(${baseFontSize} * 1.5)`,
      '3xl': `calc(${baseFontSize} * 1.875)`,
      '4xl': `calc(${baseFontSize} * 2.25)`,
      '5xl': `calc(${baseFontSize} * 3)`,
    };
    
    return sizes[size] || sizes.base;
  };

  const value = {
    textScale,
    baseFontSize,
    getFontSize,
    width,
    height,
  };

  return (
    <TextSizeContext.Provider value={value}>
      {children}
    </TextSizeContext.Provider>
  );
};