// src/pages/LinkPage/LinkPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrl } from '../../contexts/UrlContext'; // Добавьте этот импорт
import { linksData } from '../../data/linksData';
import './LinkPage.css';

const LinksPage = () => {
  const navigate = useNavigate();
  const { setCurrentUrl } = useUrl(); // Используйте контекст URL

  const handleLinkClick = (url) => {
    // Устанавливаем URL вместо открытия в новой вкладке
    setCurrentUrl(url);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="links-page">
      {/* Заголовок */}
      <div className="links-header">
        <h1 className="page-title">
          <i className="fas fa-link"></i>
          Полезные ссылки
        </h1>
        <p className="page-subtitle">Все важные ресурсы в одном месте</p>
      </div>

      {/* Сетка ссылок */}
      <div className="links-grid">
        {linksData.map(item => (
          <div
            key={item.id}
            className="link-card"
            onClick={() => handleLinkClick(item.url)}
          >
            <div className="link-icon">
              <i className={item.icon}></i>
            </div>
            <div className="link-content">
              <h3 className="link-title">{item.title}</h3>
              {item.description && (
                <p className="link-description">{item.description}</p>
              )}
              <div className="link-url">{item.url}</div>
            </div>
            <div className="link-arrow">
              <i className="fas fa-external-link-alt"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className="links-stats">
        <div className="stat-item">
          <i className="fas fa-link"></i>
          <span>{linksData.length} ссылок</span>
        </div>
        <div className="stat-item">
          <i className="fas fa-folder"></i>
          <span>Разделы: Образование, Документы, Ресурсы</span>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;