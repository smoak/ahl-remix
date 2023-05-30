import type { BootstrapResponse, ScheduledGame } from "~/api/types";
import type { Game, GamePreview, GameStatus, Team } from "./types";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { getPlayoffSeriesSummary } from "./normalization/playoffSeriesSummary";

type NormalizeScheduledGamesOptions = {
  readonly games: ScheduledGame[];
  readonly bootstrap: BootstrapResponse;
  readonly gamePreviews: GamePreview[];
};

export const normalizeScheduledGames = ({
  games,
  bootstrap,
  gamePreviews,
}: NormalizeScheduledGamesOptions): Game[] =>
  games.map((g) =>
    normalizeScheduledGame({ game: g, bootstrap, gamePreviews })
  );

const ApiGameStatusToGameStatus: Record<string, GameStatus> = {
  "1": "Scheduled",
  "2": "Live",
  "3": "Final",
  "4": "Final",
  "10": "Live",
};

type NormalizeScheduledGameOptions = {
  readonly game: ScheduledGame;
  readonly bootstrap: BootstrapResponse;
  readonly gamePreviews: GamePreview[];
};

type NormalizeScheduledGame = (options: NormalizeScheduledGameOptions) => Game;
export const normalizeScheduledGame: NormalizeScheduledGame = ({
  game,
  bootstrap,
  gamePreviews,
}) => {
  const gameId = parseInt(game.ID);
  const homeTeam: Team = {
    abbrev: game.HomeCode,
    city: game.HomeCity,
    id: parseInt(game.HomeID),
    logoUrl: game.HomeLogo,
    losses: parseInt(game.HomeRegulationLosses),
    nickName: game.HomeNickname,
    otLosses: parseInt(game.HomeOTLosses),
    wins: parseInt(game.HomeWins),
  };

  const visitorTeam: Team = {
    abbrev: game.VisitorCode,
    city: game.VisitorCity,
    id: parseInt(game.VisitorID),
    logoUrl: game.VisitorLogo,
    losses: parseInt(game.VisitorRegulationLosses),
    nickName: game.VisitorNickname,
    otLosses: parseInt(game.VisitorOTLosses),
    wins: parseInt(game.VisitorWins),
  };

  const startTime = utcToZonedTime(
    new Date(game.GameDateISO8601),
    game.Timezone
  );
  const startTimeUtc = zonedTimeToUtc(startTime, game.Timezone);

  return {
    clockTime: game.GameClock,
    id: gameId,
    startTime: startTime.getTime(),
    startTimeUtc: startTimeUtc.getTime(),
    homeGoals: parseInt(game.HomeGoals),
    homeTeam,
    period: parseInt(game.Period),
    status: ApiGameStatusToGameStatus[game.GameStatus],
    visitorGoals: parseInt(game.VisitorGoals),
    visitorTeam,
    isInIntermission: game.Intermission === "1",
    isPlayoffGame: bootstrap.playoffSeasons.some((s) => s.id === game.SeasonID),
    playoffSeriesSummary: getPlayoffSeriesSummary({
      homeTeam,
      gamePreview: gamePreviews.find((gp) => gp.gameId === gameId),
      visitorTeam,
    }),
  };
};
