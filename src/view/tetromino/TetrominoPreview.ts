import { TetrominoBase } from '../../core/model/Tetromino';
import { Pos } from '../../core/type/coordinates.types';
import TetrominoView from './TetrominoView';

export default class TetrominoPreview extends TetrominoView {
  constructor(
    ctx: CanvasRenderingContext2D,
    tetromino: TetrominoBase,
    unitSize: number,
    screenPos: Pos = { x: 0, y: 0 }
  ) {
    super(ctx, tetromino, unitSize, screenPos);
  }

  draw() {
    const matrix = this.tetromino.matrix;
    const pos = this.tetromino.position;

    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.globalAlpha = 0.3;
    matrix.forEach((i, j, val) => {
      if (val === 0) return;

      const x = this.screenPos.x + (pos.x + i) * this.unitSize;
      const y = this.screenPos.y + (pos.y + j) * this.unitSize;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
      this.ctx.fill();
    });
    this.ctx.restore();
  }
}
