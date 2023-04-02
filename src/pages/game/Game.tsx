import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import GameStatusContext from '../../context/GameStatusContext';
import { ScoreState } from '../../core/logic/ScoreBoard';
import Tetris from '../../core/logic/Tetris';
import useBestScore from '../../hooks/useBestScore';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import SC from './game.styles';

const Game = () => {
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const { current: tetris } = useRef<Tetris>(new Tetris());
  let { current: gameCanvas } = useRef<GameCanvas>();
  let { current: previewCanvas } = useRef<PreviewCanvas>();

  const [scoreState, setScoreState] = useState<ScoreState>(
    tetris.scoreBoard.state
  );
  const [bestScore, setBestScore] = useBestScore();

  useEffect(() => {
    // React.StrictMode에서도 인스턴스 한 번만 생성
    if (gameCanvas && previewCanvas) return;
    gameCanvas = new GameCanvas(tetris);
    previewCanvas = new PreviewCanvas(tetris);

    addKeyEventListener(tetris, () =>
      setGameStatus((before) => {
        if (before === 'playing') return 'paused';
        if (before === 'paused') return 'playing';
        return before;
      })
    );

    tetris.scoreBoard.onStateChanged = (state) => {
      setScoreState(state);
      if (state.score > bestScore) setBestScore(state.score);
    };
    tetris.start();
  }, []);

  useEffect(() => {
    // 게임 상태에 맞춰 tetris 상태 변경
    if (gameStatus === 'playing') tetris.resume();
    else if (gameStatus === 'paused') tetris.pause();
  }, [gameStatus]);

  return (
    <SC.Container>
      <SC.Section />
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
        <Button
          style={{ marginTop: '2em' }}
          onClick={() => setGameStatus('paused')}
        >
          PAUSE
        </Button>
      </SC.Section>
    </SC.Container>
  );
};

export default Game;

function addKeyEventListener(tetris: Tetris, togglePause: () => void) {
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
        togglePause();
        break;
    }
  });
}
