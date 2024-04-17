import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { normalizeGames } from "~/data/normalization/games";
import type { Game } from "~/components/types";
import { getToday } from "~/date-fns";
import { useDays } from "~/hooks/useDays";
import { useGames } from "~/hooks/useGames";

export const loader: LoaderFunction = async () => {
  console.log("app/routes/_index.tsx loader running");
  const today = getToday();
  const scheduledGames = await getGamesByDate(today);

  const normalizedGames = normalizeGames(scheduledGames);

  return json(normalizedGames);
};

const Index = () => {
  const loadedGames = useLoaderData<Game[]>();
  const { prevDay, day, nextDay } = useDays();
  const games = useGames({ route: "?index", preloadedGames: loadedGames });

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} filter={day} />
    </Layout>
  );
};

export default Index;
