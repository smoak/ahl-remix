import { fetch } from "cross-fetch";
import { getToday } from "~/date-fns";
import type { BootstrapResponse, ModulekitResponse } from "./types";
import {
  differenceInCalendarDays,
  isBefore,
  isSameDay,
  isToday,
} from "date-fns";
import type { Game } from "~/data/types";
import { normalizeScheduledGames } from "~/data/normalization";

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

const getBootstrap = async (): Promise<BootstrapResponse> => {
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "bootstrap");
  url.searchParams.append("season", "latest");
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const responseText = await response.text();
  return JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as BootstrapResponse;
};

type GetGamesByDate = (date?: Date) => Promise<Game[]>;
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

  const bootstrap = await getBootstrap();

  const response = await fetch(url.toString());
  const { SiteKit } = (await response.json()) as ModulekitResponse;
  const games = normalizeScheduledGames(SiteKit.Scorebar, bootstrap);

  if (date) {
    return games.filter((g) => isSameDay(date, new Date(g.startTime)));
  }

  return games;
};
