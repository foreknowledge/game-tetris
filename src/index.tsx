import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Tetris from './core/logic/Tetris';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 콘솔 테스트
const tetris = new Tetris();
tetris.print();
addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      tetris.moveLeft();
      break;
    case 'ArrowRight':
      tetris.moveRight();
      break;
    case 'ArrowDown':
      tetris.moveDown();
      break;
    case 'ArrowUp':
      tetris.rotateRight();
      break;
    case 'z' || 'Z':
      tetris.rotateLeft();
      break;
  }
  tetris.print();
});
