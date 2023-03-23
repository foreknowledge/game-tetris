export default class GridView {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  rows: number;
  cols: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    rows: number = 10,
    cols: number = 20
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';

    const rowSize = this.width / this.rows;
    for (let r = 0; r < this.rows; r++) {
      const x = r * rowSize;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
    }

    const colSize = this.height / this.cols;
    for (let c = 0; c < this.cols; c++) {
      const y = c * colSize;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }

    this.ctx.stroke();
  }
}
