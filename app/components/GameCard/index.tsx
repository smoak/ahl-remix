import type { ScheduledGame } from "~/api/types";
import { CurrentGameStatus } from "../CurrentGameStatus";
import { TeamInfo } from "../TeamInfo";
import { TeamScore } from "../TeamScore";

export type GameCardProps = {
  readonly game: ScheduledGame;
};

export const GameCard = ({ game }: GameCardProps): JSX.Element => {
  return (
    <article className="flex rounded-lg border border-black">
      <div className="flex w-full flex-col">
        <div className="flex p-9">
          <TeamInfo
            logoUrl={game.HomeLogo}
            teamName={game.HomeNickname}
            wins={game.HomeWins}
            losses={game.HomeRegulationLosses}
            ot={game.HomeOTLosses}
          />
          <div className="mt-3 flex flex-1">
            <TeamScore score={game.HomeGoals} gameStatus={game.GameStatus} />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus game={game} />
            </p>
            <TeamScore score={game.VisitorGoals} gameStatus={game.GameStatus} />
          </div>
          <TeamInfo
            logoUrl={game.VisitorLogo}
            teamName={game.VisitorNickname}
            wins={game.VisitorWins}
            losses={game.VisitorRegulationLosses}
            ot={game.VisitorOTLosses}
          />
        </div>
      </div>
    </article>
  );
};
