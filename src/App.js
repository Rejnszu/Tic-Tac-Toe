import React from "react";
import Board from "./components/Board";
import Square from "./components/Square";
import { useState } from "react";
const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameStatus;
let gameIsFinished = false;
const Players = ["X", "O"];
function App() {
  const [playerStatus, setPlayerStatus] = useState(
    Players[Math.round(Math.random())]
  );

  const [scoreBoard, setScoreBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function playerStatusHandler() {
    if (playerStatus === "X") {
      setPlayerStatus("O");
    } else {
      setPlayerStatus("X");
    }
  }
  function scoreBoardHandler(score) {
    setScoreBoard(score);
  }
  function resetGame() {
    setScoreBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayerStatus(Players[Math.round(Math.random())]);
    gameIsFinished = false;
  }

  function checkWinner() {
    for (let i = 0; i < winningCondition.length; i++) {
      if (
        scoreBoard[winningCondition[i][0]] ===
          scoreBoard[winningCondition[i][1]] &&
        scoreBoard[winningCondition[i][1]] ===
          scoreBoard[winningCondition[i][2]] &&
        scoreBoard[winningCondition[i][0]] !== ""
      ) {
        gameStatus = "Player " + scoreBoard[winningCondition[i][0]] + " won";
        gameIsFinished = true;
      }
    }
  }

  if (scoreBoard.every((score) => score !== "") && !gameIsFinished) {
    gameStatus = "Tie";
    gameIsFinished = true;
  }

  return (
    <React.Fragment>
      <div className="centered">
        {gameIsFinished ? (
          gameIsFinished && <p className="game-status">{gameStatus}</p>
        ) : (
          <p className="player-status">Current player:{playerStatus}</p>
        )}
      </div>
      <Board>
        {scoreBoard.map((square, i) => {
          return (
            <Square
              count={i}
              value={square}
              key={i}
              statusHandler={playerStatusHandler}
              scoreHandler={scoreBoardHandler}
              playerStatus={playerStatus}
              scoreBoard={scoreBoard}
              gameIsFinished={gameIsFinished}
              checkWinner={checkWinner}
            />
          );
        })}
      </Board>

      {gameIsFinished && (
        <div className="blurred-background">
          <button onClick={resetGame} type="button" className="try-again">
            Try Again
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
