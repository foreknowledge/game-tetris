export default class GameCanvas {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;

  constructor() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.animate();
  }

  init() {}
  animate() {}
}
