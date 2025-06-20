import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { EndState, FinalGame } from "~/components/types";
import { FinalGameStatus } from "./FinalGameStatus";

type FinalGameContentsProps = {
  readonly game: FinalGame;
};

export const FinalGameContents = ({ game }: FinalGameContentsProps) => {
  return (
    <>
      <TeamInfo
        logoUrl={game.homeTeam.logoUrl}
        teamName={game.homeTeam.name}
        record={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <Score score={game.homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <FinalGameStatus
            endedInPeriod={game.endedInPeriod}
            gameType={game.type}
          />
        </p>
        <Score score={game.visitingScore} />
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
        record={game.visitingTeam.record}
      />
    </>
  );
};
