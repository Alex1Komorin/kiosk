// src/pages/newGame.jsx
import React from 'react';

const NewGame = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0b1020'
    }}>
      <iframe
        src="https://novels.barilo.ru/korpusb-games"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Новая игра"
        allow="fullscreen"
      />
    </div>
  );
};

export default NewGame;