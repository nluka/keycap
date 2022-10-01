import {
  INFO_MESSAGE_STYLES,
  PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS,
} from './utility/constants';

const audioContext = new AudioContext();
const soundNameToAudioBufferMap = new Map<SoundName, AudioBuffer>();

export enum SoundName {
  countdownBeepShort = 'countdown-beep-short',
  countdownBeepLong = 'countdown-beep-long',
}

(function initAudioNameToBufferMap() {
  async function initSound(name: SoundName) {
    fetch(`/audio/${name}.mp3`)
      .then(async (res) => {
        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        soundNameToAudioBufferMap.set(name, audioBuffer);
        console.log(
          `%cFetched and loaded sound file ${JSON.stringify(name)}`,
          INFO_MESSAGE_STYLES,
        );
      })
      .catch(() => {
        console.error(`Failed to fetch sound ${JSON.stringify(name)}`);
      });
  }

  initSound(SoundName.countdownBeepShort);
  initSound(SoundName.countdownBeepLong);
})();

export function playSound(name: SoundName, volume: number) {
  if (volume === 0) {
    return;
  }

  const VOLUME_LIMITS = PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS;
  if (!VOLUME_LIMITS.containsFloat(volume, 2)) {
    throw new RangeError(
      `volume (${volume}) must be be in range [${VOLUME_LIMITS.getMin()}, ${VOLUME_LIMITS.getMax()}]`,
    );
  }

  const buffer = soundNameToAudioBufferMap.get(name);
  if (buffer === undefined) {
    console.error(
      `Failed to play sound ${JSON.stringify(name)}: buffer is undefined`,
    );
    return;
  }

  playSoundBuffer(buffer, volume);
}

const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

function playSoundBuffer(audioBuffer: AudioBuffer, volume: number) {
  gainNode.gain.value = volume - 1;
  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(gainNode);
  bufferSource.connect(audioContext.destination);
  bufferSource.start(0);
}
