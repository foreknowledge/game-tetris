import SC from './game.styles';

interface GameProps {
  onBtnBack: () => void;
}

const Game = ({ onBtnBack }: GameProps) => {
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
