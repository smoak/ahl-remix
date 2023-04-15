import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";

export type TeamInfoProps = {
  readonly logoUrl: string;
  readonly teamName: string;
  readonly wins: string;
  readonly losses: string;
  readonly ot: string;
};

export const TeamInfo = ({
  logoUrl,
  losses,
  ot,
  teamName,
  wins,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo logoUrl={logoUrl} teamName={teamName} />
    <TeamName
      isGameInProgress={false}
      isGoaliePulled={false}
      isOnPowerPlay={false}
      name={teamName}
    />
    <p className="text-xs">
      {wins}-{losses}-{ot}
    </p>
  </div>
);
