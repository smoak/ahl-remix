export type GameStatus = "1" | "2" | "3" | "4";

export type ScheduledGame = {
  readonly ID: string;
  readonly Date: string;
  readonly GameDateISO8601: string;
  readonly HomeCode: string;
  readonly HomeNickname: string;
  readonly HomeGoals: string;
  readonly HomeLogo: string;
  readonly HomeWins: string;
  readonly HomeRegulationLosses: string;
  readonly HomeOTLosses: string;
  readonly VisitorCode: string;
  readonly VisitorNickname: string;
  readonly VisitorGoals: string;
  readonly VisitorLogo: string;
  readonly VisitorWins: string;
  readonly VisitorRegulationLosses: string;
  readonly VisitorOTLosses: string;
  readonly GameStatusString: string;
  readonly GameStatusStringLong: string;
  readonly GameStatus: GameStatus;
};

export type ModulekitResponse = {
  readonly SiteKit: {
    readonly Scorebar: ScheduledGame[];
  };
};
