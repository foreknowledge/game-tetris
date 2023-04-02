import { useState } from 'react';
import GameStatusContext from './GameStatusContext';
import GameStatus from '../types/GameStatus';

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
