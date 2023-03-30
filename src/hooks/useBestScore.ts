import { useCallback, useState } from 'react';
import { loadData, saveData } from '../store/storage';

const BEST_SCORE = 'tetris-best-score';

const useBestScore: () => [number, (score: number) => void] = () => {
  const [bestScore, _setBestScore] = useState<number>(
    loadData(BEST_SCORE) ?? 0
  );

  const setBestScore = useCallback((score: number) => {
    saveData(BEST_SCORE, score);
    _setBestScore(score);
  }, []);

  return [bestScore, setBestScore];
};

export default useBestScore;
