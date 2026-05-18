import React from 'react';
import { Package, AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';

const toneStyles = (tone) => {
  switch (tone) {
    case 'warning':
      return { 
        icon: AlertTriangle, 
        iconColor: '#B45309', // Dark amber
        blob: 'bg-[#FFF7ED]', // Very light orange/amber
        valColor: 'text-[#1E293B]',
      };
    case 'success':
      return { 
        icon: AlertCircle, 
        iconColor: '#16A34A', // Green
        blob: 'bg-[#F0FDF4]', // Very light green
        valColor: 'text-[#1E293B]',
      };
    case 'danger':
      return { 
        icon: AlertCircle, 
        iconColor: '#E11D48', // Red
        blob: 'bg-[#FFF1F2]', // Very light red
        valColor: 'text-[#E11D48]',
      };
    default:
      return { 
        icon: Package, 
        iconColor: '#5949BE', // Purple
        blob: 'bg-[#F5F3FF]', // Very light purple
        valColor: 'text-[#1E293B]',
      };
  }
};

const InventorySummaryCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const style = toneStyles(card.tone);
        const Icon = style.icon;
        
        return (
          <div 
            key={card.id} 
            className="relative overflow-hidden bg-white rounded-[16px] p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-[#F8FAFC] group transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.05)]"
          >
            {/* Background Blob Effect (Smaller size to decrease the arch) */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${style.blob} transition-transform duration-500 group-hover:scale-105`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[14px] font-medium text-[#475569]">{card.title}</span>
                <div 
                  className="w-[52px] h-[52px] rounded-[14px] bg-white/60 backdrop-blur-sm shadow-[0px_2px_12px_rgba(0,0,0,0.06),_inset_0px_1px_1px_rgba(255,255,255,1)] border border-white flex items-center justify-center relative z-10"
                >
                  <Icon size={24} color={style.iconColor} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <h3 className={`text-[32px] font-bold leading-none tracking-tight ${style.valColor}`}>
                  {card.value}
                </h3>
                <div className="flex items-center gap-1">
                  {card.id === 1 && (
                     <TrendingUp size={14} className="text-[#9D174D]" strokeWidth={3} />
                  )}
                  <p className="text-[12px] font-medium text-[#94A3B8]">
                    {card.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventorySummaryCards;
