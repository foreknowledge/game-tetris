import { createContext } from 'react';
import GameStatus from '../types/GameStatus';

const GameStatusContext = createContext<{
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}>({ gameStatus: 'idle', setGameStatus: () => {} });

export default GameStatusContext;
