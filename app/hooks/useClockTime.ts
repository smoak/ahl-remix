import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebaseRunningClockSnapshot } from "~/data/types";

type ClockTime = {
  readonly period: number;
  readonly time: string;
};
export const useClockTime = (gameId: number): ClockTime | undefined => {
  const [snapshot, isLoading] = useObjectVal<FirebaseRunningClockSnapshot>(
    query(child(ref(firebaseDatabase), "/svf/ahl/runningclock/games/" + gameId))
  );

  if (!snapshot || isLoading) {
    return;
  }

  return {
    period: parseInt(snapshot.Clock.period),
    time: [snapshot.Clock.Minutes, snapshot.Clock.Seconds].join(":"),
  };
};
