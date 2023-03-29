import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import { ScoreState } from '../../core/logic/ScoreBoard';
import Tetris from '../../core/logic/Tetris';
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

  const [scoreState, setScoreState] = useState<ScoreState>(
    tetris.scoreBoard.state
  );

  useEffect(() => {
    // React.StrictMode에서도 인스턴스 한 번만 생성
    if (!gameCanvas || !previewCanvas) {
      addKeyEventListener(tetris);
      tetris.scoreBoard.onStateChanged = (state) => setScoreState({ ...state });
      tetris.start();

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
            <SC.Number>{scoreState.level}</SC.Number>
          </SC.State>
          <SC.State>
            <span>Score</span>
            <SC.Number>{scoreState.score}</SC.Number>
          </SC.State>
          <SC.State>
            <span>Lines</span>
            <SC.Number>{scoreState.lines}</SC.Number>
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
        tetris.pause();
        break;
      case '1':
        tetris.start();
        break;
    }
  });
}
