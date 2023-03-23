import { Pos } from '../type/coordinates.types';

type Matrix = (0 | 1)[][];

export class TetrominoBase {
  matrix: Matrix = [];
  // 외부에서 설정해 주는 값
  position: Pos = { x: -1, y: -1 };
}

export class TetrominoZ extends TetrominoBase {
  matrix: Matrix = [
    [1, 1, 0],
    [0, 1, 1],
  ];
}

export class TetrominoL extends TetrominoBase {
  matrix: Matrix = [
    [1, 0],
    [1, 0],
    [1, 1],
  ];
}

export class TetrominoO extends TetrominoBase {
  matrix: Matrix = [
    [1, 1],
    [1, 1],
  ];
}

export class TetrominoS extends TetrominoBase {
  matrix: Matrix = [
    [0, 1, 1],
    [1, 1, 0],
  ];
}

export class TetrominoI extends TetrominoBase {
  matrix: Matrix = [[1], [1], [1], [1]];
}

export class TetrominoJ extends TetrominoBase {
  matrix: Matrix = [
    [0, 1],
    [0, 1],
    [1, 1],
  ];
}

export class TetrominoT extends TetrominoBase {
  matrix: Matrix = [
    [0, 1, 0],
    [1, 1, 1],
  ];
}
