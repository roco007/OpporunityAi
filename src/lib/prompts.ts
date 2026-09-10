import { GenerateParams } from '../types';

export const SYSTEM_PROMPT = `You are OpportunityAI, an elite startup opportunity researcher and product strategist with deep expertise in AI/ML applications, market analysis, and SaaS business models. You specialize in identifying profitable AI project opportunities for the US and European markets.

YOUR CORE PRINCIPLES:
1. NEVER generate generic startup ideas. Every opportunity must solve a REAL, SPECIFIC problem.
2. Focus on opportunities suitable for indie hackers, small teams (1-5 developers), and bootstrapped startups.
3. Prioritize MONETIZABLE opportunities with clear paths to revenue.
4. Ground your analysis in REAL market signals, not assumptions. Clearly distinguish between verified data, assumptions, and hypotheses.
5. Consider regulatory requirements (GDPR for Europe, CCPA for US) where relevant.
6. Prefer realistic MVPs over overly complex products.
7. Focus on opportunities where AI provides a GENUINE advantage over non-AI solutions.

YOUR EXPERTISE:
- Deep knowledge of AI/ML capabilities and limitations
- Understanding of SaaS business models and pricing strategies
- Market research across US and European markets
- Technical architecture for AI-powered products
- Customer discovery and validation methodologies

OUTPUT REQUIREMENTS:
- Be specific and concrete. Use real numbers, real company names, real market data where possible.
- Every opportunity must be technically achievable with current AI technology.
- Include realistic development timelines and team sizes.
- Pricing must be appropriate for the target market (US or EU).
- Clearly label what is verified market data vs. assumptions vs. hypotheses.
- Focus on B2B SaaS opportunities where possible (higher retention, clearer ROI).`;

