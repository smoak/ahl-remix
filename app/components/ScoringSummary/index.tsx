import type { ScoringDetail, Team } from "~/data/types";
import { ScoringDetailList } from "../ScoringDetailList";
import { useGoalSummary } from "~/hooks/useGoalSummary";

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

type OvertimePeriodScoringSummaryProps = Omit<
  PeriodScoringSummaryProps,
  "ordinal" | "scoringDetails"
> & {
  readonly scoringDetail?: ScoringDetail;
};

const OvertimePeriodScoringSummary = ({
  homeTeam,
  visitorTeam,
  scoringDetail,
}: OvertimePeriodScoringSummaryProps): JSX.Element | null => {
  if (!scoringDetail) {
    return null;
  }

  const { period, periodOrdinal } = scoringDetail;

  return (
    <>
      {[...Array(period - 4).keys()].map((i) => {
        if (i === 0) {
          return (
            <PeriodScoringSummary
              key={i}
              visitorTeam={visitorTeam}
              homeTeam={homeTeam}
              ordinal="OT"
              scoringDetails={[]}
            />
          );
        }
        return (
          <PeriodScoringSummary
            key={i}
            visitorTeam={visitorTeam}
            homeTeam={homeTeam}
            ordinal={`${i + 1}OT`}
            scoringDetails={[]}
          />
        );
      })}
      <PeriodScoringSummary
        visitorTeam={visitorTeam}
        homeTeam={homeTeam}
        ordinal={periodOrdinal}
        scoringDetails={[scoringDetail]}
      />
    </>
  );
};

type ScoringSummaryProps = {
  readonly gameId: number;
  readonly homeTeam: Team;
  readonly scoringDetails: ScoringDetail[];
  readonly visitorTeam: Team;
};

export const ScoringSummary = ({
  gameId,
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
  const otPeriodScoringPlays = scoringDetails.filter(
    (sp) => ![1, 2, 3].includes(sp.period) && sp.periodOrdinal !== "SO"
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
      <OvertimePeriodScoringSummary
        scoringDetail={otPeriodScoringPlays[0]}
        homeTeam={homeTeam}
        visitorTeam={visitorTeam}
      />
    </div>
  );
};
