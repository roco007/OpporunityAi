import { z } from 'zod';
import { Opportunity } from '../types';

const CompetitorSchema = z.object({
  name: z.string(),
  description: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  pricing: z.string(),
});

const MVPSchema = z.object({
  coreFeatures: z.array(z.string()),
  futureFeatures: z.array(z.string()),
  userJourney: z.array(z.string()),
  techStack: z.object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    database: z.array(z.string()),
    ai: z.array(z.string()),
    infrastructure: z.array(z.string()),
  }),
});

const MonetizationSchema = z.object({
  models: z.array(z.string()),
  pricingStrategy: z.string(),
  examplePricing: z.array(z.object({
    tier: z.string(),
    price: z.string(),
    features: z.array(z.string()),
  })),
});

const ValidationSchema = z.object({
  customerDiscovery: z.array(z.string()),
  landingPageValidation: z.array(z.string()),
  outreachStrategies: z.array(z.string()),
  prototypeTesting: z.array(z.string()),
  preSelling: z.array(z.string()),
});

const ScoresSchema = z.object({
  marketDemand: z.number().min(1).max(10),
  revenuePotential: z.number().min(1).max(10),
  competitionLevel: z.number().min(1).max(10),
  technicalFeasibility: z.number().min(1).max(10),
  aiAdvantage: z.number().min(1).max(10),
  speedToMvp: z.number().min(1).max(10),
  customerPainLevel: z.number().min(1).max(10),
  scalability: z.number().min(1).max(10),
  overall: z.number().min(1).max(10),
});

const MarketSignalsSchema = z.object({
  verified: z.array(z.string()),
  assumptions: z.array(z.string()),
  hypotheses: z.array(z.string()),
});

const OpportunitySchema = z.object({
  id: z.string(),
  projectName: z.string(),
  shortDescription: z.string(),
  elevatorPitch: z.string(),
  industry: z.string(),
  category: z.string(),
  targetMarket: z.string(),
  region: z.string(),
  businessType: z.array(z.string()),
  complexity: z.enum(['Low', 'Medium', 'High']),
  revenuePotential: z.string(),
  problemDescription: z.string(),
  whoExperiencesProblem: z.string(),
  problemSignificance: z.string(),
  problemFrequency: z.string(),
  customerProfiles: z.array(z.string()),
  idealPersona: z.string(),
  potentialIndustries: z.array(z.string()),
  whyOpportunityExists: z.string(),
  marketGap: z.string(),
  whyExistingInsufficient: z.string(),
  whyNow: z.string(),
  howAISolves: z.string(),
  recommendedModels: z.array(z.string()),
  suggestedAPIs: z.array(z.string()),
  aiWorkflows: z.array(z.string()),
  competitors: z.array(CompetitorSchema),
  differentiation: z.array(z.string()),
  mvp: MVPSchema,
  developmentEffort: z.object({
    complexity: z.string(),
    estimatedTime: z.string(),
    requiredSkills: z.array(z.string()),
    teamSize: z.string(),
    infrastructureCost: z.string(),
  }),
  monetization: MonetizationSchema,
  validation: ValidationSchema,
  scores: ScoresSchema,
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  risks: z.array(z.string()),
  opportunities: z.array(z.string()),
  marketSignals: MarketSignalsSchema,
  createdAt: z.string(),
  tags: z.array(z.string()),
  saved: z.boolean(),
});

const ResponseSchema = z.object({
  opportunities: z.array(OpportunitySchema),
});

export type AIResponse = z.infer<typeof ResponseSchema>;

export function validateAIResponse(data: unknown): { success: true; data: Opportunity[] } | { success: false; error: string } {
  try {
    const result = ResponseSchema.parse(data);
    
    // Recalculate overall score if missing or incorrect
    const opportunities = result.opportunities.map(opp => {
      const scores = opp.scores;
      const calculatedOverall = (
        scores.marketDemand * 0.15 +
        scores.revenuePotential * 0.15 +
        scores.competitionLevel * 0.10 +
        scores.technicalFeasibility * 0.12 +
        scores.aiAdvantage * 0.13 +
        scores.speedToMvp * 0.10 +
        scores.customerPainLevel * 0.15 +
        scores.scalability * 0.10
      );
      
      return {
        ...opp,
        scores: {
          ...scores,
          overall: Math.round(calculatedOverall * 10) / 10,
        },
      };
    });
    
    return { success: true, data: opportunities };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.slice(0, 5).map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
      return { success: false, error: `Validation failed: ${issues}` };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

export function extractJSON(text: string): unknown {
  // Try to parse the entire text as JSON
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch {
        // Continue to next attempt
      }
    }
    
    // Try to find JSON object in the text
    const objectMatch = text.match(/\{[\s\S]*"opportunities"[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch {
        // Continue to next attempt
      }
    }
    
    // Try to find any JSON array wrapper
    const arrayMatch = text.match(/\{[\s\S]*\}[\s\S]*\}/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch {
        // Give up
      }
    }
    
    throw new Error('Could not extract valid JSON from AI response. The response may be malformed.');
  }
}
