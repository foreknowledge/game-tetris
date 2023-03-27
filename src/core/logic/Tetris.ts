import { randomItem } from '../../utils/random';
import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import genTetromino from '../model/TetrominoGenerator';
import { allTypes } from '../type/tetromino.types';

const BOARD_W = 10;
const BOARD_H = 20;

export default class Tetris {
  #board: Matrix;
  #tetromino: TetrominoBase;
  speed = 1000;
  timerId?: number;

  constructor() {
    this.#board = new Matrix(
      new Array(BOARD_H).fill(new Array(BOARD_W).fill(0))
    );

    this.#tetromino = genTetromino(randomItem(allTypes));
    this.#tetromino.position = {
      // Board 중간에서 시작
      x: Math.floor(BOARD_W / 2 - this.#tetromino.matrix.width / 2),
      y: 0,
    };

    this.print();
  }

  gameStart() {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.moveDown();
      this.print();
    }, this.speed);
  }

  gamePause() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  moveDown() {
    if (this.#isTransformable({ dy: 1 })) {
      this.#tetromino.position.y += 1;
    }
  }

  moveRight() {
    if (this.#isTransformable({ dx: 1 })) {
      this.#tetromino.position.x += 1;
    }
  }

  moveLeft() {
    if (this.#isTransformable({ dx: -1 })) {
      this.#tetromino.position.x -= 1;
    }
  }

  rotateRight() {
    if (this.#isTransformable({ rotR: true })) {
      this.#tetromino.rotateRight();
    }
  }

  rotateLeft() {
    if (this.#isTransformable({ rotL: true })) {
      this.#tetromino.rotateLeft();
    }
  }

  // Transform 가능한지 판단
  #isTransformable({ dx, dy, rotR, rotL }: Transform): boolean {
    const target = this.#tetromino.duplicate();

    // Apply transform
    if (dx) target.position.x += dx;
    if (dy) target.position.y += dy;
    if (rotR) target.rotateRight();
    if (rotL) target.rotateLeft();

    // Check
    const matrix = target.matrix;
    const { x: posX, y: posY } = target.position;

    for (let y = 0; y < matrix.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        if (matrix.get(x, y) == 0) continue;

        // boundary check
        if (
          posX + x < 0 ||
          posX + x >= BOARD_W ||
          posY + y < 0 ||
          posY + y >= BOARD_H
        ) {
          return false;
        }

        // collision check
        if (this.#board.get(posX + x, posY + y) > 0) {
          return false;
        }
      }
    }

    return true;
  }

  print() {
    const newBoard = this.#board.duplicate();
    const { x: posX, y: posY } = this.#tetromino.position;
    this.#tetromino.matrix.forEach((x, y, val) => {
      if (val > 0) newBoard.set(posX + x, posY + y, val);
    });
    newBoard.print();
  }
}

type Transform = {
  dx?: number;
  dy?: number;
  rotR?: boolean;
  rotL?: boolean;
};
