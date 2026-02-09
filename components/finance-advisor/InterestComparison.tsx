import React from 'react';
import { InterestRate } from './types';

export default function InterestComparison({ rates, onSelect }: { rates: InterestRate[]; onSelect?: (r: InterestRate) => void }) {
  const sorted = [...rates].sort((a, b) => a.ratePercent - b.ratePercent);
  return (
    <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 8px' }}>Interest Comparison</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
            <th>Institution</th>
            <th>Loan Type</th>
            <th>Rate (%)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sorted.map(r => (
            <tr key={r.institution + r.loanType}>
              <td style={{ padding: '8px 0' }}>{r.institution}</td>
              <td>{r.loanType}</td>
              <td style={{ fontWeight: 600 }}>{r.ratePercent.toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => onSelect?.(r)} style={{ fontSize: 12 }}>Choose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
