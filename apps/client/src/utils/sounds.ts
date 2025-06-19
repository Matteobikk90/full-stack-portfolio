import click from '@/assets/sounds/click.wav';
import crash from '@/assets/sounds/crash.mp3';
import like from '@/assets/sounds/like.wav';
import menu from '@/assets/sounds/menu.mp3';
import checkOff from '@/assets/sounds/pop-off.mp3';
import checkOn from '@/assets/sounds/pop-on.mp3';
import theme from '@/assets/sounds/theme.wav';

export const soundMap = {
  checkOn,
  checkOff,
  like,
  menu,
  theme,
  crash,
  click,
} as const;

export const DEBOUNCE_MS = 300;
