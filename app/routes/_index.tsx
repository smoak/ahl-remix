import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getGamesByDate } from "~/api";
import type { ScheduledGame } from "~/api/types";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";

export const meta: V2_MetaFunction = () => {
  return [{ title: "AHL Remix" }];
};

export const loader: LoaderFunction = async () => {
  const today = new Date();
  const scheduledGames = await getGamesByDate(today);

  return json(scheduledGames);
};

export default function Index() {
  const loadedGames = useLoaderData<ScheduledGame[]>();
  const { prevDay, day, nextDay } = useDays();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={loadedGames} />
    </Layout>
  );
}
