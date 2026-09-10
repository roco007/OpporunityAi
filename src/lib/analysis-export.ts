import { Opportunity } from '../types';

const cleanPdfText = (value: string) => value
  .replace(/\u2192/g, ' -> ')
  .replace(/[\u2013\u2014]/g, '-')
  .replace(/[^\x20-\x7E\n]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const titleCase = (value: string) => value.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase()).trim();

const safeFilename = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '') || 'opportunity-analysis';

export const buildDevelopmentPrompt = (opportunity: Opportunity): string => `You are a senior product engineer and AI application architect. Build a polished, production-ready MVP for the following product from scratch. Make pragmatic choices where details are unspecified, but do not omit the requirements below.

# Product brief
Product: ${opportunity.projectName}
Category: ${opportunity.category} in ${opportunity.industry}
Target market: ${opportunity.targetMarket} (${opportunity.region})
Business model: ${opportunity.businessType.join(', ')}
One-line value proposition: ${opportunity.shortDescription}
Elevator pitch: ${opportunity.elevatorPitch}

# Problem and market context
Problem: ${opportunity.problemDescription}
Who has the problem: ${opportunity.whoExperiencesProblem}
Why it matters: ${opportunity.problemSignificance}
Frequency: ${opportunity.problemFrequency}
Market gap: ${opportunity.marketGap}
Why existing solutions fall short: ${opportunity.whyExistingInsufficient}
Why now: ${opportunity.whyNow}
Ideal customer: ${opportunity.idealPersona}

# Required AI product behavior
How AI should solve the problem: ${opportunity.howAISolves}
Recommended AI models: ${opportunity.recommendedModels.join(', ')}
Suggested APIs and integrations: ${opportunity.suggestedAPIs.join(', ')}
AI workflows:
${opportunity.aiWorkflows.map((workflow, index) => `${index + 1}. ${workflow}`).join('\n')}

# MVP scope
Core features (must ship):
${opportunity.mvp.coreFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

Future features (design for, but do not build unless they are low effort):
${opportunity.mvp.futureFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

Primary user journey:
${opportunity.mvp.userJourney.map((step, index) => `${index + 1}. ${step}`).join('\n')}

# Preferred architecture
Frontend: ${opportunity.mvp.techStack.frontend.join(', ')}
Backend: ${opportunity.mvp.techStack.backend.join(', ')}
Database: ${opportunity.mvp.techStack.database.join(', ')}
AI layer: ${opportunity.mvp.techStack.ai.join(', ')}
Infrastructure: ${opportunity.mvp.techStack.infrastructure.join(', ')}

# Commercial context
Pricing strategy: ${opportunity.monetization.pricingStrategy}
Suggested monetization models: ${opportunity.monetization.models.join(', ')}
Differentiation to preserve: ${opportunity.differentiation.join('; ')}

# Delivery instructions
1. Start with a concise architecture and data-model plan.
2. Create the complete application, including responsive UI, authentication, database schema, API routes, validation, error states, and empty states.
3. Implement the core features end to end with realistic seeded data so the app is usable immediately.
4. Keep AI integrations behind a provider interface. Use environment variables for keys and provide a graceful mock mode when a key is absent.
5. Prioritize accessible UX, loading states, secure input handling, and clear setup instructions.
6. Include a README with local setup, environment variables, migration instructions, test commands, and deployment notes.
7. End with a short implementation summary, the file tree, and the next three highest-value follow-ups.

Do not return a high-level mockup only. Generate working code for the MVP.`;

