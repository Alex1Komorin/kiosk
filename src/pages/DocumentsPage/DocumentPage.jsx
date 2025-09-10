// src/pages/DocumentPage/DocumentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentsData } from '../../data/documentsData';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import { useActivity } from '../../contexts/ActivityContext';
import './DocumentPage.css';

const DocumentPage = () => {
  const { folderPath } = useParams();
  const navigate = useNavigate();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  
  // Получаем функцию продления сессии из контекста
  const { extendSession } = useActivity();

  // Функция для поиска папки по пути
  const findFolderByPath = (data, targetPath) => {
    if (data.path === targetPath) {
      return data;
    }

    if (data.children) {
      for (const child of data.children) {
        const found = findFolderByPath(child, targetPath);
        if (found) return found;
      }
    }

    return null;
  };

  // Функция для построения хлебных крошек (ИСПРАВЛЕННАЯ)
  const buildBreadcrumbs = (data, targetPath, crumbs = []) => {
    const newCrumbs = [...crumbs, { name: data.name, path: data.path }];

    if (data.path === targetPath) {
      return newCrumbs;
    }

    if (data.children) {
      for (const child of data.children) {
        // Ищем во всех детях, а не только в папках
        const result = buildBreadcrumbs(child, targetPath, newCrumbs);
        if (result) return result;
      }
    }

    return null;
  };

  useEffect(() => {
    const decodedPath = folderPath ? decodeURIComponent(`/${folderPath}`) : '/';
    console.log('Ищем путь:', decodedPath);
    
    const folder = findFolderByPath(documentsData, decodedPath);
    const crumbs = buildBreadcrumbs(documentsData, decodedPath);

    console.log('Найдена папка:', folder);
    console.log('Хлебные крошки:', crumbs);

    setCurrentFolder(folder || documentsData);
    setBreadcrumbs(crumbs || []);
  }, [folderPath]);

  const handleFolderClick = (folder) => {
    // Кодируем путь для URL
    const encodedPath = encodeURIComponent(folder.path.replace(/^\//, ''));
    navigate(`/documents/${encodedPath}`);
  };

  const handleFileClick = (file) => {
    console.log('Клик по файлу:', file);
    console.log('Путь файла:', file.path);
    
    if (file.path.endsWith('.pdf')) {
      const fullPath = file.path;
      console.log('Полный путь к PDF:', fullPath);
      
      // Проверим, существует ли файл
      fetch(fullPath, { method: 'HEAD' })
        .then(response => {
          console.log('Файл существует:', response.ok);
          if (response.ok) {
            setSelectedPdf(fullPath);
          } else {
            console.error('Файл не найден:', fullPath);
            alert('Файл не найден: ' + fullPath);
          }
        })
        .catch(error => {
          console.error('Ошибка проверки файла:', error);
          alert('Ошибка при проверке файла: ' + fullPath);
        });
    } else {
      window.open(file.path, '_blank');
    }
  };

  const handleBreadcrumbClick = (path) => {
    const encodedPath = encodeURIComponent(path.replace(/^\//, ''));
    navigate(`/documents/${encodedPath}`);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  if (!currentFolder) {
    return (
      <div className="document-page">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="document-page">
      {/* Хлебные крошки */}
      <div className="breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path} className="breadcrumb">
            {index > 0 && <span className="breadcrumb-separator">/</span>}
            <button
              className={`breadcrumb-link ${index === breadcrumbs.length - 1 ? 'current' : ''}`}
              onClick={() => handleBreadcrumbClick(crumb.path)}
              disabled={index === breadcrumbs.length - 1}
            >
              {crumb.name}
            </button>
          </span>
        ))}
      </div>

      {/* Заголовок */}
      <h1 className="page-title">
        <i className="fas fa-folder"></i>
        {currentFolder.name}
      </h1>

      {/* Содержимое папки */}
      <div className="folder-content">
        {currentFolder.children && currentFolder.children.map(item => (
          <div
            key={item.path}
            className={`content-item ${item.type === 'folder' ? 'folder' : 'file'}`}
            onClick={() => item.type === 'folder' ? handleFolderClick(item) : handleFileClick(item)}
          >
            <h4>
              <i className={item.icon || (item.type === 'folder' ? 'fas fa-folder' : 'fas fa-file')}></i>
              {item.name}
            </h4>
            {item.type === 'file' && item.size && (
              <p className="size">{item.size}</p>
            )}
          </div>
        ))}
      </div>

      {/* Используем компонент PDFViewer с передачей onUserActivity */}
      {selectedPdf && (
        <PDFViewer
          filePath={selectedPdf}
          onClose={closePdfViewer}
          onUserActivity={extendSession}
        />
      )}
    </div>
  );
};

export default DocumentPage;