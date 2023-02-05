import { useEffect, useState } from "react";
import { mathUtils } from "../utilities/math-utilities";
import { PlayAgain } from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import { StarsDisply } from "./StarsDisply";

const Game = (props) => {
  const { stars, availableNums, candidateNums, secondsLeft, setGameState } =
    useGameState();

  const candidatesAreWrong: boolean = mathUtils.sum(candidateNums) > stars;

  const gameStatus: string =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (number: number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number: number, currentStatus: string) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }

    const newCandidateNums: number[] =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn: number) => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisply count={stars} />
          )}
        </div>
        <div className="right">
          {mathUtils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

// Custom Hook
const useGameState = () => {
  const [stars, setStars] = useState<number>(mathUtils.random(1, 9));
  const [availableNums, setAvailableNums] = useState<number[]>(
    mathUtils.range(1, 9)
  );
  const [candidateNums, setCandidateNums] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
    if (mathUtils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n: number) => !newCandidateNums.includes(n)
      );
      setStars(mathUtils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

export default Game;
