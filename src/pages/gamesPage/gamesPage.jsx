// src/pages/GamesPage/GamesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gamesPage.css';

const GamesPage = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'balloon',
      title: 'Воздушные шарики',
      description: 'Собери IT-поздравления с 8 Марта!',
      icon: '🎈',
      color: '#ff4d9d',
      path: '/games/balloon'
    },
    {
      id: 'novel',
      title: 'Визуальная новелла',
      description: 'Интерактивная история с выбором решений',
      icon: '📖',
      color: '#5f27cd',
      path: '/games/novel'
    },
    {
      id: 'puzzle',
      title: 'Пазлы',
      description: 'Собери картинку с роботами к 8 Марта',
      icon: '🧩',
      color: '#48dbfb',
      path: '/games/puzzle'
    }
  ];

  return (
    <div className="games-page-container">
      <div className="games-page-header">
        <h1 className="games-page-title">
          <i className="fas fa-gamepad"></i>
          Игры
        </h1>
        <p className="games-page-subtitle">Выберите игру для хорошего настроения</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <div
            key={game.id}
            className="game-card"
            style={{ '--game-color': game.color }}
            onClick={() => navigate(game.path)}
          >
            <div className="game-card-icon">{game.icon}</div>
            <div className="game-card-content">
              <h3 className="game-card-title">{game.title}</h3>
              <p className="game-card-description">{game.description}</p>
            </div>
            <div className="game-card-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;