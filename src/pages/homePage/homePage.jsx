// homePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

const GridPage = () => {
  const navigate = useNavigate();

  // Данные для карточек с индивидуальными градиентами
  const cards = [
    { id: 1, image: '/images/homeIcons/расписание.svg', title: 'Расписание', link: 'https://eios.kosgos.ru/', external: true, gradient: 'linear-gradient(135deg, var(--color-green) 0%, var(--color-primary-blue) 100%)' },
    { id: 2, image: '/images/homeIcons/мероприятия.svg', title: 'Мероприятия', link: null, external: false, gradient: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-purple) 100%)' },
    { id: 3, image: '/images/homeIcons/игры.svg', title: 'Приложения', link: '/games', external: false, gradient: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-primary-blue) 100%)' },
    { id: 4, image: '/images/homeIcons/контактная информация.svg', title: 'Контактная информация', link: '/contact', external: false, gradient: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-purple) 100%)' },
    { id: 5, image: '/images/homeIcons/объединения.svg', title: 'Объединения', link: null, external: false, gradient: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-primary-blue) 100%)' },
    { id: 6, image: '/images/homeIcons/о важном.svg', title: 'О важном', link: null, external: false, gradient: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-cyan) 100%)' },
    { id: 7, image: '/images/homeIcons/навигация.svg', title: 'Навигация', link: null, external: false, gradient: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-primary-blue) 100%)' },
  ];

  const handleCardClick = (card) => {
    if (!card.link) {
      console.log('Ссылка пока не добавлена для:', card.title);
      return;
    }

    if (card.external) {
      // Внешняя ссылка - открывается в iframe внутри сайта
      navigate(`/external?url=${encodeURIComponent(card.link)}`);
    } else {
      // Внутренняя ссылка - используем React Router
      navigate(card.link);
    }
  };

  return (
    <div className="page-container">
      <img 
        src="/images/svgFunctionalIcons/pattern.svg" 
        alt="background pattern" 
        className="background-pattern"
      />
      <div className="grid-container">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className={`grid-card ${!card.link ? 'disabled' : ''}`}
            onClick={() => handleCardClick(card)}
            style={{ background: card.gradient }}
          >
            <img src={card.image} alt={card.title} />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridPage;