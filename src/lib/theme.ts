export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'opportunity-ai-theme';

export const loadTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
};

export const setTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
