import type { GameStatus } from "~/api/types";

export type TeamScoreProps = {
  readonly score: string;
  readonly gameStatus: GameStatus;
};

export const TeamScore = ({ gameStatus, score }: TeamScoreProps) => {
  if (gameStatus === "1" || gameStatus === "2") {
    return null;
  }

  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
