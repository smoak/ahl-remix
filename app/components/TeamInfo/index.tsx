import { TeamLogo } from "~/components/TeamLogo";
import type { Team } from "~/data/types";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly team: Team;
  readonly isPlayoffGame: boolean;
};

export const TeamInfo = ({ isPlayoffGame, team }: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo id={team.id} logoUrl={team.logoUrl} teamName={team.nickName} />
    <TeamName
      isGameInProgress={false}
      isGoaliePulled={false}
      isOnPowerPlay={false}
      name={team.nickName}
    />
    <TeamRecord
      isPlayoffGame={isPlayoffGame}
      losses={team.losses}
      ot={team.otLosses}
      wins={team.wins}
    />
  </div>
);
