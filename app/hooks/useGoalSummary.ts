import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebaseGoalsSummarySnapshot } from "~/data/types";

type UseGoalSummary = (
  gameId: number
) => FirebaseGoalsSummarySnapshot | undefined;
export const useGoalSummary: UseGoalSummary = (gameId) => {
  const [snapshot, isLoading] = useObjectVal<FirebaseGoalsSummarySnapshot>(
    query(
      child(ref(firebaseDatabase), "/svf/ahl/goalssummary/1/games/" + gameId)
    )
  );

  if (isLoading) {
    return;
  }

  return snapshot;
};
