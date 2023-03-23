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
      return new TetrominoZ();
    case 'L':
      return new TetrominoL();
    case 'O':
      return new TetrominoO();
    case 'S':
      return new TetrominoS();
    case 'I':
      return new TetrominoI();
    case 'J':
      return new TetrominoJ();
    case 'T':
      return new TetrominoT();
  }
}
