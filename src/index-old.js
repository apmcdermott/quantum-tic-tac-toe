import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Graph from './Graph'

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
    this.graph = new Graph()
    this.state = this.initialState()
  }

  initialState () {
    return ({
      player: 'X',
      playerTurn: 1, // players get 2 per turn
      gameTurn: 1,
      squares: Array(9).fill(null), // classic TTC board squares
      spookys: Array(9).fill(null), // keeps track of all the spooky marks
      lastMove: null
    })
  }

  handleClick(i) {
    // you can't put both spooky marks for a single turn in the same quant
    if (!this.isFirstTurn() && this.state.lastMove === i) { return }

    const mark = `${this.state.player}${this.state.gameTurn}`
    const spookys = this.state.spookys

    if (spookys[i]) {
      spookys[i].push(mark)
    } else {
      spookys[i] = [mark]
    }


    if (!this.graph.containsNode(i)) { // don't replace the same node over and over if it already exists
      this.graph.addNode(i) // add a node on both turns
    }

    if (!this.isFirstTurn()) { // add edge after both spooky marks have been placed
      this.graph.addEdge(this.state.lastMove, i, mark)
    }

    console.log(this.graph.nodes)

    if (this.isFirstTurn()) {
      // end of first player turn: increment
      this.setState({
        playerTurn: this.state.playerTurn + 1,
        lastMove: i
      })
    } else {
      // end of second player turn: swap
      this.setState({
        gameTurn: this.state.gameTurn + 1,
        player: this.state.player === 'X' ? 'O' : 'X',
        playerTurn: 1,
        lastMove: i
      });
    }
  }

  isFirstTurn() {
    return this.state.playerTurn === 1
  }

  resetGame() {
    let state = this.initialState()
    this.setState({
      ...state
    })
  }

  debugNodes(graph) {
    const nodes = Object.keys(graph.nodes).map((k, i) => {
      let spookys = []
      Object.keys(graph.nodes[k].edges).map((j) => {
        spookys.push(graph.nodes[k].edges[j].spooky)
      })

      return <li key={i}>{k}: {spookys.join(' ')}</li>
    })

    return (
      <ul>{nodes}</ul>
    )
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
            <div className="status">{player}: Place spooky mark #{playerTurn}</div>
            <button onClick={() => this.resetGame()}>Reset Game</button>
          </div>
        </div>
        <ul>
          {this.debugNodes(this.graph)}
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