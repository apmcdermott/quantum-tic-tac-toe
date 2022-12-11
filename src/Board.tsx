import React from 'react'

function Quant(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.spookys}
    </button>
  )
}

export function Board(props) {
  const renderQuant = (i: number) => {
    return (
      <Quant
        key={i}
        onClick={() => props.onClick(i)}
        spookys={props.spookys[i]}
      />
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderQuant(0)}
        {renderQuant(1)}
        {renderQuant(2)}
      </div>
      <div className="board-row">
        {renderQuant(3)}
        {renderQuant(4)}
        {renderQuant(5)}
      </div>
      <div className="board-row">
        {renderQuant(6)}
        {renderQuant(7)}
        {renderQuant(8)}
      </div>
    </div>
  )
}
