import Tetris from '../../../core/logic/Tetris';
import { TetrominoBase } from '../../../core/model/Tetromino';
import CommonCanvas from '../../../view/canvas/CommonCanvas';
import TetrominoView from '../../../view/tetromino/TetrominoView';

export default class PreviewCanvas extends CommonCanvas {
  tetris: Tetris;
  curTetromino?: TetrominoBase;

  canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  unitSize = 36;

  constructor(tetris: Tetris) {
    super();

    this.tetris = tetris;

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    if (!this._isAnimating) return;

    requestAnimationFrame(this.animate);

    // Optimization - 다시 그릴 필요 없는 경우 pass
    if (this.curTetromino === this.tetris.nextTetromino) return;
    this.curTetromino = this.tetris.nextTetromino;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const offset =
      this.canvas.width / 2 -
      (this.curTetromino.matrix.width * this.unitSize) / 2;
    const tetrominoView = new TetrominoView(
      this.ctx,
      this.curTetromino,
      this.unitSize,
      { x: offset, y: offset }
    );
    tetrominoView.draw();
  }
}
