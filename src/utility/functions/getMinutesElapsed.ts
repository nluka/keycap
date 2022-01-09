import type { Time } from 'keycap-foundation';

/**
 * @param startTime The start time, expressed as the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 * @param endTime The end time, expressed as the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 * @returns The number of minutes elapsed between `startTime` and `endTime`.
 */
export default function getMinutesElapsed(startTime: Time, endTime: Time) {
  return (endTime - startTime) / 60_000;
}
