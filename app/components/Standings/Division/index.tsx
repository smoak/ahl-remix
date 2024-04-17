import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

export const Division = () => {
  const { atlantic, central, north, pacific } =
    useLoaderData<Standings["division"]>();

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection
        headingText="Eastern"
        subheadingText="Atlantic"
        standings={atlantic}
      />
      <StandingsSection subheadingText="North" standings={north} />
      <StandingsSection
        headingText="Western"
        subheadingText="Central"
        standings={central}
      />
      <StandingsSection subheadingText="Pacific" standings={pacific} />
    </div>
  );
};
