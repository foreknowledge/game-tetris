import { Pos } from '../type/coordinates.types';

type Matrix = number[][];

export abstract class TetrominoBase {
  _matrices: Matrix[] = [];
  _curIdx = 0;

  // 외부에서 설정해 주는 값
  position: Pos = { x: -1, y: -1 };

  getMatrix() {
    return this._matrices[this._curIdx];
  }

  rotateRight(times: number = 1) {
    this._curIdx = (this._curIdx + times) % this._matrices.length;
    return this.getMatrix();
  }

  rotateLeft(times: number = 1) {
    const length = this._matrices.length;
    const _times = times % length;
    this._curIdx = (this._curIdx + length - _times) % length;
    return this.getMatrix();
  }
}

export class TetrominoZ extends TetrominoBase {
  constructor() {
    super();

    this._matrices = [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
    ];
  }
}

export class TetrominoL extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [0, 0, 2],
        [2, 2, 2],
        [0, 0, 0],
      ],
      [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ],
      [
        [0, 0, 0],
        [2, 2, 2],
        [2, 0, 0],
      ],
      [
        [2, 2, 0],
        [0, 2, 0],
        [0, 2, 0],
      ],
    ];
  }
}

export class TetrominoO extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [3, 3],
        [3, 3],
      ],
    ];
  }
}

export class TetrominoS extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [0, 0, 0],
        [0, 4, 4],
        [4, 4, 0],
      ],
      [
        [4, 0, 0],
        [4, 4, 0],
        [0, 4, 0],
      ],
    ];
  }
}

export class TetrominoI extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [5, 5, 5, 5],
        [0, 0, 0, 0],
      ],
      [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ],
    ];
  }
}

export class TetrominoJ extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [6, 0, 0],
        [6, 6, 6],
        [0, 0, 0],
      ],
      [
        [0, 6, 6],
        [0, 6, 0],
        [0, 6, 0],
      ],
      [
        [0, 0, 0],
        [6, 6, 6],
        [0, 0, 6],
      ],
      [
        [0, 6, 0],
        [0, 6, 0],
        [6, 6, 0],
      ],
    ];
  }
}

export class TetrominoT extends TetrominoBase {
  constructor() {
    super();
    this._matrices = [
      [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ],
      [
        [0, 7, 0],
        [0, 7, 7],
        [0, 7, 0],
      ],
      [
        [0, 0, 0],
        [7, 7, 7],
        [0, 7, 0],
      ],
      [
        [0, 7, 0],
        [7, 7, 0],
        [0, 7, 0],
      ],
    ];
  }
}
