import type { GameDetails } from "~/data/types";
import { GameSummaryTable } from "../GameSummaryTable";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};

export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const { game } = gameDetails;

  if (game.status === "Scheduled") {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable gameDetails={gameDetails} />
      </div>
    </div>
  );
};
