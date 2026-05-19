import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const ItemReportFilters = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-[#94A3B8]" strokeWidth={2} />
        </div>
        <input 
          type="text" 
          placeholder="Search by product name, SKU..." 
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-[12px] text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#5949BE] focus:ring-1 focus:ring-[#5949BE] transition-all shadow-[0px_2px_4px_rgba(0,0,0,0.02)]"
        />
      </div>

      <div className="relative w-[200px]">
        <select className="w-full appearance-none bg-[#F1F5F9] border border-transparent px-4 py-3 pr-10 rounded-[12px] text-[14px] font-semibold text-[#475569] outline-none hover:bg-[#E2E8F0] transition-colors cursor-pointer">
          <option>Item Wise</option>
          <option>Category Wise</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown size={16} className="text-[#64748B]" />
        </div>
      </div>

      <div className="relative w-[200px]">
        <select className="w-full appearance-none bg-[#F1F5F9] border border-transparent px-4 py-3 pr-10 rounded-[12px] text-[14px] font-semibold text-[#475569] outline-none hover:bg-[#E2E8F0] transition-colors cursor-pointer">
          <option>All Suppliers</option>
          <option>Supplier A</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown size={16} className="text-[#64748B]" />
        </div>
      </div>
    </div>
  );
};

export default ItemReportFilters;
