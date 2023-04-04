import { useContext, useEffect, useRef, useState } from 'react';
import GameStatusContext from '../../context/GameStatusContext';
import Tetris from '../../core/logic/Tetris';
import useScoreboard from '../../hooks/useScoreboard';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import Game from './presentation/Game';
import createKeyEventListener from './listener/createKeyEventListener';
import PauseDialog from '../../components/dialog/PauseDialog';

const GameContainer = () => {
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
    <>
      <Game bestScore={bestScore} scoreState={scoreState} />
      {gameStatus === 'paused' && <PauseDialog />}
    </>
  );
};

export default GameContainer;
