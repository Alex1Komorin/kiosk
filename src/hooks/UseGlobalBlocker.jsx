import { useEffect } from 'react';

const useGlobalBlocker = (options = {}) => {
  const {
    disableContextMenu = true,
    disableTextSelection = false,
    disableDrag = false,
    enableDevTools = false
  } = options;

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (!disableContextMenu) return;
      
      // Разрешаем контекстное меню для всех интерактивных элементов
      if (e.target.closest('input, textarea, [contenteditable], select')) {
        return;
      }
      
      e.preventDefault();
    };

    const handleSelection = (e) => {
      if (!disableTextSelection) return;
      
      // Разрешаем выделение для интерактивных элементов
      if (e.target.closest('input, textarea, [contenteditable]')) {
        return;
      }
      
      if (e.ctrlKey || e.metaKey) return;
      
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      if (!disableDrag) return;
      
      if (e.target.closest('input, textarea, [contenteditable]')) {
        return;
      }
      
      e.preventDefault();
    };

    const handleDevTools = (e) => {
      if (enableDevTools) return;
      
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      if (e.key === 'I' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        return false;
      }
      
      if (e.key === 'U' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        return false;
      }
    };

    // Добавляем обработчики
    if (disableContextMenu) {
      document.addEventListener('contextmenu', handleContextMenu);
    }
    
    if (disableTextSelection) {
      document.addEventListener('selectstart', handleSelection);
    }
    
    if (disableDrag) {
      document.addEventListener('dragstart', handleDragStart);
    }
    
    if (!enableDevTools) {
      document.addEventListener('keydown', handleDevTools);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelection);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleDevTools);
    };
  }, [disableContextMenu, disableTextSelection, disableDrag, enableDevTools]);
};

export default useGlobalBlocker;