// import React, { CSSProperties, MouseEventHandler, useState } from 'react';
// import './index.css';

// type XO = 'X' | 'O';
// type SquareProps = {
//   onClick: MouseEventHandler<HTMLButtonElement>,
//   value: XO | null,
//   style?: CSSProperties;
// }
// function Square ({ onClick, value, style }: SquareProps) {
//   return (
//     <button
//         className="square"
//         onClick={onClick}
//         style={style}
//       >
//         {value}
//       </button>
//   )
// }

// type BoardProps = {
//   squares: Array<XO | null>;
//   onClick: MouseEventHandler<HTMLButtonElement>,
// }
// function Board ({ squares, onClick }: BoardProps) {

//     return (
//       <div>
//         <div className="board-row">
//           {[0,1,2].map((_, i) => (
//             <Square
//               key={i}
//               value={squares[i]}
//               onClick={() => onClick(i)}
//             />
//           ))}
//         </div>
//         <div className="board-row">
//         {[3,4,5].map((_, i) => (
//             <Square
//               key={i}
//               value={squares[i]}
//               onClick={() => onClick(i)}
//             />
//           ))}
//         </div>
//         <div className="board-row">
//         {[6,7,8].map((_, i) => (
//             <Square
//               key={i}
//               value={squares[i]}
//               onClick={() => onClick(i)}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

// function Game () {
//   const [squares, setSquares] = useState(Array(9).fill(null))
//   const [symbol, setSymbol] = useState('X')

//   const handleClick = (i: number) => {
//     let squaresCopy = [...squares];
//     squaresCopy[i] = symbol;
//     setSquares(squaresCopy);
//     setSymbol(symbol === 'X' ? 'O' : 'X')
//   }

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board
//           squares={squares}
//           onClick={(i) => handleClick(i)}
//         />
//       </div>
//     </div>
//   );
// }
