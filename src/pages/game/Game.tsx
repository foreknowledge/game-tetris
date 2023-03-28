import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Tetris, { GameState, INITIAL_STATE } from '../../core/logic/Tetris';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import SC from './game.styles';

interface GameProps {
  onBtnBack: () => void;
}

const Game = ({ onBtnBack }: GameProps) => {
  const { current: tetris } = useRef<Tetris>(new Tetris());
  let { current: gameCanvas } = useRef<GameCanvas>();
  let { current: previewCanvas } = useRef<PreviewCanvas>();

  const [gameState, setGameState] = useState<GameState>({ ...INITIAL_STATE });

  useEffect(() => {
    // React.StrictMode에서도 인스턴스 한 번만 생성
    if (!gameCanvas || !previewCanvas) {
      addKeyEventListener(tetris);
      tetris.onGameStateChanged = (state) => setGameState({ ...state });
      tetris.gameStart();

      gameCanvas = new GameCanvas(tetris);
      previewCanvas = new PreviewCanvas(tetris);
    }
  }, []);

  const handleBack = () => {
    const answer = confirm('게임을 종료하시겠습니까?');
    if (answer) {
      onBtnBack();
    }
  };

  return (
    <SC.Container>
      <SC.Section>
        <Button onClick={handleBack}>{`< BACK`}</Button>
      </SC.Section>
      <SC.Section>
        <SC.GameCanvas id="game-canvas" />
      </SC.Section>
      <SC.Section>
        <SC.PreviewCanvas id="preview-canvas" />
        <SC.GameStates>
          <SC.State>
            <span>Level</span>
            <SC.Number>{gameState.level}</SC.Number>
          </SC.State>
          <SC.State>
            <span>Score</span>
            <SC.Number>{gameState.score}</SC.Number>
          </SC.State>
          <SC.State>
            <span>Lines</span>
            <SC.Number>{gameState.lines}</SC.Number>
          </SC.State>
        </SC.GameStates>
      </SC.Section>
    </SC.Container>
  );
};

export default Game;

function addKeyEventListener(tetris: Tetris) {
  addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        tetris.moveLeft();
        break;
      case 'ArrowRight':
        tetris.moveRight();
        break;
      case 'ArrowDown':
        tetris.moveDown();
        break;
      case 'ArrowUp':
        tetris.rotateRight();
        break;
      case 'z' || 'Z':
        tetris.rotateLeft();
        break;
      case 'Escape':
        tetris.gamePause();
        break;
      case '1':
        tetris.gameStart();
        break;
    }
  });
}
