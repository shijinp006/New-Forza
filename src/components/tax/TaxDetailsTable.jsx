import React from "react";
import { ArrowLeft, Landmark } from "lucide-react";
import { useNavigate } from "react-router";
import { taxCategoryDetails } from "../../constants/taxPageData";

export default function TaxDetailsTable({ categoryRow }) {
  const navigate = useNavigate();
  
  if (!categoryRow) return null;
  
  const details = taxCategoryDetails[categoryRow.id] || [];

  return (
    <section className="rounded-[14px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] overflow-hidden">
      
      {/* Header Row (Looks like the clicked row from the main table) */}
      <div className="bg-white border-b border-[#F1F5F9]">
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
          <tbody>
            <tr>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3 text-[13px] font-bold text-[#1E293B]">
                  <Landmark
                    className="h-5 w-5 shrink-0 text-[#5949BE]"
                    strokeWidth={2.5}
                  />
                  <span>{categoryRow.category}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">
                {categoryRow.amount}
              </td>
              <td
                className={[
                  "px-6 py-5 text-[13px] font-bold",
                  categoryRow.taxTone === "positive" ? "text-[#16A34A]" : "text-[#E11D48]",
                ].join(" ")}
              >
                {categoryRow.tax}
              </td>
              <td className="px-6 py-5 text-[14px] font-black text-[#5949BE]">
                {categoryRow.total}
              </td>
              <td className="px-6 py-5 text-right">
                <button
                  onClick={() => navigate("/dashboard/tax")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Details Data Table */}
      <div className="bg-[#F8FAFC] p-4">
        <div className="bg-white rounded-[12px] border border-[#F1F5F9] overflow-x-auto">
          <table className="w-full text-left min-w-[700px] border-collapse">
            <thead className="bg-[#F1F5F9]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">{categoryRow.category} Amount (AED)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Tax (5%) (AED)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Amount (AED)</th>
              </tr>
            </thead>
            <tbody>
              {details.length > 0 ? (
                details.map((row, index) => (
                  <tr key={row.id} className={`border-t border-[#F1F5F9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                    <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{row.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">{row.amount}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{row.tax}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">{row.total}</td>
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

    </section>
  );
}
