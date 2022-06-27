import { useState, useEffect, useContext } from "react";
import React from "react";
import styles from "./Square.module.css";
import TicContext from "../store/tic-context";
let scoreBoard = [
  ["", false],
  ["", false],
  ["", false],
  ["", false],
  ["", false],
  ["", false],
  ["", false],
  ["", false],
  ["", false],
];

export default function Square(props) {
  const context = useContext(TicContext);

  function squareActionsHandler() {
    if (!props.isClicked) {
      scoreBoard[props.count][1] = true;
      scoreBoard[props.count][0] = props.playerStatus;
      context.scoreBoardHandler(scoreBoard);

      if (props.playerStatus === "X" && !props.gameIsFinished) {
        setTimeout(() => {
          AutoPlay();
        }, 1);

        context.playerStatusHandlerO();
      }
    }

    props.checkWinner();
  }

  function AutoPlay() {
    let randomNumber = Math.round(Math.random() * (scoreBoard.length - 1));
    while (scoreBoard[randomNumber][0] !== "") {
      randomNumber = Math.round(Math.random() * (scoreBoard.length - 1));
    }
    scoreBoard[randomNumber][0] = "O";
    scoreBoard[randomNumber][1] = true;

    props.checkWinner();
  }

  useEffect(() => {
    if (props.gameIsFinished) {
      scoreBoard = [
        ["", false],
        ["", false],
        ["", false],
        ["", false],
        ["", false],
        ["", false],
        ["", false],
        ["", false],
        ["", false],
      ];
    }
  }, [props.gameIsFinished, props.playerStatus]);

  return (
    <button
      disabled={props.gameIsFinished}
      onClick={squareActionsHandler}
      className={`${styles.square} ${
        props.value === "X" ? styles.x : styles.y
      }`}
    >
      {props.value}
      {!props.isClicked && !props.gameIsFinished && (
        <div className={styles.hint}>{props.playerStatus}</div>
      )}
    </button>
  );
}
