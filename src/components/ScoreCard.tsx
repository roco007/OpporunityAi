interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
}

export default function ScoreCard({ label, score, maxScore = 10, color = 'primary' }: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getColorClasses = () => {
    if (score >= 8) return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' };
    if (score >= 6) return { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' };
    if (score >= 4) return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500' };
  };

  const colors = getColorClasses();

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-surface-600">{label}</span>
          <span className={`text-xs font-bold ${colors.text}`}>{score}/10</span>
        </div>
        <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
