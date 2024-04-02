import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import { Booking } from '../services/types/collection';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = { end: false }) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

interface StartData {
  duration: string;
  value: number;
  color: string;
}

export function prepareStaysDurationData(
  startData: StartData[],
  stays: Booking[] = []
) {
  function incArrayValue(arr: StartData[], field: string) {
    return arr.map((obj: StartData) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;

      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num!)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num!)) return incArrayValue(arr, '6-7 nights');
      if (num! >= 8 && num! <= 14) return incArrayValue(arr, '8-14 nights');
      if (num! >= 15 && num! <= 21) return incArrayValue(arr, '15-21 nights');
      if (num! >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj: StartData) => obj.value > 0);

  return data;
}
