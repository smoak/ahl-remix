import type { ScheduledGame } from "~/api/types";

type CurrentGameStatusProps = {
  readonly game: ScheduledGame;
};

export const CurrentGameStatus = ({
  game,
}: CurrentGameStatusProps): JSX.Element => {
  if (game.GameStatus === "4") {
    return (
      <>
        <span className="mx-auto block">{game.GameStatusStringLong}</span>
        <span className="mx-auto block pt-6"></span>
      </>
    );
  }

  if (game.GameStatus === "3") {
    return (
      <>
        <span className="mx-auto block">Final</span>
        <span className="mx-auto block pt-6"></span>
      </>
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(game.GameDateISO8601)
      )}
    </>
  );
};
