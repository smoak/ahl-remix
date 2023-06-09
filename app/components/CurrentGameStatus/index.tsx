import type { GameStatus } from "~/data/types";
import { FinalGameStatus } from "../FinalGameStatus";
import { LiveGameStatus } from "../LiveGameStatus";

type CurrentGameStatusProps = {
  readonly gameStatus: GameStatus;
  readonly startTime: number;
  readonly period: number;
  readonly isIntermission: boolean;
  readonly isPlayoffGame: boolean;
  readonly gameClock: string;
};

export const CurrentGameStatus = ({
  gameClock,
  gameStatus,
  isIntermission,
  isPlayoffGame,
  startTime,
  period,
}: CurrentGameStatusProps): JSX.Element => {
  if (gameStatus === "Live") {
    return (
      <LiveGameStatus
        gameClock={gameClock}
        period={period}
        isIntermission={isIntermission}
        isPlayoffGame={isPlayoffGame}
      />
    );
  }

  if (gameStatus === "Final") {
    return <FinalGameStatus endedInPeriod={period} />;
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(startTime)
      )}
    </>
  );
};
