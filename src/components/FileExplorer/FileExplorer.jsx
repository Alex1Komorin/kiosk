import React, { useState } from 'react';
import './FileExplorer.css';

const FileExplorer = ({ data, onFileSelect, onFileClick, currentPath }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return 'fas fa-file-pdf';
    if (fileName.endsWith('.docx')) return 'fas fa-file-word';
    if (fileName.endsWith('.xlsx')) return 'fas fa-file-excel';
    if (fileName.endsWith('.pptx')) return 'fas fa-file-powerpoint';
    return 'fas fa-file';
  };

  const renderItem = (item, level = 0) => {
    const isExpanded = expandedFolders[item.path];
    const isSelected = currentPath === item.path;

    if (item.type === 'file') {
      return (
        <div 
          key={item.path}
          className={`file-item ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${level * 40 + 20}px` }}
          onClick={() => onFileClick(item)}
        >
          <i className={getFileIcon(item.name)}></i>
          <span className="file-name">{item.name}</span>
          {item.size && <span className="file-size">{item.size}</span>}
        </div>
      );
    }

    if (item.type === 'folder') {
      return (
        <div key={item.path}>
          <div 
            className={`folder-item ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`}
            style={{ paddingLeft: `${level * 40 + 20}px` }}
            onClick={() => {
              toggleFolder(item.path);
              onFileSelect(item);
            }}
          >
            <i className={`fas ${isExpanded ? 'fa-folder-open' : 'fa-folder'}`}></i>
            <span className="folder-name">{item.name}</span>
            <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} arrow`}></i>
          </div>
          
          {isExpanded && item.children && (
            <div className="folder-children">
              {item.children.map(child => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="file-explorer">
      {data.children && data.children.map(item => renderItem(item))}
    </div>
  );
};

export default FileExplorer;