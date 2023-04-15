import type { ScheduledGame } from "~/api/types";
import { GameCard } from "../GameCard";

export type GamesListProps = {
  readonly games: ScheduledGame[];
};

type GamesListFunction = (props: GamesListProps) => JSX.Element;
export const GamesList: GamesListFunction = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="grid grid-cols-auto-fill gap-5">
        <h1 className="mt-9 text-center text-3xl font-bold md:col-span-4">
          No games today
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {games.map((game) => {
        return <GameCard key={game.ID} game={game} />;
      })}
    </div>
  );
};
