export type TeamLogoProps = {
  readonly id: number;
  readonly logoUrl: string;
  readonly teamName: string;
};

export const TeamLogo = ({
  id,
  logoUrl,
  teamName,
}: TeamLogoProps): JSX.Element => {
  return (
    <img
      src={logoUrl}
      alt={`the ${teamName} team logo`}
      width={48}
      height={48}
    />
  );
};
