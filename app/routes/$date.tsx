import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";
import type { ScheduledGame } from "~/api/types";
import { DATE_LINK_FORMAT } from "~/date-fns";
import { parse } from "date-fns";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  const games = await getGamesByDate(
    date ? parse(date, DATE_LINK_FORMAT, new Date()) : undefined
  );

  return json<ScheduledGame[]>(games);
};

export const Index = () => {
  const { date } = useParams();
  const { prevDay, day, nextDay } = useDays(date);
  const games = useLoaderData<ScheduledGame[]>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
