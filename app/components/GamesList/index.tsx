import type { Game } from "~/components/types";
import { GameCard } from "../GameCard";
import { Link } from "@remix-run/react";
import { isSameDay } from "date-fns";

const FilteredGamesList = ({ games }: Omit<GamesListProps, "filter">) => {
  if (games.length === 0) {
    return (
      <div className="grid grid-cols-auto-fill gap-5">
        <h1 className="mt-9 text-center text-3xl font-bold md:col-span-4">
          No games scheduled
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {games.map((game) => {
        return (
          <Link prefetch="intent" to={`/game/${game.id}`} key={game.id}>
            <GameCard game={game} />
          </Link>
        );
      })}
    </div>
  );
};

export type GamesListProps = {
  readonly games: Game[];
  readonly filter: Date;
};

type GamesListFunction = (props: GamesListProps) => JSX.Element;
export const GamesList: GamesListFunction = ({ filter, games }) => {
  const filteredGames = games.filter((g) =>
    isSameDay(filter, new Date(g.gameDate))
  );

  return <FilteredGamesList games={filteredGames} />;
};
