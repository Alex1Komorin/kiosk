import React from 'react';

const ScaledIframe = ({ src, title, background = '#0b1020' }) => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background
    }}
  >
    <div
      style={{
        width: '50%',
        height: '50%',
        transform: 'scale(2)',
        transformOrigin: 'top left'
      }}
    >
      <iframe
        src={src}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title={title}
        allowFullScreen
      />
    </div>
  </div>
);

export default ScaledIframe;
