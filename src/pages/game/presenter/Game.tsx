import Button from '../../../components/atoms/Button';
import GameStates from '../../../components/organisms/GameStates';
import { ScoreState } from '../../../core/logic/ScoreBoard';
import SC from './game.styles';

export type GameProps = {
  bestScore: number;
  scoreState: ScoreState;
  onPaused: () => void;
};

const Game = ({ bestScore, scoreState, onPaused }: GameProps) => {
  return (
    <SC.Container>
      <SC.Section />
      <SC.Section>
        <SC.GameCanvas id="game-canvas" />
      </SC.Section>
      <SC.Section>
        <SC.PreviewCanvas id="preview-canvas" style={{ margin: '1em 0' }} />
        <GameStates.Group>
          <GameStates label="Best Score" score={bestScore} fontSize="small" />
        </GameStates.Group>
        <GameStates.Group>
          <GameStates label="Level" score={scoreState.level} fontSize="small" />
          <GameStates label="Score" score={scoreState.score} fontSize="small" />
          <GameStates label="Lines" score={scoreState.lines} fontSize="small" />
        </GameStates.Group>
        <Button style={{ margin: '1em 0' }} onClick={onPaused}>
          PAUSE
        </Button>
      </SC.Section>
    </SC.Container>
  );
};

export default Game;
