import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getBootstrap, getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";
import { type WithBootstrap, type Game } from "~/components/types";
import { normalizeGames } from "~/data/normalization/games";
import { normalizeBootstrap } from "~/data/normalization/bootstrap";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  if (date == null) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const bootstrap = await getBootstrap();
  const scheduledGames = await getGamesByDate(new Date(date));

  const normalizedGames = normalizeGames(scheduledGames);
  const normalizedBootstrap = normalizeBootstrap(bootstrap);

  return json<WithBootstrap<Game[]>>({
    content: normalizedGames,
    ...normalizedBootstrap,
  });
};

export const Index = () => {
  const { date } = useParams();
  const { prevDay, day, nextDay } = useDays(date);
  const { content: games } = useLoaderData<WithBootstrap<Game[]>>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} filter={day} />
    </Layout>
  );
};

export default Index;
