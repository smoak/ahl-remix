import { useRouteLoaderData } from "@remix-run/react";
import { TeamLogo } from "~/components/TeamLogo";
import { type Bootstrap, type StandingsRecord } from "~/components/types";

type StandingsSectionProps = {
  readonly headingText?: string;
  readonly subheadingText?: string;
  readonly standings: StandingsRecord[];
};

type CellProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

const Cell = ({ children, className }: CellProps) => {
  return (
    <div
      className={`${
        className != null ? className : ""
      } table-cell border-b border-slate-900 align-middle`}
    >
      {children}
    </div>
  );
};

const useLogoUrl = (teamId: string) => {
  const bootstrap = useRouteLoaderData<Bootstrap>("routes/standings");

  if (bootstrap == null || bootstrap.teams[teamId] == null) {
    return `https://assets.leaguestat.com/ahl/logos/50x50/${teamId}.png`;
  }

  return bootstrap.teams[teamId].logo;
};

type StandingsRowProps = {
  readonly record: StandingsRecord;
  readonly rank: number;
};
const StandingsRow = ({ rank, record }: StandingsRowProps) => {
  const logoUrl = useLogoUrl(record.teamId);

  return (
    <>
      <Cell>{rank}</Cell>
      <Cell className="w-1/4">
        <div className="flex items-center gap-4">
          <TeamLogo logoUrl={logoUrl} teamName={record.teamName} size="sm" />
          <span className="hidden text-left md:block">{record.teamName}</span>
          <span className="md:hidden">{record.teamAbbrev}</span>
        </div>
      </Cell>
      <Cell>{record.gamesPlayed}</Cell>
      <Cell>{record.regulationWins}</Cell>
      <Cell>{record.losses}</Cell>
      <Cell>{record.otLosses}</Cell>
      <Cell>{record.shootoutLossess}</Cell>
      <Cell>{record.points}</Cell>
    </>
  );
};

export const StandingsSection = ({
  headingText,
  standings,
  subheadingText,
}: StandingsSectionProps) => {
  return (
    <div>
      {headingText && <h5 className="text-2xl font-bold">{headingText}</h5>}
      {subheadingText && (
        <div className="pb-2 text-base font-bold">{subheadingText}</div>
      )}
      <section className="table w-full">
        <header className="table-header-group h-8 bg-slate-900 text-center text-white">
          <div className="table-row">
            <div className="table-cell align-middle font-bold">Rank</div>
            <div className="table-cell align-middle font-bold">Team</div>
            <div className="table-cell align-middle font-bold">GP</div>
            <div className="table-cell align-middle font-bold">W</div>
            <div className="table-cell align-middle font-bold">L</div>
            <div className="table-cell align-middle font-bold">OTL</div>
            <div className="table-cell align-middle font-bold">SOL</div>
            <div className="table-cell align-middle font-bold">PTS</div>
          </div>
        </header>
        <div className="table-row-group">
          {standings.map((s, index) => (
            <div className="table-row h-14 text-center" key={s.teamAbbrev}>
              <StandingsRow rank={index + 1} record={s} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
