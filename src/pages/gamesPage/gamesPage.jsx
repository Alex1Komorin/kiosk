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
      image: '/images/gamesIcons/baloon.png',
      path: '/games/balloon'
    },
    {
      id: 'novel',
      title: 'Визуальная новелла',
      image: '/images/gamesIcons/novel.png',
      path: '/games/novel'
    },
    {
      id: 'puzzle',
      title: 'Пазлы к 8 марта',
      image: '/images/gamesIcons/puzzle.png',
      path: '/games/puzzle'
    }
  ];

  return (
  <div className="games-page-container">
    <div className="games-grid">
      {games.map(game => (
        <div key={game.id} className="game-card-wrapper">
          <img 
            src={game.image} 
            alt={game.title} 
            className="game-card-image"
            onClick={() => navigate(game.path)}
          />
          <p className="game-card-title">{game.title}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default GamesPage;