import { type LoaderFunction, json } from "@remix-run/node";
import { getStandings } from "~/api";
import { Conference } from "~/components/Standings/Conference";
import { normalizeConferenceStandings } from "~/data/normalization/standings";

export const loader: LoaderFunction = async () => {
  const standingsResponse = await getStandings("conference");
  const normalizedStandings = normalizeConferenceStandings(standingsResponse);

  return json(normalizedStandings);
};

const Index = () => {
  return <Conference />;
};

export default Index;
