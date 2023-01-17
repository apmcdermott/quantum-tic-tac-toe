import React, { useState } from 'react';
import './index.css';
import Graph from './Graph';
import { Board } from './Board';

// square contains the quant spooky marks
// when a collapse event happens, it convers into a classic square
// which has a single X val or O val
type Player = 'X' | 'O';

type GameState = {
  player: Player;
  playerTurn: number;
  gameTurn: number;
  squares: Array<string[] | null>;
  spookys: Array<string[] | null>;
  lastMove: number | null;
};

function Game() {
  const initialState = {
    player: 'X' as Player,
    playerTurn: 1, // players get 2 per game turn
    gameTurn: 1,
    squares: Array(9).fill(null), // classic TTC board squares
    spookys: Array(9).fill(null), // keeps track of all the spooky marks
    lastMove: null,
  };

  const [game, setGame] = useState<GameState>(initialState);

  const [graph, setGraph] = useState(new Graph());
  const [squares, setSquares] = useState(initialState.squares);
  const [spookys, setSpookys] = useState(initialState.spookys);

  const setSpookyMarks = (i: number, mark: string) => {
    const newSpookys = [...spookys];
    if (!spookys[i]) {
      newSpookys[i] = [mark];
    } else {
      newSpookys[i].push(mark);
    }
    setSpookys(newSpookys);
  };

  const handleClick = (i: number) => {
    if (!isFirstTurn() && game.lastMove === i) {
      console.log('cant place spooky mark in same square twice');
      return;
    }

    const mark = `${game.player}${game.gameTurn}`; // X1, O2, etc

    // if spooky mark already exists, add to it
    setSpookyMarks(i, mark);

    if (!graph.containsNode(i)) {
      // don't replace the same node over and over if it already exists
      graph.addNode(i); // add a node on both turns
    }

    if (!isFirstTurn() && game.lastMove !== null) {
      // add edge after both spooky marks have been placed
      graph.addEdge(game.lastMove, i, mark);
    }

    if (graph.hasCycle(i)) {
      const [cycleNodeIds, cycleNodeSpookys] = graph.getCycle(i);

      console.log(
        `A loop of entanglement has occured! Player ${opponent()} will decide which of the possible states the board will collapse into.`
      );
    }

    if (isFirstTurn()) {
      // end of first player turn: increment
      setGame({
        ...game,
        playerTurn: game.playerTurn + 1,
        lastMove: i,
      });
    } else {
      // end of second player turn: swap player and reset playerTurn
      setGame({
        ...game,
        gameTurn: game.gameTurn + 1,
        player: opponent(),
        playerTurn: 1,
        lastMove: i,
      });
    }
  };

  function opponent(): Player {
    return game.player === 'X' ? 'O' : 'X';
  }

  function isFirstTurn(): boolean {
    return game.playerTurn === 1;
  }

  function resetGame(): void {
    setGame(initialState);
    setSquares(initialState.squares);
    setSpookys(initialState.spookys);
    setGraph(new Graph());
  }

  function debugNodes(graph: Graph) {
    const nodes = Object.keys(graph.nodes).map((id) => {
      const spookysForNode = spookys[id] || [];
      return (
        <li key={id}>
          {id}: {spookysForNode.join(' ')}
        </li>
      );
    });

    return <ul>{nodes}</ul>;
  }

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            spookys={spookys}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">
            {game.player}: Place spooky mark #{game.playerTurn}
          </div>
          <button onClick={() => resetGame()}>Reset Game</button>
        </div>
      </div>
      <ul>
        <li>isFirstTurn: {isFirstTurn() ? 'true' : 'false'}</li>
        <li>lastMove: {game.lastMove}</li>
        <li>gameTurn: {game.gameTurn}</li>
        <li>playerTurn: {game.playerTurn}</li>
        <li>player: {game.player}</li>
      </ul>

      <h2>Graph</h2>
      <ul>{debugNodes(graph)}</ul>
    </div>
  );
}

export default Game;
