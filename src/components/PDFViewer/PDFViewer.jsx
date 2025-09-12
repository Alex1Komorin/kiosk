// components/PDFViewer/PDFViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import './PDFViewer.css';

const PDFViewer = ({ filePath, onClose, onUserActivity }) => {
  const canvasRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли PDF.js из CDN
    if (window.pdfjsLib) {
      loadPDFWithPDFJS();
    } else {
      // Загружаем PDF.js из CDN
      loadPDFJSLib();
    }
  }, [filePath]);

  const loadPDFJSLib = () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      // Также загружаем worker
      const workerScript = document.createElement('script');
      workerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      workerScript.onload = loadPDFWithPDFJS;
      document.head.appendChild(workerScript);
    };
    script.onerror = () => {
      // Если не удалось загрузить PDF.js, используем fallback
      setUseFallback(true);
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  const loadPDFWithPDFJS = () => {
    if (!window.pdfjsLib) {
      setUseFallback(true);
      setIsLoading(false);
      return;
    }

    const loadPDF = async () => {
      try {
        setIsLoading(true);
        
        // Устанавливаем worker
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        const loadingTask = window.pdfjsLib.getDocument(filePath);
        const pdfDocument = await loadingTask.promise;
        
        setTotalPages(pdfDocument.numPages);
        await renderPage(pdfDocument, currentPage, scale);
        
      } catch (error) {
        console.error('Error loading PDF with PDF.js:', error);
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPDF();
  };

  const renderPage = async (pdfDoc, pageNumber, scaleValue) => {
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: scaleValue });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
    } catch (error) {
      console.error('Error rendering page:', error);
      setUseFallback(true);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (window.pdfjsLib) {
        window.pdfjsLib.getDocument(filePath).promise
          .then(pdfDoc => renderPage(pdfDoc, newPage, scale));
      }
      if (onUserActivity) onUserActivity();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (window.pdfjsLib) {
        window.pdfjsLib.getDocument(filePath).promise
          .then(pdfDoc => renderPage(pdfDoc, newPage, scale));
      }
      if (onUserActivity) onUserActivity();
    }
  };

  const zoomIn = () => {
    const newScale = scale + 0.25;
    setScale(newScale);
    if (window.pdfjsLib) {
      window.pdfjsLib.getDocument(filePath).promise
        .then(pdfDoc => renderPage(pdfDoc, currentPage, newScale));
    }
    if (onUserActivity) onUserActivity();
  };

  const zoomOut = () => {
    const newScale = Math.max(0.5, scale - 0.25);
    setScale(newScale);
    if (window.pdfjsLib) {
      window.pdfjsLib.getDocument(filePath).promise
        .then(pdfDoc => renderPage(pdfDoc, currentPage, newScale));
    }
    if (onUserActivity) onUserActivity();
  };

  const handleCanvasClick = () => {
    if (onUserActivity) onUserActivity();
  };

  // Fallback на обычный iframe если PDF.js не доступен
  if (useFallback) {
    return (
      <div className="pdf-viewer-overlay" onClick={onClose}>
        <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
          <div className="pdf-viewer-header">
            <div className="pdf-navigation-controls">
              <button className="pdf-viewer-close" onClick={onClose}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="pdf-viewer-content">
            <iframe
              src={filePath}
              title="PDF Document"
              className="pdf-iframe"
              frameBorder="0"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-overlay" onClick={onClose}>
      <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-viewer-header">
          <div className="pdf-viewer-controls">
            <button 
              className="pdf-control-btn" 
              onClick={zoomOut}
              disabled={scale <= 0.5}
            >
              <i className="fas fa-search-minus"></i>
            </button>
            
            <span className="page-info">
              Страница {currentPage} из {totalPages}
            </span>
            
            <button 
              className="pdf-control-btn" 
              onClick={zoomIn}
            >
              <i className="fas fa-search-plus"></i>
            </button>
          </div>

          <div className="pdf-navigation-controls">
            <button 
              className="pdf-nav-btn" 
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className="pdf-nav-btn" 
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            <button className="pdf-viewer-close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="pdf-viewer-content" onClick={handleCanvasClick}>
          {isLoading && (
            <div className="pdf-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Загрузка документа...</p>
            </div>
          )}
          
          <div className="pdf-canvas-container">
            <canvas 
              ref={canvasRef} 
              className="pdf-canvas"
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;