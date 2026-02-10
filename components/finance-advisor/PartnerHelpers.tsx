import React from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';

export function NavItem({ icon, label, active = false, href }: any) {
  const content = (
    <div className={`flex items-center gap-4 p-3.5 px-6 rounded-2xl transition-all cursor-pointer ${active ? 'bg-[#4CAF50] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
  
  return href ? <Link href={href}>{content}</Link> : content;
}

export function SchemeCard({ title, desc, badge, variant = 'default' }: any) {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border ${variant === 'urgent' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${variant === 'urgent' ? 'bg-red-500 text-white' : 'bg-[#E2F0D9] text-[#143023]'}`}>
          {badge}
        </span>
        <Info size={14} className="text-gray-300" />
      </div>
      <h5 className={`font-bold text-sm ${variant === 'urgent' ? 'text-red-900' : 'text-[#143023]'}`}>{title}</h5>
      <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{desc}</p>
    </div>
  );
}
