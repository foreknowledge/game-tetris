import { randomItem } from '../../utils/random';
import * as T from '../model/Tetromino';
import { TetrominoBase } from '../model/Tetromino';

/**
 * 다음 Tetromino 생성기
 */
export default class TetrominoGenerator {
  private bag: Set<Type> = new Set(ALL_TYPES);

  next(): TetrominoBase {
    if (this.bag.size === 0) this.bag = new Set(ALL_TYPES);

    const nextType = randomItem([...this.bag]);
    this.bag.delete(nextType);

    return genTetromino(nextType);
  }
}

// Tetromino 블럭의 종류
type Type = 'Z' | 'L' | 'O' | 'S' | 'I' | 'J' | 'T';
const ALL_TYPES: readonly Type[] = ['Z', 'L', 'O', 'S', 'I', 'J', 'T'];

// Type에 따라 Tetromino 데이터 인스턴스 생성
function genTetromino(type: Type): T.TetrominoBase {
  switch (type) {
    case 'Z':
      return new T.TetrominoZ();
    case 'L':
      return new T.TetrominoL();
    case 'O':
      return new T.TetrominoO();
    case 'S':
      return new T.TetrominoS();
    case 'I':
      return new T.TetrominoI();
    case 'J':
      return new T.TetrominoJ();
    case 'T':
      return new T.TetrominoT();
  }
}
