import genTetromino from '../../../core/model/TetrominoGenerator';
import TetrominoView from '../../../view/tetromino/TetrominoView';

export default class MainBgCanvas {
  canvas = document.getElementById('main-bg-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;

  tetrominoViews: TetrominoView[] = [];

  constructor() {
    this.resize();

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.init();
    this.animate();
  }

  init() {
    this.tetrominoViews = [];
    for (let i = 0; i < 10; i++) {
      const tetromino = genTetromino({
        pos: {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
        },
      });
      this.tetrominoViews.push(new TetrominoView(this.ctx, tetromino, 30));
    }
  }

  animate() {
    // requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.tetrominoViews.forEach((tetrominoView) => {
      tetrominoView.draw();
    });
  }
}
