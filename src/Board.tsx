import React from 'react';

function Quant({ spookys, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {spookys}
    </button>
  );
}

type BoardProps = {
  squares: Array<string[] | null>;
  spookys: Array<string[] | null>;
  onClick: (i: number) => void;
};

export function Board({ squares, spookys, onClick }: BoardProps) {
  const renderQuant = (i: number) => {
    return <Quant key={i} onClick={() => onClick(i)} spookys={spookys[i]} />;
  };

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
  );
}
