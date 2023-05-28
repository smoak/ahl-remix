import type { ScoringDetail, Team } from "~/data/types";
import { ScoringPlay } from "../ScoringPlay";

type ScoringDetailListProps = {
  readonly visitorTeam: Team;
  readonly homeTeam: Team;
  readonly scoringDetails: ScoringDetail[];
};
export const ScoringDetailList = ({
  visitorTeam,
  homeTeam,
  scoringDetails,
}: ScoringDetailListProps): JSX.Element => {
  if (scoringDetails.length === 0) {
    return <span>No Goals</span>;
  }

  return (
    <>
      {scoringDetails.map((sd) => (
        <ScoringPlay
          key={sd.id}
          scoringDetail={sd}
          homeTeam={homeTeam}
          visitorTeam={visitorTeam}
        />
      ))}
    </>
  );
};
