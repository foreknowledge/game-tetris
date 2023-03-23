import { useState } from 'react';
import Game from './pages/game/Game';
import Main from './pages/main/Main';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  return !gameStarted ? (
    <Main onGameStart={() => setGameStarted(true)} />
  ) : (
    <Game onBtnBack={() => setGameStarted(false)} />
  );
}

export default App;
