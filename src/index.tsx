import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GameStatusProvider from './context/GameStatusProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameStatusProvider>
      <App />
    </GameStatusProvider>
  </React.StrictMode>
);
