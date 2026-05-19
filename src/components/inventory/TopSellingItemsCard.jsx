import React, { useEffect, useMemo, useState } from 'react';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import { fastMovingItems, slowMovingItems } from '../../constants/inventoryChartData';
import { useNavigate } from 'react-router';

const TopSellingItemsCard = ({ className = "" }) => {
  const [mode, setMode] = useState('fast');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const rows = mode === 'fast' ? fastMovingItems : slowMovingItems;
  
  const maxUnits = useMemo(() => Math.max(...rows.map(item => item.units)), [rows]);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, [mode]);

  return (
    <section className={`bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] ${className}`}>
      <header className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[16px] font-bold text-[#1E293B]">Top Selling Items</h3>
          <p className="text-[12px] font-medium text-[#94A3B8] mt-1">Based on selected date</p>
        </div>
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
          <button 
            onClick={() => setMode('fast')}
            className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${mode === 'fast' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'}`}
          >
            Fast Moving
          </button>
          <button 
            onClick={() => setMode('slow')}
            className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${mode === 'slow' ? 'bg-white text-[#1E293B] shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'}`}
          >
            Slow Moving
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input 
            type="text" 
            placeholder="Search by product name, SKU..." 
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[13px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#5949BE]/20 transition-all"
          />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#64748B] hover:bg-slate-50 transition-all">
          All Suppliers <ChevronDown size={16} />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#64748B] hover:bg-slate-50 transition-all">
          All Categories <ChevronDown size={16} />
        </button>

        <button 
          onClick={() => navigate('/dashboard/inventory/item-report')}
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#5949BE] hover:underline transition-all"
        >
          Item Report <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {rows.map((row) => (
          <div key={row.id} className="group">
            <div className="flex justify-between items-end mb-2">
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-[#1E293B] group-hover:text-[#5949BE] transition-colors">{row.name}</p>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5">SKU: {row.sku}</p>
              </div>
              <div className="flex items-baseline gap-6 text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-[15px] font-black text-[#1E293B]">{row.units}</span>
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase">units</span>
                </div>
                <div className="w-24">
                   <span className="text-[14px] font-bold text-[#94A3B8] mr-1">Ð</span>
                   <span className="text-[15px] font-black text-[#1E293B]">{row.amount}</span>
                </div>
              </div>
            </div>
            <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5949BE] rounded-full transition-all duration-1000 ease-out"
                style={{ width: mounted ? `${(row.units / maxUnits) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingItemsCard;
