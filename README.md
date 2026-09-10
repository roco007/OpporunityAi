# OpportunityAI - AI Project Opportunity Discovery Platform

A modern web platform that helps entrepreneurs, developers, and indie hackers discover profitable AI project opportunities using real AI-powered analysis.

## 🚀 Features

### Core Functionality
- **AI-Powered Idea Generation**: Generate detailed AI project opportunities using OpenAI GPT-4o or Anthropic Claude 3.5 Sonnet
- **Comprehensive Analysis**: Each opportunity includes problem analysis, market research, competition analysis, MVP planning, and monetization strategies
- **8-Dimension Scoring System**: Intelligent scoring across market demand, revenue potential, competition, technical feasibility, AI advantage, speed to MVP, customer pain level, and scalability
- **Market Signal Verification**: Clear distinction between verified market data, assumptions, and hypotheses
- **Side-by-Side Comparison**: Compare multiple opportunities to make informed decisions
- **Persistent Storage**: Generated opportunities are saved locally for future reference

### User Experience
- Modern, responsive design with Tailwind CSS
- Real-time progress updates during AI generation
- Settings modal for API key configuration
- Advanced filtering and search capabilities
- Radar chart visualization for opportunity scores
- Detailed opportunity analysis pages with SWOT analysis

## 🤖 AI Integration

### How It Works

1. **User Input**: Users define parameters including:
   - Target market (region, industry, audience)
   - Business type (B2B, B2C, SaaS, etc.)
   - Problem category
   - Budget and resources
   - Development complexity
   - Revenue potential
   - Preferred AI technologies

2. **Prompt Construction**: The system builds a comprehensive prompt that:
   - Defines the AI persona as an elite startup opportunity researcher
   - Includes all user parameters
   - Specifies the exact JSON schema for output
   - Emphasizes real market signals over generic ideas
   - Requires specific, actionable opportunities

3. **API Call**: Makes a direct API call to:
   - **OpenAI**: Uses GPT-4o with `response_format: { type: "json_object" }` for structured output
   - **Anthropic**: Uses Claude 3.5 Sonnet with the `anthropic-dangerous-direct-browser-access` header

4. **Response Processing**:
   - Extracts JSON from the AI response (handles markdown code blocks)
   - Validates against Zod schema to ensure data integrity
   - Recalculates overall score using weighted average
   - Assigns unique IDs and timestamps

5. **Display & Storage**:
   - Shows generated opportunities inline
   - Saves to localStorage for persistence
   - Allows navigation to detailed analysis pages

### API Configuration

Users provide their own API keys through the Settings modal:
- Keys are stored in browser localStorage
- Never sent to our servers
- Used only for direct API calls
- Can be tested for validity before use

**Supported Models:**
- OpenAI: GPT-4o, GPT-4o Mini, GPT-4 Turbo
- Anthropic: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku

**Estimated Costs:**
- GPT-4o: ~$0.05-0.15 per generation
- GPT-4o Mini: ~$0.01-0.03 per generation
- Claude 3.5 Sonnet: ~$0.05-0.15 per generation

### Prompt Engineering

The system prompt defines the AI as an elite startup opportunity researcher with expertise in:
- AI/ML applications and limitations
- SaaS business models and pricing
- US and European market research
- Technical architecture for AI products
- Customer discovery methodologies

Key principles enforced:
- Never generate generic ideas
- Focus on monetizable opportunities
- Ground analysis in real market signals
- Consider regulatory requirements (GDPR, CCPA)
- Prefer realistic MVPs
- Focus on opportunities where AI provides genuine advantage

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Zod** for schema validation
- **Lucide React** for icons

### Key Files

```
src/
├── lib/
│   ├── ai-client.ts          # OpenAI & Anthropic API integration
│   ├── prompts.ts            # System and user prompt templates
│   ├── validate.ts           # Zod schemas and JSON extraction
│   ├── storage.ts            # Settings localStorage management
│   └── generated-storage.ts  # Generated opportunities persistence
├── components/
│   ├── Layout.tsx            # Main layout with navigation
│   ├── SettingsModal.tsx     # API key configuration UI
│   ├── IdeaCard.tsx          # Opportunity card component
│   ├── ScoreRadar.tsx        # Radar chart visualization
│   └── ScoreCard.tsx         # Score bar component
├── pages/
│   ├── Landing.tsx           # Home page
│   ├── Dashboard.tsx         # Browse all opportunities
│   ├── Generate.tsx          # AI generation interface
│   ├── IdeaDetail.tsx        # Full opportunity analysis
│   ├── Compare.tsx           # Side-by-side comparison
│   └── Saved.tsx             # Bookmarked opportunities
└── types/
    └── index.ts              # TypeScript type definitions
```

