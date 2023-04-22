import type { Team } from "~/data/types";

export type PlayoffSeriesSummaryProps = {
  readonly isPlayoffGame: boolean;
  readonly homeTeam: Team;
  readonly visitorTeam: Team;
};

const getSeriesStatus = (homeTeam: Team, visitorTeam: Team): string => {
  if (homeTeam.wins === visitorTeam.wins) {
    return `Tied ${homeTeam.wins}-${visitorTeam.wins}`;
  }

  if (homeTeam.wins > visitorTeam.wins) {
    return `${homeTeam.abbrev} leads ${homeTeam.wins}-${visitorTeam.wins}`;
  }

  return `${visitorTeam.abbrev} leads ${visitorTeam.wins}-${homeTeam.wins}`;
};

export const PlayoffSeriesSummary = ({
  homeTeam,
  isPlayoffGame,
  visitorTeam,
}: PlayoffSeriesSummaryProps) => {
  if (!isPlayoffGame) {
    return null;
  }

  const seriesStatusShort = getSeriesStatus(homeTeam, visitorTeam);

  return (
    <span className="mt-3 block text-center text-xs font-semibold normal-case">
      {seriesStatusShort}
    </span>
  );
};
