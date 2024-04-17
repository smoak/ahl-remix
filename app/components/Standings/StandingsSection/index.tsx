import { TeamLogo } from "~/components/TeamLogo";
import type { StandingsRecord } from "~/components/types";

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
              <Cell>{index + 1}</Cell>
              <Cell className="w-1/4">
                <div className="flex items-center gap-4">
                  <TeamLogo
                    logoUrl={s.teamLogoUrl}
                    teamName={s.teamName}
                    size="sm"
                  />
                  <span className="hidden text-left md:block">
                    {s.teamName}
                  </span>
                  <span className="md:hidden">{s.teamAbbrev}</span>
                </div>
              </Cell>
              <Cell>{s.gamesPlayed}</Cell>
              <Cell>{s.regulationWins}</Cell>
              <Cell>{s.losses}</Cell>
              <Cell>{s.otLosses}</Cell>
              <Cell>{s.shootoutLossess}</Cell>
              <Cell>{s.points}</Cell>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
