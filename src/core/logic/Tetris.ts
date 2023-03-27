import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import { Transform } from '../type/coordinates.types';
import { BOARD_H, BOARD_W } from './contstants';
import {
  isBottomAttached,
  genNewTetromino,
  isCollided,
  printBoard,
  sweepLines,
} from './logics';

export default class Tetris {
  #board = new Matrix(Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0)));
  #tetromino: TetrominoBase;
  speed = 1000;
  timerId?: number;

  constructor() {
    this.#tetromino = genNewTetromino();
    printBoard(this.#board, this.#tetromino);
  }

  gameStart() {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.moveDown();
    }, this.speed);
  }

  gamePause() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  gameOver() {
    clearInterval(this.timerId);
    this.timerId = undefined;

    // Inform game is over.
    console.log(`
==========================
    Game Over...
==========================
    `);

    // Reset data
    this.#board = new Matrix(
      Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0))
    );
    this.#tetromino = genNewTetromino();
  }

  moveDown() {
    this.#step({ dy: 1 });
  }

  moveRight() {
    this.#step({ dx: 1 });
  }

  moveLeft() {
    this.#step({ dx: -1 });
  }

  rotateRight() {
    this.#step({ rotR: true });
  }

  rotateLeft() {
    this.#step({ rotL: true });
  }

  #step(transform: Transform) {
    // Apply transform to clone
    const target = this.#tetromino.duplicate();
    target.transform(transform);

    if (!isCollided(this.#board, target)) {
      // transform 적용 가능하면 적용
      this.#tetromino.transform(transform);
    } else if (isBottomAttached(this.#board, this.#tetromino)) {
      // 바닥에 닿은 경우,

      // 1. board에 적용
      let pos = this.#tetromino.position;
      this.#tetromino.matrix.forEach((x, y, val) => {
        if (val > 0) this.#board.set(pos.x + x, pos.y + y, val);
      });

      // 2. 완성 된 라인 지우기
      sweepLines(this.#board);

      // 3. 새로운 tetromino 생성
      this.#tetromino = genNewTetromino();
      if (isCollided(this.#board, this.#tetromino)) {
        // 기존 board와 충돌한 경우 게임 오버
        this.gameOver();
        return;
      }
    }
    printBoard(this.#board, this.#tetromino);
  }
}
