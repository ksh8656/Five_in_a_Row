import React, { useState } from 'react';
import Board from './Board'; 
import './styles.css';

export default function Game() {
  
  const [history, setHistory] = useState([Array(169).fill(null)]); 
  const [currentStep, setCurrentStep] = useState(0); 
  const [xIsNext, setXIsNext] = useState(true); 

  
  const currentSquares = history[currentStep];
  const winner = calculateWinner(currentSquares);

  
  let status;
  if (winner) {
    status = (
      <div>
        Winner:{" "}
        <span
          className="next-player"
          style={{
            backgroundColor: winner === "X" ? "black" : "white",
            border: winner === "X" ? "none" : "1px solid #999",
          }}
        ></span>
      </div>
    );
  } else {
    status = (
      <div>
        Next Player:{" "}
        <span
          className="next-player"
          style={{
            backgroundColor: xIsNext ? "black" : "white",
            border: xIsNext ? "none" : "1px solid #999",
          }}
        ></span>
      </div>
    );
  }

  
  function handleClick(i) {
    if (currentSquares[i] || winner) {
      return; 
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    
    const nextHistory = history.slice(0, currentStep + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  
  function jumpToPrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setXIsNext((currentStep - 1) % 2 === 0); 
    }
  }


  function resetGame() {
    setHistory([Array(169).fill(null)]);
    setCurrentStep(0); 
    setXIsNext(true); 
  }

  
  return (
    <div className="game">
      <h1 style={{ color: 'white' }}>오목 게임 (13x13)</h1>
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={resetGame} className="reset-button">
          다시 시작
        </button>
        <button onClick={jumpToPrevious} className="previous-button">
          이전
        </button>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [];

  
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 9; col++) {
      lines.push([
        row * 13 + col,
        row * 13 + col + 1,
        row * 13 + col + 2,
        row * 13 + col + 3,
        row * 13 + col + 4
      ]);
    }
  }

  
  for (let col = 0; col < 13; col++) {
    for (let row = 0; row < 9; row++) {
      lines.push([
        row * 13 + col,
        (row + 1) * 13 + col,
        (row + 2) * 13 + col,
        (row + 3) * 13 + col,
        (row + 4) * 13 + col
      ]);
    }
  }

  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      lines.push([
        row * 13 + col,
        (row + 1) * 13 + col + 1,
        (row + 2) * 13 + col + 2,
        (row + 3) * 13 + col + 3,
        (row + 4) * 13 + col + 4
      ]);
    }
  }

 
  for (let row = 0; row < 9; row++) {
    for (let col = 4; col < 13; col++) {
      lines.push([
        row * 13 + col,
        (row + 1) * 13 + col - 1,
        (row + 2) * 13 + col - 2,
        (row + 3) * 13 + col - 3,
        (row + 4) * 13 + col - 4
      ]);
    }
  }


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
}


