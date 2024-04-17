import type { GameDetails } from "~/components/types";
import { SummarySection } from "./SummarySection";
import { ScoringSection } from "./ScoringSection";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};

export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const { game, gameStats } = gameDetails;

  if (game.gameState === "Scheduled") {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <>
      <SummarySection game={game} gameStats={gameStats} />
      <ScoringSection scoringPlays={gameStats.scoringPlays} />
    </>
  );
};
