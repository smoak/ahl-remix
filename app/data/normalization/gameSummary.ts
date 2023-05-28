import type {
  BootstrapResponse,
  GameSummaryDetails,
  GameSummaryPeriod,
  GameSummaryPeriodGoal,
  GameSummaryPeriodGoalAssist,
  GameSummaryResponse,
  GameSummaryTeam,
} from "~/api/types";
import type {
  Game,
  GameDetails,
  GamePeriod,
  GameStatus,
  ScoringDetail,
  ScoringDetailAssister,
  Team,
} from "../types";

const normalizeGameSummaryTeam = (
  { info, seasonStats }: GameSummaryTeam,
  seasonId: string
): Team => {
  // hack: the CV Firebirds (team id 445)
  // does not fit the same logo format so we
  // have to modify
  const logoUrl =
    info.id === 445
      ? `https://assets.leaguestat.com/ahl/logos/50x50/${info.id}.png`
      : `https://assets.leaguestat.com/ahl/logos/50x50/${info.id}_${seasonId}.png`;

  return {
    abbrev: info.abbreviation,
    city: info.city,
    id: info.id,
    logoUrl,
    losses: seasonStats.teamRecord.losses,
    nickName: info.nickname,
    otLosses: seasonStats.teamRecord.OTLosses,
    wins: seasonStats.teamRecord.wins,
  };
};

const getGameStatus = ({ status }: GameSummaryDetails): GameStatus => {
  if (status === "Final" || status === "Unofficial Final") {
    return "Final";
  }

  if (status.startsWith(" ")) {
    return "Scheduled";
  }

  return "Live";
};

type NormalizedScoringDetailAssists = {
  readonly primaryAssist: ScoringDetailAssister | undefined;
  readonly secondaryAssist: ScoringDetailAssister | undefined;
};
const normalizeScoringDetailAssists = (
  assists: GameSummaryPeriodGoalAssist[],
  assistNumbers: string[]
): NormalizedScoringDetailAssists => {
  if (assists.length === 0) {
    return {
      primaryAssist: undefined,
      secondaryAssist: undefined,
    };
  }

  const [primary] = assists;
  const [primaryGoals] = assistNumbers;
  const primaryAssist: ScoringDetailAssister = {
    id: primary.id,
    name: `${primary.firstName} ${primary.lastName}`,
    seasonAssists: parseInt(primaryGoals),
  };

  if (assists.length === 1) {
    return {
      primaryAssist,
      secondaryAssist: undefined,
    };
  }

  const secondary = assists[1];
  const secondaryGoals = assistNumbers[1];
  const secondaryAssist: ScoringDetailAssister = {
    id: secondary.id,
    name: `${secondary.firstName} ${secondary.lastName}`,
    seasonAssists: parseInt(secondaryGoals),
  };

  return {
    primaryAssist,
    secondaryAssist,
  };
};

const normalizeGameSummaryPeriodGoal = (
  {
    assistNumbers,
    assists,
    game_goal_id,
    period,
    properties,
    scoredBy,
    scorerGoalNumber,
    team,
    time,
  }: GameSummaryPeriodGoal,
  goals: { home: number; visiting: number }
): ScoringDetail => {
  const { primaryAssist, secondaryAssist } = normalizeScoringDetailAssists(
    assists,
    assistNumbers
  );

  return {
    goals: {
      home: goals.home,
      visiting: goals.visiting,
    },
    id: game_goal_id,
    period: parseInt(period.id),
    periodOrdinal: period.longName,
    periodTime: time,
    scoredBy: {
      imageUrl: scoredBy.playerImageURL,
      name: `${scoredBy.firstName} ${scoredBy.lastName}`,
      seasonGoals: parseInt(scorerGoalNumber),
    },
    scoringTeamId: team.id,
    strength: properties.isPowerPlay === "1" ? "PPG" : "EVEN",
    primaryAssist,
    secondaryAssist,
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

const formatClockTime = (gameStatus: string): string => {
  // this is a bit gross, but such is the way of this api
  // in the response.details.status it will look something like:
  // In Progress (16:47 remaining in 2nd)
  // so we have to parse it out
  if (!gameStatus.includes("In Progress")) {
    return "00:00";
  }

  return gameStatus.substring(13, 18);
};

export const normalizeGameSummaryResponse = (
  gameSummaryResponse: GameSummaryResponse,
  bootstrap: BootstrapResponse
): GameDetails => {
  const { details, homeTeam, periods, visitingTeam } = gameSummaryResponse;

  const isPlayoffGame = bootstrap.playoffSeasons.some(
    (s) => s.id === details.seasonId
  );
  const startTime = new Date(details.GameDateISO8601);
  const period = parseInt(periods[periods.length - 1].info.id);
  const clockTime = formatClockTime(details.status);

  const game: Game = {
    clockTime,
    homeGoals: homeTeam.stats.goals,
    homeTeam: normalizeGameSummaryTeam(homeTeam, details.seasonId),
    id: details.id,
    visitorTeam: normalizeGameSummaryTeam(visitingTeam, details.seasonId),
    isInIntermission: details.status.includes("Intermission"),
    isPlayoffGame,
    period,
    startTime: startTime.getTime(),
    startTimeUtc: startTime.getTime(),
    status: getGameStatus(details),
    visitorGoals: visitingTeam.stats.goals,
  };

  // periods is an array of objects for each period
  // so at least 3 length for a finished game. possibly more if it goes to OT
  // each period has a list of goal objects
  // the data we get does not include goal info for the scoring detail
  // we either have total goals for the game, or total goals for the period
  // we do NOT have the goals so far up to that goal
  // e.g. if there are 3 goals in period 1, the homeGoals will be 2 and the visitingGoals will be 1
  // for EACH goal object in the goals array for the first period
  // so we have to keep track of goals so far which is what this awfulness does below
  const { scoringDetails } = periods
    .flatMap((p) => p.goals)
    .reduce(
      (acc, goal) => {
        const isVisitingGoal = goal.team.id === visitingTeam.info.id;
        const homeGoals = !isVisitingGoal ? acc.homeGoals + 1 : acc.homeGoals;
        const visitingGoals = isVisitingGoal
          ? acc.visitingGoals + 1
          : acc.visitingGoals;

        const scoringDetail = normalizeGameSummaryPeriodGoal(goal, {
          home: homeGoals,
          visiting: visitingGoals,
        });
        return {
          scoringDetails: [...acc.scoringDetails, scoringDetail],
          homeGoals,
          visitingGoals,
        };
      },
      {
        scoringDetails: [] as ScoringDetail[],
        homeGoals: 0,
        visitingGoals: 0,
      }
    );

  return {
    game,
    scoringDetails,
    periods: periods.map(normalizeGameSummaryPeriod),
    teamStats: {
      home: {
        shotsOnGoal: homeTeam.stats.shots,
      },
      visitor: {
        shotsOnGoal: visitingTeam.stats.shots,
      },
    },
  };
};
