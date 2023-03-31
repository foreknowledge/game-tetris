import { useState } from 'react';
import Game from './pages/game/Game';
import Main from './pages/main/Main';
import GameStatus from './types/GameStatus';

function App() {
  const [status, setStatus] = useState<GameStatus>('idle');

  return status === 'idle' ? (
    <Main setGameStatus={setStatus} />
  ) : (
    <Game setGameStatus={setStatus} />
  );
}

export default App;
