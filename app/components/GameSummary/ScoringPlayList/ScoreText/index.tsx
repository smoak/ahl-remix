import type { ScoringPlay } from "~/components/types";

type ScoreTextProps = {
  readonly scoringPlay: ScoringPlay;
};

export const ScoreText = ({ scoringPlay }: ScoreTextProps) => {
  const { homeScore, leadingTeamAbbrev, visitorScore } = scoringPlay;

  if (leadingTeamAbbrev != null) {
    const scoreText =
      homeScore > visitorScore
        ? `${homeScore}-${visitorScore}`
        : `${visitorScore}-${homeScore}`;
    return (
      <div className="flex flex-col">
        <span>Score</span>
        <span className="font-bold">
          {scoreText} {leadingTeamAbbrev}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span>Score</span>
      <span className="font-bold">
        {homeScore}-{visitorScore}
      </span>
    </div>
  );
};
