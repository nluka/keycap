/**
 * @param secondsElapsed The number of seconds elapsed.
 * @returns A string with the format (h?h?:m?m:ss), where '?' indicates that field it follows will not be present in the string if it's value is 0.
 */
export function getTimeString(secondsElapsed: number) {
  const hoursMinsSecs = calculateHoursMinutesSeconds(secondsElapsed);
  return formatHoursMinutesSeconds(hoursMinsSecs);
}

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

interface IHoursMinutesSeconds {
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateHoursMinutesSeconds(
  secondsElapsed: number,
): IHoursMinutesSeconds {
  let hours = 0,
    minutes = 0,
    seconds = Math.floor(secondsElapsed);

  while (seconds >= SECONDS_PER_HOUR) {
    ++hours;
    seconds -= SECONDS_PER_HOUR;
  }
  while (seconds >= SECONDS_PER_MINUTE) {
    ++minutes;
    seconds -= SECONDS_PER_MINUTE;
  }

  return { hours, minutes, seconds };
}

function formatHoursMinutesSeconds(hoursMinsSecs: IHoursMinutesSeconds) {
  const { hours, minutes, seconds } = hoursMinsSecs;
  let result = '';

  if (hours > 0) {
    result = `${hours}:`;
    if (minutes < 10) {
      result += '0'; // to have h:mm:ss instead of h:m:ss
    }
  }
  result += `${minutes}:`;
  if (seconds < 10) {
    result += '0'; // to have mm:ss instead of mm:s
  }
  result += seconds;

  return result;
}
