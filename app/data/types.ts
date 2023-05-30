export type Game = {
  readonly id: number;
  readonly startTime: number;
  readonly startTimeUtc: number;
  readonly homeTeam: Team;
  readonly homeGoals: number;
  readonly visitorTeam: Team;
  readonly visitorGoals: number;
  readonly period: number;
  readonly status: GameStatus;
  readonly clockTime: string;
  readonly isPlayoffGame: boolean;
  readonly isInIntermission: boolean;
  readonly playoffSeriesSummary?: string;
};

export type PreviousMeeting = {
  readonly gameId: number;
  readonly homeScore: number;
  readonly homeTeamId: number;
  readonly visitingScore: number;
  readonly visitingTeamId: number;
  readonly winningTeamId: number;
};

export type GamePreview = {
  readonly gameId: number;
  readonly previousMeetings: PreviousMeeting[];
};

export type Team = {
  readonly id: number;
  readonly abbrev: string;
  readonly city: string;
  readonly nickName: string;
  readonly logoUrl: string;
  readonly wins: number;
  readonly losses: number;
  readonly otLosses: number;
};

export type ScoringDetailAssister = {
  readonly id: number;
  readonly name: string;
  readonly seasonAssists: number;
};

export type ScoringDetail = {
  readonly id: string;
  readonly period: number;
  readonly periodOrdinal: string;
  readonly periodTime: string;
  readonly goals: {
    readonly home: number;
    readonly visiting: number;
  };
  readonly scoredBy: {
    readonly name: string;
    readonly imageUrl: string;
    readonly seasonGoals: number;
  };
  readonly primaryAssist?: ScoringDetailAssister;
  readonly secondaryAssist?: ScoringDetailAssister;
  readonly scoringTeamId: number;
  readonly strength: "PPG" | "EVEN" | "SHG";
};

export type GamePeriod = {
  readonly ordinalNum: string;
  readonly num: number;
  readonly visitorGoals: number;
  readonly visitorShotsOnGoal: number;
  readonly homeGoals: number;
  readonly homeShotsOnGoal: number;
};

export type GameStatus = "Scheduled" | "Live" | "Final";

export type TeamStat = {
  readonly shotsOnGoal: number;
};

export type TeamStats = {
  readonly home: TeamStat;
  readonly visitor: TeamStat;
};

export type GameDetails = {
  readonly game: Game;
  readonly scoringDetails: ScoringDetail[];
  readonly teamStats: TeamStats;
  readonly periods: GamePeriod[];
};

export const isLiveGame = (game: Game): boolean => game.status === "Live";
