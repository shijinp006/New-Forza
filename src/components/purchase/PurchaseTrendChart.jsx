import React, { useState, useEffect } from 'react';

/**
 * Custom grouped-bar chart for monthly purchase trend.
 * Uses pure divs for easy visual edits without chart lib constraints.
 */
export default function PurchaseTrendChart({ rows }) {
  const max = 150;
  const ticks = [0, 50, 100, 150];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="rounded-[14px] border border-[#E3E7EF] bg-white p-4">
      <h3 className="text-[14px] font-semibold text-[#1E293B]">Monthly Purchase Trend</h3>
      <p className="mt-0.5 text-[10px] font-medium text-[#6B7280]">Jan 2024 - Dec 2024</p>

      <div className="mt-4 grid grid-cols-[36px_1fr] gap-3">
        <div className="flex h-[216px] flex-col justify-between text-[10px] font-medium text-[#7B8392]">
          {ticks.toReversed().map((tick) => (
            <span key={tick}>Ð{tick}K</span>
          ))}
        </div>

        <div className="relative h-[216px]">
          <div className="absolute inset-0 flex flex-col justify-between">
            {ticks.toReversed().map((tick) => (
              <div key={tick} className="h-px w-full bg-[#EEF2F7]" />
            ))}
          </div>

          <div className="relative z-10 flex h-full items-end justify-between gap-1">
            {rows.map((row) => (
              <div key={row.day} className="flex min-w-[44px] flex-1 flex-col items-center gap-2">
                <div className="relative flex h-[188px] w-full items-end justify-center">
                  <div className="flex w-[42px] flex-col justify-end">
                    <div
                      className="rounded-t-[2px] bg-[#CCC7DD] transition-all duration-1000 ease-out"
                      style={{ height: mounted ? `${(row.credit / max) * 188}px` : '0px' }}
                    />
                    <div
                      className="rounded-t-[2px] bg-[#DC575F] transition-all duration-1000 ease-out"
                      style={{ height: mounted ? `${(row.cash / max) * 188}px` : '0px' }}
                    />
                  </div>
                  {row.tag ? (
                    <span className={`absolute -top-2 rounded-[4px] bg-[#111827] px-1.5 py-0.5 text-[9px] font-semibold text-white transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                      {row.tag}
                    </span>
                  ) : null}
                </div>
                <p className="text-[10px] font-medium text-[#7B8392]">{row.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-[11px] font-medium text-[#4B5563]">
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-[2px] bg-[#DC575F]" />
          Cash
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-[2px] bg-[#CCC7DD]" />
          Credit
        </span>
      </div>
    </section>
  );
}
