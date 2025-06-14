import type {
  GameSummaryPeriod,
  GameSummaryPeriodGoal,
  GameSummaryPeriodGoalAssist,
  GameSummaryResponse,
  GameSummaryTeam,
} from "~/api/types";
import type {
  FinalGame,
  GameDetails,
  GamePeriod,
  GameStats,
  GoalType,
  LiveGame,
  ScheduledGame,
  ScoringPlay,
  ScoringPlayAssister,
  ScoringPlays,
  Team,
  TeamStats,
} from "~/components/types";
import { normalizeEndState } from "./endState";

const normalizeFinalGame = ({
  details,
  homeTeam,
  periods,
  visitingTeam,
}: GameSummaryResponse): FinalGame => {
  const endedInPeriod = parseInt(periods[periods.length - 1].info.id);

  return {
    gameDate: details.GameDateISO8601,
    gameState: "Final",
    homeScore: homeTeam.stats.goals,
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingScore: visitingTeam.stats.goals,
    visitingTeam: normalizeTeam(visitingTeam),
    endState: normalizeEndState({
      gameStatusStringLong: details.status,
      endedInPeriod,
    }),
  };
};

const normalizeTeam = (team: GameSummaryTeam): Team => {
  return {
    id: team.info.id,
    logoUrl: team.info.logo,
    name: team.info.nickname,
    losses: team.seasonStats.teamRecord.losses,
    otLosses: team.seasonStats.teamRecord.OTLosses,
    record: team.seasonStats.teamRecord.formattedRecord,
    wins: team.seasonStats.teamRecord.wins,
  };
};

const normalizeScheduledGame = ({
  details,
  homeTeam,
  visitingTeam,
}: GameSummaryResponse): ScheduledGame => {
  return {
    gameDate: details.GameDateISO8601,
    gameState: "Scheduled",
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingTeam: normalizeTeam(visitingTeam),
  };
};

const normalizeTeamStats = (apiTeam: GameSummaryTeam): TeamStats => {
  return {
    score: apiTeam.stats.goals,
    sog: apiTeam.stats.shots,
  };
};

const normalizeGameSummaryPeriod = ({
  info,
  stats,
}: GameSummaryPeriod): GamePeriod => {
  return {
    num: parseInt(info.id),
    ordinalNum: info.longName,
    homeGoals: parseInt(stats.homeGoals),
    homeShotsOnGoal: parseInt(stats.homeShots),
    visitorGoals: parseInt(stats.visitingGoals),
    visitorShotsOnGoal: parseInt(stats.visitingShots),
  };
};

const normalizeGameStats = (apiGameSummary: GameSummaryResponse): GameStats => {
  return {
    homeTeam: normalizeTeamStats(apiGameSummary.homeTeam),
    visitingTeam: normalizeTeamStats(apiGameSummary.visitingTeam),
    periods: apiGameSummary.periods.map(normalizeGameSummaryPeriod),
    scoringPlays: normalizeScoringDetails(apiGameSummary),
  };
};

const normalizeClockTime = (status: string): string => {
  if (!status.includes("In Progress")) {
    return "0:00";
  }

  return status.substring(13, 18).trim();
};

const normalizeLiveGame = ({
  details,
  homeTeam,
  periods,
  visitingTeam,
}: GameSummaryResponse): LiveGame => {
  const period = parseInt(periods[periods.length - 1].info.id);
  const clockTime = normalizeClockTime(details.status);

  return {
    gameDate: details.GameDateISO8601,
    gameState: "Live",
    gameClock: {
      clockTime,
      isInIntermission:
        details.status.includes("Intermission") || clockTime === "0:00",
      period,
    },
    homeScore: homeTeam.stats.goals,
    visitingScore: visitingTeam.stats.goals,
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingTeam: normalizeTeam(visitingTeam),
  };
};

const normalizeAssist = (
  assist?: GameSummaryPeriodGoalAssist,
  seasonAssists?: number
): ScoringPlayAssister | undefined => {
  if (!assist || !seasonAssists) {
    return;
  }

  return {
    firstName: assist.firstName,
    id: assist.id,
    lastName: assist.lastName,
    seasonAssists,
  };
};

