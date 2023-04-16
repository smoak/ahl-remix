import { getHours, startOfDay, subDays } from "date-fns";

export const DATE_LINK_FORMAT = "yyyy-MM-dd";
export const DATE_DISPLAY_FORMAT = "dd MMMM yyyy";
const EST_TZ_OFFSET = -300;

const getTimeZonedDay = (date: Date): Date => {
  const hours = getHours(date);

  if (hours < 6) {
    return startOfDay(subDays(date, 1));
  }

  return startOfDay(date);
};

export const getToday = () => {
  const now = new Date();
  now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
  const etNow = new Date(now.getTime() + EST_TZ_OFFSET * 60 * 1000);

  return getTimeZonedDay(etNow);
};
