import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'lodash'

// square contains the quant spooky marks
// when a collapse event happens, it convers into a classic square
// which has a single X val or O val
function Square (props) {
  return (
    <button
        className="square"
        onClick={props.onClick}
      >
        {props.spookys.concat(props.currentMove).join(' ')}
      </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        spookys={this.props.spookys[i]}
        currentMove={this.props.currentMove[i] ? this.props.currentMove[i] : ''}
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
    super();
    this.state = this.initialState()
  }

  initialState () {
    return ({
      player: 'X',
      spookysPlayed: 0, // players get 2 per turn
      turn: 1,
      squares: Array(9).fill(null),
      spookys: _.range(9).reduce(
        (acc, curr) => {
          Object.defineProperty(acc, curr, {
            value: [],
            writable: true,
            enumerable: true,
            configurable: true
          });
          return acc
        }, {}
      ),
      currentMove: {},
    })
  }

  handleClick(square) {
    if (Object.keys(this.state.currentMove).length === 2) { return }
    const move = this.state.player + this.state.turn
    this.setState({
      currentMove: Object.assign(this.state.currentMove, { [square]: [ move ] })
    });
  }

  resetGame() {
    let state = this.initialState()
    this.setState({
      ...state
    })
  }

  submitMove() {
    let newSpookys = _.mergeWith(this.state.spookys, this.state.currentMove,
      (objValue, srcValue) => {
        return objValue.concat(srcValue);
      }
    )

    this.setState({
      spookys: newSpookys,
      player: this.state.player === 'X' ? 'O' : 'X',
      currentMove: {},
      turn: this.state.turn + 1,
    })
  }

  render() {
    const status = `Player: ${this.state.player} Turn: ${this.state.turn}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            spookys={this.state.spookys}
            currentMove={this.state.currentMove}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button className="submit" onClick={() => this.submitMove()}>Submit Move</button>
          <button onClick={() => this.resetGame()}>Reset Game</button>
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