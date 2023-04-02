import { createContext } from 'react';
import GameStatus from '../types/GameStatus';

const GameStatusContext = createContext<{
  gameStatus: GameStatus;
  setGameStatus: (status: GameStatus) => void;
}>({ gameStatus: 'idle', setGameStatus: () => {} });

export default GameStatusContext;
