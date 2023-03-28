import { BOARD_W } from '../../../core/logic/contstants';
import Tetris from '../../../core/logic/Tetris';
import BoardView from '../../../view/board/BoardView';
import TetrominoView from '../../../view/tetromino/TetrominoView';
import GridView from './GridView';

export default class GameCanvas {
  tetris: Tetris;

  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  unitSize: number;
  gridView: GridView;

  constructor(tetris: Tetris) {
    this.tetris = tetris;

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.unitSize = this.canvas.width / BOARD_W;

    this.gridView = new GridView(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gridView.draw();

    const boardView = new BoardView(this.ctx, this.tetris.board, this.unitSize);
    boardView.draw();

    const tetrominoView = new TetrominoView(
      this.ctx,
      this.tetris.tetromino,
      this.canvas.width / BOARD_W
    );
    tetrominoView.draw();
  }
}
