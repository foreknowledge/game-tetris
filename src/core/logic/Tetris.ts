import { randomItem } from '../../utils/random';
import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import genTetromino from '../model/TetrominoGenerator';
import { Transform } from '../type/coordinates.types';
import { allTypes, Type } from '../type/tetromino.types';
import { BOARD_H, BOARD_W } from './contstants';
import { isBottomAttached, isCollided, sweepLines } from './logics';

export default class Tetris {
  nextTetrominoType: Type = randomItem(allTypes);

  board = new Matrix(Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0)));
  tetromino: TetrominoBase = this.#genNewTetromino();
  speed = 1000;
  timerId?: number;

  onGameOver = () => {};

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

  #gameOver() {
    clearInterval(this.timerId);
    this.timerId = undefined;

    this.onGameOver();

    // Reset data
    this.board = new Matrix(
      Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0))
    );
    this.tetromino = this.#genNewTetromino();
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
    const target = this.tetromino.duplicate();
    target.transform(transform);

    if (!isCollided(this.board, target)) {
      // transform 적용 가능하면 적용
      this.tetromino.transform(transform);
    } else if (isBottomAttached(this.board, this.tetromino)) {
      // 바닥에 닿은 경우,

      // 1. board에 적용
      let pos = this.tetromino.position;
      this.tetromino.matrix.forEach((x, y, val) => {
        if (val > 0) this.board.set(pos.x + x, pos.y + y, val);
      });

      // 2. 완성 된 라인 지우기
      sweepLines(this.board);

      // 3. 새로운 tetromino 생성
      this.tetromino = this.#genNewTetromino();
      if (isCollided(this.board, this.tetromino)) {
        // 기존 board와 충돌한 경우 게임 오버
        this.#gameOver();
        return;
      }
    }
  }

  #genNewTetromino(): TetrominoBase {
    // 다음 type으로 Tetromino 생성
    const newOne = genTetromino({ type: this.nextTetrominoType });
    newOne.position = {
      // Board 중간에서 시작
      x: Math.floor(BOARD_W / 2 - newOne.matrix.width / 2),
      y: 0,
    };

    // 다음 type 갱신 (Rule: 직전 type과 달라야 한다)
    this.nextTetrominoType = randomItem(
      allTypes.filter((it) => it !== this.nextTetrominoType)
    );

    return newOne;
  }
}
