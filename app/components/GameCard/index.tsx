import type {
  FirebasePublishedClockSnapshot,
  Game,
  GameStatus,
} from "~/data/types";
import { CurrentGameStatus } from "../CurrentGameStatus";
import { TeamInfo } from "../TeamInfo";
import { TeamScore } from "../TeamScore";
import { useObjectVal } from "react-firebase-hooks/database";
import { child, query, ref } from "firebase/database";
import { firebaseDatabase } from "~/data/firebase";
import { useGoalSummary } from "~/hooks/useGoalSummary";
import { useClockTime } from "~/hooks/useClockTime";
import { useGameInfo } from "~/hooks/useGameInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps): JSX.Element => {
  const goalsSummary = useGoalSummary(game.id);
  const gameInfo = useGameInfo(game.id);
  const clockTime = useClockTime(game.id);

  const homeGoals = goalsSummary?.HomeGoalTotal ?? game.homeGoals;
  const visitorGoals = goalsSummary?.VisitorGoalTotal ?? game.visitorGoals;
  const gameStatus = gameInfo?.status ?? game.status;
  const period = clockTime?.period ?? game.period;
  const isInIntermission = gameInfo?.isIntermission ?? game.isInIntermission;

  return (
    <article className="flex h-36 rounded-lg border border-black">
      <div className="flex w-full flex-col">
        <div className="flex p-8">
          <TeamInfo team={game.homeTeam} isPlayoffGame={game.isPlayoffGame} />
          <div className="mt-3 flex flex-1">
            <TeamScore score={homeGoals} gameStatus={gameStatus} />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus
                gameId={game.id}
                gameStatus={gameStatus}
                startTime={game.startTimeUtc}
                period={period}
                isIntermission={isInIntermission}
                gameClock={clockTime?.time ?? game.clockTime}
                isPlayoffGame={game.isPlayoffGame}
              />
            </p>
            <TeamScore score={visitorGoals} gameStatus={gameStatus} />
          </div>
          <TeamInfo
            team={game.visitorTeam}
            isPlayoffGame={game.isPlayoffGame}
          />
        </div>
      </div>
    </article>
  );
};
