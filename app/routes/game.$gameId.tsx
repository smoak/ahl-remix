import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGameDetails } from "~/api";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { Layout } from "~/components/Layout";
import { ScoringSummary } from "~/components/ScoringSummary";
import type { GameDetails } from "~/data/types";

export const loader: LoaderFunction = async ({ params }) => {
  const { gameId } = params;

  if (!gameId) {
    throw new Response("Not Found", { status: 404 });
  }

  const gameDetails = await getGameDetails(gameId);

  return json(gameDetails);
};

export const Index = () => {
  const gameDetails = useLoaderData<GameDetails>();

  return (
    <Layout>
      <BackButton />
      <div className="py-5 md:max-w-sm">
        <GameCard game={gameDetails.game} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <GameSummary gameDetails={gameDetails} />
        <ScoringSummary
          gameId={gameDetails.game.id}
          scoringDetails={gameDetails.scoringDetails}
          visitorTeam={gameDetails.game.visitorTeam}
          homeTeam={gameDetails.game.homeTeam}
        />
      </div>
    </Layout>
  );
};

export default Index;
