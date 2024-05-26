export type GameStatus = "1" | "2" | "3" | "4" | "10";

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
  readonly GameStatus: GameStatus;
  readonly GameClock: string;
  readonly Period: string;
  readonly Intermission: string;
};

export type ModulekitResponse = {
  readonly SiteKit: {
    readonly Scorebar: ScheduledGame[];
  };
};

type HeadToHeadRecord = {
  readonly wins: number;
  readonly losses: number;
  readonly ties: number;
  readonly OTWins: number;
  readonly OTLosses: number;
  readonly SOLosses: number;
  readonly formattedRecord: string;
};

type HeadToHeadTeamRecords = {
  readonly currentYear: HeadToHeadRecord;
  readonly previousFiveYears: HeadToHeadRecord;
  readonly previousYear: HeadToHeadRecord;
};

export type GameCenterPreviewPreviousMeeting = {
  readonly gameId: string;
  readonly datePlayed: string;
  readonly game_date_iso_8601: string;
  readonly homeCity: string;
  readonly homeScore: string;
  readonly homeTeamId: string;
  readonly status: string;
  readonly visitingCity: string;
  readonly visitingScore: string;
  readonly visitingTeamId: string;
};

export type GameCenterPreviewResponse = {
  readonly headToHeadRecords: {
    readonly homeTeam: HeadToHeadTeamRecords;
    readonly visitingTeam: HeadToHeadTeamRecords;
  };
  readonly homeTeam: {};
  readonly lineupPairingReport: unknown | null;
  readonly previousMeetings: GameCenterPreviewPreviousMeeting[];
  readonly visitingTeam: {};
};

export type BootstrapTeam = {
  readonly id: string;
  readonly name: string;
  readonly nickname: string;
  readonly team_code: string;
  readonly division_id: string;
  readonly logo: string;
};

export type BootstrapResponse = {
  readonly current_league_id: string;
  readonly current_season_id: string;
  readonly firebaseUrl: string;
  readonly firebaseToken: string;
  readonly firebaseApiKey: string;
  readonly regularSeasons: Season[];
  readonly playoffSeasons: Season[];
  readonly teamsNoAll: BootstrapTeam[];
};

export type GameSummaryDetails = {
  readonly id: number;
  readonly date: string;
  readonly gameNumber: string;
  readonly startTime: string;
  readonly started: string;
  readonly final: string;
  readonly status: string;
  readonly seasonId: string;
  readonly GameDateISO8601: string;
};

export type GameSummaryPeriodGoalAssist = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly playerImageURL: string;
};

export type GameSummaryPeriodGoal = {
  readonly game_goal_id: string;
  readonly team: {
    readonly id: number;
    readonly name: string;
    readonly nickname: string;
    readonly abbreviation: string;
    readonly logo: string;
  };
  readonly period: {
    readonly id: string;
    readonly shortName: string;
    readonly longName: string;
  };
  readonly time: string;
  readonly scorerGoalNumber: string;
  readonly scoredBy: {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly playerImageURL: string;
  };
  readonly assists: GameSummaryPeriodGoalAssist[];
  readonly assistNumbers: string[];
  readonly properties: {
    readonly isPowerPlay: string;
    readonly isShortHanded: string;
    readonly isEmptyNet: string;
    readonly isPenaltyShot: string;
    readonly isInsuranceGoal: string;
    readonly isGameWinningGoal: string;
  };
};

export type GameSummaryPeriod = {
  readonly info: {
    readonly id: string;
    readonly shortName: string;
    readonly longName: string;
  };
  readonly stats: {
    readonly homeGoals: string;
    readonly homeShots: string;
    readonly visitingGoals: string;
    readonly visitingShots: string;
  };
  readonly goals: GameSummaryPeriodGoal[];
};

export type GameSummaryTeam = {
  readonly info: {
    readonly id: number;
    readonly name: string;
    readonly city: string;
    readonly nickname: string;
    readonly abbreviation: string;
    readonly logo: string;
  };
  readonly stats: {
    readonly shots: number;
    readonly goals: number;
  };
  readonly seasonStats: {
    readonly seasonId: null;
    readonly teamRecord: {
      readonly wins: number;
      readonly losses: number;
      readonly ties: number;
      readonly OTWins: number;
      readonly OTLosses: number;
      readonly SOLosses: number;
      readonly formattedRecord: string;
    };
    readonly teamStats: unknown[];
  };
};

export type GameSummaryResponse = {
  readonly details: GameSummaryDetails;
  readonly hasShooutout: boolean;
  readonly homeTeam: GameSummaryTeam;
  readonly visitingTeam: GameSummaryTeam;
  readonly periods: GameSummaryPeriod[];
  readonly penaltyShots: {
    readonly homeTeam: unknown[];
    readonly visitingTeam: unknown[];
  };
};

export type Season = {
  readonly id: string;
  readonly name: string;
};

export type StandingsResponseSectionData = {
  readonly prop: {
    readonly team_code: {
      readonly teamLink: string;
    };
    readonly name: {
      readonly teamLink: string;
    };
  };

  readonly row: {
    readonly team_code: string;
    readonly wins: string;
    readonly losses: string;
    readonly ot_losses: string;
    readonly shootout_losses: string;
    readonly regulation_wins: string;
    readonly row: string;
    readonly points: string;
    readonly penalty_minutes: string;
    readonly streak: string;
    readonly goals_for: string;
    readonly goals_against: string;
    readonly games_remaining: string;
    readonly percentage: string;
    readonly overall_rank: string;
    readonly games_played: string;
    readonly rank: number;
    readonly past_10: string;
    readonly name: string;
  };
};

type HeaderProperties = {
  readonly key: "team_code" | "rank" | "overall_rank";
  readonly hidden: boolean;
  readonly class: string;
  readonly label: string;
  readonly title: string;
  readonly sortable: boolean;
  readonly align: string;
  readonly highlight: boolean;
  readonly sortKey: string;
};

type Header = {
  readonly properties: HeaderProperties;
};

export type StandingsResponseSectionHeaders = {
  readonly overall_rank: Header;
  readonly rank: Header;
  readonly team_code: Header;
};

export type StandingsResponseSection = {
  readonly title: string;
  readonly headers: StandingsResponseSectionHeaders;
  readonly data: StandingsResponseSectionData[];
};

export type StandingsResponseObject = {
  readonly sections: StandingsResponseSection[];
};

export type StandingsResponse = StandingsResponseObject[];

export type PlayoffMatchup = {
  readonly series_letter: string;
  readonly series_name: string;
  readonly series_logo: string;
  readonly round: string;
  readonly active: string;
  readonly team1: string;
  readonly team2: string;
  readonly winner: string;
  readonly games: object[];
  readonly team1_wins: number;
  readonly team2_wins: number;
  readonly ties: number;
};

export type PlayoffBracketRound = {
  readonly round: string;
  readonly round_name: string;
  readonly season_id: string;
  readonly round_type_id: string;
  readonly round_type_name: string;
  readonly matchups: PlayoffMatchup[];
};

export type PlayoffTeam = {
  readonly id: string;
  readonly city: string;
  readonly team_code: string;
  readonly name: string;
  readonly division_long_name: string;
  readonly division_short_name: string;
  readonly conf_id: string;
  readonly logo: string;
};

export type PlayoffTeams = Record<string, PlayoffTeam>;

export type PlayoffBracketResponse = {
  readonly SiteKit: {
    readonly Brackets: {
      readonly teams: PlayoffTeams;
      readonly rounds: PlayoffBracketRound[];
      readonly logo: string;
      readonly show_ties: boolean;
    };
  };
};
