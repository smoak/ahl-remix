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

export type GameStatus = "Scheduled" | "Live" | "Final";

export const isLiveGame = (game: Game): boolean => game.status === "Live";
