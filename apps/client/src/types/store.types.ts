export type ThemeSliceType = {
  mode: 'light' | 'dark';
  background: string;
  toggle: () => void;
  updateBackground: () => void;
};

export type StoreState = ThemeSliceType;
