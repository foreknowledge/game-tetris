import { BOARD_W } from '../../../core/logic/contstants';
import Tetris from '../../../core/logic/Tetris';
import BoardView from '../../../view/board/BoardView';
import TetrominoView from '../../../view/tetromino/TetrominoView';
import GridView from './GridView';

export default class GameCanvas {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;
  unitSize: number;
  gridView: GridView;

  tetris = new Tetris();

  constructor() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.unitSize = this.canvas.width / BOARD_W;

    this.gridView = new GridView(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );

    this.tetris.gameStart();
    this.#addKeyEventListener();

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

  #addKeyEventListener() {
    addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.tetris.moveLeft();
          break;
        case 'ArrowRight':
          this.tetris.moveRight();
          break;
        case 'ArrowDown':
          this.tetris.moveDown();
          break;
        case 'ArrowUp':
          this.tetris.rotateRight();
          break;
        case 'z' || 'Z':
          this.tetris.rotateLeft();
          break;
        case 'Escape':
          this.tetris.gamePause();
          break;
        case '1':
          this.tetris.gameStart();
          break;
      }
    });
  }
}
