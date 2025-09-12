import React, { useState, useEffect } from 'react';
import './Index.css';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Массив картинок для слайдера
  const slides = [
    '/images/h1.jpg',
    '/images/h2.jpg',
    '/images/h3.jpg',
    '/images/h4.jpg',
    '/images/h5.jpg',
    '/images/h6.jpg'
  ];

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000); // Смена каждые 4 секунды

    return () => clearInterval(interval);
  }, [slides.length]);

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
      </div>
    </div>
  );
};

export default Index;