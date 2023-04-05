import { ScoreState } from '../../core/logic/ScoreBoard';
import Dialog from '../molecules/dialog/Dialog';
import GameStates from './GameStates';

type Props = {
  scoreState: ScoreState;
  onRestart: () => void;
  onQuit: () => void;
};

const GameOverDialog = ({ scoreState, onRestart, onQuit }: Props) => {
  return (
    <Dialog>
      <Dialog.Title>GAME OVER</Dialog.Title>
      <GameStates.Group>
        <GameStates label="Level" score={scoreState.level} />
        <GameStates label="Score" score={scoreState.score} />
        <GameStates label="Lines" score={scoreState.lines} />
      </GameStates.Group>
      <Dialog.Button onClick={onRestart}>RESTART</Dialog.Button>
      <Dialog.Button onClick={onQuit}>QUIT</Dialog.Button>
    </Dialog>
  );
};

export default GameOverDialog;
