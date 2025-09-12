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
  
  const { extendSession } = useActivity();

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

  const buildBreadcrumbs = (data, targetPath, crumbs = []) => {
    const newCrumbs = [...crumbs, { name: data.name, path: data.path }];

    if (data.path === targetPath) {
      return newCrumbs;
    }

    if (data.children) {
      for (const child of data.children) {
        const result = buildBreadcrumbs(child, targetPath, newCrumbs);
        if (result) return result;
      }
    }

    return null;
  };

  useEffect(() => {
    const decodedPath = folderPath ? decodeURIComponent(`/${folderPath}`) : '/';
    const folder = findFolderByPath(documentsData, decodedPath);
    const crumbs = buildBreadcrumbs(documentsData, decodedPath);

    setCurrentFolder(folder || documentsData);
    setBreadcrumbs(crumbs || []);
  }, [folderPath]);

  const handleFolderClick = (folder) => {
    const encodedPath = encodeURIComponent(folder.path.replace(/^\//, ''));
    navigate(`/documents/${encodedPath}`);
  };

  const handleFileClick = (file) => {
    if (file.path.endsWith('.pdf')) {
      const fullPath = file.path;
      fetch(fullPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            setSelectedPdf(fullPath);
          } else {
            alert('Файл не найден: ' + fullPath);
          }
        })
        .catch(error => {
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
        <div className="document-loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="document-page">
      {/* Хлебные крошки */}
      <div className="document-breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path} className="document-breadcrumb">
            {index > 0 && <span className="document-breadcrumb-separator">/</span>}
            <button
              className={`document-breadcrumb-link ${index === breadcrumbs.length - 1 ? 'current' : ''}`}
              onClick={() => handleBreadcrumbClick(crumb.path)}
              disabled={index === breadcrumbs.length - 1}
            >
              {crumb.name}
            </button>
          </span>
        ))}
      </div>

      {/* Заголовок */}
      <h1 className="document-page-title">
        <i className="fas fa-folder"></i>
        {currentFolder.name}
      </h1>

      {/* Содержимое папки */}
      <div className="document-folder-content">
        {currentFolder.children && currentFolder.children.map(item => (
          <div
            key={item.path}
            className={`document-item ${item.type === 'folder' ? 'document-folder' : 'document-file'}`}
            onClick={() => item.type === 'folder' ? handleFolderClick(item) : handleFileClick(item)}
          >
            <h4>
              <i className={item.icon || (item.type === 'folder' ? 'fas fa-folder' : 'fas fa-file')}></i>
              {item.name}
            </h4>
            {item.type === 'file' && item.size && (
              <p className="document-size">{item.size}</p>
            )}
          </div>
        ))}
      </div>

      {/* PDF Viewer */}
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