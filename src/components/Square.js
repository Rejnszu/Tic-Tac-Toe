import { useState, useEffect } from "react";
import React from "react";
import styles from "./Square.module.css";
let scoreBoard = ["", "", "", "", "", "", "", "", ""];
export default function Square(props) {
  const [squareValue, setSquareValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  function squareActionsHandler() {
    if (!isClicked && props.playerStatus === "X") {
      setSquareValue(props.playerStatus);
      setIsClicked(true);
    }
    if (!isClicked && props.playerStatus === "O") {
      setSquareValue(props.playerStatus);
      setIsClicked(true);
    }
    if (!isClicked) {
      props.statusHandler();
      scoreBoard[props.count] = props.playerStatus;
      props.scoreHandler(scoreBoard);
    }
  }
  useEffect(() => {
    if (props.gameIsFinished) {
      scoreBoard = ["", "", "", "", "", "", "", "", ""];
      setIsClicked(false);
    }
  }, [props.gameIsFinished]);

  return (
    <button
      disabled={props.gameIsFinished}
      onClick={squareActionsHandler}
      className={`${styles.square} ${
        squareValue === "X" ? styles.x : styles.y
      }`}
    >
      {props.value}
      {!isClicked && !props.gameIsFinished && (
        <div className={styles.hint}>{props.playerStatus}</div>
      )}
    </button>
  );
}
