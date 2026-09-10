import { Opportunity } from '../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    projectName: 'ContractGuard AI',
    shortDescription: 'AI-powered contract analysis platform for SMBs that identifies risks, missing clauses, and negotiation opportunities in legal documents.',
    elevatorPitch: 'Small businesses lose $50K+ annually from unfavorable contract terms. ContractGuard AI analyzes contracts in seconds, flagging risks and suggesting improvements — at 1/10th the cost of a lawyer review.',
    industry: 'Legal Tech',
    category: 'Contract Analysis',
    targetMarket: 'Small and Medium Businesses',
    region: 'United States',
    businessType: ['B2B', 'SaaS'],
    complexity: 'Medium',
    revenuePotential: '$500K - $2M ARR',
    
    problemDescription: 'Small businesses sign contracts without proper legal review due to cost ($300-500/hour for lawyers). This leads to unfavorable terms, hidden liabilities, missed deadlines, and lost revenue from poorly negotiated clauses.',
    whoExperiencesProblem: 'Small business owners, startup founders, procurement managers at companies with 5-50 employees who sign 10-50 contracts per year but cannot afford dedicated legal teams.',
    problemSignificance: 'Average SMB loses $50,000+ annually from unfavorable contract terms. 67% of small businesses report signing contracts they did not fully understand.',
    problemFrequency: 'Weekly - most businesses sign at least 1-2 contracts per week (vendor agreements, NDAs, service contracts, leases).',
    
    customerProfiles: [
      'Startup founders signing vendor agreements and partnerships',
      'Small business owners reviewing service contracts',
      'Procurement managers at mid-size companies',
      'Freelancers and agencies reviewing client contracts'
    ],
    idealPersona: 'Sarah, 34, founder of a 15-person marketing agency. Signs 3-5 contracts monthly. Lost $20K last year from a bad vendor agreement she didn\'t have time to review properly. Would pay $99/mo to avoid this risk.',
    potentialIndustries: ['Marketing Agencies', 'IT Services', 'Consulting', 'E-commerce', 'Real Estate', 'Healthcare Practices'],
    
    whyOpportunityExists: 'Legal AI has matured significantly with GPT-4 and specialized legal models. Meanwhile, 30M+ US small businesses lack affordable contract review. Traditional legal tech focuses on enterprise ($50K+ contracts), leaving SMBs underserved.',
    marketGap: 'Existing solutions (Ironclad, DocuSign CLM) target enterprise with $50K+ annual contracts. No affordable, AI-first solution exists for businesses signing 10-50 contracts/year.',
    whyExistingInsufficient: 'Enterprise CLM tools are too expensive and complex. Lawyers are too slow and costly for routine reviews. DIY templates don\'t catch nuanced risks in custom agreements.',
    whyNow: 'LLM capabilities have reached the level needed for reliable contract analysis. Regulatory pressure (GDPR, CCPA) makes contract compliance more critical. Remote work has increased contract volume for distributed teams.',
    
    howAISolves: 'Uses LLMs fine-tuned on legal documents to parse contracts, identify risk clauses, compare against industry standards, flag missing protections, and generate plain-language summaries with specific risk scores per clause.',
    recommendedModels: ['GPT-4 Turbo', 'Claude 3.5 Sonnet', 'Fine-tuned LegalBERT', 'Custom RAG pipeline'],
    suggestedAPIs: ['OpenAI API', 'Anthropic API', 'Pinecone for document retrieval', 'Stripe for billing', 'DocuSign API for signing'],
    aiWorkflows: [
      'Upload contract → AI parsing → Risk clause identification → Plain language summary → Risk score → Suggested edits',
      'Compare contract against industry benchmarks → Identify unfavorable terms → Generate negotiation talking points',
      'Track contract obligations → Automated deadline alerts → Compliance monitoring'
    ],
    
    competitors: [
      { name: 'Ironclad', description: 'Enterprise CLM platform', strengths: ['Comprehensive', 'Enterprise-grade'], weaknesses: ['Expensive ($50K+/yr)', 'Complex setup', 'Overkill for SMBs'], pricing: '$50,000+ annually' },
      { name: 'LawGeex', description: 'AI contract review', strengths: ['AI-powered', 'Good accuracy'], weaknesses: ['Enterprise focused', 'Limited customization'], pricing: 'Custom enterprise pricing' },
      { name: 'Local Lawyers', description: 'Traditional legal review', strengths: ['Expert judgment', 'Customized advice'], weaknesses: ['$300-500/hr', '2-5 day turnaround', 'Not scalable'], pricing: '$300-500 per hour' }
    ],
    differentiation: [
      '10x cheaper than lawyer review',
      'Instant analysis vs. days of waiting',
      'Built specifically for SMB contract patterns',
      'Plain-language explanations, not legalese',
      'Continuous monitoring of obligations'
    ],
    
    mvp: {
      coreFeatures: [
        'Upload and parse PDF/Word contracts',
        'AI risk analysis with clause-level scoring',
        'Plain-language summary generation',
        'Risk dashboard with priority flags',
        'Email delivery of analysis reports'
      ],
      futureFeatures: [
        'Contract comparison tool',
        'Negotiation suggestion engine',
        'Obligation tracking and alerts',
        'Team collaboration features',
        'Integration with DocuSign/HelloSign',
        'Custom clause library',
        'API access for workflows'
      ],
      userJourney: [
        'User uploads contract (PDF/Word)',
        'AI processes and analyzes in 30-60 seconds',
        'Dashboard shows risk score and flagged clauses',
        'User clicks clause to see plain-language explanation',
        'User receives suggested edits and negotiation points',
        'User downloads report or shares with team'
      ],
      techStack: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'Shadcn/UI'],
        backend: ['Node.js', 'Express', 'Python (AI processing)'],
        database: ['PostgreSQL', 'Redis (caching)'],
        ai: ['OpenAI GPT-4', 'LangChain', 'Pinecone vector DB'],
        infrastructure: ['AWS S3', 'AWS Lambda', 'CloudFront CDN']
      }
    },
    
    developmentEffort: {
      complexity: 'Medium',
      estimatedTime: '8-12 weeks for MVP',
      requiredSkills: ['Full-stack development', 'NLP/AI engineering', 'Legal domain knowledge'],
      teamSize: '2-3 developers',
      infrastructureCost: '$200-500/month (scales with usage)'
    },
    
    monetization: {
      models: ['Subscription SaaS', 'Usage-based add-on'],
      pricingStrategy: 'Tiered subscription based on contract volume with per-contract overage pricing',
      examplePricing: [
        { tier: 'Starter', price: '$49/mo', features: ['10 contracts/month', 'Basic risk analysis', 'Email reports'] },
        { tier: 'Growth', price: '$149/mo', features: ['50 contracts/month', 'Advanced analysis', 'Negotiation suggestions', 'Team sharing'] },
        { tier: 'Business', price: '$399/mo', features: ['Unlimited contracts', 'API access', 'Custom rules', 'Priority support'] }
      ]
    },
    
    validation: {
      customerDiscovery: [
        'Interview 20 small business owners about contract pain points',
        'Survey 100 SMBs about current contract review process',
        'Join SMB founder communities and observe contract discussions'
      ],
      landingPageValidation: [
        'Build landing page with value proposition',
        'Run $500 in LinkedIn ads targeting SMB founders',
        'Measure sign-up conversion rate (target: 5%+)',
        'A/B test different pain point framings'
      ],
      outreachStrategies: [
        'Cold outreach to 50 agency owners on LinkedIn',
        'Post in r/smallbusiness, r/entrepreneur, r/startups',
        'Partner with coworking spaces for demos',
        'Attend local chamber of commerce events'
      ],
      prototypeTesting: [
        'Build clickable prototype in Figma',
        'Test with 10 users for usability',
        'Process 50 real contracts to validate accuracy',
        'Get lawyer validation of AI outputs'
      ],
      preSelling: [
        'Offer lifetime deal to first 50 customers at $29/mo',
        'Create waitlist with early-bird pricing',
        'Partner with 3 business associations for bulk deals'
      ]
    },
    
    scores: {
      marketDemand: 9,
      revenuePotential: 8,
      competitionLevel: 7,
      technicalFeasibility: 8,
      aiAdvantage: 9,
      speedToMvp: 7,
      customerPainLevel: 9,
      scalability: 8,
      overall: 8.1
    },
    
    strengths: [
      'Large underserved market (30M+ US SMBs)',
      'Clear ROI proposition (save $50K+ in bad terms)',
      'AI technology now mature enough for reliable analysis',
      'Recurring need creates strong retention',
      'Low customer acquisition cost through partnerships'
    ],
    weaknesses: [
      'Requires legal domain expertise for accuracy',
      'Liability concerns if AI misses critical risks',
      'Contract formats vary widely across industries',
      'Trust barrier for legal document handling'
    ],
    risks: [
      'Legal liability if analysis is incorrect',
      'Regulatory changes could require retraining',
      'Large legal tech companies could launch SMB products',
      'Data privacy concerns with sensitive contracts'
    ],
    opportunities: [
      'Expand to specific verticals (real estate, healthcare)',
      'Build marketplace of legal templates',
      'Partner with insurance companies',
      'International expansion with localization',
      'Add compliance monitoring as upsell'
    ],
    
    marketSignals: {
      verified: [
        'Reddit threads in r/smallbusiness consistently ask about contract review',
        'Legal tech market growing at 9.2% CAGR',
        '67% of SMBs report signing contracts they don\'t understand (LegalZoom survey)',
        'Average lawyer rate increased 15% in 2024'
      ],
      assumptions: [
        'SMBs would trust AI for contract analysis',
        'Users would pay monthly vs. per-contract',
        'Accuracy of 90%+ would be sufficient for initial adoption'
      ],
      hypotheses: [
        'Agency owners are the ideal early adopter segment',
        'Partnership with coworking spaces reduces CAC by 60%',
        'Plain-language summaries are the key differentiator'
      ]
    },
    
    createdAt: '2024-12-15',
    tags: ['legal-tech', 'B2B', 'SaaS', 'contract-analysis', 'SMB'],
    saved: false
  },
  {
    id: '2',
    projectName: 'ReviewPulse',
    shortDescription: 'AI-powered customer review intelligence platform that helps e-commerce brands monitor, analyze, and respond to reviews across all marketplaces.',
    elevatorPitch: 'E-commerce brands lose 30% of potential sales from unmanaged reviews. ReviewPulse AI monitors all marketplaces, detects emerging issues in real-time, auto-generates responses, and turns negative feedback into product improvements.',
    industry: 'E-commerce',
    category: 'Review Management',
    targetMarket: 'E-commerce Brands & DTC Companies',
    region: 'United States',
    businessType: ['B2B', 'SaaS'],
    complexity: 'Medium',
    revenuePotential: '$1M - $5M ARR',
    
    problemDescription: 'E-commerce brands sell across Amazon, Shopify, Walmart, Etsy, and other marketplaces. Managing reviews across all platforms is manual, time-consuming, and reactive. Brands miss critical negative trends until they impact sales significantly.',
    whoExperiencesProblem: 'E-commerce brand managers, DTC companies selling on multiple channels, Amazon FBA sellers with 50+ products, marketplace operations teams at mid-size brands.',
    problemSignificance: 'A single negative review trend can reduce conversion by 15-30%. Brands with 100+ SKUs cannot manually monitor all reviews. Response time directly impacts review ratings and search ranking.',
    problemFrequency: 'Daily - reviews come in continuously across platforms. Critical issues can emerge within hours but are often discovered days later.',
    
    customerProfiles: [
      'Amazon FBA sellers with 50+ products',
      'DTC brands selling on multiple marketplaces',
      'E-commerce agencies managing multiple clients',
      'Brand managers at mid-size consumer goods companies'
    ],
    idealPersona: 'Mike, 38, runs a 200-SKU home goods brand on Amazon, Walmart, and Shopify. Has 2 VA\'s manually checking reviews daily. Missed a quality issue for 2 weeks that cost $40K in returns. Would pay $299/mo to prevent this.',
    potentialIndustries: ['Consumer Electronics', 'Home & Garden', 'Beauty & Personal Care', 'Food & Beverage', 'Apparel', 'Pet Products'],
    
    whyOpportunityExists: 'E-commerce has exploded with multi-channel selling. Brands now manage reviews across 5-10 platforms manually. AI can now understand sentiment, detect patterns, and generate contextual responses at scale.',
    marketGap: 'Existing tools (FeedbackWhiz, Jungle Scout) focus on Amazon only and provide basic alerts. No platform offers cross-marketplace AI intelligence with automated response generation.',
    whyExistingInsufficient: 'Current tools are platform-specific, provide basic star ratings, and require manual analysis. They don\'t detect emerging quality issues, competitive intelligence, or generate contextual responses.',
    whyNow: 'Multi-channel selling is now standard. AI sentiment analysis has reached human-level accuracy. Amazon\'s algorithm increasingly rewards review velocity and response time. Brand reputation is more critical than ever.',
    
    howAISolves: 'Aggregates reviews from all marketplaces, uses NLP to detect sentiment trends, identifies product issues before they escalate, generates personalized response suggestions, and provides actionable product improvement insights.',
    recommendedModels: ['GPT-4 Turbo', 'BERT for sentiment', 'Custom fine-tuned model for product reviews', 'Embedding models for semantic search'],
    suggestedAPIs: ['Amazon SP-API', 'Shopify Admin API', 'Walmart Marketplace API', 'OpenAI API', 'Etsy API'],
    aiWorkflows: [
      'Real-time review ingestion → Sentiment analysis → Anomaly detection → Alert generation',
      'Review pattern analysis → Root cause identification → Product improvement suggestions',
      'Negative review detection → Context analysis → Response generation → One-click posting',
      'Competitor review analysis → Feature gap identification → Opportunity alerts'
    ],
    
    competitors: [
      { name: 'FeedbackWhiz', description: 'Amazon review management', strengths: ['Amazon-focused', 'Email automation'], weaknesses: ['Amazon only', 'No AI insights', 'Basic analytics'], pricing: '$19-79/mo' },
      { name: 'Jungle Scout', description: 'Amazon seller tools', strengths: ['Comprehensive suite', 'Large user base'], weaknesses: ['Reviews are secondary feature', 'No cross-platform', 'No AI response generation'], pricing: '$49-149/mo' },
      { name: 'Bazaarvoice', description: 'Enterprise review platform', strengths: ['Enterprise-grade', 'Multi-channel'], weaknesses: ['Very expensive', 'Complex implementation', 'Not for SMBs'], pricing: '$2,000+/mo' }
    ],
    differentiation: [
      'Cross-platform intelligence (Amazon + Shopify + Walmart + Etsy)',
      'AI-powered anomaly detection (catch issues in hours, not weeks)',
      'Auto-generated contextual responses',
      'Product improvement insights from review patterns',
      'Competitor review intelligence'
    ],
    
    mvp: {
      coreFeatures: [
        'Amazon review monitoring and alerts',
        'AI sentiment analysis with trend detection',
        'Automated response suggestions',
        'Daily digest email with key insights',
        'Dashboard with review metrics'
      ],
      futureFeatures: [
        'Shopify and Walmart integration',
        'Competitor review monitoring',
        'Product improvement recommendations',
        'Team collaboration features',
        'Custom alert rules',
        'API access',
        'White-label for agencies'
      ],
      userJourney: [
        'Connect Amazon seller account',
        'Dashboard shows all reviews with sentiment scores',
        'AI flags negative trends and quality issues',
        'User reviews suggested responses and posts with one click',
        'Weekly report shows product improvement opportunities'
      ],
      techStack: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'Recharts'],
        backend: ['Node.js', 'Python (AI processing)', 'Celery (task queue)'],
        database: ['PostgreSQL', 'Elasticsearch (review search)', 'Redis'],
        ai: ['OpenAI API', 'Custom sentiment model', 'Anomaly detection algorithms'],
        infrastructure: ['AWS', 'SQS for review ingestion', 'S3 for data storage']
      }
    },
    
    developmentEffort: {
      complexity: 'Medium',
      estimatedTime: '10-14 weeks for MVP',
      requiredSkills: ['Full-stack development', 'API integration', 'NLP/ML engineering', 'E-commerce domain knowledge'],
      teamSize: '2-3 developers',
      infrastructureCost: '$300-800/month'
    },
    
    monetization: {
      models: ['Subscription SaaS', 'Usage-based for high-volume sellers'],
      pricingStrategy: 'Tiered by number of SKUs and review volume',
      examplePricing: [
        { tier: 'Starter', price: '$79/mo', features: ['Up to 50 SKUs', 'Amazon only', 'Daily digest', '50 AI responses/mo'] },
        { tier: 'Growth', price: '$249/mo', features: ['Up to 200 SKUs', '3 platforms', 'Real-time alerts', 'Unlimited AI responses'] },
        { tier: 'Enterprise', price: '$599/mo', features: ['Unlimited SKUs', 'All platforms', 'Competitor intelligence', 'API access', 'Dedicated support'] }
      ]
    },
    
    validation: {
      customerDiscovery: [
        'Interview 30 Amazon FBA sellers about review management',
        'Survey 200 e-commerce brands about review pain points',
        'Analyze top complaints in seller forums and Facebook groups'
      ],
      landingPageValidation: [
        'Build landing page targeting Amazon sellers',
        'Run Facebook ads in seller groups ($1000 budget)',
        'Target 8%+ sign-up rate for beta',
        'Offer free review analysis as lead magnet'
      ],
      outreachStrategies: [
        'Partner with Amazon seller coaches and influencers',
        'Sponsor podcasts in e-commerce niche',
        'Guest post on Seller Central blogs',
        'Attend Amazon seller conferences'
      ],
      prototypeTesting: [
        'Build working prototype with Amazon integration',
        'Test with 20 beta users for 30 days',
        'Measure time saved vs. manual process',
        'Validate AI response quality with sellers'
      ],
      preSelling: [
        'Offer 50% lifetime discount for first 100 customers',
        'Create case study from beta users',
        'Partner with 3 seller agencies for bulk licenses'
      ]
    },
    
    scores: {
      marketDemand: 8,
      revenuePotential: 9,
      competitionLevel: 6,
      technicalFeasibility: 8,
      aiAdvantage: 8,
      speedToMvp: 7,
      customerPainLevel: 8,
      scalability: 9,
      overall: 7.9
    },
    
    strengths: [
      'Large addressable market (500K+ multi-channel sellers)',
      'Clear ROI (prevent revenue loss from bad reviews)',
      'Strong network effects from review data',
      'Recurring need creates high retention',
      'Expandable to adjacent features'
    ],
    weaknesses: [
      'Dependent on marketplace APIs (can change terms)',
      'Review response quality must be high to maintain trust',
      'Seasonal fluctuations in e-commerce activity',
      'Requires ongoing AI model maintenance'
    ],
    risks: [
      'Amazon could build this natively',
      'API access restrictions from marketplaces',
      'AI-generated responses could damage brand voice',
      'Competitors with more marketplace integrations'
    ],
    opportunities: [
      'Expand to social media review monitoring',
      'Add product development insights as premium feature',
      'Build agency white-label platform',
      'International marketplace expansion',
      'AI-powered listing optimization'
    ],
    
    marketSignals: {
      verified: [
        'Amazon seller forums consistently discuss review management challenges',
        'Multi-channel selling increased 40% YoY (Marketplace Pulse)',
        'Average response time to reviews directly correlates with conversion rate',
        'Review management tools market growing at 12% CAGR'
      ],
      assumptions: [
        'Sellers would pay premium for cross-platform intelligence',
        'AI-generated responses would be accepted by sellers',
        'Anomaly detection accuracy of 85%+ would be valuable'
      ],
      hypotheses: [
        'Sellers with 100+ SKUs are the ideal customer segment',
        'Weekly digest format preferred over real-time alerts',
        'Competitor review analysis is a strong differentiator'
      ]
    },
    
    createdAt: '2024-12-14',
    tags: ['e-commerce', 'review-management', 'AI', 'multi-channel', 'amazon'],
    saved: true
  },
  {
    id: '3',
    projectName: 'ComplianceFlow EU',
    shortDescription: 'AI-powered GDPR and EU regulatory compliance automation platform for SaaS companies operating in European markets.',
    elevatorPitch: 'European SaaS companies spend €100K+ annually on GDPR compliance manually. ComplianceFlow AI automates data mapping, DPIA generation, consent management, and regulatory monitoring — reducing compliance costs by 80%.',
    industry: 'RegTech',
    category: 'Compliance Automation',
    targetMarket: 'SaaS Companies in Europe',
    region: 'Europe',
    businessType: ['B2B', 'SaaS', 'Enterprise'],
    complexity: 'High',
    revenuePotential: '$2M - $10M ARR',
    
    problemDescription: 'SaaS companies operating in Europe must comply with GDPR, ePrivacy Directive, AI Act, and country-specific regulations. Compliance is complex, constantly changing, and requires specialized legal expertise that most tech companies cannot afford.',
    whoExperiencesProblem: 'CTOs and CPOs at European SaaS companies (10-500 employees), DPOs managing compliance for multiple products, legal teams at tech startups expanding to EU markets.',
    problemSignificance: 'GDPR fines average €4M per incident. Non-compliance can result in business shutdown in EU markets. Manual compliance costs €100-300K annually in legal fees and internal resources.',
    problemFrequency: 'Continuous - regulations change regularly, data flows evolve with product changes, and audits occur quarterly to annually.',
    
    customerProfiles: [
      'SaaS startups expanding from US to EU markets',
      'European SaaS companies with 10-200 employees',
      'DPOs managing compliance for multiple products',
      'Tech companies processing personal data at scale'
    ],
    idealPersona: 'Thomas, 41, CTO of a Berlin-based SaaS company (80 employees). Spends €15K/month on external legal counsel for GDPR. Missed a regulatory update that required 3 weeks of emergency development. Would pay €499/mo for automated compliance.',
    potentialIndustries: ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'HR Tech', 'MarTech'],
    
    whyOpportunityExists: 'EU regulatory landscape is becoming more complex (GDPR + AI Act + DSA + country laws). SaaS companies need continuous compliance but cannot afford large legal teams. AI can now automate data mapping, document generation, and regulatory monitoring.',
    marketGap: 'Existing tools (OneTrust, TrustArc) are enterprise-focused ($100K+/year) and complex. No affordable, AI-native compliance platform exists for mid-market SaaS companies.',
    whyExistingInsufficient: 'Enterprise GRC tools are too expensive and complex for 50-200 person companies. Manual processes are error-prone and don\'t scale. Legal consultants are reactive, not proactive.',
    whyNow: 'AI Act creates new compliance requirements. GDPR enforcement is increasing (fines up 40% in 2024). EU SaaS market is booming. AI capabilities now sufficient for automated compliance workflows.',
    
    howAISolves: 'Uses AI to automatically map data flows, generate compliance documentation (DPIAs, ROAPs), monitor regulatory changes, assess compliance gaps, and provide actionable remediation steps with code-level suggestions.',
    recommendedModels: ['GPT-4 Turbo', 'Fine-tuned legal models', 'RAG with regulatory database', 'Custom classification models'],
    suggestedAPIs: ['OpenAI API', 'EUR-Lex API (EU legislation)', 'National DPA APIs', 'GitHub API (code analysis)'],
    aiWorkflows: [
      'Code scan → Data flow mapping → GDPR article mapping → Gap identification → Remediation suggestions',
      'Regulatory monitoring → Impact analysis → Affected systems identification → Update recommendations',
      'User consent analysis → Compliance scoring → Missing consent detection → Fix suggestions',
      'DPIA generation → Risk assessment → Mitigation recommendations → Documentation output'
    ],
    
    competitors: [
      { name: 'OneTrust', description: 'Enterprise privacy management', strengths: ['Comprehensive', 'Market leader'], weaknesses: ['€100K+/year', '12-month implementation', 'Overkill for SMBs'], pricing: '€80,000+ annually' },
      { name: 'TrustArc', description: 'Privacy compliance platform', strengths: ['Established', 'Good framework coverage'], weaknesses: ['Expensive', 'Complex UI', 'Slow to adapt to new regulations'], pricing: '€50,000+ annually' },
      { name: 'Legal Counsel', description: 'External law firms', strengths: ['Expert judgment', 'Customized advice'], weaknesses: ['€300-600/hr', 'Reactive', 'Not scalable'], pricing: '€5,000-20,000/month' }
    ],
    differentiation: [
      'AI-native approach (not just digitized manual processes)',
      '10x cheaper than enterprise solutions',
      'Code-level compliance suggestions (not just policy)',
      'Real-time regulatory monitoring',
      'Built for SaaS product teams, not just legal'
    ],
    
    mvp: {
      coreFeatures: [
        'Automated data flow mapping from code/config',
        'GDPR compliance gap assessment',
        'DPIA document generation',
        'Regulatory change monitoring (GDPR + AI Act)',
        'Compliance dashboard with scoring'
      ],
      futureFeatures: [
        'Automated consent management',
        'Data subject request automation',
        'Multi-framework support (ISO 27001, SOC 2)',
        'Vendor risk assessment',
        'Team collaboration and workflows',
        'API for CI/CD integration',
        'Country-specific regulation modules'
      ],
      userJourney: [
        'Connect code repository and infrastructure',
        'AI scans and maps data flows automatically',
        'Dashboard shows compliance score and gaps',
        'Click gap to see AI-generated remediation steps',
        'Generate DPIA documents with one click',
        'Receive alerts when regulations change'
      ],
      techStack: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'Shadcn/UI'],
        backend: ['Node.js', 'Python (AI & analysis)', 'Go (code scanning)'],
        database: ['PostgreSQL', 'Neo4j (data flow graphs)', 'Redis'],
        ai: ['OpenAI API', 'Custom legal NLP models', 'AST parsing for code analysis'],
        infrastructure: ['AWS EU regions', 'GitHub App', 'Webhook infrastructure']
      }
    },
    
    developmentEffort: {
      complexity: 'High',
      estimatedTime: '16-20 weeks for MVP',
      requiredSkills: ['Full-stack development', 'Legal/regulatory expertise', 'Code analysis', 'AI/NLP engineering'],
      teamSize: '3-5 developers + legal advisor',
      infrastructureCost: '$500-1500/month'
    },
    
    monetization: {
      models: ['Subscription SaaS', 'Enterprise licensing'],
      pricingStrategy: 'Tiered by company size and number of products/frameworks',
      examplePricing: [
        { tier: 'Startup', price: '€199/mo', features: ['1 product', 'GDPR only', 'Basic monitoring', '5 team members'] },
        { tier: 'Growth', price: '€499/mo', features: ['3 products', 'GDPR + AI Act', 'Code scanning', '20 team members'] },
        { tier: 'Enterprise', price: '€1,499/mo', features: ['Unlimited products', 'All frameworks', 'API access', 'SSO', 'Dedicated support'] }
      ]
    },
    
    validation: {
      customerDiscovery: [
        'Interview 25 CTOs/DPOs at European SaaS companies',
        'Survey 100 tech companies about compliance pain points',
        'Attend DPO community events in Berlin, London, Amsterdam'
      ],
      landingPageValidation: [
        'Build landing page targeting EU SaaS companies',
        'Run LinkedIn ads targeting DPOs and CTOs in EU',
        'Offer free compliance assessment as lead magnet',
        'Target 6%+ sign-up rate for early access'
      ],
      outreachStrategies: [
        'Partner with EU startup accelerators',
        'Sponsor privacy-focused meetups and conferences',
        'Guest post on tech compliance blogs',
        'Engage in DPO Slack communities'
      ],
      prototypeTesting: [
        'Build prototype with GitHub integration',
        'Test with 10 beta companies for 60 days',
        'Validate accuracy of compliance gap detection',
        'Get DPO validation of generated documents'
      ],
      preSelling: [
        'Offer annual plan at 40% discount for first 50 customers',
        'Create compliance assessment report as free tool',
        'Partner with 2 EU law firms for referrals'
      ]
    },
    
    scores: {
      marketDemand: 9,
      revenuePotential: 9,
      competitionLevel: 6,
      technicalFeasibility: 6,
      aiAdvantage: 9,
      speedToMvp: 5,
      customerPainLevel: 9,
      scalability: 8,
      overall: 7.6
    },
    
    strengths: [
      'Massive pain point with clear financial impact',
      'Growing regulatory complexity increases demand',
      'High switching costs create strong retention',
      'AI can provide 10x efficiency over manual processes',
      'Large European SaaS market'
    ],
    weaknesses: [
      'Requires deep regulatory expertise',
      'High technical complexity for code analysis',
      'Longer sales cycle for compliance tools',
      'Liability concerns with compliance advice'
    ],
    risks: [
      'Regulatory changes could invalidate AI models',
      'Enterprise players could launch SMB products',
      'Accuracy requirements are extremely high',
      'Data sensitivity concerns from customers'
    ],
    opportunities: [
      'Expand to US compliance (CCPA, state laws)',
      'Add ISO 27001 and SOC 2 automation',
      'Build compliance-as-a-service marketplace',
      'Partner with cloud providers for integration',
      'International expansion (UK, Switzerland)'
    ],
    
    marketSignals: {
      verified: [
        'GDPR fines increased 40% in 2024 (EDPB report)',
        'EU AI Act creates new compliance requirements for all SaaS',
        'European SaaS market growing at 15% CAGR',
        'Average DPO salary in EU: €90-130K (indicating demand)'
      ],
      assumptions: [
        'SaaS companies would trust AI for compliance assessment',
        'Code-level analysis would be accurate enough for production use',
        'Mid-market companies would self-serve vs. requiring professional services'
      ],
      hypotheses: [
        'CTOs are the buyer, not DPOs (faster decision making)',
        'GitHub integration is the key differentiator',
        'Companies with 50-200 employees are the ideal segment'
      ]
    },
    
    createdAt: '2024-12-13',
    tags: ['regtech', 'GDPR', 'compliance', 'EU', 'SaaS', 'enterprise'],
    saved: false
  },
  {
    id: '4',
    projectName: 'MeetMemo',
    shortDescription: 'AI meeting assistant that generates structured action items, tracks commitments, and integrates with project management tools for remote teams.',
    elevatorPitch: 'Remote teams waste 4.4 hours/week following up on meeting commitments. MeetMemo AI listens to meetings, extracts action items with owners and deadlines, and automatically creates tasks in your PM tool — so nothing falls through the cracks.',
    industry: 'Productivity',
    category: 'Meeting Intelligence',
    targetMarket: 'Remote & Hybrid Teams',
    region: 'United States',
    businessType: ['B2B', 'SaaS'],
    complexity: 'Medium',
    revenuePotential: '$1M - $5M ARR',
    
    problemDescription: 'Remote teams have 2-3x more meetings than pre-2020. Action items from meetings are lost, forgotten, or poorly tracked. Teams spend hours weekly in follow-up meetings to discuss things already decided. Accountability breaks down without clear tracking.',
    whoExperiencesProblem: 'Engineering managers, product managers, team leads at remote-first companies. Anyone who runs or attends 5+ meetings per day and struggles to track commitments.',
    problemSignificance: 'Studies show 67% of meeting action items are never completed. Teams spend average 4.4 hours/week on follow-up that could be automated. Miscommunication from meetings costs companies $12,500/employee/year.',
    problemFrequency: 'Daily - most knowledge workers attend 3-8 meetings per day, each generating 2-5 action items that need tracking.',
    
    customerProfiles: [
      'Engineering teams at tech companies (50-500 employees)',
      'Product teams managing cross-functional projects',
      'Consulting firms with client-facing meetings',
      'Sales teams tracking follow-ups and commitments'
    ],
    idealPersona: 'Alex, 32, engineering manager at a 150-person remote SaaS company. Attends 6-8 meetings daily. Spends 45 min/day manually creating Jira tickets from meeting notes. Missed commitments cause 20% of sprint delays. Would pay $15/user/mo to solve this.',
    potentialIndustries: ['Technology', 'Consulting', 'Financial Services', 'Marketing Agencies', 'Healthcare Admin', 'Education'],
    
    whyOpportunityExists: 'Remote work has made meeting overload a universal problem. Speech-to-text AI is now accurate enough for meeting transcription. But existing tools (Otter, Fireflies) focus on transcription, not action item extraction and PM tool integration.',
    marketGap: 'Current meeting AI tools transcribe and summarize but don\'t deeply integrate with project management workflows. They generate text summaries, not actionable tasks with owners, deadlines, and dependencies.',
    whyExistingInsufficient: 'Otter.ai and Fireflies focus on transcription. Notion AI and others summarize but don\'t create tasks. No tool deeply integrates meeting intelligence with PM tool workflows (Jira, Asana, Linear, Monday).',
    whyNow: 'Speech-to-text accuracy exceeds 95%. LLMs can now reliably extract action items with context. PM tool APIs are mature. Remote work is permanent, making meeting efficiency critical.',
    
    howAISolves: 'Joins meetings via calendar integration, transcribes in real-time, uses AI to identify commitments, assign owners, set deadlines based on context, and automatically create structured tasks in connected PM tools.',
    recommendedModels: ['Whisper V3 (transcription)', 'GPT-4 Turbo (action extraction)', 'Fine-tuned model for meeting patterns'],
    suggestedAPIs: ['Zoom API', 'Google Meet API', 'Microsoft Teams API', 'Jira API', 'Asana API', 'Linear API', 'Google Calendar API'],
    aiWorkflows: [
      'Meeting recording → Transcription → Action item extraction → Owner identification → Deadline inference → PM tool task creation',
      'Calendar scan → Meeting preparation brief → Previous action items review → Context loading',
      'Post-meeting analysis → Commitment tracking → Overdue detection → Automated follow-up reminders',
      'Cross-meeting pattern analysis → Recurring issues identification → Process improvement suggestions'
    ],
    
    competitors: [
      { name: 'Otter.ai', description: 'Meeting transcription', strengths: ['Good transcription', 'Affordable', 'Large user base'], weaknesses: ['No PM integration', 'Weak action item extraction', 'No task creation'], pricing: '$16-30/user/mo' },
      { name: 'Fireflies.ai', description: 'Meeting intelligence', strengths: ['Good search', 'CRM integration'], weaknesses: ['Action items are basic', 'Limited PM tool support', 'No deadline inference'], pricing: '$18-39/user/mo' },
      { name: 'tl;dv', description: 'Meeting recording', strengths: ['Multi-platform', 'Good clips'], weaknesses: ['Focus on recording, not actions', 'No PM integration'], pricing: '$15-25/user/mo' }
    ],
    differentiation: [
      'Deep PM tool integration (create tasks, not just notes)',
      'Intelligent deadline inference from context',
      'Automatic owner assignment based on meeting context',
      'Cross-meeting commitment tracking',
      'Overdue detection with smart follow-ups'
    ],
    
    mvp: {
      coreFeatures: [
        'Zoom meeting integration with real-time transcription',
        'AI action item extraction with owner and deadline',
        'Jira integration for automatic task creation',
        'Post-meeting summary with commitments',
        'Dashboard showing commitment completion rates'
      ],
      futureFeatures: [
        'Google Meet and Teams support',
        'Asana, Linear, Monday.com integrations',
        'Meeting prep briefs from previous actions',
        'Team analytics and meeting efficiency scores',
        'Slack notifications for commitments',
        'Custom action item templates',
        'API for custom workflows'
      ],
      userJourney: [
        'Connect calendar and PM tool (Jira)',
        'AI joins meeting automatically (with permission)',
        'Real-time transcription with action item highlighting',
        'Post-meeting: review extracted actions, confirm/edit',
        'Tasks automatically created in Jira with assignees and deadlines',
        'Dashboard tracks completion and sends reminders'
      ],
      techStack: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'Shadcn/UI'],
        backend: ['Node.js', 'Python (AI processing)', 'WebSocket (real-time)'],
        database: ['PostgreSQL', 'Redis (real-time state)'],
        ai: ['Whisper V3', 'OpenAI GPT-4', 'Custom action extraction model'],
        infrastructure: ['AWS', 'WebRTC for audio', 'SQS for processing queue']
      }
    },
    
    developmentEffort: {
      complexity: 'Medium',
      estimatedTime: '10-14 weeks for MVP',
      requiredSkills: ['Full-stack development', 'Audio/speech processing', 'API integrations', 'AI/NLP engineering'],
      teamSize: '2-3 developers',
      infrastructureCost: '$400-1000/month (scales with meetings)'
    },
    
    monetization: {
      models: ['Subscription SaaS (per-seat)', 'Usage-based for transcription'],
      pricingStrategy: 'Per-user monthly pricing with tiered features',
      examplePricing: [
        { tier: 'Team', price: '$12/user/mo', features: ['Zoom only', '50 meetings/mo', 'Jira integration', 'Basic analytics'] },
        { tier: 'Business', price: '$24/user/mo', features: ['All platforms', 'Unlimited meetings', 'All PM integrations', 'Advanced analytics'] },
        { tier: 'Enterprise', price: '$39/user/mo', features: ['SSO', 'Custom integrations', 'Admin controls', 'SLA', 'Dedicated support'] }
      ]
    },
    
    validation: {
      customerDiscovery: [
        'Interview 30 engineering/product managers about meeting pain',
        'Survey 200 remote workers about action item tracking',
        'Shadow 10 teams for a week to observe meeting workflows'
      ],
      landingPageValidation: [
        'Build landing page with demo video',
        'Run LinkedIn ads targeting engineering managers',
        'Offer free meeting analysis for first 100 signups',
        'Target 10%+ conversion to waitlist'
      ],
      outreachStrategies: [
        'Partner with remote work communities (Remote.co, We Work Remotely)',
        'Sponsor engineering management podcasts',
        'Post in r/EngineeringManagement, r/productmanagement',
        'Attend virtual engineering leadership conferences'
      ],
      prototypeTesting: [
        'Build Zoom-only prototype',
        'Test with 15 teams for 30 days',
        'Measure action item completion rate improvement',
        'Validate accuracy of owner/deadline extraction'
      ],
      preSelling: [
        'Offer founding member pricing ($8/user/mo lifetime)',
        'Create ROI calculator showing time saved',
        'Partner with 3 remote-first companies for case studies'
      ]
    },
    
    scores: {
      marketDemand: 8,
      revenuePotential: 7,
      competitionLevel: 5,
      technicalFeasibility: 8,
      aiAdvantage: 7,
      speedToMvp: 8,
      customerPainLevel: 8,
      scalability: 8,
      overall: 7.4
    },
    
    strengths: [
      'Universal pain point for remote teams',
      'Clear time-saving ROI (4+ hours/week)',
      'Growing remote work market',
      'Strong word-of-mouth potential',
      'Expandable to broader workflow automation'
    ],
    weaknesses: [
      'Competitive space with well-funded players',
      'Meeting platform integrations are complex',
      'Audio quality varies widely',
      'Privacy concerns with meeting recording'
    ],
    risks: [
      'Zoom/Teams could build this natively',
      'Otter/Fireflies could add PM integration',
      'Privacy regulations around meeting recording',
      'High infrastructure costs for audio processing'
    ],
    opportunities: [
      'Expand to email/Slack commitment tracking',
      'Build team productivity analytics platform',
      'Add meeting scheduling optimization',
      'Integrate with communication tools for follow-ups',
      'Vertical-specific templates (engineering, sales, consulting)'
    ],
    
    marketSignals: {
      verified: [
        'Average knowledge worker attends 21.5 meetings/week (Atlassian 2024)',
        'Meeting overload cited as #1 productivity killer in remote work surveys',
        'Meeting intelligence market growing at 18% CAGR',
        '67% of professionals admit to multitasking during meetings'
      ],
      assumptions: [
        'Users would want AI to join meetings automatically',
        'Action item accuracy of 85%+ would be acceptable',
        'PM tool integration is more valuable than transcription alone'
      ],
      hypotheses: [
        'Engineering managers are the ideal buyer persona',
        'Jira integration is the most critical for initial launch',
        'Teams would pay per-seat vs. per-meeting pricing'
      ]
    },
    
    createdAt: '2024-12-12',
    tags: ['productivity', 'meetings', 'remote-work', 'AI', 'project-management'],
    saved: true
  },
  {
    id: '5',
    projectName: 'SkillBridge AI',
    shortDescription: 'AI-powered career transition platform that helps professionals identify skill gaps, create personalized learning paths, and connect with employers seeking their emerging skill sets.',
    elevatorPitch: '2 million US workers need to transition careers due to AI automation each year. SkillBridge AI analyzes your existing skills, maps them to high-demand roles, creates a personalized 90-day transition plan, and connects you with employers who value your unique skill combination.',
    industry: 'HR Tech',
    category: 'Career Development',
    targetMarket: 'Working Professionals',
    region: 'United States',
    businessType: ['B2C', 'B2B'],
    complexity: 'Medium',
    revenuePotential: '$2M - $8M ARR',
    
    problemDescription: 'AI and automation are displacing workers across industries. Professionals know they need to reskill but don\'t know what skills to learn, how their current skills transfer, or where to find employers who need their specific combination of old + new skills.',
    whoExperiencesProblem: 'Workers in roles being automated (data entry, basic accounting, customer service, content writing), mid-career professionals (30-50) looking to stay relevant, career changers wanting data-driven guidance.',
    problemSignificance: 'World Economic Forum estimates 85 million jobs displaced by 2025. Average career transition takes 6-12 months without guidance. Wrong skill investments waste $5K+ and 6+ months. 73% of workers worry about AI impacting their jobs.',
    problemFrequency: 'One-time major decision with ongoing skill maintenance needs. Professionals check job market trends monthly and need continuous skill updates.',
    
    customerProfiles: [
      'Mid-career professionals in automatable roles',
      'Workers recently displaced by AI/automation',
      'Career changers seeking data-driven guidance',
      'HR departments offering reskilling to employees'
    ],
    idealPersona: 'Jennifer, 38, senior accountant at a mid-size firm. AI tools are handling 60% of her work. Knows she needs to transition but doesn\'t know to what. Has strong analytical skills, Excel expertise, and business knowledge. Would pay $49/mo for a clear transition plan to data analytics or FP&A.',
    potentialIndustries: ['Finance', 'Marketing', 'Customer Service', 'Administration', 'Manufacturing', 'Retail'],
    
    whyOpportunityExists: 'AI disruption is creating massive career anxiety. Existing career platforms (LinkedIn, Indeed) show jobs but don\'t help with transition planning. Learning platforms (Coursera, Udemy) offer courses but don\'t connect learning to specific career outcomes.',
    marketGap: 'No platform combines skill gap analysis, personalized learning paths, labor market intelligence, and employer matching in one AI-powered workflow. Existing tools are fragmented across career, learning, and job search.',
    whyExistingInsufficient: 'LinkedIn shows jobs but not transition paths. Coursera has courses but no career outcome tracking. Career coaches cost $200+/hour and aren\'t scalable. Job boards don\'t assess skill transferability.',
    whyNow: 'AI disruption is accelerating across white-collar jobs. Government programs are funding reskilling. Employers are actively seeking career changers with adjacent skills. LLMs can now accurately map skill transferability.',
    
    howAISolves: 'Analyzes user\'s complete skill profile (from resume, assessments, work history), maps transferable skills to target roles using labor market data, identifies specific skill gaps, creates personalized learning plans with timelines, and matches with employers seeking their unique skill combination.',
    recommendedModels: ['GPT-4 Turbo', 'Custom skill mapping models', 'Labor market analysis models', 'Recommendation engine'],
    suggestedAPIs: ['LinkedIn API', 'Lightcast (labor market data)', 'OpenAI API', 'Coursera/Udemy APIs', 'Indeed API'],
    aiWorkflows: [
      'Resume/profile analysis → Skill extraction → Transferability mapping → Target role identification → Gap analysis',
      'Labor market scanning → Demand forecasting → Salary analysis → Opportunity scoring',
      'Learning path generation → Resource matching → Timeline creation → Progress tracking',
      'Employer matching → Skill combination analysis → Introduction facilitation → Interview prep'
    ],
    
    competitors: [
      { name: 'LinkedIn Learning', description: 'Online learning platform', strengths: ['Large course library', 'Professional network'], weaknesses: ['No personalized transition plans', 'No skill gap analysis', 'Generic recommendations'], pricing: '$30/mo' },
      { name: 'Coursera', description: 'University-level courses', strengths: ['Quality content', 'Certificates'], weaknesses: ['No career transition focus', 'No employer matching', 'No skill mapping'], pricing: '$49/mo' },
      { name: 'Career Coaches', description: 'Human career guidance', strengths: ['Personalized', 'Accountability'], weaknesses: ['$200+/hour', 'Not scalable', 'Inconsistent quality'], pricing: '$200-500/session' }
    ],
    differentiation: [
      'AI-powered skill transferability mapping (unique IP)',
      'Personalized 90-day transition plans with milestones',
      'Employer matching based on skill combinations',
      'Labor market intelligence with demand forecasting',
      'End-to-end journey (assess → learn → connect → transition)'
    ],
    
    mvp: {
      coreFeatures: [
        'Resume upload and AI skill extraction',
        'Skill transferability analysis to 50 target roles',
        'Personalized 90-day learning plan',
        'Labor market data integration (demand, salaries)',
        'Progress tracking dashboard'
      ],
      futureFeatures: [
        'Employer matching and introductions',
        'Community of career changers',
        'Mentor matching',
        'Interview preparation AI',
        'Corporate reskilling module',
        'Skill verification assessments',
        'Salary negotiation coaching'
      ],
      userJourney: [
        'Upload resume and complete skill assessment (15 min)',
        'AI generates skill profile and transferability map',
        'View top 5 career transition options with scores',
        'Select target role → Get 90-day learning plan',
        'Track progress, complete milestones, unlock employer connections'
      ],
      techStack: {
        frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Python (AI & data analysis)'],
        database: ['PostgreSQL', 'Elasticsearch (job matching)'],
        ai: ['OpenAI API', 'Custom skill mapping models', 'Lightcast API'],
        infrastructure: ['Vercel', 'AWS Lambda', 'Supabase']
      }
    },
    
    developmentEffort: {
      complexity: 'Medium',
      estimatedTime: '12-16 weeks for MVP',
      requiredSkills: ['Full-stack development', 'AI/NLP engineering', 'Labor market data expertise', 'UX design'],
      teamSize: '2-4 developers',
      infrastructureCost: '$300-700/month'
    },
    
    monetization: {
      models: ['Subscription SaaS', 'Freemium', 'B2B enterprise licensing'],
      pricingStrategy: 'Freemium for individuals with premium features, enterprise licensing for companies',
      examplePricing: [
        { tier: 'Free', price: '$0', features: ['Basic skill assessment', '3 career options', 'Limited learning plan'] },
        { tier: 'Pro', price: '$29/mo', features: ['Full skill analysis', 'Unlimited career paths', '90-day plan', 'Progress tracking'] },
        { tier: 'Premium', price: '$79/mo', features: ['Everything in Pro', 'Employer matching', 'Interview prep', 'Mentor access'] },
        { tier: 'Enterprise', price: '$15/employee/mo', features: ['Team reskilling', 'Custom pathways', 'Analytics dashboard', 'SSO'] }
      ]
    },
    
    validation: {
      customerDiscovery: [
        'Interview 40 professionals considering career change',
        'Survey 500 workers about AI career anxiety',
        'Partner with 3 outplacement firms for user access'
      ],
      landingPageValidation: [
        'Build landing page with free skill assessment',
        'Run Google Ads targeting "career change" keywords',
        'Target 12%+ conversion to free assessment',
        'Measure completion rate of assessment'
      ],
      outreachStrategies: [
        'Partner with HR blogs and career advice sites',
        'Sponsor career transition podcasts',
        'Post in r/careerguidance, r/careeradvice',
        'Partner with university career centers'
      ],
      prototypeTesting: [
        'Build skill assessment prototype',
        'Test with 50 career changers for accuracy',
        'Validate learning plan quality with career coaches',
        'Measure user satisfaction and completion rates'
      ],
      preSelling: [
        'Offer lifetime Pro access for first 200 users at $99',
        'Partner with 5 companies for employee reskilling pilots',
        'Create viral career assessment tool as lead magnet'
      ]
    },
    
    scores: {
      marketDemand: 9,
      revenuePotential: 8,
      competitionLevel: 7,
      technicalFeasibility: 7,
      aiAdvantage: 8,
      speedToMvp: 7,
      customerPainLevel: 9,
      scalability: 8,
      overall: 7.9
    },
    
    strengths: [
      'Massive addressable market (millions of workers)',
      'Strong emotional driver (career anxiety)',
      'Multiple revenue streams (B2C + B2B)',
      'Clear ROI for users (career advancement)',
      'Government funding opportunities for reskilling'
    ],
    weaknesses: [
      'Long user journey (90+ days to value)',
      'Requires accurate labor market data',
      'Employer matching needs network effects',
      'Competition from LinkedIn and job boards'
    ],
    risks: [
      'LinkedIn could build this feature',
      'Labor market data may be inaccurate',
      'Users may not complete the full journey',
      'Economic downturn could reduce career change activity'
    ],
    opportunities: [
      'Government reskilling program partnerships',
      'Corporate training budget capture',
      'International expansion with localization',
      'Vertical-specific transition paths',
      'Community and mentorship marketplace'
    ],
    
    marketSignals: {
      verified: [
        'WEF: 85M jobs displaced by AI by 2025, 97M new roles created',
        '73% of workers worried about AI impact (Pew Research 2024)',
        'Career transition services market: $600M and growing 12% CAGR',
        'LinkedIn: "career change" searches up 65% in 2024'
      ],
      assumptions: [
        'Users would pay monthly for ongoing career guidance',
        'AI skill mapping accuracy of 80%+ would be sufficient',
        'Employers would value AI-identified skill combinations'
      ],
      hypotheses: [
        'Accountants and customer service workers are ideal early adopters',
        '90-day plan format creates accountability and completion',
        'B2B channel through HR departments is more scalable than B2C'
      ]
    },
    
    createdAt: '2024-12-11',
    tags: ['hr-tech', 'career', 'reskilling', 'AI', 'B2C', 'B2B'],
    saved: false
  }
];

export const industries = [
  'All Industries',
  'Legal Tech',
  'E-commerce',
  'RegTech',
  'Productivity',
  'HR Tech',
  'FinTech',
  'HealthTech',
  'EdTech',
  'MarTech',
  'DevTools',
  'Climate Tech'
];

export const regions = [
  'All Regions',
  'United States',
  'Europe',
  'United Kingdom',
  'Germany',
  'France',
  'Nordics'
];

export const businessTypes = [
  'B2B',
  'B2C',
  'SaaS',
  'Enterprise',
  'Small Businesses'
];

export const complexities = ['Low', 'Medium', 'High'];

export const problemCategories = [
  'Inefficient Workflows',
  'Data Overload',
  'Manual Processes',
  'Communication Gaps',
  'Compliance Burden',
  'Customer Experience',
  'Cost Reduction',
  'Revenue Optimization',
  'Talent Management',
  'Decision Making'
];
