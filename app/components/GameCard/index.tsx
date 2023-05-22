import type { Game } from "~/data/types";
import { CurrentGameStatus } from "../CurrentGameStatus";
// import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import { TeamInfo } from "../TeamInfo";
import { TeamScore } from "../TeamScore";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps): JSX.Element => {
  return (
    <article className="flex h-36 rounded-lg border border-black">
      <div className="flex w-full flex-col">
        <div className="flex p-8">
          <TeamInfo team={game.homeTeam} isPlayoffGame={game.isPlayoffGame} />
          <div className="mt-3 flex flex-1">
            <TeamScore score={game.homeGoals} gameStatus={game.status} />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus
                gameId={game.id}
                gameStatus={game.status}
                startTime={game.startTimeUtc}
                period={game.period}
                isIntermission={game.isInIntermission}
                gameClock={game.clockTime}
                isPlayoffGame={game.isPlayoffGame}
              />
            </p>
            <TeamScore score={game.visitorGoals} gameStatus={game.status} />
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
