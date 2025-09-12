// src/pages/LinkPage/LinkPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrl } from '../../contexts/UrlContext';
import { linksData } from '../../data/linksData';
import './LinkPage.css';

const LinksPage = () => {
  const navigate = useNavigate();
  const { setCurrentUrl } = useUrl();

  const handleLinkClick = (url) => {
    setCurrentUrl(url);
  };

  return (
    <div className="links-page-container">
      {/* Заголовок */}
      <div className="links-page-header">
        <h1 className="links-page-title">
          <i className="fas fa-link"></i>
          Полезные ссылки
        </h1>
        <p className="links-page-subtitle">Все важные ресурсы в одном месте</p>
      </div>

      {/* Сетка ссылок */}
      <div className="links-page-grid">
        {linksData.map(item => (
          <div
            key={item.id}
            className="links-page-card"
            onClick={() => handleLinkClick(item.url)}
          >
            <div className="links-page-icon">
              <i className={item.icon}></i>
            </div>
            <div className="links-page-content">
              <h3 className="links-page-card-title">{item.title}</h3>
              {item.description && (
                <p className="links-page-card-description">{item.description}</p>
              )}
              <div className="links-page-card-url">{item.url}</div>
            </div>
            <div className="links-page-card-arrow">
              <i className="fas fa-external-link-alt"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksPage;