// src/contexts/ActivityContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ActivityContext = createContext();

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [timeUntilWarning, setTimeUntilWarning] = useState(60);
  
  // Используем useRef для хранения таймеров
  const warningTimerRef = useRef(null);
  const intervalTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  // Функция очистки всех таймеров
  const clearAllTimers = useCallback(() => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (intervalTimerRef.current) {
      clearInterval(intervalTimerRef.current);
      intervalTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, []);

  // Функция запуска таймеров
  const startTimers = useCallback(() => {
    clearAllTimers(); // Очищаем предыдущие таймеры
    
    setShowWarning(false);
    setCountdown(10);
    setTimeUntilWarning(60);
    console.log('Таймер запущен. До предупреждения: 60 секунд');

    // Таймер для предупреждения (1 минута)
    warningTimerRef.current = setTimeout(() => {
      console.log('Показываем предупреждение!');
      setShowWarning(true);
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current);
        intervalTimerRef.current = null;
      }
    }, 60 * 1000);

    // Интервал для отслеживания оставшегося времени
    intervalTimerRef.current = setInterval(() => {
      setTimeUntilWarning(prev => {
        const newTime = prev - 1;
        if (newTime > 0 && (newTime % 10 === 0 || newTime <= 5)) {
          console.log(`До предупреждения: ${newTime} секунд`);
        }
        return newTime;
      });
    }, 1000);
  }, [clearAllTimers]);

  // Инициализация таймеров при монтировании
  useEffect(() => {
    startTimers();
    
    return () => {
      clearAllTimers();
    };
  }, [startTimers, clearAllTimers]);

  // Сброс сессии
  const resetSession = useCallback(() => {
    console.log('Сессия сброшена, перенаправляем на главную');
    clearAllTimers();
    window.location.href = '/';
  }, [clearAllTimers]);

  // Продление сессии
  const extendSession = useCallback(() => {
    console.log('Сессия продлена, перезапускаем таймеры');
    startTimers();
  }, [startTimers]);

  // Таймер обратного отсчета (10 секунд)
  useEffect(() => {
    if (showWarning && countdown > 0) {
      console.log(`Обратный отсчет: ${countdown} секунд`);
      countdownTimerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showWarning && countdown === 0) {
      resetSession();
    }

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [showWarning, countdown, resetSession]);

  // Отслеживание активности пользователя
  useEffect(() => {
    const handleUserActivity = () => {
      // Перезапускаем таймеры при любой активности
      extendSession();
    };

    const events = [
      'mousedown', 'mousemove', 'keypress', 'keydown', 
      'scroll', 'touchstart', 'touchmove', 'click'
    ];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [extendSession]);

  const value = {
    showWarning,
    countdown,
    timeUntilWarning,
    extendSession,
    resetSession
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};