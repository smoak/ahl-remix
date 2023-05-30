export type PlayoffSeriesSummaryProps = {
  readonly seriesSummary?: string;
};

export const PlayoffSeriesSummary = ({
  seriesSummary,
}: PlayoffSeriesSummaryProps) => {
  if (!seriesSummary) {
    return null;
  }

  return (
    <span className="mt-3 block text-center text-xs font-semibold normal-case">
      {seriesSummary}
    </span>
  );
};
