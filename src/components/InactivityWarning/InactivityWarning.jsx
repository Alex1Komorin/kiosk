// src/components/InactivityWarning.jsx
import React from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import './InactivityWarning.css';

const InactivityWarning = () => {
  const { showWarning, countdown, extendSession } = useActivity();

  if (!showWarning) return null;

  const handleOverlayClick = () => {
    extendSession();
  };

  return (
    <div className="inactivity-overlay" onClick={handleOverlayClick}>
      <div className="inactivity-modal">
        <div className="warning-icon">
          <i className="fas fa-clock fa-4x"></i>
        </div>
        <h2>Сессия будет завершена</h2>
        <p>Вы неактивны в течение 3 минут</p>
        <div className="countdown">
          <i className="fas fa-hourglass-half"></i>
          До завершения сессии: <span className="countdown-number">{countdown}</span> сек.
        </div>
        <p className="instruction">
          <i className="fas fa-hand-pointer"></i>
          Кликните anywhere чтобы продолжить работу
        </p>
      </div>
    </div>
  );
};

export default InactivityWarning;