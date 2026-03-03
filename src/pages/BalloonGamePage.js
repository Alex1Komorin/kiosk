// src/pages/BalloonGamePage.jsx
import React from 'react';

const BalloonGamePage = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0b1020'
    }}>
      <iframe
        src="/shariki.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
          background: '#0b1020'
        }}
        title="Воздушные шарики к 8 Марта"
        allow="fullscreen"
      />
    </div>
  );
};

export default BalloonGamePage;