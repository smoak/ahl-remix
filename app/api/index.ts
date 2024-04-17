import { fetch } from "cross-fetch";
import { getToday } from "~/date-fns";
import type {
  GameSummaryResponse,
  ModulekitResponse,
  ScheduledGame,
  StandingsResponse,
} from "./types";
import { differenceInCalendarDays, isBefore, isToday } from "date-fns";

export const BASE_URL = "https://lscluster.hockeytech.com/feed/index.php";
const CLIENT_CODE = "ahl";
const CLIENT_KEY = "ccb91f29d6744675";

const calculateDaysByDate = (date?: Date) => {
  if (!date || isToday(date)) {
    return {
      daysAhead: "2",
      daysBack: "0",
    };
  }

  const today = getToday();
  const difference = Math.abs(differenceInCalendarDays(today, date)) + 2;

  if (isBefore(date, today)) {
    return {
      daysAhead: "1",
      daysBack: difference.toString(),
    };
  }

  return {
    daysAhead: difference.toString(),
    daysBack: "0",
  };
};

type GetGameSummary = (gameId: string) => Promise<GameSummaryResponse>;
export const getGameSummary: GetGameSummary = async (gameId) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "gameSummary");
  url.searchParams.append("game_id", gameId);
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  url.searchParams.append("fmt", "json");
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const responseText = await response.text();
  const gameSummaryResponse = JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as GameSummaryResponse;

  return gameSummaryResponse;
};

type StandingsView = "division" | "conference" | "league";
type GetStandings = (view: StandingsView) => Promise<StandingsResponse>;
export const getStandings: GetStandings = async (view) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "teams");
  url.searchParams.append("groupTeamsBy", view);
  url.searchParams.append("context", "overall");
  url.searchParams.append("site_id", "3");
  url.searchParams.append("special", "false");
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());

  const responseText = await response.text();
  const standingsResponse = JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as StandingsResponse;

  return standingsResponse;
};

type GetGamesByDate = (date?: Date) => Promise<ScheduledGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "modulekit");
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  url.searchParams.append("view", "scorebar");
  url.searchParams.append("fmt", "json");
  const { daysAhead, daysBack } = calculateDaysByDate(date);
  url.searchParams.append("numberofdaysahead", daysAhead);
  url.searchParams.append("numberofdaysback", daysBack);
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const { SiteKit } = (await response.json()) as ModulekitResponse;
  return SiteKit.Scorebar;
};
