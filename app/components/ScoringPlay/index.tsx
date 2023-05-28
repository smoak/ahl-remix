import { red, slate } from "tailwindcss/colors";
import type { ScoringDetail, ScoringDetailAssister, Team } from "~/data/types";

type AssistInfoProps = {
  readonly primaryAssist?: ScoringDetailAssister;
  readonly secondaryAssist?: ScoringDetailAssister;
};
const AssistInfo = ({
  primaryAssist,
  secondaryAssist,
}: AssistInfoProps): JSX.Element | null => {
  if (!primaryAssist) {
    return null;
  }

  if (!secondaryAssist) {
    return (
      <span className="block text-center text-xs">
        {primaryAssist.name} ({primaryAssist.seasonAssists})
      </span>
    );
  }

  return (
    <span className="block text-center text-xs">
      {primaryAssist.name} ({primaryAssist.seasonAssists}),{" "}
      {secondaryAssist.name} ({secondaryAssist.seasonAssists})
    </span>
  );
};

type ScoringStrengthProps = {
  readonly strength: ScoringDetail["strength"];
};
const ScoringStrength = ({
  strength,
}: ScoringStrengthProps): JSX.Element | null => {
  if (strength === "EVEN") {
    return null;
  }

  return (
    <div className="px-2 py-1 text-center font-bold">
      <span>{strength}</span>
    </div>
  );
};

type ScoringPlayProps = {
  readonly visitorTeam: Team;
  readonly homeTeam: Team;
  readonly scoringDetail: ScoringDetail;
};
export const ScoringPlay = ({
  visitorTeam,
  homeTeam,
  scoringDetail,
}: ScoringPlayProps): JSX.Element => {
  const { periodTime, periodOrdinal, scoringTeamId, goals, strength } = scoringDetail;
  const isScoringTeamVisitor = scoringTeamId === visitorTeam.id;
  const color = isScoringTeamVisitor ? red["700"] : slate["700"];

  return (
    <div className="flex pb-4">
      <img
        className="inline-block h-14 w-14 rounded-full border"
        alt={scoringDetail.scoredBy.name}
        src={scoringDetail.scoredBy.imageUrl}
      />
      <div className="inline-block whitespace-nowrap pl-3 text-center">
        <span className="font-bold">
          {scoringDetail.scoredBy.name} ({scoringDetail.scoredBy.seasonGoals})
        </span>
        <AssistInfo
          primaryAssist={scoringDetail.primaryAssist}
          secondaryAssist={scoringDetail.secondaryAssist}
        />
        <div
          style={{ borderColor: color, color }}
          className="mt-1 flex max-w-min rounded-sm border text-xs"
        >
          <div className="inline-block border-r-2 px-2 py-1 text-center">
            <span>
              {periodTime} / {periodOrdinal}
            </span>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="px-2 py-1 text-center text-white"
          >
            <span className={isScoringTeamVisitor ? "font-bold" : ""}>
              {visitorTeam.abbrev} {goals.visiting},{" "}
            </span>
            <span className={!isScoringTeamVisitor ? "font-bold" : ""}>
              {homeTeam.abbrev} {goals.home}
            </span>
          </div>
          <ScoringStrength strength={strength} />
        </div>
      </div>
    </div>
  );
};
