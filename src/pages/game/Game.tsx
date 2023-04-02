import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import GameStatusContext from '../../context/GameStatusContext';
import Tetris from '../../core/logic/Tetris';
import useScoreboard from '../../hooks/useScoreboard';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import SC from './game.styles';

const Game = () => {
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const [tetris] = useState<Tetris>(new Tetris());
  let { current: gameCanvas } = useRef<GameCanvas>();
  let { current: previewCanvas } = useRef<PreviewCanvas>();

  const [scoreState, setScoreState, bestScore] = useScoreboard(
    tetris.scoreBoard.state
  );

  useEffect(() => {
    // 캔버스 초기화
    gameCanvas = new GameCanvas(tetris);
    previewCanvas = new PreviewCanvas(tetris);

    // 테트리스 초기화
    tetris.scoreBoard.onStateChanged = setScoreState;
    tetris.start();

    // 키보드 이벤트 설정
    const keyEventListener = createKeyEventListener(tetris, () =>
      setGameStatus((before) => {
        if (before === 'playing') return 'paused';
        if (before === 'paused') return 'playing';
        return before;
      })
    );
    addEventListener('keydown', keyEventListener);

    return () => {
      // 키보드 이벤트 제거
      removeEventListener('keydown', keyEventListener);
    };
  }, [tetris]);

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

function createKeyEventListener(tetris: Tetris, togglePause: () => void) {
  return (e: KeyboardEvent) => {
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
  };
}
