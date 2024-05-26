import { json, type LoaderFunction } from "@remix-run/node";
import { getStandings } from "~/api";
import { Division } from "~/components/Standings/Division";

import { normalizeDivisionStandings } from "~/data/normalization/standings";

export const loader: LoaderFunction = async () => {
  const standingsResponse = await getStandings("division");

  const normalizedStandings = normalizeDivisionStandings(standingsResponse);
  return json(normalizedStandings);
};

const Index = () => {
  return <Division />;
};

export default Index;
