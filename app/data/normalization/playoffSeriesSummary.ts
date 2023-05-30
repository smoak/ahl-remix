import type { GamePreview, Team } from "../types";

type GetPlayoffSeriesSummaryOptions = {
  readonly homeTeam: Team;
  readonly gamePreview?: GamePreview;
  readonly visitorTeam: Team;
};
export const getPlayoffSeriesSummary = ({
  gamePreview,
  homeTeam,
  visitorTeam,
}: GetPlayoffSeriesSummaryOptions): string | undefined => {
  if (!gamePreview) {
    return;
  }

  const homeTeamWins = gamePreview.previousMeetings.reduce(
    (acc, previousMeeting) => {
      if (previousMeeting.winningTeamId === homeTeam.id) {
        return acc + 1;
      }

      return acc;
    },
    0
  );

  const visitorTeamWins = gamePreview.previousMeetings.reduce(
    (acc, previousMeeting) => {
      if (previousMeeting.winningTeamId === visitorTeam.id) {
        return acc + 1;
      }

      return acc;
    },
    0
  );

  if (homeTeamWins === visitorTeamWins) {
    return `Tied ${homeTeamWins}-${visitorTeamWins}`;
  }

  if (homeTeamWins > visitorTeamWins) {
    return `${homeTeam.abbrev} leads ${homeTeamWins}-${visitorTeamWins}`;
  }

  return `${visitorTeam.abbrev} leads ${visitorTeamWins}-${homeTeamWins}`;
};
