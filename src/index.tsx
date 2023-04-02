import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import GameStatusProvider from './context/GameStatusProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameStatusProvider>
      <App />
    </GameStatusProvider>
  </React.StrictMode>
);
