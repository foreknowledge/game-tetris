import { Pos, Transform } from '../type/coordinates.types';
import Matrix from './Matrix';

export abstract class TetrominoBase {
  representNum: number = -1;
  matrix: Matrix = new Matrix([]);

  // tetromino의 좌상단 좌표
  position: Pos = { x: 0, y: 0 };

  transform({ dx, dy, rotR, rotL }: Transform) {
    if (dx) this.position.x += dx;
    if (dy) this.position.y += dy;
    if (rotR) this.rotateRight();
    if (rotL) this.rotateLeft();
  }

  rotateRight(times: number = 1) {
    this.matrix.rotateRight(times);
  }

  rotateLeft(times: number = 1) {
    this.matrix.rotateLeft(times);
  }

  duplicate(): TetrominoBase {
    return this;
  }

  _copyProps(tetromino: TetrominoBase) {
    tetromino.matrix = this.matrix.duplicate();
    tetromino.position = { ...this.position };
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
  representNum = 1;
  matrix = new Matrix([
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoZ();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoL extends TetrominoBase {
  representNum = 2;
  matrix = new Matrix([
    [0, 0, 2],
    [2, 2, 2],
    [0, 0, 0],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoL();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoO extends TetrominoBase {
  representNum = 3;
  matrix = new Matrix([
    [3, 3],
    [3, 3],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoO();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoS extends TetrominoBase {
  representNum = 4;
  matrix = new Matrix([
    [0, 0, 0],
    [0, 4, 4],
    [4, 4, 0],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoS();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoI extends TetrominoBase {
  representNum = 5;
  matrix = new Matrix([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [5, 5, 5, 5],
    [0, 0, 0, 0],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoI();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoJ extends TetrominoBase {
  representNum = 6;
  matrix = new Matrix([
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoJ();
    this._copyProps(tetromino);
    return tetromino;
  }
}

export class TetrominoT extends TetrominoBase {
  representNum = 7;
  matrix = new Matrix([
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ]);

  duplicate(): TetrominoBase {
    const tetromino = new TetrominoT();
    this._copyProps(tetromino);
    return tetromino;
  }
}
