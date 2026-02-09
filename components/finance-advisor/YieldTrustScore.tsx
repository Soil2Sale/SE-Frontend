import React from 'react';
import { YieldRecord } from './types';
import { computeYieldTrustScore } from './services';

export default function YieldTrustScore({ records }:{records: YieldRecord[]}){
  const { score, reason } = computeYieldTrustScore(records);
  return (
    <div style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8}}>
      <h3 style={{margin:'0 0 8px'}}>Yield Trust Score</h3>
      <div style={{fontSize:20,fontWeight:700}}>{score}/100</div>
      <div style={{fontSize:12,color:'#666'}}>{reason}</div>
      <small style={{display:'block',marginTop:8,color:'#444'}}>A higher score helps negotiate lower interest rates.</small>
    </div>
  );
}
