import { useEffect } from 'react';

// Хук для блокировки ПКМ, выделения текста и перетаскивания
const useGlobalBlocker = (options = {}) => {
  const {
    disableContextMenu = true,
    disableTextSelection = false,
    disableDrag = false,
    enableDevTools = false
  } = options;

  useEffect(() => {
    // Функция для блокировки контекстного меню
    const handleContextMenu = (e) => {
      if (!disableContextMenu) return;
      e.preventDefault();
      
      // Дополнительная логика при блокировке (опционально)
      if (e.target.tagName === 'IMG') {
        console.log('Защита изображений: контекстное меню заблокировано');
      }
    };

    // Функция для блокировки выделения текста
    const handleSelection = (e) => {
      if (!disableTextSelection) return;
      
      // Разрешаем стандартное поведение для комбинаций клавиш
      if (e.ctrlKey || e.metaKey) return;
      
      e.preventDefault();
    };

    // Функция для блокировки перетаскивания
    const handleDragStart = (e) => {
      if (!disableDrag) return;
      
      // Разрешаем перетаскивание для элементов ввода
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      e.preventDefault();
    };

    // Функция для блокировки DevTools (не полностью надежно)
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