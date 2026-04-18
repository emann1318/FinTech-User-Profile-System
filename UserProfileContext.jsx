import React from 'react';

export default function RiskBadge({ riskLevel, size = 'sm' }) {
  const badgeClass = `risk-badge risk-${riskLevel} risk-badge-${size}`;
  
  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk'
  };

  return (
    <span className={badgeClass}>
      {labels[riskLevel] || labels.low}
    </span>
  );
}
