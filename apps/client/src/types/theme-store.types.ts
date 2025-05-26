export type ThemeSliceType = {
  mode: 'light' | 'dark';
  background: string;
  toggleTheme: () => void;
  updateBackground: () => void;
};
