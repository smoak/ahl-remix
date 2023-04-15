import { fetch } from "cross-fetch";
import type { ModulekitResponse, ScheduledGame } from "./types";
import { compareAsc, parseISO } from "date-fns";

export const BASE_URL = "https://lscluster.hockeytech.com/feed/index.php";
const CLIENT_CODE = "ahl";
const CLIENT_KEY = "ccb91f29d6744675";

type GetGamesByDate = (date?: Date) => Promise<ScheduledGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("feed", "modulekit");
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  url.searchParams.append("view", "scorebar");
  url.searchParams.append("fmt", "json");
  url.searchParams.append("numberofdaysahead", "1");
  url.searchParams.append("numberofdaysback", "0");

  const response = await fetch(url.toString());
  const { SiteKit } = (await response.json()) as ModulekitResponse;
  const games = SiteKit.Scorebar;

  return games;
};