### Data Flow

1. User fills form on `/generate`
2. Parameters passed to `generateOpportunities()`
3. `buildUserPrompt()` constructs detailed prompt
4. API call made to OpenAI or Anthropic
5. Response parsed and validated with Zod
6. Opportunities saved to localStorage
7. Displayed inline with option to view details
8. Also available in Dashboard alongside mock data

## 📊 Opportunity Structure

Each generated opportunity includes:

### Overview
- Project name, description, elevator pitch
- Industry, category, target market
- Business type, complexity, revenue potential

### Problem Analysis
- What problem does it solve?
- Who experiences this problem?
- Problem significance and frequency

### Market Opportunity
- Why does this opportunity exist now?
- What market gap has been identified?
- Why are existing solutions insufficient?

### AI Solution
- How AI specifically solves the problem
- Recommended models and APIs
- AI workflows and agents

### Competition Analysis
- 2-3 real competitors with strengths/weaknesses
- Pricing comparison
- Differentiation opportunities

### MVP Plan
- Core features (5-7)
- Future features
- User journey
- Complete tech stack (frontend, backend, DB, AI, infra)

### Development Effort
- Complexity and estimated time
- Required skills and team size
- Infrastructure costs

### Monetization
- Business models
- Pricing strategy
- 3 pricing tiers with specific prices

### Validation Strategy
- Customer discovery steps
- Landing page validation
- Outreach strategies
- Prototype testing
- Pre-selling opportunities

### Scoring (1-10 scale)
- Market Demand
- Revenue Potential
- Competition Level (higher = less competition)
- Technical Feasibility
- AI Advantage
- Speed to MVP
- Customer Pain Level
- Scalability
- Overall (weighted average)

### SWOT Analysis
- Strengths, Weaknesses, Risks, Opportunities

### Market Signals
- **Verified**: Real market data with sources
- **Assumptions**: Beliefs that need validation
- **Hypotheses**: Ideas to test

## 🔒 Security & Privacy

- API keys stored only in browser localStorage
- No backend server required
- Direct API calls from browser to OpenAI/Anthropic
- No data sent to third parties except the AI provider
- Generated opportunities stored locally

## 🚀 Getting Started

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Configure AI API:**
   - Click the settings icon in the navigation
   - Enter your OpenAI or Anthropic API key
   - Select your preferred model
   - Test the connection

3. **Generate opportunities:**
   - Navigate to "Generate" page
   - Fill in your parameters
   - Click "Generate Opportunities"
   - Wait 30-60 seconds for AI analysis

4. **Explore results:**
   - View generated opportunities inline
   - Click "View Full Analysis" for details
   - Compare multiple opportunities
   - Save favorites for later

## 💡 Tips for Best Results

- **Be specific**: The more detailed your parameters, the better the results
- **Target real problems**: Focus on specific pain points, not broad categories
- **Consider your resources**: Match complexity to your budget and team size
- **Validate assumptions**: Use the market signals section to guide validation
- **Compare options**: Use the comparison tool to evaluate multiple opportunities

## 🎯 Use Cases

- **Indie hackers**: Find solo-developer-friendly SaaS opportunities
- **Startup founders**: Discover validated ideas for new ventures
- **Product managers**: Identify AI features to add to existing products
- **Consultants**: Find client opportunities in specific industries
- **Students**: Explore real-world AI application opportunities

## 📈 Future Enhancements

Potential additions:
- Streaming responses for real-time generation
- Multi-language support
- Integration with market research APIs
- Automated competitor tracking
- Financial projection models
- Team collaboration features
- Export to PDF/Notion/Linear

## 🤝 Contributing

This is a demonstration project showcasing AI integration for startup opportunity discovery. The architecture is designed to be extensible for production use.

## 📄 License

MIT License - feel free to use this for your own projects.

---

**Built with ❤️ for entrepreneurs and developers exploring AI opportunities**
