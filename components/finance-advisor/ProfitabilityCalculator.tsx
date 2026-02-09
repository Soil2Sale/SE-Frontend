import React, { useState } from 'react';
import { calculateProfitability } from './services';

export default function ProfitabilityCalculator(){
  const [price,setPrice] = useState(1800);
  const [qty,setQty] = useState(10);
  const [distance,setDistance] = useState(50);
  const [fuelPerKm,setFuelPerKm] = useState(10);
  const [labor,setLabor] = useState(2000);

  const result = calculateProfitability({
    mandiPricePerQuintal: price,
    quantityQuintal: qty,
    distanceKm: distance,
    fuelCostPerKm: fuelPerKm,
    laborCostTotal: labor,
  });

  return (
    <div style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8}}>
      <h3 style={{margin:'0 0 8px'}}>Profitability Calculator</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label>Price (₹/quintal)<input value={price} onChange={e=>setPrice(Number(e.target.value))} type="number"/></label>
        <label>Quantity (qt)<input value={qty} onChange={e=>setQty(Number(e.target.value))} type="number"/></label>
        <label>Distance (km)<input value={distance} onChange={e=>setDistance(Number(e.target.value))} type="number"/></label>
        <label>Fuel cost/km (₹)<input value={fuelPerKm} onChange={e=>setFuelPerKm(Number(e.target.value))} type="number"/></label>
        <label style={{gridColumn:'1/3'}}>Labor total (₹)<input value={labor} onChange={e=>setLabor(Number(e.target.value))} type="number"/></label>
      </div>
      <div style={{marginTop:12}}>
        <div><strong>Gross:</strong> ₹{result.gross.toFixed(2)}</div>
        <div><strong>Transport:</strong> ₹{result.transport.toFixed(2)}</div>
        <div><strong>Costs:</strong> ₹{result.costs.toFixed(2)}</div>
        <div><strong>Net:</strong> ₹{result.net.toFixed(2)} — {result.profitable ? 'Profitable' : 'Not profitable'}</div>
      </div>
    </div>
  );
}
