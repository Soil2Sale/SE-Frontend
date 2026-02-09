import React, { useState } from 'react';
import { computeDeductions } from './services';

export default function DeductionBreakdown(){
  const [sale,setSale] = useState(50000);
  const [qty,setQty] = useState(20);
  const [moisture,setMoisture] = useState(12);

  const breakdown = computeDeductions({
    saleAmount: sale,
    quantityQuintal: qty,
    moisturePct: moisture,
    moisturePenaltyPerPct: 5,
    platformFeePercent: 2,
    taxPercent: 0,
  });

  return (
    <div style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8}}>
      <h3 style={{margin:'0 0 8px'}}>Deduction Visualization</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label>Sale amount (₹)<input value={sale} onChange={e=>setSale(Number(e.target.value))} type="number"/></label>
        <label>Quantity (qt)<input value={qty} onChange={e=>setQty(Number(e.target.value))} type="number"/></label>
        <label>Moisture %<input value={moisture} onChange={e=>setMoisture(Number(e.target.value))} type="number"/></label>
      </div>
      <div style={{marginTop:12}}>
        <div>Platform fee: ₹{breakdown.platformFee.toFixed(2)}</div>
        <div>Tax: ₹{breakdown.tax.toFixed(2)}</div>
        <div>Moisture penalty: ₹{breakdown.moisturePenalty.toFixed(2)}</div>
        <div style={{fontWeight:700,marginTop:8}}>Total deductions: ₹{breakdown.totalDeductions.toFixed(2)}</div>
        <div style={{color:'#0b6',fontWeight:700}}>Net received: ₹{breakdown.netReceived.toFixed(2)}</div>
      </div>
    </div>
  );
}
