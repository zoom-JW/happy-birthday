let currentBgm: HTMLAudioElement | null = null;
let unlockListener: (() => void) | null = null;

const removeUnlockListener = (): void => {
  if (unlockListener) {
    window.removeEventListener('pointerdown', unlockListener);
    window.removeEventListener('keydown', unlockListener);
    unlockListener = null;
  }
};

const activeSfxList: HTMLAudioElement[] = [];

export const playSFX = (src: string, volume: number = 0.8): void => {
  const sound = new Audio(src);
  sound.volume = Math.min(Math.max(volume, 0), 1);
  sound.loop = false;

  activeSfxList.push(sound);

  const cleanup = () => {
    const idx = activeSfxList.indexOf(sound);
    if (idx !== -1) {
      activeSfxList.splice(idx, 1);
    }
  };

  sound.addEventListener('ended', cleanup);
  sound.addEventListener('pause', cleanup);

  sound.play().catch((err: Error) => {
    console.warn("Ошибка воспроизведения SFX:", err);
    cleanup();
  });
};

export const stopAllSFX = (): void => {
  activeSfxList.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  activeSfxList.length = 0;
};

export const playBGM = (src: string, volume: number = 0.5, loop: boolean = true): void => {
  if (currentBgm) {
    if (currentBgm.src.endsWith(src) || currentBgm.src === src) {
      currentBgm.volume = Math.min(Math.max(volume, 0), 1);
      currentBgm.loop = loop;
      if (!currentBgm.paused) {
        return;
      }
    } else {
      currentBgm.pause();
      currentBgm.currentTime = 0;
      currentBgm = null;
    }
  }
  removeUnlockListener();

  const audio = new Audio(src);
  audio.volume = Math.min(Math.max(volume, 0), 1);
  audio.loop = loop;
  currentBgm = audio;

  audio.play().catch((err: Error) => {
    console.warn("Автовоспроизведение BGM заблокировано браузером до первого клика:", err);

    const handleUserGesture = () => {
      removeUnlockListener();
      if (currentBgm === audio) {
        audio.play().catch((e: Error) => console.warn("Ошибка воспроизведения BGM после жеста:", e));
      }
    };

    unlockListener = handleUserGesture;
    window.addEventListener('pointerdown', handleUserGesture, { once: true });
    window.addEventListener('keydown', handleUserGesture, { once: true });
  });
};

export const stopBGM = (): void => {
  removeUnlockListener();
  if (currentBgm) {
    currentBgm.pause();
    currentBgm.currentTime = 0;
    currentBgm = null;
  }
};