import { randomItem } from '../../utils/random';
import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import genTetromino from '../model/TetrominoGenerator';
import { Transform } from '../type/coordinates.types';
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
      Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0))
    );

    this.#tetromino = this.#genNewTetromino();
    this.#print();
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
    if (this.#isAppliable(transform)) {
      // transform 적용 가능하면 적용
      this.#tetromino.transform(transform);
    } else if (this.#checkIsTouched()) {
      // 바닥에 닿은 경우, board에 적용하고 새로운 tetromino 생성
      let pos = this.#tetromino.position;
      this.#tetromino.matrix.forEach((x, y, val) => {
        if (val > 0) this.#board.set(pos.x + x, pos.y + y, val);
      });
      this.#tetromino = this.#genNewTetromino();
    }
    this.#print();
  }

  // Transform 적용 가능한지 판단
  #isAppliable(transform: Transform): boolean {
    // Apply transform to clone
    const target = this.#tetromino.duplicate();
    target.transform(transform);

    // Check
    const matrix = target.matrix;
    const pos = target.position;

    for (let y = 0; y < matrix.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        if (matrix.get(x, y) == 0) continue;

        // boundary check
        if (
          pos.x + x < 0 ||
          pos.x + x >= BOARD_W ||
          pos.y + y < 0 ||
          pos.y + y >= BOARD_H
        ) {
          return false;
        }

        // collision check
        if (this.#board.get(pos.x + x, pos.y + y) > 0) {
          return false;
        }
      }
    }

    return true;
  }

  // Tetromino의 바닥면(아랫면)이 붙어있는지 체크
  #checkIsTouched(): boolean {
    const pos = this.#tetromino.position;

    const floorCoords = this.#tetromino.findFloorCoords();
    for (let { x, y } of floorCoords) {
      // boundary check
      if (pos.y + y + 1 === BOARD_H) return true;

      // collision check
      if (this.#board.get(pos.x + x, pos.y + y + 1) > 0) return true;
    }

    return false;
  }

  #genNewTetromino(): TetrominoBase {
    const newOne = genTetromino(randomItem(allTypes));
    newOne.position = {
      // Board 중간에서 시작
      x: Math.floor(BOARD_W / 2 - newOne.matrix.width / 2),
      y: 0,
    };
    return newOne;
  }

  #print() {
    const newBoard = this.#board.duplicate();
    const pos = this.#tetromino.position;
    this.#tetromino.matrix.forEach((x, y, val) => {
      if (val > 0) newBoard.set(pos.x + x, pos.y + y, val);
    });
    newBoard.print();
  }
}
