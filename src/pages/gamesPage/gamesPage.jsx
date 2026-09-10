// src/pages/GamesPage/GamesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { games } from '../../data/gamesData';
import './gamesPage.css';

const GamesPage = () => {
  const navigate = useNavigate();

  return (
  <div className="games-page-container">
    <div className="games-grid">
      {games.filter((game) => game.showInGames !== false).map(game => (
        <div key={game.id} className="game-card-wrapper">
          <div className="game-card" onClick={() => navigate(`/games/${game.id}`)}>
            <img
              src={game.image}
              alt={game.title}
              className="game-card-image"
            />
          </div>
          <p className="game-card-title">{game.title}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default GamesPage;
