import Tetris from '../../../core/logic/Tetris';
import genTetromino from '../../../core/model/TetrominoGenerator';
import { Type } from '../../../core/type/tetromino.types';
import TetrominoView from '../../../view/tetromino/TetrominoView';

export default class PreviewCanvas {
  tetris: Tetris;
  curType?: Type;

  canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  unitSize = 36;

  constructor(tetris: Tetris) {
    this.tetris = tetris;

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Optimization - 다시 그릴 필요 없는 경우 pass
    if (this.curType === this.tetris.nextTetrominoType) return;
    this.curType = this.tetris.nextTetrominoType;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const tetromino = genTetromino(this.curType);
    const offset =
      this.canvas.width / 2 - (tetromino.matrix.width * this.unitSize) / 2;
    const tetrominoView = new TetrominoView(
      this.ctx,
      tetromino,
      this.unitSize,
      { x: offset, y: offset }
    );
    tetrominoView.draw();
  }
}
