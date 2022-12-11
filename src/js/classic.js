"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./index.css");
function Square({ onClick, value, style }) {
    return (react_1.default.createElement("button", { className: "square", onClick: onClick, style: style }, value));
}
function Board({ squares, onClick }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "board-row" }, [0, 1, 2].map((_, i) => (react_1.default.createElement(Square, { key: i, value: squares[i], onClick: () => onClick(i) })))),
        react_1.default.createElement("div", { className: "board-row" }, [3, 4, 5].map((_, i) => (react_1.default.createElement(Square, { key: i, value: squares[i], onClick: () => onClick(i) })))),
        react_1.default.createElement("div", { className: "board-row" }, [6, 7, 8].map((_, i) => (react_1.default.createElement(Square, { key: i, value: squares[i], onClick: () => onClick(i) }))))));
}
function Game() {
    const [squares, setSquares] = (0, react_1.useState)(Array(9).fill(null));
    const [symbol, setSymbol] = (0, react_1.useState)('X');
    const handleClick = (i) => {
        let squaresCopy = [...squares];
        squaresCopy[i] = symbol;
        setSquares(squaresCopy);
        setSymbol(symbol === 'X' ? 'O' : 'X');
    };
    return (react_1.default.createElement("div", { className: "game" },
        react_1.default.createElement("div", { className: "game-board" },
            react_1.default.createElement(Board, { squares: squares, onClick: (i) => handleClick(i) }))));
}
