import type {
  StandingsResponse,
  StandingsResponseSectionData,
} from "~/api/types";
import type { Standings, StandingsRecord } from "~/components/types";

const normalizeStandingsRecord = ({
  prop,
  row,
}: StandingsResponseSectionData): StandingsRecord => {
  const teamId = prop.team_code.teamLink;

  return {
    teamId,
    gamesPlayed: parseInt(row.games_played),
    losses: parseInt(row.losses),
    otLosses: parseInt(row.ot_losses),
    points: parseInt(row.points),
    pointsPercentage: parseInt(row.percentage),
    regulationWins: parseInt(row.regulation_wins),
    teamAbbrev: row.team_code,
    teamLogoUrl: `https://assets.leaguestat.com/ahl/logos/50x50/${teamId}.png`,
    teamName: row.name,
    shootoutLossess: parseInt(row.shootout_losses),
  };
};

export const normalizeConferenceStandings = (
  standingResponse: StandingsResponse
): Standings["conference"] => {
  const [apiEastern, apiWestern] = standingResponse[0].sections;
  const east = apiEastern.data.map(normalizeStandingsRecord);
  const west = apiWestern.data.map(normalizeStandingsRecord);

  return {
    east,
    west,
  };
};

export const normalizeLeagueStandings = (
  standingsResponse: StandingsResponse
): Standings["league"] => {
  return standingsResponse[0].sections[0].data
    .sort((a, b) => a.row.rank - b.row.rank)
    .map(normalizeStandingsRecord);
};

export const normalizeDivisionStandings = (
  standingsResponse: StandingsResponse
): Standings["division"] => {
  const [apiAtlantic, apiNorth, apiCentral, apiPacific] =
    standingsResponse[0].sections;
  const atlantic = apiAtlantic.data.map(normalizeStandingsRecord);
  const north = apiNorth.data.map(normalizeStandingsRecord);
  const central = apiCentral.data.map(normalizeStandingsRecord);
  const pacific = apiPacific.data.map(normalizeStandingsRecord);

  return {
    atlantic,
    central,
    north,
    pacific,
  };
};
