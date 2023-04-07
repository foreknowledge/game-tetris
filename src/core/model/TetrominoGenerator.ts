import { Pos } from '../type/coordinates.types';
import { Type } from '../type/tetromino.types';
import * as T from './Tetromino';

// Type에 따라 Tetromino 데이터 인스턴스 생성
export default function genTetromino(
  type: Type,
  pos: Pos = { x: 0, y: 0 }
): T.TetrominoBase {
  switch (type) {
    case 'Z':
      return new T.TetrominoZ(type, pos);
    case 'L':
      return new T.TetrominoL(type, pos);
    case 'O':
      return new T.TetrominoO(type, pos);
    case 'S':
      return new T.TetrominoS(type, pos);
    case 'I':
      return new T.TetrominoI(type, pos);
    case 'J':
      return new T.TetrominoJ(type, pos);
    case 'T':
      return new T.TetrominoT(type, pos);
  }
}
