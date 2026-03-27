// src/pages/ExternalLinkPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ExternalLinkPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get('url');

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0b1020'
    }}>
      <iframe
        src={url}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
          background: '#ffffff'
        }}
        title="Внешняя страница"
        allow="fullscreen"
      />
    </div>
  );
};

export default ExternalLinkPage;