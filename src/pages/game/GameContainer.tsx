import { useContext, useEffect, useState } from 'react';
import GameOverDialog from '../../components/organisms/GameOverDialog';
import HelpDialog from '../../components/organisms/HelpDialog';
import PausedDialog from '../../components/organisms/PausedDialog';
import GameStatusContext from '../../context/GameStatusContext';
import Tetris from '../../core/logic/Tetris';
import useScoreboard from '../../hooks/useScoreboard';
import GameCanvas from './canvas/GameCanvas';
import PreviewCanvas from './canvas/PreviewCanvas';
import createKeyEventListener from './listener/createKeyEventListener';
import Game from './presenter/Game';

const GameContainer = () => {
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const [tetris, setTetris] = useState<Tetris>(new Tetris());
  const [scoreState, setScoreState, bestScore] = useScoreboard(
    tetris.scoreBoard.state
  );
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // 캔버스 생성
    new GameCanvas(tetris);
    new PreviewCanvas(tetris);

    // 테트리스 초기화
    tetris.scoreBoard.onStateChanged = setScoreState;
    tetris.onGameOver = () => setGameStatus('over');
    tetris.start();

    // 점수 초기화
    setScoreState(tetris.scoreBoard.state);

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

    if (gameStatus !== 'paused') setShowHelp(false);
  }, [gameStatus]);

  const handleRestart = () => {
    setTetris(new Tetris());
    setGameStatus('playing');
  };

  const handleQuit = () => {
    const answer = confirm('게임을 종료하시겠습니까?');
    if (answer) setGameStatus('idle');
  };

  return (
    <>
      <Game
        bestScore={bestScore}
        scoreState={scoreState}
        onPaused={() => setGameStatus('paused')}
      />
      {gameStatus === 'paused' && (
        <PausedDialog
          onResume={() => setGameStatus('playing')}
          onRestart={handleRestart}
          onHelp={() => setShowHelp(true)}
          onQuit={handleQuit}
        />
      )}
      {gameStatus === 'over' && (
        <GameOverDialog
          scoreState={scoreState}
          onRestart={handleRestart}
          onQuit={handleQuit}
        />
      )}
      {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default GameContainer;
