'use client';
import React, { useEffect, useState } from 'react';
import InterestComparison from './InterestComparison';
import ProfitabilityCalculator from './ProfitabilityCalculator';
import DeductionBreakdown from './DeductionBreakdown';
import YieldTrustScore from './YieldTrustScore';
import SubsidyNotifier from './SubsidyNotifier';
import { fetchInterestRates, compareInterestRates, autoRouteDebtPayment } from './services';
import { InterestRate, YieldRecord, DebtAccount } from './types';

export default function FinanceAdvisor(){
  const [rates,setRates] = useState<InterestRate[]>([]);
  const [selectedRate,setSelectedRate] = useState<InterestRate|undefined>(undefined);
  const [yields] = useState<YieldRecord[]>([
    { year: 2021, crop: 'Wheat', yieldKgPerAcre: 2000 },
    { year: 2022, crop: 'Wheat', yieldKgPerAcre: 2100 },
    { year: 2023, crop: 'Wheat', yieldKgPerAcre: 2050 },
  ]);
  const [debts,setDebts] = useState<DebtAccount[]>([
    { id: 'd1', type: 'BNPL', balance: 12000 },
    { id: 'd2', type: 'KCC', balance: 45000 },
  ]);

  useEffect(()=>{
    fetchInterestRates().then(r=>setRates(r));
  },[]);

  const cheapest = compareInterestRates(rates);

  function handleSelectRate(r: InterestRate){
    setSelectedRate(r);
  }

  function handleAutoRoute(saleAmount:number){
    const { updatedDebts, routed } = autoRouteDebtPayment(saleAmount, debts);
    setDebts(updatedDebts);
    alert(`Routed ₹${routed.toFixed(2)} to debts automatically.`);
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16,alignItems:'start'}}>
      <div>
        <h2>Finance Advisor</h2>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <InterestComparison rates={cheapest} onSelect={handleSelectRate} />
          <YieldTrustScore records={yields} />
        </div>

        <div style={{height:12}} />

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <ProfitabilityCalculator />
          <DeductionBreakdown />
        </div>

        <div style={{marginTop:12}}>
          <h4>Auto Debt Settlement</h4>
          <p style={{marginTop:0,color:'#666'}}>When a sale arrives, the advisor routes 20% to outstanding debts.</p>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>handleAutoRoute(50000)}>Route 20% of ₹50,000 sale</button>
            <button onClick={()=>handleAutoRoute(12000)}>Route 20% of ₹12,000 sale</button>
          </div>
          <div style={{marginTop:8}}>
            <strong>Debts</strong>
            <ul>
              {debts.map(d=> <li key={d.id}>{d.type} — ₹{d.balance.toFixed(2)}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <aside style={{position:'sticky',top:20}}>
        <div style={{display:'grid',gap:12}}>
          <div style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8}}>
            <h4 style={{margin:'0 0 8px'}}>Selected Offer</h4>
            {selectedRate ? (
              <div>
                <div style={{fontWeight:700}}>{selectedRate.institution}</div>
                <div>{selectedRate.loanType} — {selectedRate.ratePercent}%</div>
              </div>
            ) : (
              <div style={{color:'#666'}}>Choose a loan offer from the list.</div>
            )}
          </div>

          <SubsidyNotifier />
        </div>
      </aside>
    </div>
  );
}
