import type { BootstrapResponse } from "~/api/types";
import type { Bootstrap, BootstrapTeam } from "~/components/types";

export const normalizeBootstrap = (response: BootstrapResponse): Bootstrap => {
  return {
    playoffsStarted: response.playoffSeasons.some(
      (season) => season.id === response.current_season_id
    ),
    currentSeasonId: parseInt(response.current_season_id),
    teams: response.teamsNoAll.reduce<Record<string, BootstrapTeam>>(
      (accum, t) => {
        accum[t.id] = {
          divisionId: t.division_id,
          id: t.id,
          logo: t.logo,
          name: t.name,
          nickName: t.nickname,
          teamCode: t.team_code,
        };
        return accum;
      },
      {}
    ),
  };
};
