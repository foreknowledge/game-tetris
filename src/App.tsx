import { useContext, useState } from 'react';
import GameContainer from './pages/game/GameContainer';
import Main from './pages/main/Main';
import GameStatus from './types/GameStatus';
import GameStatusContext from './context/GameStatusContext';

function App() {
  const { gameStatus: status } = useContext(GameStatusContext);

  return status === 'idle' ? <Main /> : <GameContainer />;
}

export default App;
