import { ReceiptText, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";


function cardIcon(tone) {
  if (tone === "danger") return { Icon: ReceiptText, color: "text-[#B42348]" };
  return { Icon: ShoppingBag, color: "text-[#5A52CD]" };
}

/**
 * Top KPI strip. Kept data-driven for easy copy changes.
 */
export default function PurchaseSummaryCards({ cards }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    if (id === "total-purchase") {
      navigate("/dashboard/sale/revenue-details");
    }
  };


  return (
    <section className="grid grid-cols-1 gap-px rounded-[12px] bg-[#DFE3EB] p-px md:grid-cols-3">
      {cards.map((card) => {
        const { Icon, color } = cardIcon(card.tone);
        const isClickable = card.id === "total-purchase";

        return (
          <article
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`relative bg-white px-4 py-3.5 transition-all duration-300 group ${isClickable ? "cursor-pointer hover:bg-slate-50 hover:shadow-inner" : ""
              }`}
          >
            <p className="text-[13px] font-medium text-[#4B5563]">{card.title}</p>
            <p className="mt-4 text-[42px] font-bold leading-none tracking-[-0.02em] text-[#2B313D]">
              <span className="mr-1">Ð</span>
              {card.value}
            </p>
            <p className="mt-3 text-[12px] font-medium text-[#636B78]">
              <span className="mr-1">↗</span>
              {card.meta}
            </p>
            <span className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#D3D7DE] bg-[#F3F4F6] shadow-[0_4px_10px_rgba(15,23,42,0.08)] transition-transform duration-300 ${isClickable ? "group-hover:scale-110" : ""}`}>
              <Icon className={`h-4 w-4 ${color}`} strokeWidth={2.1} />
            </span>
          </article>
        );
      })}
    </section>
  );
}

