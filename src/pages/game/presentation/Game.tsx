import { useContext } from 'react';
import Button from '../../../components/Button';
import { ScoreState } from '../../../core/logic/ScoreBoard';
import SC from './game.styles';
import GameStatusContext from '../../../context/GameStatusContext';

export type GameProps = {
  bestScore: number;
  scoreState: ScoreState;
};

const Game = ({ bestScore, scoreState }: GameProps) => {
  const { setGameStatus } = useContext(GameStatusContext);
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
