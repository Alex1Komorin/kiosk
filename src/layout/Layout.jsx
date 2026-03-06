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
        case 'balloon':
          navigate('/balloonGame');
          break;
        case 'visualNovel':
          navigate('/visual-novel');
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
        case 'balloon':
          navigate('/balloonGame');
          break;
        case 'visualNovel':
          navigate('/visual-novel');
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
  const isBalloonGamePage = location.pathname === '/balloonGame';
  const isVisualNovelPage = location.pathname === '/visual-novel';
  const isOnHomePage = !currentUrl && !isInDocuments && !isInLinks && !isBalloonGamePage && !isVisualNovelPage;
  
  // Устанавливаем активную секцию в зависимости от текущего пути
  useEffect(() => {
    if (isInDocuments) {
      setActiveSection('documents');
    } else if (isInLinks) {
      setActiveSection('links');
    } else if (isBalloonGamePage) {
      setActiveSection('balloon');
    } else if (isVisualNovelPage) {
      setActiveSection('visualNovel');
    } else if (isOnHomePage) {
      setActiveSection(null);
    }
  }, [location.pathname, isInDocuments, isInLinks, isBalloonGamePage, isVisualNovelPage, isOnHomePage]);

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

      case 'balloon':
        return (
          <div className="content-container">
            <div className="content-header balloon-header">
              <h3 className="content-title">
                <span role="img" aria-label="цветы">💐</span>
                С 8 Марта!
                <span role="img" aria-label="кофе">☕</span>
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                <div className="balloon-info">
                  <p className="balloon-description">
                    Нажми на шарик — получи IT-поздравление!
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'visualNovel':
        return (
          <div className="content-container">
            <div className="content-header visual-novel-header">
              <h3 className="content-title">
                <i className="fas fa-gamepad"></i>
                Визуальная новелла
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                <div className="visual-novel-info">
                  <p className="visual-novel-description">
                    Интерактивная история с выбором решений
                  </p>
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
        {/* Добавлен тег img для изображения */}
        <div className="sidebar-image-container">
          <img 
            src="/images/logo.png" // Замените на ваш путь к изображению
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
            {/* Кнопка для игры на 8 марта */}
            <button 
              className={`main-btn balloon-btn ${activeSection === 'balloon' ? 'active' : ''}`}
              onClick={() => handleSectionChange('balloon')}
            >
              <span role="img" aria-label="цветы">💐</span>
              8 Марта
              <span role="img" aria-label="кофе">☕</span>
            </button>
            {/* Кнопка для визуальной новеллы */}
            <button 
              className={`main-btn visual-novel-btn ${activeSection === 'visualNovel' ? 'active' : ''}`}
              onClick={() => handleSectionChange('visualNovel')}
            >
              <i className="fas fa-gamepad"></i>
              Новелла
            </button>
          </div>
        </div>

        <div className="scroll-content-container">
          {/* Добавляем текст, когда никакой раздел не выбран */}
          {activeSection === null && (
            <div className="welcome-message">
              <p>Выберите интересующий вас раздел!</p>
            </div>
          )}
          {renderContent()}
        </div>

        <div className="bottom-container">
          {/* Показываем кнопку дома если открыта ссылка или выбран какой-то раздел */}
          {(currentUrl || activeSection !== null) && (
            <div className="home-button-container">
              <button className="main-btn" onClick={handleHomeClick}>
                <i className="fas fa-home"></i>
                Вернуться на главную
              </button>
            </div>
          )}
        </div>

        {/* Кнопка переключения сайдбара - внутри сайдбара */}
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