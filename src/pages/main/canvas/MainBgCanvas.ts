import TetrominoGenerator from '../../../core/logic/TetrominoGenerator';
import { Pos } from '../../../core/type/coordinates.types';
import {
  randomIntegerInRange,
  randomNumberInRange,
} from '../../../utils/random';
import CommonCanvas from '../../../view/canvas/CommonCanvas';
import TetrominoView from '../../../view/tetromino/TetrominoView';

type CanvasItem = {
  id: number;
  // 아이템의 z-index.
  zIndex: number;
  // y 속도
  dy: number;
  // 화면 업데이트 횟수
  updates: number;
  tetrominoView: TetrominoView;
};

const SPACE = 120; // 블럭이 겹치지 않게 만들 공간
const ROTATE_THRESHOLD = 70;
const Z_INDEX_COUNT = 5; // 블럭의 z-index 개수

export default class MainBgCanvas extends CommonCanvas {
  canvas = document.getElementById('main-bg-canvas') as HTMLCanvasElement;
  ctx = this.canvas.getContext('2d')!;

  private canvasItems: CanvasItem[] = [];
  private tetrominoGenerator = new TetrominoGenerator();

  constructor() {
    super();

    this.animate = this.animate.bind(this);

    this.resize();
    this.animate();

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.init();
  }

  init() {
    this.canvasItems = [];

    const itemCountPerZIndex = Math.floor(
      this.canvas.width / 40 / Z_INDEX_COUNT
    );

    for (let zIndex = 1; zIndex <= Z_INDEX_COUNT; zIndex++) {
      const itemsPerZIndex: CanvasItem[] = [];

      while (itemsPerZIndex.length < itemCountPerZIndex) {
        // 화면 상의 위치
        const newPos = {
          x: randomIntegerInRange(0, this.canvas.width - SPACE),
          y: randomIntegerInRange(0, this.canvas.height),
        };
        // 동일한 index의 블럭끼리 겹치지 않도록 한다.
        if (
          itemsPerZIndex.some(
            ({ tetrominoView: { screenPos: pos } }) =>
              Math.abs(newPos.x - pos.x) < SPACE &&
              Math.abs(newPos.y - pos.y) < SPACE
          )
        ) {
          continue;
        }

        // y 속도: 화면에 가까울 수록 빠르게
        const speed = 1.5;
        const dy = randomNumberInRange(
          zIndex * speed - 0.3,
          zIndex * speed + 0.3
        );

        // item 생성
        itemsPerZIndex.push({
          id: this.canvasItems.length,
          zIndex,
          dy,
          updates: randomIntegerInRange(0, ROTATE_THRESHOLD),
          tetrominoView: this.genRandomTetrominoView(zIndex, newPos),
        });
      }

      this.canvasItems.push(...itemsPerZIndex);
    }
  }

  animate() {
    if (!this._isAnimating) return;

    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasItems.forEach((item) => {
      const { id, zIndex, dy, tetrominoView } = item;
      const { screenPos: pos, tetromino } = tetrominoView;

      // y 속도 만큼 블럭을 아래로 이동. 블럭이 화면을 벗어나면 새로운 View로 다시 그린다.
      pos.y += dy;
      if (pos.y > this.canvas.height) {
        pos.y = -SPACE;
        item.tetrominoView = this.genRandomTetrominoView(zIndex, pos);
      }

      // 업데이트 횟수가 threshold를 넘길 때 마다 블럭 회전
      if (item.updates++ > ROTATE_THRESHOLD) {
        item.updates = 1;
        id % 2 ? tetromino.rotateRight() : tetromino.rotateLeft();
      }

      tetrominoView.draw();
    });
  }

  private genRandomTetrominoView(zIndex: number, pos: Pos) {
    const tetromino = this.tetrominoGenerator.next();
    tetromino.rotateRight(randomIntegerInRange(0, 4));
    // 블럭 크기: 앞에 있을 수록 크게
    const unitSize = 15 + zIndex * 5;
    return new TetrominoView(this.ctx, tetromino, unitSize, pos);
  }
}
