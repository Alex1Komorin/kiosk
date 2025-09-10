// components/PDFViewer/PDFViewer.jsx
import React, { useEffect, useRef } from 'react';
import './PDFViewer.css';

const PDFViewer = ({ filePath, onClose, onUserActivity }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleIframeActivity = () => {
      if (onUserActivity) {
        onUserActivity();
      }
    };

    // Периодически проверяем, загрузился ли iframe
    const checkIframeLoaded = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        clearInterval(checkIframeLoaded);
        
        // Добавляем обработчики событий к iframe
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        
        iframeDoc.addEventListener('mousedown', handleIframeActivity);
        iframeDoc.addEventListener('mousemove', handleIframeActivity);
        iframeDoc.addEventListener('keypress', handleIframeActivity);
        iframeDoc.addEventListener('scroll', handleIframeActivity);
        iframeDoc.addEventListener('touchstart', handleIframeActivity);
      }
    }, 100);

    return () => {
      clearInterval(checkIframeLoaded);
    };
  }, [onUserActivity]);

  return (
    <div className="pdf-viewer-overlay" onClick={onClose}>
      <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-viewer-header">
          <button className="pdf-viewer-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="pdf-viewer-content">
          <iframe
            ref={iframeRef}
            src={`${filePath}#zoom=150`}
            title="PDF Viewer"
            className="pdf-iframe"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;