import { fetch } from "cross-fetch";
import { getToday } from "~/date-fns";
import type { ModulekitResponse, ScheduledGame } from "./types";
import {
  differenceInCalendarDays,
  isBefore,
  isToday,
  parseISO,
} from "date-fns";

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

type GetGamesByDate = (date?: Date) => Promise<ScheduledGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  console.log("Getting games by date", date);
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "modulekit");
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  url.searchParams.append("view", "scorebar");
  url.searchParams.append("fmt", "json");
  const { daysAhead, daysBack } = calculateDaysByDate(date);
  url.searchParams.append("numberofdaysahead", daysAhead);
  url.searchParams.append("numberofdaysback", daysBack);
  console.log("hitting url", url);

  const response = await fetch(url.toString());
  const { SiteKit } = (await response.json()) as ModulekitResponse;
  const games = SiteKit.Scorebar;
  console.log(`got ${games.length} from server`, games);

  if (date) {
    console.log("filtering games with date", date);
    const filteredGames = games.filter(
      (g) => differenceInCalendarDays(parseISO(g.GameDateISO8601), date) === 0
    );
    console.log(
      `filtered games down to ${filteredGames.length}`,
      filteredGames
    );
    return filteredGames;
  }

  return games;
};
