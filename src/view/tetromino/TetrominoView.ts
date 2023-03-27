import { TetrominoBase } from '../../core/model/Tetromino';
import { getColorFor } from '../getColor';

export default class TetrominoView {
  ctx: CanvasRenderingContext2D;
  unitSize: number;
  lineWidth: number;
  color: string;
  tetromino: TetrominoBase;

  constructor(
    ctx: CanvasRenderingContext2D,
    tetromino: TetrominoBase,
    unitSize: number
  ) {
    this.ctx = ctx;
    this.unitSize = unitSize;
    this.lineWidth = Math.floor(unitSize / 15);

    this.tetromino = tetromino;
    this.color = getColorFor(tetromino.representNum);
  }

  draw() {
    const matrix = this.tetromino.matrix;
    const pos = this.tetromino.position;

    this.ctx.beginPath();
    matrix.forEach((i, j, val) => {
      if (val === 0) return;

      const x = (pos.x + i) * this.unitSize;
      const y = (pos.y + j) * this.unitSize;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
      this.ctx.fill();

      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(x, y, this.unitSize, this.unitSize);
    });
  }
}
