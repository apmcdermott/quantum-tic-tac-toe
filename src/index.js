import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import _ from 'lodash'

// square contains the quant spooky marks
// when a collapse event happens, it convers into a classic square
// which has a single X val or O val
function Quant (props) {
  return (
    <button
        className="square"
        onClick={props.onClick}
      >
        {props.spookys}
      </button>
  )
}

class Board extends React.Component {
  renderQuant(i) {
    return (
      <Quant
        key={i}
        onClick={() => this.props.onClick(i)}
        spookys={this.props.spookys[i]}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderQuant(0)}
          {this.renderQuant(1)}
          {this.renderQuant(2)}
        </div>
        <div className="board-row">
          {this.renderQuant(3)}
          {this.renderQuant(4)}
          {this.renderQuant(5)}
        </div>
        <div className="board-row">
          {this.renderQuant(6)}
          {this.renderQuant(7)}
          {this.renderQuant(8)}
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
      playerTurn: 1, // players get 2 per turn
      gameTurn: 1,
      squares: Array(9).fill(null),
      spookys: Array(9).fill(null).map(() => []),
    })
  }

  handleClick(i) {
    const mark = `${this.state.player}${this.state.gameTurn}`
    this.state.spookys[i].push(mark)

    // end of first player turn, increment
    if (this.state.playerTurn === 1) {
      this.setState({
        playerTurn: this.state.playerTurn + 1,
      });
    } else { // end 2nd player turn, swap players
      this.setState({
        gameTurn: this.state.gameTurn + 1,
        player: this.state.player === 'X' ? 'O' : 'X',
        playerTurn: 1,
      });
    }
  }

  resetGame() {
    let state = this.initialState()
    this.setState({
      ...state
    })
  }

  render() {
    const player = `${this.state.player}`;
    const playerTurn = this.state.playerTurn;

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              spookys={this.state.spookys}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status">{player} has {3 - playerTurn} left</div>
            <button onClick={() => this.resetGame()}>Reset Game</button>
          </div>
        </div>
        <ul>
          debug
        </ul>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);