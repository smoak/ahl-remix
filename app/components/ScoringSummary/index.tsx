import type { ScoringDetail, Team } from "~/data/types";
import { ScoringDetailList } from "../ScoringDetailList";

type PeriodScoringSummaryProps = {
  readonly ordinal: string;
  readonly scoringDetails: ScoringDetail[];
  readonly homeTeam: Team;
  readonly visitorTeam: Team;
};
const PeriodScoringSummary = ({
  homeTeam,
  visitorTeam,
  ordinal,
  scoringDetails,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="border-nhl-black my-5 border-b-2 bg-black px-6 py-3 font-bold text-white">
        {ordinal} period
      </div>
      <ScoringDetailList
        scoringDetails={scoringDetails}
        visitorTeam={visitorTeam}
        homeTeam={homeTeam}
      />
    </>
  );
};

type ScoringSummaryProps = {
  readonly homeTeam: Team;
  readonly scoringDetails: ScoringDetail[];
  readonly visitorTeam: Team;
};

export const ScoringSummary = ({
  homeTeam,
  visitorTeam,
  scoringDetails,
}: ScoringSummaryProps): JSX.Element | null => {
  if (scoringDetails.length === 0) {
    return null;
  }

  const firstPeriodScoringPlays = scoringDetails.filter(
    (sp) => sp.period === 1
  );
  const secondPeriodScoringPlays = scoringDetails.filter(
    (sp) => sp.period === 2
  );
  const thirdPeriodScoringPlays = scoringDetails.filter(
    (sp) => sp.period === 3
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary
        ordinal="1st"
        scoringDetails={firstPeriodScoringPlays}
        homeTeam={homeTeam}
        visitorTeam={visitorTeam}
      />
      <PeriodScoringSummary
        ordinal="2nd"
        scoringDetails={secondPeriodScoringPlays}
        homeTeam={homeTeam}
        visitorTeam={visitorTeam}
      />
      <PeriodScoringSummary
        ordinal="3rd"
        scoringDetails={thirdPeriodScoringPlays}
        homeTeam={homeTeam}
        visitorTeam={visitorTeam}
      />
    </div>
  );
};
