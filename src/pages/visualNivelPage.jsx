// src/pages/VisualNovelPage.jsx
import React from 'react';

const VisualNovelPage = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#000' // на случай если iframe не загрузится
    }}>
      <iframe
        src="/VisualNovelVertical-main/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Визуальная новелла"
        allow="fullscreen"
      />
    </div>
  );
};

export default VisualNovelPage;