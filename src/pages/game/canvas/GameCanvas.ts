import GridView from './GridView';

export default class GameCanvas {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  gridView: GridView;

  constructor() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.gridView = new GridView(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );
    this.animate();
  }

  init() {}
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gridView.draw();
  }
}
