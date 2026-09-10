import React from 'react';
import { useParams } from 'react-router-dom';
import ScaledIframe from '../components/ScaledIframe';
import { getGame } from '../data/gamesData';

const GamePage = () => {
  const { gameId } = useParams();
  const game = getGame(gameId);

  if (!game) {
    return <div>Игра не найдена</div>;
  }

  if (!game.url) {
    return <div>Игра не настроена</div>;
  }

  return <ScaledIframe src={game.url} title={game.title} background={game.background} />;
};

export default GamePage;
