import type { SoundType } from '@/types/sound.types';
import { DEBOUNCE_MS, soundMap } from '@/utils/sounds';
import { useCallback, useRef } from 'react';

export const useUISound = () => {
  const lastPlayedRef = useRef<Record<SoundType, number>>(
    {} as Record<SoundType, number>
  );

  const play = useCallback((sound: SoundType) => {
    const src = soundMap[sound];
    if (!src) return;

    const now = Date.now();
    const lastPlayed = lastPlayedRef.current[sound] ?? 0;

    if (now - lastPlayed < DEBOUNCE_MS) return;
    lastPlayedRef.current[sound] = now;

    const audio = new Audio(src);
    audio.currentTime = 0;

    audio.play().catch(() => {});
  }, []);

  return { play };
};
