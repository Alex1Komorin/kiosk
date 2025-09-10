import React, { useState, useEffect } from 'react';
import './Index.css';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Массив картинок для слайдера
  const slides = [
    '/images/home_image.jpg',
    '/images/home_page_2.jpg',
    '/images/home_page_3.jpg',
    '/images/home_page_4.jpg'
  ];

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000); // Смена каждые 4 секунды

    return () => clearInterval(interval);
  }, [slides.length]);

  // Функция для перехода к конкретному слайду
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Функция для перехода к следующему слайду
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  // Функция для перехода к предыдущему слайду
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="index-container">
      <div className="slider-container">
        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
        </div>

        {/* Кнопки навигации */}
        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-btn next-btn" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Индикаторы слайдов */}
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Текст поверх слайдера */}
        <div className="slider-content">
          <h1>Добро пожаловать</h1>
          <p>Информационная система</p>
          <div className="slider-info">
            <p><i className="fas fa-desktop"></i> Размер экрана: 2160x3840 пикселей</p>
            <p><i className="fas fa-clock"></i> Сессия автоматически завершается после 3 минут бездействия</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;