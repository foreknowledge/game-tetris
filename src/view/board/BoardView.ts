import Matrix from '../../core/model/Matrix';
import { getColorFor } from '../getColor';

export default class BoardView {
  ctx: CanvasRenderingContext2D;
  unitSize: number;
  lineWidth: number;
  board: Matrix;

  constructor(ctx: CanvasRenderingContext2D, board: Matrix, unitSize: number) {
    this.ctx = ctx;
    this.unitSize = unitSize;
    this.lineWidth = Math.floor(unitSize / 15);

    this.board = board;
  }

  draw() {
    this.ctx.beginPath();
    this.board.forEach((i, j, val) => {
      if (val === 0) return;

      const x = i * this.unitSize;
      const y = j * this.unitSize;

      this.ctx.fillStyle = getColorFor(val);
      this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
      this.ctx.fill();

      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(x, y, this.unitSize, this.unitSize);
    });
  }
}
