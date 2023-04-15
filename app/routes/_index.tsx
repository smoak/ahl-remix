import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getGamesByDate } from "~/api";
import type { ScheduledGame } from "~/api/types";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { getToday } from "~/date-fns";

export const meta: V2_MetaFunction = () => {
  return [{ title: "AHL Remix" }];
};

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const scheduledGames = await getGamesByDate(today);

  return json(scheduledGames);
};

export default function Index() {
  const loadedGames = useLoaderData<ScheduledGame[]>();
  console.log(loadedGames);

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <GamesList games={loadedGames} />
    </Layout>
  );
}
