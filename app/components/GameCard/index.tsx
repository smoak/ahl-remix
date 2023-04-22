import type { Game } from "~/data/types";
import { CurrentGameStatus } from "../CurrentGameStatus";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import { TeamInfo } from "../TeamInfo";
import { TeamScore } from "../TeamScore";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps): JSX.Element => {
  return (
    <article className="flex rounded-lg border border-black">
      <div className="flex w-full flex-col">
        <div className="flex p-9">
          <TeamInfo team={game.homeTeam} isPlayoffGame={game.isPlayoffGame} />
          <div className="mt-3 flex flex-1">
            <TeamScore score={game.homeGoals} gameStatus={game.status} />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus
                gameStatus={game.status}
                startTime={game.startTime}
                period={game.period}
                isIntermission={game.isInIntermission}
                gameClock={game.clockTime}
                isPlayoffGame={game.isPlayoffGame}
              />
              <PlayoffSeriesSummary
                homeTeam={game.homeTeam}
                isPlayoffGame={game.isPlayoffGame}
                visitorTeam={game.visitorTeam}
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
