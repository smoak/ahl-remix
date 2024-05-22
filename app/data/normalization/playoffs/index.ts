import type {
  PlayoffBracketResponse,
  PlayoffBracketRound,
  PlayoffTeams,
  PlayoffMatchup as ApiPlayoffMatchup,
} from "~/api/types";
import type {
  PlayoffBracket,
  PlayoffMatchup,
  PlayoffRound,
} from "~/components/types";

const normalizeMatchup = (
  m: ApiPlayoffMatchup,
  teams: PlayoffTeams
): PlayoffMatchup => {
  const highSeedTeam = teams[m.team1];
  const lowSeedTeam = teams[m.team2];
  const highSeedWins = m.team1_wins;
  const lowSeedWins = m.team2_wins;

  // ugh the "winner" field is not populated from the api
  // so we must calculate it on our own
  // to make matters worse
  // first round is best of 3
  // rounds 2 & 3 are best of 5
  // conf finals (round 4) is best of 7
  // calder cup final (round 5) is best of 7
  const roundNumber = parseInt(m.round);
  const winsRequired = roundNumber === 1 ? 2 : roundNumber < 4 ? 3 : 4;

  return {
    id: m.series_letter,
    highSeed: {
      abbrev: highSeedTeam.team_code,
      id: highSeedTeam.id,
      logo: highSeedTeam.logo,
      name: highSeedTeam.name,
      seriesWins: highSeedWins,
    },
    lowSeed: {
      abbrev: lowSeedTeam.team_code,
      id: lowSeedTeam.id,
      logo: lowSeedTeam.logo,
      name: lowSeedTeam.name,
      seriesWins: lowSeedWins,
    },
    winsRequired,
  };
};

const normalizePlayoffRound = (
  round: PlayoffBracketRound,
  teams: PlayoffTeams
): PlayoffRound => {
  const id = parseInt(round.round);
  const matchups = round.matchups
    .filter((r) => r.games.length > 0)
    .map((m) => normalizeMatchup(m, teams));

  return {
    id,
    hasStarted: round.matchups.some((r) => r.team1 !== "0" && r.team2 !== "0"),
    matchups,
    name: `Round ${round.round}`,
    roundNumber: id,
  };
};

export const normalizePlayoffBracket = ({
  SiteKit,
}: PlayoffBracketResponse): PlayoffBracket => {
  const { Brackets } = SiteKit;
  const { rounds, teams } = Brackets;

  return { rounds: rounds.map((round) => normalizePlayoffRound(round, teams)) };
};
