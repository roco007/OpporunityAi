export interface OpportunityScore {
  marketDemand: number;
  revenuePotential: number;
  competitionLevel: number;
  technicalFeasibility: number;
  aiAdvantage: number;
  speedToMvp: number;
  customerPainLevel: number;
  scalability: number;
  overall: number;
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
}

export interface MVPPlan {
  coreFeatures: string[];
  futureFeatures: string[];
  userJourney: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    ai: string[];
    infrastructure: string[];
  };
}

export interface Monetization {
  models: string[];
  pricingStrategy: string;
  examplePricing: {
    tier: string;
    price: string;
    features: string[];
  }[];
}

export interface ValidationStrategy {
  customerDiscovery: string[];
  landingPageValidation: string[];
  outreachStrategies: string[];
  prototypeTesting: string[];
  preSelling: string[];
}

export interface MarketSignals {
  verified: string[];
  assumptions: string[];
  hypotheses: string[];
}

export interface Opportunity {
  id: string;
  projectName: string;
  shortDescription: string;
  elevatorPitch: string;
  industry: string;
  category: string;
  targetMarket: string;
  region: string;
  businessType: string[];
  complexity: 'Low' | 'Medium' | 'High';
  revenuePotential: string;
  
  // Problem Analysis
  problemDescription: string;
  whoExperiencesProblem: string;
  problemSignificance: string;
  problemFrequency: string;
  
  // Target Market
  customerProfiles: string[];
  idealPersona: string;
  potentialIndustries: string[];
  
  // Market Opportunity
  whyOpportunityExists: string;
  marketGap: string;
  whyExistingInsufficient: string;
  whyNow: string;
  
  // AI Solution
  howAISolves: string;
  recommendedModels: string[];
  suggestedAPIs: string[];
  aiWorkflows: string[];
  
  // Competition
  competitors: Competitor[];
  differentiation: string[];
  
  // MVP
  mvp: MVPPlan;
  
  // Development
  developmentEffort: {
    complexity: string;
    estimatedTime: string;
    requiredSkills: string[];
    teamSize: string;
    infrastructureCost: string;
  };
  
  // Monetization
  monetization: Monetization;
  
  // Validation
  validation: ValidationStrategy;
  
  // Scores
  scores: OpportunityScore;
  
  // SWOT
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  opportunities: string[];
  
  // Market Signals
  marketSignals: MarketSignals;
  
  // Metadata
  createdAt: string;
  tags: string[];
  saved: boolean;
}

export interface FilterOptions {
  region: string;
  industry: string;
  businessType: string;
  complexity: string;
  revenuePotential: string;
  minScore: number;
}

export interface GenerateParams {
  targetMarket: string;
  region: string;
  industry: string;
  targetAudience: string;
  businessType: string[];
  budget: string;
  complexity: string;
  technologies: string[];
  revenuePotential: string;
  problemCategory: string;
}