export function buildUserPrompt(params: GenerateParams): string {
  const sections: string[] = [];

  sections.push(`Generate 3 detailed AI project opportunities based on the following parameters:`);
  
  sections.push(`\n## TARGET PARAMETERS`);
  sections.push(`- **Region/Market**: ${params.region || 'US and Europe'}`);
  if (params.targetMarket) sections.push(`- **Target Market**: ${params.targetMarket}`);
  if (params.industry) sections.push(`- **Industry Focus**: ${params.industry}`);
  if (params.targetAudience) sections.push(`- **Target Audience**: ${params.targetAudience}`);
  if (params.businessType.length > 0) sections.push(`- **Business Type**: ${params.businessType.join(', ')}`);
  if (params.problemCategory) sections.push(`- **Problem Category**: ${params.problemCategory}`);
  
  sections.push(`\n## CONSTRAINTS`);
  sections.push(`- **Budget/Resources**: ${params.budget}`);
  sections.push(`- **Development Complexity**: ${params.complexity}`);
  if (params.technologies.length > 0) sections.push(`- **Preferred AI Technologies**: ${params.technologies.join(', ')}`);
  if (params.revenuePotential) sections.push(`- **Target Revenue**: ${params.revenuePotential}`);

  sections.push(`\n## WHAT I NEED FOR EACH OPPORTUNITY`);
  sections.push(`For each of the 3 opportunities, provide a complete analysis in the following JSON structure. Each opportunity must include:`);
  sections.push(`
1. **Project Overview**: Name, description, elevator pitch, industry, category
2. **Problem Analysis**: What specific problem, who experiences it, how significant, how frequent
3. **Target Market**: Customer profiles, geographic focus, ideal persona (with specific details), potential industries
4. **Market Opportunity**: Why this opportunity exists NOW, what gap, why existing solutions fail, timing rationale
5. **AI Solution**: How AI specifically solves this (not just "use AI"), recommended models/APIs, specific AI workflows
6. **Competition Analysis**: 2-3 real competitors with strengths/weaknesses/pricing, differentiation opportunities
7. **MVP Plan**: Core features (5-7), future features, user journey steps, complete tech stack (frontend, backend, DB, AI, infra)
8. **Development Effort**: Complexity, estimated time, required skills, team size, infrastructure costs
9. **Monetization**: Business models, pricing strategy, 3 pricing tiers with specific USD/EUR prices
10. **Validation Strategy**: Customer discovery steps, landing page validation, outreach strategies, prototype testing, pre-selling
11. **Opportunity Scores**: Rate 1-10 on: marketDemand, revenuePotential, competitionLevel (higher = less competition = better), technicalFeasibility, aiAdvantage, speedToMvp, customerPainLevel, scalability. Calculate overall as weighted average.
12. **SWOT Analysis**: 4-5 items each for strengths, weaknesses, risks, opportunities
13. **Market Signals**: Clearly separate verified signals (with sources), assumptions that need validation, and hypotheses to test`);

  sections.push(`\n## OUTPUT FORMAT`);
  sections.push(`Return a JSON object with this exact structure:
{
  "opportunities": [
    {
      "id": "generated-1",
      "projectName": "string",
      "shortDescription": "string (1-2 sentences)",
      "elevatorPitch": "string (2-3 sentences)",
      "industry": "string",
      "category": "string",
      "targetMarket": "string",
      "region": "string",
      "businessType": ["string"],
      "complexity": "Low" | "Medium" | "High",
      "revenuePotential": "string (e.g., '$500K - $2M ARR')",
      "problemDescription": "string",
      "whoExperiencesProblem": "string",
      "problemSignificance": "string",
      "problemFrequency": "string",
      "customerProfiles": ["string"],
      "idealPersona": "string (detailed persona with name, age, role, pain points)",
      "potentialIndustries": ["string"],
      "whyOpportunityExists": "string",
      "marketGap": "string",
      "whyExistingInsufficient": "string",
      "whyNow": "string",
      "howAISolves": "string",
      "recommendedModels": ["string"],
      "suggestedAPIs": ["string"],
      "aiWorkflows": ["string"],
      "competitors": [
        {
          "name": "string",
          "description": "string",
          "strengths": ["string"],
          "weaknesses": ["string"],
          "pricing": "string"
        }
      ],
      "differentiation": ["string"],
      "mvp": {
        "coreFeatures": ["string"],
        "futureFeatures": ["string"],
        "userJourney": ["string"],
        "techStack": {
          "frontend": ["string"],
          "backend": ["string"],
          "database": ["string"],
          "ai": ["string"],
          "infrastructure": ["string"]
        }
      },
      "developmentEffort": {
        "complexity": "string",
        "estimatedTime": "string",
        "requiredSkills": ["string"],
        "teamSize": "string",
        "infrastructureCost": "string"
      },
      "monetization": {
        "models": ["string"],
        "pricingStrategy": "string",
        "examplePricing": [
          {
            "tier": "string",
            "price": "string",
            "features": ["string"]
          }
        ]
      },
      "validation": {
        "customerDiscovery": ["string"],
        "landingPageValidation": ["string"],
        "outreachStrategies": ["string"],
        "prototypeTesting": ["string"],
        "preSelling": ["string"]
      },
      "scores": {
        "marketDemand": number,
        "revenuePotential": number,
        "competitionLevel": number,
        "technicalFeasibility": number,
        "aiAdvantage": number,
        "speedToMvp": number,
        "customerPainLevel": number,
        "scalability": number,
        "overall": number
      },
      "strengths": ["string"],
      "weaknesses": ["string"],
      "risks": ["string"],
      "opportunities": ["string"],
      "marketSignals": {
        "verified": ["string"],
        "assumptions": ["string"],
        "hypotheses": ["string"]
      },
      "createdAt": "YYYY-MM-DD",
      "tags": ["string"],
      "saved": false
    }
  ]
}`);

  sections.push(`\n## IMPORTANT REMINDERS`);
  sections.push(`- Generate EXACTLY 3 opportunities`);
  sections.push(`- Each opportunity must be DISTINCT and target different problems/audiences`);
  sections.push(`- Be SPECIFIC with numbers, company names, and market data`);
  sections.push(`- Competition analysis must reference REAL companies`);
  sections.push(`- Pricing must be realistic for the target market`);
  sections.push(`- Score honestly - not everything should be 9-10/10`);
  sections.push(`- Market signals must distinguish between verified data and assumptions`);
  sections.push(`- Return ONLY valid JSON, no markdown formatting or explanations outside the JSON`);

  return sections.join('\n');
}
