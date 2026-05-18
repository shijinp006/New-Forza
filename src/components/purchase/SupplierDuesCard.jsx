import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function gradientFromSegments(segments, progress = 100) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let start = 0;
  const parts = [];
  
  for (const s of segments) {
    const size = (s.value / total) * 100;
    const end = start + size;
    
    if (start >= progress) break;
    
    const actualEnd = Math.min(end, progress);
    parts.push(`${s.color} ${start}% ${actualEnd}%`);
    start = actualEnd;
  }
  
  if (progress < 100) {
    parts.push(`transparent ${progress}% 100%`);
  }
  
  return `conic-gradient(${parts.join(", ")})`;
}

/**
 * Supplier dues snapshot with conic donut and legend.
 */
export default function SupplierDuesCard({ rows, totalLabel }) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let startTimestamp = null;
    const duration = 1500;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const t = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - t, 3);
      setProgress(easeProgress * 100);
      if (t < 1) window.requestAnimationFrame(step);
    };
    
    window.requestAnimationFrame(step);
  }, [mounted]);

  const handleClick = () => {
    navigate('/dashboard/purchase/supplier-performance');
  };


  return (
    <section 
      onClick={handleClick}
      className="rounded-[14px] border border-[#E3E7EF] bg-white p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-[#1E293B]">Supplier Dues</h3>
        <button 
          className="text-[11px] font-semibold text-[#5A52CD] hover:underline" 
          type="button"
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
        >
          View Full
        </button>
      </div>
      <p className="mt-0.5 text-[10px] font-medium text-[#6B7280]">Top 4 Outstanding Balances</p>

      <div className="mt-4 flex justify-center">
        <div className="relative h-40 w-40 rounded-full" style={{ background: gradientFromSegments(rows, progress) }}>
          <div className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full bg-white">
            <p className="text-[10px] font-medium leading-none text-[#6B7280]">Total Due</p>
            <p className="mt-1 text-[27px] font-bold leading-none text-[#2B313D]">Ð{totalLabel}</p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between text-[12px]">
            <span className="inline-flex items-center gap-2 font-medium text-[#4B5563]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: row.color }} />
              {row.name}
            </span>
            <span className="font-semibold text-[#4B5563]">{row.value}K</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
