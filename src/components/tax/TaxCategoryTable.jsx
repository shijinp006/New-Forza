/**
 * Tax category table section.
 * Uses overflow wrapper so it remains usable on smaller widths.
 */

import { ArrowRight, Landmark } from "lucide-react";
import { useNavigate } from "react-router";

function taxColorClass(tone) {
  if (tone === "positive") return "text-[#16B78F]";
  return "text-[#A24373]";
}

export default function TaxCategoryTable({ rows }) {
  const navigate = useNavigate();

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
            {rows.map((row) => (
              <tr 
                key={row.id} 
                onClick={() => navigate(`/dashboard/tax/${row.id}`)}
                className="border-b border-[#F1F5F9] last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors"
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
                    className="inline-flex h-8 w-8 items-center justify-center text-[#64748B]"
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

