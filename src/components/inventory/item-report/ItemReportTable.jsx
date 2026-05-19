import React from 'react';
import { ArrowRight } from 'lucide-react';

const ItemReportTable = ({ data }) => {
  return (
    <div className="bg-[#F8FAFC] rounded-[16px] overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Barcode / Sku</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-center">Qty In</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-center">Qty Out</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-center">Balance</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider text-right">Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className={`border-t border-[#F1F5F9] bg-white ${index % 2 === 0 ? '' : 'bg-[#FAFAFA]'}`}>
                <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{row.date}</td>
                <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">{row.itemName}</td>
                <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{row.sku}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#F1F5F9] text-[12px] font-semibold text-[#475569]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5949BE]"></div>
                    {row.type}
                  </span>
                </td>
                <td className={`px-6 py-4 text-[13px] font-bold text-center ${row.qtyIn ? 'text-[#E11D48]' : 'text-[#94A3B8]'}`}>
                  {row.qtyIn || '-'}
                </td>
                <td className={`px-6 py-4 text-[13px] font-bold text-center ${row.qtyOut ? 'text-[#E11D48]' : 'text-[#94A3B8]'}`}>
                  {row.qtyOut || '-'}
                </td>
                <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B] text-center">{row.balance}</td>
                <td className="px-6 py-4 text-[13px] font-medium text-[#64748B] text-right">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-[#F1F5F9] flex items-center justify-between bg-white">
        <span className="text-[13px] font-medium text-[#64748B]">Showing 1 to {data.length} of 245 entries</span>
        <button className="flex items-center gap-2 text-[13px] font-bold text-[#5949BE] hover:text-[#4F46E5] transition-colors">
          View Full Stock Card Details
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ItemReportTable;
