import { PeriodOrdinal } from "~/components/PeriodOrdinal";
import type { ScoringPlay } from "~/components/types";
import { ScoringPlayList } from "../ScoringPlayList";

type PeriodScoringSummaryProps = {
  readonly periodNumber: number;
  readonly scoringPlays: ScoringPlay[];
};

export const PeriodScoringSummary = ({
  periodNumber,
  scoringPlays,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="my-5 border-b-2 border-slate-900 bg-slate-900 px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={periodNumber} /> period
      </div>
      <ScoringPlayList scoringPlays={scoringPlays} />
    </>
  );
};
