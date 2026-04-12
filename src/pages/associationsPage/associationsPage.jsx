// src/pages/SliderPage/SliderPage.jsx
import React, { useState } from 'react';
import './/associationsPage.css';

const SliderPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Массив с изображениями (замените на свои ссылки)
  const images = [
    'assotiations/project/e-sport.png',
    'assotiations/project/it-pro.png',
    'assotiations/project/cyber-druzina.png',
    'assotiations/project/3d-vr.png',
    'assotiations/project/ol-math.png',
    'assotiations/project/sport-proga.png',
    'assotiations/student/media.jpg',
    'assotiations/student/play.png',
    'assotiations/student/mask.png',
    'assotiations/student/idea.png',
    'assotiations/student/study.png',
    'assotiations/student/volunteers.png',
    'assotiations/student/tutors.png',
  ];

  const goPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Обработка клавиш клавиатуры
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="slider-container">
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className="slider-image"
      />
      
      <button className="slider-button prev" onClick={goPrev}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
      
      <button className="slider-button next" onClick={goNext}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>

      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderPage;