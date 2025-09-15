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
      
      // Разрешаем контекстное меню для инпутов, текстовых полей и элементов с contenteditable
      if (e.target.closest('input, textarea, [contenteditable="true"]')) {
        return;
      }
      
      e.preventDefault();
    };

    const handleSelection = (e) => {
      if (!disableTextSelection) return;
      
      // Разрешаем выделение для инпутов, текстовых полей и элементов с contenteditable
      if (e.target.closest('input, textarea, [contenteditable="true"]')) {
        return;
      }
      
      if (e.ctrlKey || e.metaKey) return;
      
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      if (!disableDrag) return;
      
      // Разрешаем перетаскивание для инпутов, текстовых полей
      if (e.target.closest('input, textarea, [contenteditable="true"]')) {
        return;
      }
      
      e.preventDefault();
    };

    const handleDevTools = (e) => {
      if (enableDevTools) return;
      
      // Блокировка F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Блокировка Ctrl+Shift+I / Cmd+Opt+I
      if (e.key === 'I' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        return false;
      }
      
      // Блокировка Ctrl+U / Cmd+Opt+U
      if (e.key === 'U' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        return false;
      }

      // Блокировка Ctrl+Shift+C / Cmd+Opt+C
      if (e.key === 'C' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        return false;
      }
    };

    // Добавляем обработчики событий
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

    // Убираем обработчики при размонтировании
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelection);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleDevTools);
    };
  }, [disableContextMenu, disableTextSelection, disableDrag, enableDevTools]);
};

export default useGlobalBlocker;