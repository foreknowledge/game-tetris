import { useEffect, useRef } from 'react';
import GameCanvas from './canvas/GameCanvas';
import SC from './game.styles';

interface GameProps {
  onBtnBack: () => void;
}

const Game = ({ onBtnBack }: GameProps) => {
  let { current: gameCanvas } = useRef<GameCanvas>();

  useEffect(() => {
    if (!gameCanvas) {
      // React.StrictMode에서도 인스턴스 한 번만 생성
      gameCanvas = new GameCanvas();
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
      <SC.GameCanvas id="game-canvas" />
      <SC.BackButton onClick={handleBack}>{`< BACK`}</SC.BackButton>
    </SC.Container>
  );
};

export default Game;