export const createAnalysisPdf = async (opportunity: Opportunity) => {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const margin = 18;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const bottom = pageHeight - 18;
  let y = 22;

  const addPage = () => {
    pdf.addPage();
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, pageWidth, 13, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text('OpportunityAI', margin, 8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(191, 219, 254);
    pdf.text(cleanPdfText(opportunity.projectName), pageWidth - margin, 8, { align: 'right' });
    y = 23;
  };

  const ensureSpace = (height: number) => {
    if (y + height > bottom) addPage();
  };

  const addText = (text: string, size = 10, color: [number, number, number] = [51, 65, 85], gap = 5) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(cleanPdfText(text), contentWidth);
    const height = lines.length * (size * 0.42) + gap;
    ensureSpace(height);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    pdf.text(lines, margin, y);
    y += height;
  };

  const addSection = (title: string) => {
    ensureSpace(14);
    y += 3;
    pdf.setDrawColor(92, 124, 250);
    pdf.setLineWidth(0.8);
    pdf.line(margin, y, margin + 7, y);
    y += 5;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(15, 23, 42);
    pdf.text(cleanPdfText(title), margin, y);
    y += 7;
  };

  const addLabelledText = (label: string, text: string) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    const prefix = `${label}: `;
    const lines = pdf.splitTextToSize(`${prefix}${cleanPdfText(text)}`, contentWidth);
    const height = lines.length * 4.3 + 3;
    ensureSpace(height);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);
    pdf.text(lines, margin, y);
    y += height;
  };

  const addList = (items: string[]) => {
    items.forEach(item => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85);
      const lines = pdf.splitTextToSize(`- ${cleanPdfText(item)}`, contentWidth - 2);
      const height = lines.length * 4.3 + 2;
      ensureSpace(height);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85);
      pdf.text(lines, margin + 2, y);
      y += height;
    });
    y += 2;
  };

  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, pageWidth, 38, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(23);
  pdf.setTextColor(255, 255, 255);
  pdf.text(cleanPdfText(opportunity.projectName), margin, 18);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(191, 219, 254);
  pdf.text('OpportunityAI - Shareable Opportunity Analysis', margin, 26);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Generated ${new Date().toLocaleDateString()}`, margin, 32);
  y = 48;

  addSection('Executive summary');
  addText(opportunity.shortDescription, 11, [30, 41, 59], 6);
  addLabelledText('Elevator pitch', opportunity.elevatorPitch);
  addLabelledText('Overall opportunity score', `${opportunity.scores.overall.toFixed(1)} / 10`);
  addLabelledText('Market', `${opportunity.targetMarket} - ${opportunity.region}`);
  addLabelledText('Business model', opportunity.businessType.join(', '));
  addLabelledText('Revenue potential', opportunity.revenuePotential);

  addSection('Problem and market opportunity');
  addLabelledText('Problem', opportunity.problemDescription);
  addLabelledText('Customer', opportunity.whoExperiencesProblem);
  addLabelledText('Significance', opportunity.problemSignificance);
  addLabelledText('Market gap', opportunity.marketGap);
  addLabelledText('Why now', opportunity.whyNow);

  addSection('AI solution and MVP');
  addLabelledText('AI approach', opportunity.howAISolves);
  addLabelledText('Recommended models', opportunity.recommendedModels.join(', '));
  addLabelledText('Integrations', opportunity.suggestedAPIs.join(', '));
  addText('Core MVP features', 10, [71, 85, 105], 3);
  addList(opportunity.mvp.coreFeatures);
  addText('Key AI workflows', 10, [71, 85, 105], 3);
  addList(opportunity.aiWorkflows);

  addSection('Technical architecture');
  Object.entries(opportunity.mvp.techStack).forEach(([layer, choices]) => addLabelledText(titleCase(layer), choices.join(', ')));
  addLabelledText('Delivery estimate', `${opportunity.developmentEffort.estimatedTime}; ${opportunity.developmentEffort.teamSize}; ${opportunity.developmentEffort.infrastructureCost}`);
  addLabelledText('Required skills', opportunity.developmentEffort.requiredSkills.join(', '));

  addSection('Commercial plan');
  addLabelledText('Pricing strategy', opportunity.monetization.pricingStrategy);
  addLabelledText('Models', opportunity.monetization.models.join(', '));
  opportunity.monetization.examplePricing.forEach(tier => addLabelledText(`${tier.tier} (${tier.price})`, tier.features.join(', ')));
  addText('Differentiation opportunities', 10, [71, 85, 105], 3);
  addList(opportunity.differentiation);

  addSection('Validation plan');
  Object.entries(opportunity.validation).forEach(([method, items]) => {
    addText(titleCase(method), 10, [71, 85, 105], 2);
    addList(items);
  });

  addSection('Scorecard');
  [
    ['Market demand', opportunity.scores.marketDemand],
    ['Revenue potential', opportunity.scores.revenuePotential],
    ['Competition level', opportunity.scores.competitionLevel],
    ['Technical feasibility', opportunity.scores.technicalFeasibility],
    ['AI advantage', opportunity.scores.aiAdvantage],
    ['Speed to MVP', opportunity.scores.speedToMvp],
    ['Customer pain level', opportunity.scores.customerPainLevel],
    ['Scalability', opportunity.scores.scalability],
  ].forEach(([label, score]) => addLabelledText(label as string, `${score}/10`));

  addSection('SWOT analysis');
  ([
    ['Strengths', opportunity.strengths],
    ['Weaknesses', opportunity.weaknesses],
    ['Risks', opportunity.risks],
    ['Opportunities', opportunity.opportunities],
  ] as const).forEach(([title, items]) => {
    addText(title, 10, [71, 85, 105], 2);
    addList(items);
  });

  addSection('Market signals');
  ([
    ['Verified signals', opportunity.marketSignals.verified],
    ['Assumptions to validate', opportunity.marketSignals.assumptions],
    ['Hypotheses to test', opportunity.marketSignals.hypotheses],
  ] as const).forEach(([title, items]) => {
    addText(title, 10, [71, 85, 105], 2);
    addList(items);
  });

  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    pdf.setPage(page);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text('OpportunityAI', margin, pageHeight - 6);
    pdf.text(`Page ${page} of ${pages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  }

  return { pdf, filename: `${safeFilename(opportunity.projectName)}-analysis.pdf` };
};

export const downloadAnalysisPdf = async (opportunity: Opportunity): Promise<void> => {
  const { pdf, filename } = await createAnalysisPdf(opportunity);
  pdf.save(filename);
};
