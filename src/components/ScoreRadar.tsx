import { OpportunityScore } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';

interface ScoreRadarProps {
  scores: OpportunityScore;
  size?: number;
}

export default function ScoreRadar({ scores, size = 300 }: ScoreRadarProps) {
  const data = [
    { subject: 'Market Demand', value: scores.marketDemand, fullMark: 10 },
    { subject: 'Revenue', value: scores.revenuePotential, fullMark: 10 },
    { subject: 'Competition', value: scores.competitionLevel, fullMark: 10 },
    { subject: 'Feasibility', value: scores.technicalFeasibility, fullMark: 10 },
    { subject: 'AI Advantage', value: scores.aiAdvantage, fullMark: 10 },
    { subject: 'Speed to MVP', value: scores.speedToMvp, fullMark: 10 },
    { subject: 'Pain Level', value: scores.customerPainLevel, fullMark: 10 },
    { subject: 'Scalability', value: scores.scalability, fullMark: 10 },
  ];

  return (
    <ResponsiveContainer width="100%" height={size}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#64748b', fontSize: 11 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 10]} 
          tick={{ fill: '#94a3b8', fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#4c6ef5"
          fill="#4c6ef5"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