const normalizeGoalType = ({
  isEmptyNet,
  isPowerPlay,
  isShortHanded,
}: GameSummaryPeriodGoal["properties"]): GoalType => {
  if (isEmptyNet === "1") {
    return "EmptyNet";
  }

  if (isPowerPlay === "1") {
    return "PowerPlay";
  }

  if (isShortHanded === "1") {
    return "ShortHanded";
  }

  return "Even";
};

type NormalizeScoringPlayOptions = {
  readonly goal: GameSummaryPeriodGoal;
  readonly homeTeam: GameSummaryTeam;
  readonly visitingTeam: GameSummaryTeam;
  readonly homeScore: number;
  readonly visitorScore: number;
};
const normalizeScoringPlay = ({
  goal,
  homeScore,
  homeTeam,
  visitingTeam,
  visitorScore,
}: NormalizeScoringPlayOptions): ScoringPlay => {
  const periodNum = parseInt(goal.period.id);
  const goalScorer = {
    id: goal.scoredBy.id,
    firstName: goal.scoredBy.firstName,
    headshotUrl: goal.scoredBy.playerImageURL,
    lastName: goal.scoredBy.lastName,
    seasonGoals: parseInt(goal.scorerGoalNumber),
  };
  const primaryAssist = normalizeAssist(
    goal.assists[0],
    parseInt(goal.assistNumbers[0])
  );
  const secondaryAssist = normalizeAssist(
    goal.assists[1],
    parseInt(goal.assistNumbers[1])
  );
  const scoringTeam = {
    id: goal.team.id,
    logoUrl: goal.team.logo,
    name: goal.team.name,
  };
  const goalType = normalizeGoalType(goal.properties);
  const leadingTeamAbbrev =
    homeScore > visitorScore
      ? homeTeam.info.abbreviation
      : visitorScore > homeScore
      ? visitingTeam.info.abbreviation
      : undefined;

  return {
    period: periodNum,
    goalScorer,
    goalType,
    homeScore,
    scoringTeam,
    timeInPeriod: goal.time,
    visitorScore,
    leadingTeamAbbrev,
    primaryAssist,
    secondaryAssist,
  };
};

const normalizeScoringDetails = ({
  periods,
  homeTeam,
  visitingTeam,
}: GameSummaryResponse) => {
  const { scoringPlays } = periods.reduce(
    (accum, period) => {
      const periodNum = parseInt(period.info.id);

      const { homeScore, visitorScore, scoringPlays } = period.goals.reduce(
        (prev, goal) => {
          const isHomeGoal = goal.team.id === homeTeam.info.id;
          const homeScore = isHomeGoal ? prev.homeScore + 1 : prev.homeScore;
          const visitorScore = isHomeGoal
            ? prev.visitorScore
            : prev.visitorScore + 1;

          const scoringPlay = normalizeScoringPlay({
            homeTeam,
            goal,
            visitingTeam,
            homeScore,
            visitorScore,
          });

          return {
            homeScore,
            visitorScore,
            scoringPlays: [...prev.scoringPlays, scoringPlay],
          };
        },
        {
          homeScore: accum.homeScore,
          visitorScore: accum.visitorScore,
          scoringPlays: [] as ScoringPlay[],
        }
      );

      accum.scoringPlays[periodNum] = scoringPlays;

      return {
        scoringPlays: accum.scoringPlays,
        homeScore,
        visitorScore,
      };
    },
    { homeScore: 0, visitorScore: 0, scoringPlays: {} as ScoringPlays }
  );

  return scoringPlays;
};

type NormalizeGameDetails = (
  apiGameSummary: GameSummaryResponse
) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (apiGameSummary) => {
  if (
    apiGameSummary.details.final === "1" ||
    apiGameSummary.details.status === "Unofficial Final"
  ) {
    return {
      game: normalizeFinalGame(apiGameSummary),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  if (
    apiGameSummary.details.started === "0" &&
    apiGameSummary.details.final === "0"
  ) {
    return {
      game: normalizeScheduledGame(apiGameSummary),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  return {
    game: normalizeLiveGame(apiGameSummary),
    gameStats: normalizeGameStats(apiGameSummary),
  };
};
