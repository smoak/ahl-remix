import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { type Game, isLiveGame, type WithBootstrap } from "~/components/types";
import { useRevalidateOnInterval } from "./useRevalidateOnInterval";
import { useRevalidateOnVisible } from "./useRevalidateOnVisible";

const WAIT = 10000;

type Options = {
  readonly route: string;
  readonly preloadedGames: Game[];
};

export const useGames = ({ route, preloadedGames }: Options) => {
  const fetcher = useFetcher<WithBootstrap<Game[]>>();
  const [games, setGames] = useState(preloadedGames);
  const revalidate = () => {
    if (preloadedGames.some(isLiveGame)) {
      fetcher.load(route);
    }
  };
  useEffect(() => {
    if (fetcher.data) {
      setGames(fetcher.data.content);
    }
  }, [fetcher.data]);

  useRevalidateOnVisible(revalidate);
  useRevalidateOnInterval({ interval: WAIT, revalidateCallback: revalidate });
  useEffect(() => {
    setGames(preloadedGames);
  }, [route, preloadedGames]);

  return games;
};
