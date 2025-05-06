export type ThemeSliceType = {
  mode: 'light' | 'dark';
  toggle: () => void;
};

export type StoreState = ThemeSliceType;
