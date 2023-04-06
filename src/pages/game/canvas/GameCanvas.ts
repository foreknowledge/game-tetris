import { BOARD_W } from '../../../core/logic/contstants';
import Tetris from '../../../core/logic/Tetris';
import BoardView from '../../../view/board/BoardView';
import CommonCanvas from '../../../view/canvas/CommonCanvas';
import TetrominoPreview from '../../../view/tetromino/TetrominoPreview';
import TetrominoView from '../../../view/tetromino/TetrominoView';
import GridView from './GridView';

export default class GameCanvas extends CommonCanvas {
  tetris: Tetris;

  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  unitSize: number;
  gridView: GridView;

  constructor(tetris: Tetris) {
    super();

    this.tetris = tetris;

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.unitSize = this.canvas.width / BOARD_W;

    this.gridView = new GridView(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );

    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    if (!this._isAnimating) return;

    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gridView.draw();

    const boardView = new BoardView(this.ctx, this.tetris.board, this.unitSize);
    boardView.draw();

    const tetrominoPreview = new TetrominoPreview(
      this.ctx,
      this.tetris.previewTetromino,
      this.unitSize
    );
    tetrominoPreview.draw();

    const tetrominoView = new TetrominoView(
      this.ctx,
      this.tetris.tetromino,
      this.unitSize
    );
    tetrominoView.draw();
  }
}
