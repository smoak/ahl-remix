import type { Game } from "~/components/types";
import { Contents } from "./Contents";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps): JSX.Element => {
  return (
    <article className="flex h-36 rounded-lg border border-slate-900">
      <div className="flex w-full p-8">
        <Contents game={game} />
      </div>
    </article>
  );
};
