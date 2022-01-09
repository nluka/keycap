import type { Time } from 'keycap-foundation';

export function getTimeElapsedText(timeElapsed: Time | null | undefined) {
  if (timeElapsed == null) {
    return '···';
  }
  if (timeElapsed === 0) {
    return '0.0s';
  }

  let hours = 0,
    minutes = 0,
    seconds = timeElapsed / 1000;

  while (seconds >= 3600) {
    ++hours;
    seconds -= 3600;
  }
  while (seconds >= 60) {
    ++minutes;
    seconds -= 60;
  }

  let text = '';
  if (hours > 0) {
    text = `${hours}h `;
  }
  if (minutes > 0) {
    text += `${minutes}m `;
  }
  if (seconds > 0) {
    text += `${seconds.toFixed(1)}s`;
  }
  return text.trim();
}
