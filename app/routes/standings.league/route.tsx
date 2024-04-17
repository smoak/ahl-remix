import { json, type LoaderFunction } from "@remix-run/node";
import { getStandings } from "~/api";
import { League } from "~/components/Standings/League";
import { normalizeLeagueStandings } from "~/data/normalization/standings";

export const loader: LoaderFunction = async () => {
  const standingsResponse = await getStandings("league");

  const normalizedStandings = normalizeLeagueStandings(standingsResponse);

  return json(normalizedStandings);
};

const Index = () => {
  return <League />;
};

export default Index;
