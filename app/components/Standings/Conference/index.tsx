import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

export const Conference = () => {
  const { east, west } = useLoaderData<Standings["conference"]>();

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection headingText="Eastern" standings={east} />
      <StandingsSection headingText="Western" standings={west} />
    </div>
  );
};
