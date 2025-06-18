import type { SoundType } from '@/types/sound.types';
import { soundMap } from '@/utils/sounds';
import { useCallback, useRef } from 'react';

export const useUISound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((sound: SoundType) => {
    const src = soundMap[sound];
    if (!src) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    } else {
      audioRef.current.src = src;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Handle play errors (e.g., autoplay restrictions)
    });
  }, []);

  return { play };
};
