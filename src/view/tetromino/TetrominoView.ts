import { TetrominoBase } from '../../core/model/Tetromino';
import { Type, allTypes } from '../../core/type/tetromino.types';
import genTetromino from '../../core/model/TetrominoGenerator';
import { Pos } from '../../core/type/coordinates.types';
import { randomItem } from '../../utils/random';
import { getColorFor } from './typeToStyle';

export default class TetrominoView {
  ctx: CanvasRenderingContext2D;
  screenPos: Pos;
  unitSize: number = 30;
  lineWidth: number = 2;
  color: string;
  tetromino: TetrominoBase;

  constructor(
    ctx: CanvasRenderingContext2D,
    screenPos: Pos,
    type: Type = randomItem(allTypes)
  ) {
    this.ctx = ctx;
    this.screenPos = screenPos;

    this.color = getColorFor(type);
    this.tetromino = genTetromino(type);
  }

  draw() {
    const matrix = this.tetromino.matrix;

    this.ctx.beginPath();
    for (let j = 0; j < matrix.length; j++) {
      const row = matrix[j];
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 0) continue;

        const x = this.screenPos.x + i * this.unitSize;
        const y = this.screenPos.y + j * this.unitSize;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
        this.ctx.fill();

        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(x, y, this.unitSize, this.unitSize);
      }
    }
  }
}
