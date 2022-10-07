import type Time from '../types/Time';

/**
 * @param startTime The start time, expressed as the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 * @param endTime The end time, expressed as the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 * @returns The number of minutes elapsed between `startTime` and `endTime`.
 */
export default function minutesElapsed(startTime: Time, endTime: Time) {
  return (endTime - startTime) / 60_000;
}