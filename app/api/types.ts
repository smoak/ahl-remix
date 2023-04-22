export type ScheduledGame = {
  readonly ID: string;
  readonly SeasonID: string;
  readonly Date: string;
  readonly GameDateISO8601: string;
  readonly Timezone: string;
  readonly HomeID: string;
  readonly HomeCode: string;
  readonly HomeCity: string;
  readonly HomeNickname: string;
  readonly HomeLongName: string;
  readonly HomeDivision: string;
  readonly HomeGoals: string;
  readonly HomeLogo: string;
  readonly HomeWins: string;
  readonly HomeRegulationLosses: string;
  readonly HomeOTLosses: string;
  readonly VisitorID: string;
  readonly VisitorCode: string;
  readonly VisitorCity: string;
  readonly VisitorNickname: string;
  readonly VisitorLongName: string;
  readonly VisitorDivision: string;
  readonly VisitorGoals: string;
  readonly VisitorLogo: string;
  readonly VisitorWins: string;
  readonly VisitorRegulationLosses: string;
  readonly VisitorOTLosses: string;
  readonly GameStatusString: string;
  readonly GameStatusStringLong: string;
  readonly GameStatus: string;
  readonly GameClock: string;
  readonly Period: string;
  readonly Intermission: string;
};

export type ModulekitResponse = {
  readonly SiteKit: {
    readonly Scorebar: ScheduledGame[];
  };
};

export type BootstrapResponse = {
  readonly firebaseUrl: string;
  readonly firebaseToken: string;
  readonly firebaseApiKey: string;
  readonly regularSeasons: Season[];
  readonly playoffSeasons: Season[];
};

type Season = {
  readonly id: string;
  readonly name: string;
};
