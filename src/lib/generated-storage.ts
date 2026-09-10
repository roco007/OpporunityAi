import { Opportunity } from '../types';

const GENERATED_OPPS_KEY = 'opportunity-ai-generated';

export const saveGeneratedOpportunities = (opps: Opportunity[]): void => {
  const existing = loadGeneratedOpportunities();
  const merged = [...opps, ...existing].slice(0, 50); // Keep last 50
  localStorage.setItem(GENERATED_OPPS_KEY, JSON.stringify(merged));
};

export const loadGeneratedOpportunities = (): Opportunity[] => {
  const stored = localStorage.getItem(GENERATED_OPPS_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const clearGeneratedOpportunities = (): void => {
  localStorage.removeItem(GENERATED_OPPS_KEY);
};
