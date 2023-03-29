import { Pos } from '../type/coordinates.types';
import { Type } from '../type/tetromino.types';
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

// Type에 따라 Tetromino 데이터 인스턴스 생성
export default function genTetromino(
  type: Type,
  pos: Pos = { x: 0, y: 0 }
): TetrominoBase {
  switch (type) {
    case 'Z':
      return new TetrominoZ(type, pos);
    case 'L':
      return new TetrominoL(type, pos);
    case 'O':
      return new TetrominoO(type, pos);
    case 'S':
      return new TetrominoS(type, pos);
    case 'I':
      return new TetrominoI(type, pos);
    case 'J':
      return new TetrominoJ(type, pos);
    case 'T':
      return new TetrominoT(type, pos);
  }
}
