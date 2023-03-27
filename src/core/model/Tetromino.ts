import { Pos, Transform } from '../type/coordinates.types';
import { Type } from '../type/tetromino.types';
import Matrix from './Matrix';
import genTetromino from './TetrominoGenerator';

export abstract class TetrominoBase {
  type: Type;
  matrix: Matrix = new Matrix([]);

  // 외부에서 설정해 주는 값
  position: Pos = { x: -1, y: -1 };

  constructor(type: Type) {
    this.type = type;
  }

  transform({ dx, dy, rotR, rotL }: Transform) {
    if (dx) this.position.x += dx;
    if (dy) this.position.y += dy;
    if (rotR) this.rotateRight();
    if (rotL) this.rotateLeft();
  }

  rotateRight() {
    this.matrix.rotateRight();
  }

  rotateLeft() {
    this.matrix.rotateLeft();
  }

  duplicate(): TetrominoBase {
    const newTetromino = genTetromino(this.type);
    newTetromino.matrix = this.matrix.duplicate();
    newTetromino.position = { ...this.position };

    return newTetromino;
  }

  findFloorCoords(): Pos[] {
    const floors: Pos[] = [];

    outer: for (let x = 0; x < this.matrix.width; x++) {
      for (let y = this.matrix.height - 1; y >= 0; y--) {
        if (this.matrix.get(x, y) != 0) {
          floors.push({ x, y });
          continue outer;
        }
      }
    }
    return floors;
  }
}

export class TetrominoZ extends TetrominoBase {
  matrix = new Matrix([
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ]);
}

export class TetrominoL extends TetrominoBase {
  matrix = new Matrix([
    [0, 0, 2],
    [2, 2, 2],
    [0, 0, 0],
  ]);
}

export class TetrominoO extends TetrominoBase {
  matrix = new Matrix([
    [3, 3],
    [3, 3],
  ]);
}

export class TetrominoS extends TetrominoBase {
  matrix = new Matrix([
    [0, 0, 0],
    [0, 4, 4],
    [4, 4, 0],
  ]);
}

export class TetrominoI extends TetrominoBase {
  matrix = new Matrix([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [5, 5, 5, 5],
    [0, 0, 0, 0],
  ]);
}

export class TetrominoJ extends TetrominoBase {
  matrix = new Matrix([
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0],
  ]);
}

export class TetrominoT extends TetrominoBase {
  matrix = new Matrix([
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ]);
}
