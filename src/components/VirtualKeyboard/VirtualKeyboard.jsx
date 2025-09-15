// components/VirtualKeyboard/VirtualKeyboard.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import './VirtualKeyboard.css';

const VirtualKeyboard = () => {
  const keyboardRef = useRef(null);
  const keyboardInstance = useRef(null);
  const currentInput = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState('russian');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const layouts = {
    russian: {
      default: [
        'ё 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        'й ц у к е н г ш щ з х ъ',
        'ф ы в а п р о л д ж э',
        '{shift} я ч с м и т ь б ю . {enter}',
        '{lang} {space} {hide}'
      ]
    },
    english: {
      default: [
        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        'q w e r t y u i o p [ ] \\',
        'a s d f g h j k l ; \' {enter}',
        '{shift} z x c v b n m , . /',
        '{lang} {space} {hide}'
      ]
    }
  };

  const display = {
    '{bksp}': '⌫',
    '{space}': 'Пробел',
    '{enter}': 'Enter',
    '{shift}': 'Shift',
    '{lang}': 'EN/RU',
    '{hide}': '✕'
  };

  // Инициализация клавиатуры после монтирования компонента
  const initializeKeyboard = useCallback(() => {
    if (!keyboardRef.current || keyboardInstance.current) return;

    try {
      keyboardInstance.current = new Keyboard(keyboardRef.current, {
        layout: layouts[currentLanguage],
        display: display,
        theme: "hg-theme-default hg-layout-default",
        buttonTheme: [
          {
            class: "hg-functionBtn",
            buttons: "{lang} {hide} {shift} {enter}"
          }
        ],
        physicalKeyboardHighlight: false,
        preventMouseDownDefault: true
      });

      keyboardInstance.current.onKeyPress = (button) => {
        if (!currentInput.current) return;

        switch (button) {
          case "{bksp}":
            handleBackspace();
            break;
          case "{space}":
            handleInput(" ");
            break;
          case "{enter}":
            handleEnter();
            break;
          case "{shift}":
            handleShift();
            break;
          case "{lang}":
            toggleLanguage();
            break;
          case "{hide}":
            hideKeyboard();
            break;
          default:
            handleInput(button);
        }
      };
    } catch (error) {
      console.error('Keyboard initialization error:', error);
    }
  }, [currentLanguage]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && keyboardRef.current) {
      initializeKeyboard();
    }
  }, [isMounted, initializeKeyboard]);

  useEffect(() => {
    if (!isMounted) return;

    const addInputListeners = () => {
      const inputs = document.querySelectorAll(
        'input[type="text"], input[type="search"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]'
      );

      inputs.forEach(input => {
        if (!input.hasListener) {
          input.addEventListener('focus', handleInputFocus);
          input.addEventListener('blur', handleInputBlur);
          input.addEventListener('click', handleInputClick);
          input.hasListener = true;
        }
      });
    };

    const handleInputFocus = (e) => {
      currentInput.current = e.target;
      if (keyboardInstance.current) {
        keyboardInstance.current.setInput(e.target.value || '');
      }
      showKeyboard();
    };

    const handleInputClick = (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) {
        currentInput.current = e.target;
        if (keyboardInstance.current) {
          keyboardInstance.current.setInput(e.target.value || '');
        }
        showKeyboard();
      }
    };

    const handleInputBlur = () => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (!activeElement || !activeElement.matches('input, textarea, [contenteditable="true"]')) {
          hideKeyboard();
          currentInput.current = null;
        }
      }, 150);
    };

    // Инициализация слушателей
    addInputListeners();

    // Observer для динамически добавляемых элементов
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        setTimeout(addInputListeners, 100);
      }
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
      const inputs = document.querySelectorAll(
        'input[type="text"], input[type="search"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]'
      );
      inputs.forEach(input => {
        if (input.hasListener) {
          input.removeEventListener('focus', handleInputFocus);
          input.removeEventListener('blur', handleInputBlur);
          input.removeEventListener('click', handleInputClick);
          delete input.hasListener;
        }
      });
    };
  }, [isMounted]);

  const handleInput = (character) => {
    if (!currentInput.current) return;

    const cursorPosition = currentInput.current.selectionStart || 0;
    const currentValue = currentInput.current.value || '';
    
    const newValue = currentValue.slice(0, cursorPosition) + character + currentValue.slice(cursorPosition);
    currentInput.current.value = newValue;
    
    setTimeout(() => {
      if (currentInput.current) {
        currentInput.current.selectionStart = cursorPosition + character.length;
        currentInput.current.selectionEnd = cursorPosition + character.length;
      }
    }, 0);

    triggerInputEvent();
  };

  const handleBackspace = () => {
    if (!currentInput.current) return;

    const cursorPosition = currentInput.current.selectionStart || 0;
    if (cursorPosition === 0) return;

    const currentValue = currentInput.current.value || '';
    const newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
    currentInput.current.value = newValue;
    
    setTimeout(() => {
      if (currentInput.current) {
        currentInput.current.selectionStart = cursorPosition - 1;
        currentInput.current.selectionEnd = cursorPosition - 1;
      }
    }, 0);

    triggerInputEvent();
  };

  const handleEnter = () => {
    if (!currentInput.current) return;
    
    if (currentInput.current.tagName === 'TEXTAREA' || currentInput.current.getAttribute('contenteditable') === 'true') {
      handleInput('\n');
    } else {
      // Для input - скрываем клавиатуру
      hideKeyboard();
      currentInput.current.blur();
    }
  };

  const handleShift = () => {
    // Можно добавить логику shift при необходимости
    console.log('Shift pressed');
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'russian' ? 'english' : 'russian';
    setCurrentLanguage(newLanguage);
    
    if (keyboardInstance.current) {
      try {
        keyboardInstance.current.setOptions({
          layout: layouts[newLanguage]
        });
      } catch (error) {
        console.error('Error changing layout:', error);
      }
    }
  };

  const triggerInputEvent = () => {
    if (!currentInput.current) return;
    
    const event = new Event('input', { bubbles: true });
    currentInput.current.dispatchEvent(event);
    
    const changeEvent = new Event('change', { bubbles: true });
    currentInput.current.dispatchEvent(changeEvent);
  };

  const showKeyboard = () => {
    setIsVisible(true);
  };

  const hideKeyboard = () => {
    setIsVisible(false);
    currentInput.current = null;
  };

  // Если компонент не смонтирован или клавиатура скрыта - не рендерим DOM
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div className="virtual-keyboard-container">
      <div 
        ref={keyboardRef} 
        className="simple-keyboard"
        style={{ display: isVisible ? 'block' : 'none' }}
      />
    </div>
  );
};

export default VirtualKeyboard;