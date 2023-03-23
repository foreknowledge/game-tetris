import TetrominoView from '../../../view/tetromino/TetrominoView';

export default class MainBgCanvas {
  canvas = document.getElementById('main-bg-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  screen = document.getElementById('main-page')!;

  stageWidth = this.screen.clientWidth;
  stageHeight = this.screen.clientHeight;

  tetrominos: TetrominoView[] = [];

  constructor() {
    this.resize();

    window.addEventListener('resize', this.resize.bind(this));
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.init();
  }

  init() {
    this.tetrominos = [];
    for (let i = 0; i < 10; i++) {
      const screenPos = {
        x: Math.random() * this.stageWidth,
        y: Math.random() * this.stageHeight,
      };
      this.tetrominos.push(new TetrominoView(this.ctx, screenPos));
    }
  }

  animate() {
    // requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.tetrominos.forEach((tetromino) => {
      tetromino.draw();
    });
  }
}
