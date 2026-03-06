// src/layout/Layout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUrl } from '../contexts/UrlContext';
import { linksData } from '../data/linksData';
import { documentsData } from '../data/documentsData';
import './Layout.css';

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { currentUrl, setCurrentUrl } = useUrl();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSectionChange = (section) => {
    // Всегда сбрасываем текущий URL при переходе между разделами
    setCurrentUrl('');
    
    // Если кликаем на уже активную секцию, просто переходим на соответствующую страницу
    if (activeSection === section) {
      switch(section) {
        case 'links':
          navigate('/links');
          break;
        case 'documents':
          navigate('/documents');
          break;
        case 'games':
          navigate('/games');
          break;
        default:
          navigate('/');
      }
    } else {
      // Если выбираем новую секцию
      setActiveSection(section);
      
      // Навигация на соответствующие страницы
      switch(section) {
        case 'links':
          navigate('/links');
          break;
        case 'documents':
          navigate('/documents');
          break;
        case 'games':
          navigate('/games');
          break;
        default:
          navigate('/');
      }
    }
  };

  const handleLinkClick = (url) => {
    setCurrentUrl(url);
  };

  const handleHomeClick = () => {
    setCurrentUrl('');
    setActiveSection(null);
    navigate('/');
  };

  const handleFolderClick = (folderPath) => {
    navigate(`/documents${folderPath}`);
  };

  // Проверяем, на какой странице мы находимся для подсветки активной секции
  const isInDocuments = location.pathname.startsWith('/documents');
  const isInLinks = location.pathname === '/links';
  const isGamesPage = location.pathname === '/games' || 
                      location.pathname.startsWith('/games/'); // Все подпути игр
  const isOnHomePage = !currentUrl && !isInDocuments && !isInLinks && !isGamesPage;

  // Устанавливаем активную секцию в зависимости от текущего пути
  useEffect(() => {
    if (isInDocuments) {
      setActiveSection('documents');
    } else if (isInLinks) {
      setActiveSection('links');
    } else if (isGamesPage) {
      setActiveSection('games');
    } else if (isOnHomePage) {
      setActiveSection(null);
    }
  }, [location.pathname, isInDocuments, isInLinks, isGamesPage, isOnHomePage]);

  const renderContent = () => {
    switch (activeSection) {
      case 'links':
        return (
          <div className="content-container">
            <div className="content-header">
              <h3 className="content-title">
                <i className="fas fa-link"></i>
                Ссылки
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                {linksData.map(item => (
                  <div 
                    key={item.id} 
                    className="content-item" 
                    onClick={() => handleLinkClick(item.url)}
                  >
                    <h4>
                      <i className={item.icon}></i>
                      {item.title}
                    </h4>
                    {item.description && <p className="description">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="content-container">
            <div className="content-header">
              <h3 className="content-title">
                <i className="fas fa-folder"></i>
                Документы
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                {documentsData.children.map(folder => (
                  <div 
                    key={folder.path} 
                    className="content-item folder-item"
                    onClick={() => handleFolderClick(folder.path)}
                  >
                    <h4>
                      <i className={folder.icon || 'fas fa-folder'}></i>
                      {folder.name}
                    </h4>
                    <p className="description">Папка с документами</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'games':
        return (
          <div className="content-container">
            <div className="content-header games-header">
              <h3 className="content-title">
                <i className="fas fa-gamepad"></i>
                Игры
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                <div 
                  className="content-item game-item" 
                  onClick={() => navigate('/games/balloon')}
                >
                  <h4>
                    <span role="img" aria-label="шарик">🎈</span>
                    Воздушные шарики
                  </h4>
                  <p className="description">Собери IT-поздравления с 8 Марта!</p>
                </div>

                <div 
                  className="content-item game-item" 
                  onClick={() => navigate('/games/puzzle')}
                >
                  <h4>
                    <span role="img" aria-label="пазл">🧩</span>
                    Пазлы
                  </h4>
                  <p className="description">Собери картинку с роботами к 8 Марта</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        // Когда активный раздел null (на главной), не показываем контент
        return null;
    }
  };

  return (
    <div className="layout">
      <div className={`main-content ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <div className="content">
          {currentUrl ? (
            <iframe
              src={currentUrl}
              title="Веб-сайт"
              className="website-frame"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            children
          )}
        </div>
      </div>

      {/* Сайдбар с анимацией */}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
        <div className="sidebar-image-container">
          <img 
            src="/images/logo.png"
            alt="Логотип" 
            className="sidebar-image"
          />
        </div>

        <div className="top-buttons-container">
          <div className="main-buttons-vertical">
            <button 
              className={`main-btn ${activeSection === 'links' ? 'active' : ''}`}
              onClick={() => handleSectionChange('links')}
            >
              <i className="fas fa-link"></i>
              Ссылки
            </button>
            <button 
              className={`main-btn ${activeSection === 'documents' ? 'active' : ''}`}
              onClick={() => handleSectionChange('documents')}
            >
              <i className="fas fa-file"></i>
              Документы
            </button>
            {/* Единая кнопка для всех игр */}
            <button 
              className={`main-btn games-btn ${activeSection === 'games' ? 'active' : ''}`}
              onClick={() => handleSectionChange('games')}
            >
              <i className="fas fa-gamepad"></i>
              Игры
            </button>
          </div>
        </div>

        <div className="scroll-content-container">
          {activeSection === null && (
            <div className="welcome-message">
              <p>Выберите интересующий вас раздел!</p>
            </div>
          )}
          {renderContent()}
        </div>

        <div className="bottom-container">
          {(currentUrl || activeSection !== null) && (
            <div className="home-button-container">
              <button className="main-btn" onClick={handleHomeClick}>
                <i className="fas fa-home"></i>
                Вернуться на главную
              </button>
            </div>
          )}
        </div>

        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
        >
          <i className={`fas ${isSidebarVisible ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Layout;