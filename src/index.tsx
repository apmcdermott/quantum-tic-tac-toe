import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';

// Scoring is loosely based off of rohanp's Quantum Tic Tac Toe game
// https://github.com/rohanp/QuantumTicTacToe
// with added typescript compatibility

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
