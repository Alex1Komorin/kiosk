import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { linksData } from '../data/linksData';
import { documentsData } from '../data/documentsData';
import { otherData } from '../data/otherData';
import './Layout.css';

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('links');
  const [currentUrl, setCurrentUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionChange = (section) => {
    if (activeSection !== section) {
      setActiveSection(section);
      setCurrentUrl('');
    }
  };

  const handleLinkClick = (url) => {
    setCurrentUrl(url);
  };

  const handleHomeClick = () => {
    setCurrentUrl('');
    navigate('/'); // Возвращаемся на главную
  };

  const handleFolderClick = (folderPath) => {
    navigate(`/documents${folderPath}`);
  };

  // Проверяем, находимся ли мы на странице документов
  const isInDocuments = location.pathname.startsWith('/documents');
  const isOnHomePage = !currentUrl && !isInDocuments;

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

      case 'other':
        return (
          <div className="content-container">
            <div className="content-header">
              <h3 className="content-title">
                <i className="fas fa-ellipsis-h"></i>
                Прочее
              </h3>
            </div>
            
            <div className="content-scrollable">
              <div className="content-items">
                {otherData.map(item => (
                  <div 
                    key={item.id} 
                    className="content-item"
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

      default:
        return (
          <div className="content-container">
            <div className="content-header">
              <h3 className="content-title">
                <i className="fas fa-link"></i>
                Ссылки
              </h3>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="layout">
      <div className="main-content">
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

      <div className="sidebar">
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
            <button 
              className={`main-btn ${activeSection === 'other' ? 'active' : ''}`}
              onClick={() => handleSectionChange('other')}
            >
              <i className="fas fa-ellipsis-h"></i>
              Прочее
            </button>
          </div>
        </div>

        <div className="scroll-content-container">
          {renderContent()}
        </div>

        <div className="bottom-container">
          {/* Показываем кнопку дома если открыта ссылка или мы в документах */}
          {(currentUrl || isInDocuments) && (
            <div className="home-button-container">
              <button className="home-button" onClick={handleHomeClick}>
                <i className="fas fa-home"></i>
                Вернуться на главную
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;