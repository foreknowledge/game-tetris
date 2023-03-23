import TetrominoView from '../../../view/tetromino/TetrominoView';

export default class MainBgCanvas {
  canvas = document.getElementById('main-bg-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  screen = document.getElementById('main-page')!;

  tetrominos: TetrominoView[] = [];

  constructor() {
    this.resize();

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.canvas.width = this.screen.clientWidth;
    this.canvas.height = this.screen.clientHeight;

    this.init();
    this.animate();
  }

  init() {
    this.tetrominos = [];
    for (let i = 0; i < 10; i++) {
      const screenPos = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
      };
      this.tetrominos.push(new TetrominoView(this.ctx, screenPos));
    }
  }

  animate() {
    // requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.tetrominos.forEach((tetromino) => {
      tetromino.draw();
    });
  }
}
