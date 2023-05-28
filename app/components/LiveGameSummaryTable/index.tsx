import type { GameDetails, Team } from "~/data/types";
import { useGoalSummary } from "~/hooks/useGoalSummary";
import { TeamLogo } from "../TeamLogo";
import { TableCell } from "../Table";

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

type GoalCellsProps = {
  readonly goalsByPeriod: number[];
};
const GoalCells = ({ goalsByPeriod }: GoalCellsProps): JSX.Element => {
  const firstPeriod = goalsByPeriod[1];
  const secondPeriod = goalsByPeriod[2];
  const thirdPeriod = goalsByPeriod[3];

  return (
    <>
      <TableCell>{firstPeriod}</TableCell>
      <TableCell>{secondPeriod ?? "-"}</TableCell>
      <TableCell>{thirdPeriod ?? "-"}</TableCell>
    </>
  );
};

type LiveGameSummaryTableProps = {
  readonly gameDetails: GameDetails;
};

export const LiveGameSummaryTable = ({
  gameDetails,
}: LiveGameSummaryTableProps) => {
  const goalsSummary = useGoalSummary(gameDetails.game.id);
  const { periods, game, teamStats } = gameDetails;
  const homeGoalTotal = goalsSummary?.HomeGoalTotal ?? game.homeGoals;
  const visitorGoalTotal = goalsSummary?.VisitorGoalTotal ?? game.visitorGoals;
  const homeGoalsByPeriod = goalsSummary?.HomeGoalsByPeriod ?? [
    0,
    ...periods.map((p) => p.homeGoals),
  ];
  const visitorGoalsByPeriod = goalsSummary?.VisitorGoalsByPeriod ?? [
    0,
    ...periods.map((p) => p.visitorGoals),
  ];

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
          <GoalCells goalsByPeriod={visitorGoalsByPeriod} />
          <TableCell>{visitorGoalTotal}</TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.homeTeam}
            shotsOnGoal={teamStats.home.shotsOnGoal}
          />
          <GoalCells goalsByPeriod={homeGoalsByPeriod} />
          <TableCell>{homeGoalTotal}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
