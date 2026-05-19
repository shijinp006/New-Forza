import React, { useState, useEffect } from 'react';
import { Hourglass, Zap, BatteryMedium } from 'lucide-react';

const getIcon = (id, color) => {
  switch (id) {
    case 'purchased': return <Hourglass size={20} color={color} />;
    case 'sold': return <Zap size={20} color={color} />;
    case 'stock': return <BatteryMedium size={20} color={color} />;
    default: return <Zap size={20} color={color} />;
  }
};

const ItemPurchaseVsSale = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[320px]  shrink-0">
      <h3 className="text-[16px] font-bold text-[#1E293B] mb-6">Total Purchase vs Sale</h3>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.id} className="bg-[#F8FAFC] flex flex-col rounded-[16px] p-4.25 ">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                {getIcon(item.id, item.color)}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-[#585C62] mb-0.5">{item.title}</p>
                <div className="flex items-baseline gap-1">
                  <h4 className="text-[24px] font-black text-[#2B2F34] leading-none">{item.value}</h4>
                  <span className="text-[12px] font-medium text-[#585C62]">items</span>
                </div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mt-5 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: mounted ? `${item.progress}%` : '0%', 
                  backgroundColor: item.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemPurchaseVsSale;
