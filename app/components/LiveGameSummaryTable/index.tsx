import type { GameDetails, Team } from "~/data/types";
import { TeamLogo } from "../TeamLogo";
import { TableCell } from "../Table";

type LiveGameSummaryTableProps = {
  readonly gameDetails: GameDetails;
};

type TeamNameTableCellProps = {
  readonly team: Team;
  readonly shotsOnGoal: number;
};

const TeamNameTableCell = ({ shotsOnGoal, team }: TeamNameTableCellProps) => {
  return (
    <TableCell>
      <div className="flex">
        <TeamLogo
          id={team.id}
          teamName={team.nickName}
          logoUrl={team.logoUrl}
        />
        <div className="items-center px-2 text-left text-sm">
          {team.nickName}
          <p className="text-xs">{shotsOnGoal} SOG</p>
        </div>
      </div>
    </TableCell>
  );
};

export const LiveGameSummaryTable = ({
  gameDetails,
}: LiveGameSummaryTableProps) => {
  const { periods, game, teamStats } = gameDetails;
  const firstPeriod = periods[0];
  const secondPeriod = periods[1];
  const thirdPeriod = periods[2];

  return (
    <table className="my-5 min-w-full border border-black text-center text-ahl-gray-50 md:min-w-min">
      <thead className="bg-black font-bold">
        <tr>
          <TableCell>Team</TableCell>
          <TableCell>1st</TableCell>
          <TableCell>2nd</TableCell>
          <TableCell>3rd</TableCell>
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.visitorTeam}
            shotsOnGoal={teamStats.visitor.shotsOnGoal}
          />
          <TableCell>{firstPeriod.visitorGoals}</TableCell>
          <TableCell>{secondPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{game.visitorGoals}</TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.homeTeam}
            shotsOnGoal={teamStats.home.shotsOnGoal}
          />
          <TableCell>{firstPeriod.homeGoals}</TableCell>
          <TableCell>{secondPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{game.homeGoals}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
