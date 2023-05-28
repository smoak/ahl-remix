import type { GameDetails } from "~/data/types";
import { GameSummaryTable } from "../GameSummaryTable";
import { useGameInfo } from "~/hooks/useGameInfo";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};

export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const gameInfo = useGameInfo(gameDetails.game.id);
  const { game } = gameDetails;
  const gameStatus = gameInfo?.status ?? game.status;

  if (gameStatus === "Scheduled") {
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
