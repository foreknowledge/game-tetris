import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import { Transform } from '../type/coordinates.types';
import { BOARD_H, BOARD_W } from './contstants';
import { isBottomAttached, isCollided, sweepLines } from './logics';
import TetrominoGenerator from './TetrominoGenerator';
import Scheduler from './Scheduler';
import ScoreBoard from './ScoreBoard';

export default class Tetris {
  private tetrominoGenerator = new TetrominoGenerator();
  nextTetromino: TetrominoBase = this.tetrominoGenerator.next();

  board = new Matrix(Array.from(Array(BOARD_H), () => Array(BOARD_W).fill(0)));
  tetromino: TetrominoBase = this.pickNextTetromino();
  previewTetromino: TetrominoBase = this.createPreviewTetromino();

  scoreBoard = new ScoreBoard();
  private scheduler = new Scheduler(this.getCurrentSpeed());

  private isPlaying = false;

  onGameOver = () => {};

  start() {
    this.scheduler.start(() => {
      this.checkAndDrop();
      this.apply({ dy: 1 });
    });
    this.isPlaying = true;
  }

  pause() {
    this.scheduler.pause();
    this.isPlaying = false;
  }

  resume() {
    this.scheduler.resume();
    this.isPlaying = true;
  }

  private gameOver() {
    this.scheduler.stop();
    this.isPlaying = false;
    this.onGameOver();
  }

  moveRight() {
    this.apply({ dx: 1 });
  }

  moveLeft() {
    this.apply({ dx: -1 });
  }

  rotateRight() {
    this.apply({ rotR: true });
  }

  rotateLeft() {
    this.apply({ rotL: true });
  }

  softDrop() {
    const applied = this.apply({ dy: 1 });
    // 적용된 경우, 점수에 반영
    if (applied) this.scoreBoard.softDrop();
  }

  hardDrop() {
    const dy = this.previewTetromino.position.y - this.tetromino.position.y;
    const applied = this.apply({ dy });
    // 적용된 경우, 점수에 반영
    if (applied) this.scoreBoard.hardDrop(dy);

    // 바로 내려놓기
    this.checkAndDrop();
  }

  /**
   * 현재 Tetromino의 변환을 수행한다.
   * @param transform 어떻게 변환할지
   * @returns 변환이 적용 되었는지 여부
   */
  private apply(transform: Transform): boolean {
    if (!this.isPlaying) return false;

    // Apply transform to clone
    const target = this.tetromino.duplicate();
    target.transform(transform);

    // transform 적용 가능한지 확인
    if (isCollided(this.board, target)) return false;

    this.tetromino.transform(transform);
    this.previewTetromino = this.createPreviewTetromino();

    return true;
  }

  private checkAndDrop() {
    if (!this.isPlaying) return;

    // 바닥에 닿았는지 확인
    if (!isBottomAttached(this.board, this.tetromino)) return;

    // 1. board에 적용
    let pos = this.tetromino.position;
    this.tetromino.matrix.forEach((x, y, val) => {
      if (val > 0) this.board.set(pos.x + x, pos.y + y, val);
    });

    // 2. 완성 된 라인 지우기
    const lines = sweepLines(this.board);
    if (lines > 0) {
      this.scoreBoard.clearLines(lines);
      this.scheduler.changeSpeed(this.getCurrentSpeed());
    }

    // 3. 다음 tetromino 가져오기
    this.tetromino = this.pickNextTetromino();
    this.previewTetromino = this.createPreviewTetromino();
    if (isCollided(this.board, this.tetromino)) {
      // 기존 board와 충돌한 경우 게임 오버
      this.gameOver();
    }
  }

  private pickNextTetromino(): TetrominoBase {
    const next = this.nextTetromino;
    next.position = {
      // Board 중간에서 시작
      x: Math.floor(BOARD_W / 2 - next.matrix.width / 2),
      y: 0,
    };

    // 다음 tetromino 가져오기
    this.nextTetromino = this.tetrominoGenerator.next();

    return next;
  }

  private createPreviewTetromino(): TetrominoBase {
    const target = this.tetromino.duplicate();

    while (!isBottomAttached(this.board, target)) {
      target.transform({ dy: 1 });
    }

    return target;
  }

  private getCurrentSpeed(): number {
    const level = this.scoreBoard.state.level;
    return Math.max(1000 - level * 30, 200);
  }
}
