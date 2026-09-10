export type Theme = 'dark' | 'light' | 'grey';

const THEME_STORAGE_KEY = 'opportunity-ai-theme';

export const loadTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'grey' ? stored : 'dark';
};

export const setTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('grey', theme === 'grey');
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
