import {
  TetrominoBase,
  TetrominoI,
  TetrominoJ,
  TetrominoL,
  TetrominoO,
  TetrominoS,
  TetrominoT,
  TetrominoZ,
} from './Tetromino';
import { Type } from '../type/tetromino.types';

// Type에 따라 Tetromino 데이터 인스턴스 생성
export default function genTetromino(type: Type): TetrominoBase {
  switch (type) {
    case 'Z':
      return new TetrominoZ(type);
    case 'L':
      return new TetrominoL(type);
    case 'O':
      return new TetrominoO(type);
    case 'S':
      return new TetrominoS(type);
    case 'I':
      return new TetrominoI(type);
    case 'J':
      return new TetrominoJ(type);
    case 'T':
      return new TetrominoT(type);
  }
}
