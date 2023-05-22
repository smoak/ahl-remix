import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { RunningClock } from "~/data/types";

export type LiveGameStatusProps = {
  readonly gameId: number;
  readonly isIntermission: boolean;
  readonly isPlayoffGame: boolean;
  readonly period: number;
  readonly gameClock: string;
};

// TODO: i18n
const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const formatOrdinals = (n: number) => {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

const LiveIndicator = () => (
  <span className="mx-auto block pt-2 text-xs tracking-widest">
    <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
    Live
  </span>
);

export const LiveGameStatus = ({
  gameId,
  gameClock,
  isIntermission,
  isPlayoffGame,
  period,
}: LiveGameStatusProps): JSX.Element => {
  const [snapshot] = useObjectVal<RunningClock>(
    query(child(ref(firebaseDatabase), "/svf/ahl/runningclock/games/" + gameId))
  );

  if (snapshot && snapshot.status_id === 2) {
    return (
      <>
        {formatOrdinals(parseInt(snapshot.Clock.period))} -{" "}
        {snapshot.Clock.Minutes}:{snapshot.Clock.Seconds}
        <LiveIndicator />
      </>
    );
  }

  if (isIntermission) {
    return (
      <>
        {formatOrdinals(period)} - END
        <LiveIndicator />
      </>
    );
  }

  if (period < 4) {
    return (
      <>
        {formatOrdinals(period)} - {gameClock}
        <LiveIndicator />
      </>
    );
  }

  if (period === 4) {
    return (
      <>
        OT - {gameClock}
        <LiveIndicator />
      </>
    );
  }

  if (!isPlayoffGame) {
    return (
      <>
        SO - {gameClock}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = period - 3;

  return (
    <>
      {otPeriods}OT - {gameClock}
      <LiveIndicator />
    </>
  );
};
