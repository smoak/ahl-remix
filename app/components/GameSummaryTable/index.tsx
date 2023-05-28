import type { GameDetails } from "~/data/types";
import { LiveGameSummaryTable } from "../LiveGameSummaryTable";
import { TableCell } from "../Table";

type GameSummaryTableProps = {
  readonly gameDetails: GameDetails;
};

export const GameSummaryTable = ({ gameDetails }: GameSummaryTableProps) => {
  if (gameDetails.game.status === "Live") {
    return <LiveGameSummaryTable gameDetails={gameDetails} />;
  }

  return (
    <table className="my-5 min-w-full border border-black text-center text-ahl-gray-50 md:min-w-min">
      <thead className="bg-black font-bold">
        <tr>
          <TableCell>Team</TableCell>
          {gameDetails.periods.map((p) => (
            <TableCell key={p.ordinalNum}>{p.ordinalNum}</TableCell>
          ))}
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TableCell>{gameDetails.game.visitorTeam.abbrev}</TableCell>
          {gameDetails.periods.map((p) => (
            <TableCell
              key={[p.ordinalNum, gameDetails.game.visitorTeam.id].join("")}
            >
              {p.visitorGoals}
            </TableCell>
          ))}
          <TableCell>{gameDetails.game.visitorGoals}</TableCell>
        </tr>
        <tr className="text-black">
          <TableCell>{gameDetails.game.homeTeam.abbrev}</TableCell>
          {gameDetails.periods.map((p) => (
            <TableCell
              key={[p.ordinalNum, gameDetails.game.homeTeam.id].join("")}
            >
              {p.homeGoals}
            </TableCell>
          ))}
          <TableCell>{gameDetails.game.homeGoals}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
