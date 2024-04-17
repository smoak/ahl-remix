import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

export const League = () => {
  const league = useLoaderData<Standings["league"]>();

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection
        headingText="American Hockey League"
        standings={league}
      />
    </div>
  );
};
