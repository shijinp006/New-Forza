/**
 * Top tax KPI cards (Output / Input / Total Payable).
 * Driven by constants so API replacement is straightforward.
 */

import { Landmark, Percent, ReceiptText } from "lucide-react";

function cardTone(tone) {
  if (tone === "input") {
    return {
      border: "border-[#8BD9D1]",
      title: "text-[#475569]",
      amount: "text-[#2B313D]",
      iconWrap: "text-[#A12D66]",
      tint: "bg-[#DFF7F3]",
      icon: Percent,
    };
  }
  if (tone === "payable") {
    return {
      border: "border-[#CFC4F5]",
      title: "text-[#6356A7] uppercase tracking-[0.08em]",
      amount: "text-[#5C4AC4]",
      iconWrap: "text-[#5C4AC4]",
      tint: "bg-[#EEEAFE]",
      icon: Landmark,
    };
  }
  return {
    border: "border-[#E7B0BF]",
    title: "text-[#475569]",
    amount: "text-[#2B313D]",
    iconWrap: "text-[#6B7280]",
    tint: "bg-[#FBE7EC]",
    icon: ReceiptText,
  };
}

function TaxSummaryCards({ cards }) {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {cards.map((card) => {
        const tone = cardTone(card.tone);
        const Icon = tone.icon;
        return (
          <article
            key={card.id}
            className={[
              "relative overflow-hidden rounded-[14px] border bg-white p-6",
              tone.border,
            ].join(" ")}
          >
            <div
              className={`absolute -right-12 -top-14 h-[150px] w-[150px] rounded-full ${tone.tint} opacity-55`}
            />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-[13px] font-medium ${tone.title}`}>
                  {card.title}
                </p>
                <p
                  className={`mt-2 text-[40px] font-bold leading-none tracking-[-0.02em] ${tone.amount}`}
                >
                  <span className="mr-2 text-[40px] align-middle">
                    {card.currency}
                  </span>
                  <span className="align-middle">{card.amount}</span>
                </p>
              </div>
              <span
                className={[
                  "relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-[9px]",
                  "border border-[#D1D5DB] bg-[#F3F4F6] shadow-[0_4px_10px_rgba(15,23,42,0.08)]",
                  tone.iconWrap,
                ].join(" ")}
                aria-hidden
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default TaxSummaryCards;
