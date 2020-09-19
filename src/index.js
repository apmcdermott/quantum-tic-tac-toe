import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Quant extends React.component {
//   // this will handle the spooky marks
//   constructor (props) {
//     this.state = {
//       spookys: []
//     }
//   }
//   // can have up to 8 spookys
//   // click handler should push each spooky onto the array
//   render() {
//     return (
//       <div>
//         {this.state.spookys}
//       </div>
//     )
//   }
// }

// square contains quants and a classic TTT value after collapse
function Square (props) {
  let style = {
    height: props.side + 'px',
    width: props.side + 'px',
  };

  return (
    <button
        className="square"
        onClick={props.onClick}
        style={style}
      >
        {props.value}
      </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    const side = 50;
    return (
      <Square
        key={i}
        side={side}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        style={`width: ${side * 3}px`}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState()
  }

  initialState () {
    return ({
      gameHistory: [{
        squares: Array(9).fill(null),
        spookys: [1,2,3,4,5,6,7,8,9].reduce(
          (acc, curr) => {
            Object.defineProperty(acc, curr, {
              value: [],
              writable: true,
              enumerable: true,
              configurable: true
            });
            return acc
          }, {}
        )
      }],
      symbol: 'X',
    })
  }

  handleClick(i) {
    const gameHistory = this.state.gameHistory;
    const current = gameHistory[gameHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.symbol;
    this.setState({
      gameHistory: gameHistory.concat([{
        squares: squares,
      }]),
      symbol: this.state.symbol === 'X' ? 'O' : 'X',
    });
  }

  resetGame() {
    let state = this.initialState()
    this.setState({
      ...state
    })
  }

  render() {
    const gameHistory = this.state.gameHistory;
    const current = gameHistory[gameHistory.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.symbol}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={() => this.resetGame()}>Reset</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const winningSets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningSets.length; i++) {
    const [a, b, c] = winningSets[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
