import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebasePublishedClockSnapshot, GameStatus } from "~/data/types";

const gameStatusFromSnapshot = (
  snapshot: FirebasePublishedClockSnapshot
): GameStatus => {
  if (snapshot.Final) {
    return "Final";
  }

  if (snapshot.Started) {
    return "Live";
  }

  return "Scheduled";
};

type GameInfo = {
  readonly status: GameStatus;
  readonly period: number;
  readonly isIntermission: boolean;
};
export const useGameInfo = (gameId: number): GameInfo | undefined => {
  const [snapshot, isLoading] = useObjectVal<FirebasePublishedClockSnapshot>(
    query(
      child(ref(firebaseDatabase), "/svf/ahl/publishedclock/1/games/" + gameId)
    )
  );

  if (isLoading || !snapshot) {
    return;
  }

  return {
    status: gameStatusFromSnapshot(snapshot),
    period: snapshot.PeriodId,
    isIntermission: snapshot.StatusId === 10,
  };
};
