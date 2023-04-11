import Tetris from '../../../core/logic/Tetris';

export default function createKeyEventListener(
  tetris: Tetris,
  togglePause: () => void
) {
  return (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        tetris.moveLeft();
        break;
      case 'ArrowRight':
        tetris.moveRight();
        break;
      case 'ArrowDown':
        tetris.softDrop();
        break;
      case ' ':
        tetris.hardDrop();
        break;
      case 'ArrowUp':
        tetris.rotateRight();
        break;
      case 'z':
      case 'Z':
      case 'ㅋ':
        tetris.rotateLeft();
        break;
      case 'Escape':
        togglePause();
        break;
    }
  };
}
