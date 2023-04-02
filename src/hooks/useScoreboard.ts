import { useState } from 'react';
import { ScoreState } from '../core/logic/ScoreBoard';
import useBestScore from './useBestScore';

type ReturnType = [
  scoreState: ScoreState,
  setScoreState: (scoreState: ScoreState) => void,
  bestScore: number
];

const useScoreboard = (initialState: ScoreState): ReturnType => {
  const [scoreState, _setScoreState] = useState<ScoreState>(initialState);
  const [bestScore, setBestScore] = useBestScore();

  const setScoreState = (scoreState: ScoreState) => {
    _setScoreState(scoreState);
    if (scoreState.score > bestScore) setBestScore(scoreState.score);
  };

  return [scoreState, setScoreState, bestScore];
};

export default useScoreboard;
