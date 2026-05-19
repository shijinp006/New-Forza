/**
 * Tax category table section.
 * Uses overflow wrapper so it remains usable on smaller widths.
 */

import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Landmark } from "lucide-react";
import { taxCategoryDetails } from "../../constants/taxPageData";

function TaxCategoryTable({ rows }) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRowClick = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  return (
    <section className="rounded-[14px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto rounded-[14px]">
        <table className="min-w-[780px] w-full border-collapse">
          <thead className="bg-[#F5F4FB]">
            <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Amount Ð</th>
              <th className="px-6 py-5">Tax (5%) Ð</th>
              <th className="px-6 py-5">Total Amount (AED)</th>
              <th className="px-6 py-5 text-right" />
            </tr>
          </thead>
          <tbody className="text-[12px] font-medium text-[#0F172A]">
            {rows.map((row) => {
              const isExpanded = expandedRowId === row.id;
              const details = taxCategoryDetails[row.id] || [];

              return (
                <React.Fragment key={row.id}>
                  <tr 
                    onClick={() => handleRowClick(row.id)}
                    className={`border-b border-[#F1F5F9] last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? "bg-slate-50" : ""}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3 text-[13px] font-bold text-[#1E293B]">
                        <Landmark
                          className="h-5 w-5 shrink-0 text-[#5949BE]"
                          strokeWidth={2.5}
                        />
                        <span>{row.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">
                      {row.amount}
                    </td>
                    <td
                      className={[
                        "px-6 py-5 text-[13px] font-bold",
                        row.taxTone === "positive" ? "text-[#16A34A]" : "text-[#E11D48]",
                      ].join(" ")}
                    >
                      {row.tax}
                    </td>
                    <td className="px-6 py-5 text-[14px] font-black text-[#5949BE]">
                      {row.total}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div
                        className="inline-flex h-8 w-8 items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-full transition-colors"
                      >
                        {isExpanded ? (
                          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
                        ) : (
                          <ArrowRight className="h-5 w-5" strokeWidth={2} />
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="bg-[#F8FAFC] p-0 m-0 border-0">
                    <td colSpan={5} className="p-0 border-0">
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-4 border-b border-[#F1F5F9]">
                            <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
                              <div className="max-h-[300px] overflow-y-auto">
                                <table className="w-full text-left min-w-[700px] border-collapse relative">
                                  <thead className="bg-[#F1F5F9] sticky top-0 z-10 shadow-sm">
                                    <tr>
                                      <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
                                      <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">{row.category} Amount (AED)</th>
                                      <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Tax (5%) (AED)</th>
                                      <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Amount (AED)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {details.length > 0 ? (
                                      details.map((detailRow, index) => (
                                        <tr key={detailRow.id} className={`border-t border-[#F1F5F9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                                          <td className="px-6 py-4 text-[13px] font-medium text-[#64748B] whitespace-nowrap">{detailRow.date}</td>
                                          <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B] whitespace-nowrap">{detailRow.amount}</td>
                                          <td className="px-6 py-4 text-[13px] font-medium text-[#64748B] whitespace-nowrap">{detailRow.tax}</td>
                                          <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B] whitespace-nowrap">{detailRow.total}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-[13px] font-medium text-[#94A3B8]">
                                          No details found for this category.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaxCategoryTable;
