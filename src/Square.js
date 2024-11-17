import React from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
      onClick={onSquareClick}
    >
    </button>
  );
}

export default Square;
