import { useEffect } from 'react';
import './KioskScaler.css';

const KioskScaler = ({ scale = 3 }) => {
  useEffect(() => {
    // Сохраняем оригинальные размеры
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    
    // Применяем масштаб
    const appElement = document.querySelector('.app');
    if (appElement) {
      appElement.style.transform = `scale(${scale})`;
      appElement.style.transformOrigin = 'top left';
      appElement.style.width = `${originalWidth / scale}px`;
      appElement.style.height = `${originalHeight / scale}px`;
      appElement.style.position = 'fixed';
      appElement.style.top = '0';
      appElement.style.left = '0';
      appElement.style.overflow = 'hidden';
    }

    // Корректируем размер body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      // Восстанавливаем оригинальные стили
      if (appElement) {
        appElement.style.transform = '';
        appElement.style.transformOrigin = '';
        appElement.style.width = '';
        appElement.style.height = '';
        appElement.style.position = '';
        appElement.style.top = '';
        appElement.style.left = '';
        appElement.style.overflow = '';
      }
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, [scale]);

  return null;
};

export default KioskScaler;