import type {
  GameCenterPreviewPreviousMeeting,
  GameCenterPreviewResponse,
} from "~/api/types";
import type { GamePreview, PreviousMeeting } from "../types";

const normalizeGameCenterPreviewPreviousMeeting = (
  previousMeeting: GameCenterPreviewPreviousMeeting
): PreviousMeeting => {
  const gameId = parseInt(previousMeeting.gameId);
  const homeScore = parseInt(previousMeeting.homeScore);
  const homeTeamId = parseInt(previousMeeting.homeTeamId);
  const visitingScore = parseInt(previousMeeting.visitingScore);
  const visitingTeamId = parseInt(previousMeeting.visitingTeamId);
  const winningTeamId = homeScore > visitingScore ? homeTeamId : visitingTeamId;

  return {
    gameId,
    homeScore,
    homeTeamId,
    visitingScore,
    visitingTeamId,
    winningTeamId,
  };
};

const normalizeGameCenterPreviewPreviousMeetings = (
  previousMeetings: GameCenterPreviewPreviousMeeting[]
): PreviousMeeting[] =>
  previousMeetings.map(normalizeGameCenterPreviewPreviousMeeting);

export const normalizeGameCenterPreview = (
  gameId: string,
  response: GameCenterPreviewResponse
): GamePreview => {
  return {
    gameId: parseInt(gameId),
    previousMeetings: normalizeGameCenterPreviewPreviousMeetings(
      response.previousMeetings
    ),
  };
};
