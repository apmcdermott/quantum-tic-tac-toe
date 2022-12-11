import React, { useState } from 'react'
import './index.css'
import Graph from './Graph'
import { Board } from './Board'

// square contains the quant spooky marks
// when a collapse event happens, it convers into a classic square
// which has a single X val or O val
type GameState = {
  player: string
  playerTurn: number
  gameTurn: number
  squares: Array<string[] | null>
  spookys: Array<string[] | null>
  lastMove: number | null
}

function Game() {
  let graph = new Graph()
  const initialState = {
    player: 'X',
    playerTurn: 1, // players get 2 per turn
    gameTurn: 1,
    squares: Array(9).fill(null), // classic TTC board squares
    spookys: Array(9).fill(null), // keeps track of all the spooky marks
    lastMove: null,
  }

  const [state, setState] = useState<GameState>(initialState)

  const handleClick = (i: number) => {
    // you can't put both spooky marks for a single turn in the same quant
    if (!isFirstTurn() && state.lastMove === i) {
      return
    }

    const mark = `${state.player}${state.gameTurn}`
    const spookys = state.spookys

    const existing = spookys[i]
    if (existing) {
      existing.push(mark)
    } else {
      spookys[i] = [mark]
    }

    if (!graph.containsNode(i)) {
      // don't replace the same node over and over if it already exists
      graph.addNode(i) // add a node on both turns
    }

    if (!isFirstTurn()) {
      // add edge after both spooky marks have been placed
      graph.addEdge(state.lastMove, i, mark)
    }

    console.log(graph.nodes)

    if (isFirstTurn()) {
      // end of first player turn: increment
      setState({
        ...state,
        playerTurn: state.playerTurn + 1,
        lastMove: i,
      })
    } else {
      // end of second player turn: swap

      setState({
        ...state,
        gameTurn: state.gameTurn + 1,
        player: state.player === 'X' ? 'O' : 'X',
        playerTurn: 1,
        lastMove: i,
      })
    }
  }

  function isFirstTurn() {
    return state.playerTurn === 1
  }

  function resetGame() {
    setState(initialState)
  }

  function debugNodes(graph) {
    const nodes = Object.keys(graph.nodes).map((k, i) => {
      let spookys = []
      const edges = Object.keys(graph.nodes[k].edges)
      console.log({ edges })
      // .map((j) => {
      //   spookys.push(graph.nodes[k].edges[j].spooky)
      // })

      return (
        <li key={i}>
          {k}: {spookys.join(' ')}
        </li>
      )
    })

    return <ul>{nodes}</ul>
  }

  const player = `${state.player}`
  const playerTurn = state.playerTurn

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={state.squares}
            spookys={state.spookys}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">
            {player}: Place spooky mark #{playerTurn}
          </div>
          <button onClick={() => resetGame()}>Reset Game</button>
        </div>
      </div>
      <ul>{debugNodes(graph)}</ul>
    </div>
  )
}

export default Game
