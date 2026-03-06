// src/pages/PuzzlePage.jsx
import React from 'react';

const PuzzlePage = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0b1020'
    }}>
      <iframe
        src="https://barilo.ru/games/ai/puzzle/game.html?x=3&y=5&image=8march2026-robots&res=table"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Пазлы к 8 Марта"
        allow="fullscreen"
      />
    </div>
  );
};

export default PuzzlePage;