import React, { useState } from 'react';
import { suggestSubsidies } from './services';

export default function SubsidyNotifier(){
  const [state,setState] = useState('Karnataka');
  const [land,setLand] = useState(1);
  const list = suggestSubsidies(state, land);

  return (
    <div style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8}}>
      <h3 style={{margin:'0 0 8px'}}>Subsidy Awareness</h3>
      <div style={{display:'flex',gap:8}}>
        <select value={state} onChange={e=>setState(e.target.value)}>
          <option>Karnataka</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
          <option>Punjab</option>
          <option>Haryana</option>
          <option>Uttar Pradesh</option>
        </select>
        <input type="number" value={land} onChange={e=>setLand(Number(e.target.value))} style={{width:120}}/>
      </div>
      <div style={{marginTop:12}}>
        {list.length === 0 ? (
          <div style={{color:'#666'}}>No matching subsidies for the selected state and land size.</div>
        ) : (
          <ul>
            {list.map(s=> (
              <li key={s.id}><strong>{s.name}</strong> — {s.description}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
