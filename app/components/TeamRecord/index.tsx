export type TeamRecordProps = {
  readonly wins: number;
  readonly losses: number;
  readonly ot: number;
  readonly isPlayoffGame: boolean;
};

export const TeamRecord = ({
  isPlayoffGame,
  losses,
  ot,
  wins,
}: TeamRecordProps) => {
  if (isPlayoffGame) {
    return null; 
  }

  return (
    <p className="text-xs">
      {wins}-{losses}-{ot}
    </p>
  );
};
