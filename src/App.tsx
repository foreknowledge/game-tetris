import { useContext } from 'react';
import GameStatusContext from './context/GameStatusContext';
import GameContainer from './pages/game/GameContainer';
import Main from './pages/main/Main';

function App() {
  const { gameStatus: status } = useContext(GameStatusContext);

  return status === 'idle' ? <Main /> : <GameContainer />;
}

export default App;
