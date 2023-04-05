import { useState } from 'react';
import GameStatus from '../types/GameStatus';
import GameStatusContext from './GameStatusContext';

type Props = {
  children: React.ReactNode;
};

const GameStatusProvider = ({ children }: Props) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusProvider;
