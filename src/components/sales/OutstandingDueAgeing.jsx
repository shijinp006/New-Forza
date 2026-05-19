import React, { useState, useEffect } from 'react';
import { outstandingDueAgeingData } from '../../constants/salesData';

/**
 * OutstandingDueAgeing Component
 * Re-aligned to match the image exactly: [Label] [Progress Bar] [Amount]
 */
const OutstandingDueAgeing = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-[12px] p-5.5 shadow-[0px_12px_32px_-4px_#2B2F340F] w-full xl:w-[320px] border border-[#F1F5F9] flex flex-col h-full">
      <h3 className="text-[15px] font-bold text-[#1E293B] mb-8">Outstanding Due Ageing</h3>

      <div className="flex flex-col gap-2.75">
        {outstandingDueAgeingData.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[80px_1fr_60px] items-center gap-4">
            {/* Label */}
            <span className={`text-[12px] font-bold ${index === 2 ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
              {item.label}
            </span>
            
            {/* Progress Bar Container */}
            <div className="h-3 w-full bg-[#F1F5F9] rounded-full overflow-hidden shadow-inner relative">
               <div 
                 className="absolute top-0 left-0 h-full rounded-full transition-all duration-1500 ease-out delay-300 shadow-sm"
                 style={{ 
                   width: mounted ? `${item.percentage}%` : '0%', 
                   backgroundColor: item.color,
                 }}
               />
            </div>
            
            {/* Amount */}
            <span className={`text-[12px] font-inter font-semibold text-right ${index === 2 ? 'text-[#EF4444]' : 'text-[#0F172A]'}`}>
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutstandingDueAgeing;
