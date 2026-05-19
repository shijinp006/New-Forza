import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { pdcChequesData } from '../../constants/dashboardData';

/**
 * PdcCheques Component
 * Renders the PDC Cheques management section.
 */
const PdcCheques = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex-1 min-w-[300px] lg:min-w-[450px]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#081021]">PDC Cheques</h3>
            <p className="text-sm text-[#8E8E8E]">Post-dated cheques management</p>
          </div>
          <div className="p-1.5 bg-[#FFEDF1] rounded-full">
            <Star size={14} className="text-[#FF5C8D] fill-[#FF5C8D]" />
          </div>
        </div>
        <button className="text-[#5949BE] text-xs font-semibold flex items-center gap-1 hover:underline">
          View all <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Receivables Card */}
        <div className="bg-[#FDFDFD] border border-[#F1F5F9] rounded-2xl p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-md">
          <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Receivables</span>
          <p className="text-[24px] font-extrabold text-[#10B981] mt-1.5 leading-none">AED {pdcChequesData.receivables}</p>
        </div>
        
        {/* Payables Card */}
        <div className="bg-[#FDFDFD] border border-[#F1F5F9] rounded-2xl p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-md">
          <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Payables</span>
          <p className="text-[24px] font-extrabold text-[#EF4444] mt-1.5 leading-none">AED {pdcChequesData.payables}</p>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F1F5F9]">
              <th className="pb-3 text-[10px] font-bold text-[#94A3B8] uppercase">Party Name</th>
              <th className="pb-3 text-[10px] font-bold text-[#94A3B8] uppercase">Date</th>
              <th className="pb-3 text-[10px] font-bold text-[#94A3B8] uppercase">Amount</th>
              <th className="pb-3 text-[10px] font-bold text-[#94A3B8] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {pdcChequesData.cheques.map((cheque, index) => (
              <tr key={index} className="group border-b border-[#F8FAFC] last:border-0 hover:bg-[#F9FAFB] transition-colors">
                <td className="py-4 text-[14px] font-bold text-[#1E293B]">{cheque.partyName}</td>
                <td className="py-4 text-[13px] font-medium text-[#64748B]">{cheque.date}</td>
                <td className="py-4 text-[14px] font-extrabold text-[#0F172A]">
                   <span className="text-[11px] font-bold text-[#94A3B8] mr-1">AED</span>
                   {cheque.amount}
                </td>
                <td className="py-4">
                  <span className="px-3 py-1.5 bg-[#FFF1F2] text-[#E11D48] text-[10px] font-extrabold rounded-full tracking-wider">
                    {cheque.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PdcCheques;
