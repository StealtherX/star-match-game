import { useState } from "react";
import Game from "./Game";

export const StarMatch = () => {
  const [gameId, setGameId] = useState<number>(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};
