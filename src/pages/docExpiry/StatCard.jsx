import { ArrowRight } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const StatCard = ({ stat, isActive, onClick }) => {
    const Icon = stat.icon;
    const SvgIcon = stat.svgIcon;

    return (
        <div
            onClick={onClick}
            className={`group flex-1 min-w-[170px] bg-white rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-xs cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] border-2 ${isActive
                ? "border-violet-500 shadow-sm"
                : "border-transparent hover:border-violet-200"
                }`}
        >
            <div className="flex items-center justify-between">
                <span style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="text-[#424656]">
                    {stat.label}
                </span>
                <div
                    className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        padding: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        background: '#F0F0F04D',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
                    }}
                >
                    {SvgIcon ? (
                        <SvgIcon className="w-4 h-4" />
                    ) : Icon ? (
                        <Icon size={16} className={stat.iconColor} />
                    ) : null}
                </div>
            </div>
            <div>
                <p style={{ ...inter, fontWeight: 700, fontSize: "28px", lineHeight: "1.1" }} className={stat.valueColor}>
                    {stat.value}
                </p>
            </div>
            <div className="flex items-center">
                <span style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-[#726C6C] truncate">
                    {stat.sub}
                </span>
            </div>
        </div>
    );
};

export default StatCard;
