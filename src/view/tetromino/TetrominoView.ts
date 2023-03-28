import { TetrominoBase } from '../../core/model/Tetromino';
import { Pos } from '../../core/type/coordinates.types';
import { getColorFor } from '../getColor';

export default class TetrominoView {
  ctx: CanvasRenderingContext2D;
  unitSize: number;
  lineWidth: number;
  color: string;
  tetromino: TetrominoBase;
  screenPos: Pos;

  constructor(
    ctx: CanvasRenderingContext2D,
    tetromino: TetrominoBase,
    unitSize: number,
    screenPos: Pos = { x: 0, y: 0 }
  ) {
    this.ctx = ctx;
    this.unitSize = unitSize;
    this.lineWidth = Math.floor(unitSize / 15);
    this.screenPos = screenPos;

    this.tetromino = tetromino;
    this.color = getColorFor(tetromino.representNum);
  }

  draw() {
    const matrix = this.tetromino.matrix;
    const pos = this.tetromino.position;

    this.ctx.beginPath();
    matrix.forEach((i, j, val) => {
      if (val === 0) return;

      const x = this.screenPos.x + (pos.x + i) * this.unitSize;
      const y = this.screenPos.y + (pos.y + j) * this.unitSize;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
      this.ctx.fill();

      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(x, y, this.unitSize, this.unitSize);
    });
  }
}
