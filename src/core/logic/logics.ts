import Matrix from '../model/Matrix';
import { TetrominoBase } from '../model/Tetromino';
import genTetromino from '../model/TetrominoGenerator';
import { BOARD_H, BOARD_W } from './contstants';

/**
 * [board]와 [tetromino]가 충돌하는지 판단
 */
export function isCollided(board: Matrix, tetromino: TetrominoBase): boolean {
  const matrix = tetromino.matrix;
  const pos = tetromino.position;

  for (let y = 0; y < matrix.height; y++) {
    for (let x = 0; x < matrix.width; x++) {
      if (matrix.get(x, y) == 0) continue;

      // boundary check
      if (
        pos.x + x < 0 ||
        pos.x + x >= BOARD_W ||
        pos.y + y < 0 ||
        pos.y + y >= BOARD_H
      ) {
        return true;
      }

      // collision check
      if (board.get(pos.x + x, pos.y + y) > 0) {
        return true;
      }
    }
  }

  return false;
}

/**
 * [tetromino]의 바닥면(아랫면)이 붙어있는지 체크
 */
export function isBottomAttached(
  board: Matrix,
  tetromino: TetrominoBase
): boolean {
  const pos = tetromino.position;

  const floorCoords = tetromino.findFloorCoords();
  for (let { x, y } of floorCoords) {
    // boundary check
    if (pos.y + y + 1 === BOARD_H) return true;

    // collision check
    if (board.get(pos.x + x, pos.y + y + 1) > 0) return true;
  }

  return false;
}

/**
 * [board]에서 완성된 라인 sweeping
 */
export function sweepLines(board: Matrix) {
  const compactData: number[][] = [];

  for (let y = BOARD_H - 1; y >= 0; y--) {
    const line = board.getLine(y);
    if (line.includes(0)) {
      compactData.push([...line]);
    } else {
      board.setLine(y, Array(BOARD_W).fill(0));
    }
  }

  for (let i = 0; i < compactData.length; i++) {
    board.setLine(BOARD_H - 1 - i, compactData[i]);
  }
}

export function genNewTetromino(): TetrominoBase {
  const newOne = genTetromino();
  newOne.position = {
    // Board 중간에서 시작
    x: Math.floor(BOARD_W / 2 - newOne.matrix.width / 2),
    y: 0,
  };
  return newOne;
}

export function printBoard(board: Matrix, tetromino: TetrominoBase) {
  const newBoard = board.duplicate();
  const pos = tetromino.position;
  tetromino.matrix.forEach((x, y, val) => {
    if (val > 0) newBoard.set(pos.x + x, pos.y + y, val);
  });
  newBoard.print();
}
