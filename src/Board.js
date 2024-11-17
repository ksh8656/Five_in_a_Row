import React from 'react';
import Square from './Square';

function Board({ squares, onClick }) {
  return (
    <>
      {[...Array(13)].map((_, row) => (
        <div key={row} className="board-row">
          {[...Array(13)].map((_, col) => {
            const index = row * 13 + col;
            const value = squares[index];
            return (
              <Square
                key={index}
                value={value}
                className={value === "X" ? "square x" : value === "O" ? "square o" : "square"}
                onSquareClick={() => onClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
