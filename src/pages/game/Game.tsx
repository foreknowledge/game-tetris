import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import { ScoreState } from '../../core/logic/ScoreBoard';
import Tetris from '../../core/logic/Tetris';
import useBestScore from '../../hooks/useBestScore';
import GameStatus from '../../types/GameStatus';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import SC from './game.styles';

interface GameProps {
  setGameStatus: (status: GameStatus) => void;
}

const Game = ({ setGameStatus }: GameProps) => {
  const { current: tetris } = useRef<Tetris>(new Tetris());
  let { current: gameCanvas } = useRef<GameCanvas>();
  let { current: previewCanvas } = useRef<PreviewCanvas>();

  const [scoreState, setScoreState] = useState<ScoreState>(
    tetris.scoreBoard.state
  );
  const [bestScore, setBestScore] = useBestScore();

  useEffect(() => {
    // React.StrictMode에서도 인스턴스 한 번만 생성
    if (!gameCanvas || !previewCanvas) {
      addKeyEventListener(tetris);

      tetris.scoreBoard.onStateChanged = (state) => {
        setScoreState(state);
        if (state.score > bestScore) setBestScore(state.score);
      };
      tetris.start();

      gameCanvas = new GameCanvas(tetris);
      previewCanvas = new PreviewCanvas(tetris);
    }
  }, []);

  const handleBack = () => {
    const answer = confirm('게임을 종료하시겠습니까?');
    if (answer) setGameStatus('idle');
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
            <SC.Label>Best Score</SC.Label>
            <SC.Number>{bestScore}</SC.Number>
          </SC.State>
        </SC.GameStates>
        <SC.GameStates>
          <SC.State>
            <SC.Label>Level</SC.Label>
            <SC.Number>{scoreState.level}</SC.Number>
          </SC.State>
          <SC.State>
            <SC.Label>Score</SC.Label>
            <SC.Number>{scoreState.score}</SC.Number>
          </SC.State>
          <SC.State>
            <SC.Label>Lines</SC.Label>
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
        tetris.softDrop();
        break;
      case ' ':
        tetris.hardDrop();
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
        tetris.resume();
        break;
    }
  });
}
