import { useContext, useState } from 'react';
import Game from './pages/game/Game';
import Main from './pages/main/Main';
import GameStatus from './types/GameStatus';
import GameStatusContext from './context/GameStatusContext';

function App() {
  const { gameStatus: status } = useContext(GameStatusContext);

  return status === 'idle' ? <Main /> : <Game />;
}

export default App;
