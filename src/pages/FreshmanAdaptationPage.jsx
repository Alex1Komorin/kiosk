import React from 'react';

const FreshmanAdaptationPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFFFF'
      }}
    >
      <iframe
        src="https://ivitsh-portal.kosgos.ru"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Адаптация первокурсников"
        allow="fullscreen"
      />
    </div>
  );
};

export default FreshmanAdaptationPage;
