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
function checkWinner() {
  for (let i = 0; i < winningCondition.length; i++) {}
}
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
  let gameStatus;

  if (scoreBoard.every((score) => score !== "")) {
    gameStatus = "Tie";
    gameIsFinished = true;
  }
  if (
    scoreBoard[0] === scoreBoard[1] &&
    scoreBoard[1] === scoreBoard[2] &&
    scoreBoard[0] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[0] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[3] === scoreBoard[4] &&
    scoreBoard[4] === scoreBoard[5] &&
    scoreBoard[3] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[3] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[6] === scoreBoard[7] &&
    scoreBoard[7] === scoreBoard[8] &&
    scoreBoard[6] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[7] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[0] === scoreBoard[3] &&
    scoreBoard[3] === scoreBoard[6] &&
    scoreBoard[0] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[0] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[1] === scoreBoard[4] &&
    scoreBoard[4] === scoreBoard[7] &&
    scoreBoard[1] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[1] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[2] === scoreBoard[5] &&
    scoreBoard[5] === scoreBoard[8] &&
    scoreBoard[2] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[3] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[0] === scoreBoard[4] &&
    scoreBoard[4] === scoreBoard[8] &&
    scoreBoard[0] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[0] + " won";
    gameIsFinished = true;
  }
  if (
    scoreBoard[2] === scoreBoard[4] &&
    scoreBoard[4] === scoreBoard[6] &&
    scoreBoard[2] !== ""
  ) {
    gameStatus = "Player " + scoreBoard[2] + " won";
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
