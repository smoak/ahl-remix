import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBootstrap, getPlayoffBracket } from "~/api";
import { Layout } from "~/components/Layout";
import { PlayoffBracket as Bracket } from "~/components/PlayoffBracket";
import { type WithBootstrap, type PlayoffBracket } from "~/components/types";
import { normalizeBootstrap } from "~/data/normalization/bootstrap";
import { normalizePlayoffBracket } from "~/data/normalization/playoffs";

export const loader: LoaderFunction = async () => {
  const playoffBracketResponse = await getPlayoffBracket();
  const bootstrap = await getBootstrap();
  const playoffBracket = normalizePlayoffBracket(playoffBracketResponse);
  const normalizedBootstrap = normalizeBootstrap(bootstrap);

  return json<WithBootstrap<PlayoffBracket>>({
    content: playoffBracket,
    ...normalizedBootstrap,
  });
};

const Index = () => {
  const { content: bracket } = useLoaderData<WithBootstrap<PlayoffBracket>>();
  const { rounds } = bracket;

  return (
    <Layout>
      <Bracket rounds={rounds} />
    </Layout>
  );
};

export default Index;
