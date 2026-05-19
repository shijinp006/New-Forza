import React, { useMemo, useState } from "react";
import AedIcon from "../../utils/custom icons/AedIcon";

const PAGE_SIZE = 6;
const tabs = ["recent", "amount", "incentive"];

/**
 * CustomerSalesTable Component
 * Replicated from RecentSupplierTable to ensure consistent design and functionality.
 */
export default function CustomerSalesTable({ rowsByTab }) {
  const [activeTab, setActiveTab] = useState("recent");
  const [page, setPage] = useState(1);

  const rows = rowsByTab[activeTab] ?? [];
  const totalPages = Math.max(Math.ceil(rows.length / PAGE_SIZE), 1);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [page, rows]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const formatMoney = (value) => (
  <span className="flex items-center gap-1 text-[#585C62]">
    <AedIcon size={12} color="#0F172A" />
    {Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}
  </span>
);
  const formatPlain = (value) =>
    Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <section className="rounded-[8px] border border-[#E3E7EF] bg-white p-5.5 shadow-[0px_8px_24px_-4px_#2B2F340A]">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[18px] font-bold font-manrope text-[#2B2F34]">
            Customer Sales Performance
          </h3>
          <p className="mt-1 text-[12px] font-inter text-[#585C62]">
            Top 5 accounts by transaction volume
          </p>
        </div>
        <div className="inline-flex rounded-[10px] bg-[#00000014] p-1 text-[10px] font-bold text-[#94A3B8]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchTab(tab)}
              className={`rounded-[8px] px-4 py-1.5 capitalize transition-all ${activeTab === tab ? "bg-white text-[#5949BE] shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.12)]" : "hover:text-[#64748B]"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse">
          <thead className="bg-[#EFEDF8] text-left text-[14px] font-medium font-inter uppercase tracking-[0.06px] text-[#585C62]">
            <tr>
              <th className="px-6 py-4 rounded-l-lg">Customer Name</th>
              <th className="px-6 py-4">Inv Count</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Paid</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4 rounded-r-lg text-center">
                Pending Invoice
              </th>
            </tr>
          </thead>
          <tbody className="text-[13px] font-normal text-[#1E293B] divide-y divide-[#F1F5F9]">
            {paginatedRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-[18px] text-[#2B2F34] uppercase font-medium text-[14px] font-inter ">{row.customer}</td>
                <td className="px-6 py-[18px] font-inter uppercase text-[14px] text-[#585C62] ">
                  {row.invCount}
                </td>
                <td className="px-6 py-[18px] font-inter font-medium text-[14px] text-[#0F172A]">
                  {formatMoney(row.amount)}
                </td>
                <td className="px-6 py-[18px] text-[14px] font-inter font-medium text-[#15B097]">
                  {formatPlain(row.paid)}
                </td>
                <td className="px-6 py-[18px] text-[14px] font-inter font-medium text-[#585C62]">
                  {formatPlain(row.balance)}
                </td>
                <td className="px-6 py-[18px] text-center font-inter font-medium text-[14px] text-[#585C62]">
                  {row.pendingInvoice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-8 flex items-center justify-between text-[13px] font-bold text-[#94A3B8]">
        <p>
          Showing{" "}
          <span className="text-[#0F172A]">
            {(page - 1) * PAGE_SIZE + 1}-
            {Math.min(page * PAGE_SIZE, rows.length)}
          </span>{" "}
          of <span className="text-[#0F172A]">{rows.length}</span>
        </p>
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2 hover:bg-gray-50 transition-all disabled:opacity-40"
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="flex items-center gap-1.5 px-2">
            <span className="text-[#0F172A]">{page}</span>
            <span className="text-[#E2E8F0]">/</span>
            <span>{totalPages}</span>
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2 hover:bg-gray-50 transition-all disabled:opacity-40"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </footer>
    </section>
  );
}
