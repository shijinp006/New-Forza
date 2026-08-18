import { useEffect, useState } from "react";
import { barData, collectionDistribution, cashiers, getTypeColor } from "../../constants/posData";
import DIcon from "../../assets/D.svg?react";
import { MoreHorizontal } from "lucide-react";

const poppins = { fontFamily: "Poppins, sans-serif" };
const inter = { fontFamily: "Inter, sans-serif" };

// Design-spec constants (from Figma reference)
const COL_W = 46;           // px – each bar column width
const COL_H = 281;          // px – each bar column height
const PAD_TOP = 20;         // px – top padding inside column
const PAD_X = 4;            // px – left/right padding inside column
const FILL_AREA = COL_H - PAD_TOP - 6; // 255px usable fill area
const MAX_VAL = 5000;
const Y_TICKS = [5000, 4000, 3000, 2000, 1000, 0];
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    const gap = (endAngle - startAngle > 3) ? 2 : 0;
    const sAngle = startAngle + gap / 2;
    const eAngle = endAngle - gap / 2;

    const start = polarToCartesian(x, y, radius, eAngle);
    const end = polarToCartesian(x, y, radius, sAngle);

    const largeArcFlag = (eAngle - sAngle) <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

export function CounterPerformanceChart({ activeCounter, onSelectCounter, viewType }) {
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [tooltipPos, setTooltipPos] = useState(null);
    const [hoveredBar, setHoveredBar] = useState(null);
    const [barTooltipPos, setBarTooltipPos] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [animProgress, setAnimProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, [activeCounter, viewType]);

    useEffect(() => {
        if (!mounted) return;
        let startTimestamp = null;
        const duration = 1200;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setAnimProgress(easeProgress);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [mounted]);
    let calculatedTotal = 0;

    if (!activeCounter || activeCounter === "All Counters") {
        calculatedTotal = cashiers.reduce((acc, c) => {
            const num = parseFloat(String(c.sales).replace(/[^0-9.]/g, "")) || 0;
            return acc + num;
        }, 0);
    } else {
        const normalizedActive = activeCounter.replace(/\s+/g, "").toUpperCase();
        const match = cashiers.find((c) => c.counter.replace(/\s+/g, "").toUpperCase() === normalizedActive)
            || barData.find((b) => b.id.replace(/\s+/g, "").toUpperCase() === normalizedActive || b.label.replace(/\s+/g, "").toUpperCase() === normalizedActive);

        if (match) {
            calculatedTotal = parseFloat(String(match.sales || match.amount).replace(/[^0-9.]/g, "")) || 0;
        }
    }

    const totalCollectedFormatted = calculatedTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const displayBarData = barData.map((bar) => {
        if (viewType === "QTY") {
            const cashierItem = cashiers.find((c) => c.counter === bar.label);
            const qtyVal = cashierItem ? parseInt(cashierItem.qty) || 0 : 0;
            const height = Math.round((qtyVal / 200) * 100);
            return { ...bar, height };
        }
        return bar;
    });

    const displayLabel = hoveredSlice
        ? `${hoveredSlice.type} (${hoveredSlice.percentage}%)`
        : "Total Collected";

    const displayAmount = hoveredSlice
        ? (calculatedTotal * (hoveredSlice.percentage / 100)).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        : totalCollectedFormatted;

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-sm flex flex-col justify-between relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 style={{ ...poppins, fontWeight: 700 }} className="text-slate-900 text-[13px] sm:text-base md:text-lg tracking-tight">
                    All Counter Performance Overview
                </h2>
                <button className="text-slate-400 hover:text-slate-600 transition cursor-pointer p-1 shrink-0">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Flex content: Bar Chart + Donut Chart — stacked on mobile/tablet, row on desktop */}
            <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-between gap-6 pt-2 ">

                {/* ── BAR CHART ── */}
                <div className="flex-1 w-full flex items-start gap-3 overflow-x-auto min-w-0 lg:mt-6" style={{ scrollbarWidth: "none" }}>

                    {/* Y-axis labels — starts from top, spans full column height */}
                    <div
                        style={{
                            height: `${COL_H}px`,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            ...inter,
                            fontSize: "10px",
                            fontWeight: 500,
                            color: "#A0AEC0",
                            userSelect: "none",
                            paddingRight: "6px",
                            flexShrink: 0,
                            lineHeight: 1,
                        }}
                    >
                        {Y_TICKS.map((t) => (
                            <span key={t} className="text-[#585C6299]">{t}</span>
                        ))}
                    </div>

                    {/* Bar columns + horizontal grid lines wrapper */}
                    <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>

                        {/* Horizontal dashed grid lines — span full column height */}
                        {Y_TICKS.map((t) => {
                            // Position matches Y-axis labels: 5000 at top (0px), 0 at bottom (COL_H)
                            const topPx = (1 - t / MAX_VAL) * COL_H;
                            return (
                                <div
                                    key={t}
                                    style={{
                                        position: "absolute",
                                        top: `${topPx}px`,
                                        left: 0,
                                        right: 0,
                                        borderTop: "1px dashed rgba(226, 232, 240, 0.8)",
                                        zIndex: 0,
                                        pointerEvents: "none",
                                    }}
                                />
                            );
                        })}

                        {/* Bar columns row — 14px gap on mobile so bars never squish, justify-between on desktop */}
                        <div
                            style={{ display: "flex", position: "relative", zIndex: 1 }}
                            className="gap-3.5 sm:gap-4 lg:gap-0 lg:justify-between w-max lg:w-full min-w-max lg:min-w-0"
                        >
                            {displayBarData.map((bar) => {
                                const fillH = Math.round((bar.height / 100) * FILL_AREA * animProgress);

                                return (
                                    <div
                                        key={bar.id}
                                        onClick={() => onSelectCounter && onSelectCounter(bar.id)}
                                        onMouseEnter={(e) => {
                                            setHoveredBar(bar);
                                            setBarTooltipPos({ x: e.clientX, y: e.clientY });
                                        }}
                                        onMouseMove={(e) => {
                                            setHoveredBar(bar);
                                            setBarTooltipPos({ x: e.clientX, y: e.clientY });
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredBar(null);
                                            setBarTooltipPos(null);
                                        }}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                                        className="group cursor-pointer"
                                    >
                                        {/* ── Column track (matching uploaded image effect) ── */}
                                        <div
                                            style={{
                                                width: `${COL_W}px`,
                                                height: `${COL_H}px`,
                                                paddingTop: `${PAD_TOP}px`,
                                                paddingLeft: "4px",
                                                borderRadius: "8px",
                                                paddingRight: "2px",
                                                paddingBottom: "2px",
                                                border: "1px solid #E2E0EE",
                                                backgroundColor: "#EDE8EE",
                                                boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.05)",
                                                position: "relative",
                                                overflow: "hidden",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {fillH > 0 && (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: `${fillH}px`,
                                                        borderRadius: "8px",
                                                        background: "linear-gradient(180deg, #6F57DE 0%, #573DD4 100%)",
                                                        boxShadow: "inset 4px 3px 4px rgba(255, 255, 255, 0.95), 0px 2px 10px rgba(111, 87, 222, 0.4)",
                                                        border: "1.5px solid rgba(255, 255, 255, 0.85)",
                                                        transition: "height 0.5s ease",
                                                        position: "relative",
                                                        zIndex: 2,
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* Dot + label */}
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                                            <span
                                                style={{
                                                    width: "7px",
                                                    height: "7px",
                                                    borderRadius: "50%",
                                                    display: "inline-block",
                                                    backgroundColor: bar.height > 0 ? "#6655D8" : "transparent",
                                                    border: bar.height > 0 ? "none" : "2px solid #CBD5E1",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    ...inter,
                                                    fontWeight: 600,
                                                    fontSize: "11px",
                                                    color: bar.height > 0 ? "#64748B" : "#CBD5E1",
                                                }}
                                            >
                                                {bar.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── COLLECTION DISTRIBUTION DONUT ── */}
                <div className="w-full sm:w-[330px]  min-h-[350px] bg-white border border-[#E0E3E5] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 flex flex-col items-center justify-between shrink-0">
                    <h3 style={{ ...poppins, fontWeight: 700, fontSize: "14px" }} className="text-slate-900 self-center sm:self-start text-center sm:text-left mb-2">
                        Collection Distribution
                    </h3>

                    {/* Donut SVG */}
                    <div className="relative w-full h-56 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                            <defs>
                                <filter id="donut3d-shadow-chart" x="-30%" y="-30%" width="160%" height="160%">
                                    <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.22" />
                                </filter>
                            </defs>

                            {/* Track Circle */}
                            <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" />

                            {/* Precise Interactive SVG Donut Path Arcs */}
                            {(() => {
                                let accumAngle = 0;
                                return collectionDistribution.map((item) => {
                                    const p = Number(item.percentage) || 0;
                                    const color = item.color || getTypeColor(item.type, p);
                                    const isHovered = hoveredSlice?.type === item.type;
                                    const angle = (p / 100) * 360 * animProgress;
                                    const startAngle = accumAngle;
                                    const endAngle = accumAngle + angle;
                                    accumAngle += angle;

                                    const pathData = describeArc(50, 50, 38, startAngle, endAngle);

                                    return (
                                        <g key={item.type}>
                                            {/* Wide Invisible Hit Target for 100% Hover Accuracy */}
                                            <path
                                                d={pathData}
                                                stroke="transparent"
                                                strokeWidth="28"
                                                fill="none"
                                                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                                                onMouseEnter={(e) => {
                                                    setHoveredSlice(item);
                                                    setTooltipPos({ x: e.clientX, y: e.clientY });
                                                }}
                                                onMouseMove={(e) => {
                                                    setHoveredSlice(item);
                                                    setTooltipPos({ x: e.clientX, y: e.clientY });
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredSlice(null);
                                                    setTooltipPos(null);
                                                }}
                                            />
                                            {/* Visual Donut Arc */}
                                            <path
                                                d={pathData}
                                                stroke={color}
                                                strokeWidth={12.5}
                                                fill="none"
                                                style={{
                                                    pointerEvents: "none",
                                                    transition: "opacity 0.2s ease, stroke-width 0.25s ease",
                                                    opacity: hoveredSlice ? (isHovered ? 1 : 0.45) : 1,
                                                    strokeWidth: isHovered ? 14.5 : 12.5,
                                                }}
                                            />
                                        </g>
                                    );
                                });
                            })()}
                        </svg>
                        {/* Center Label — static total, not changing on hover */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                            <span
                                style={{
                                    ...inter,
                                    fontWeight: 500,
                                    fontSize: "11px",
                                }}
                                className="text-slate-400 leading-tight"
                            >
                                Total Collected
                            </span>
                            <span style={{ ...poppins, fontWeight: 700, fontSize: "13.5px" }} className="text-slate-900 leading-tight mt-1 flex items-center justify-center gap-1">
                                <DIcon className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{totalCollectedFormatted}</span>
                            </span>
                        </div>
                        {/* Tooltip — compact pill badge on top right with generous spacing */}
                        {hoveredSlice && (() => {
                            const sliceColor = hoveredSlice.color || getTypeColor(hoveredSlice.type, hoveredSlice.percentage);
                            return (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-26px",
                                        right: "0px",
                                        pointerEvents: "none",
                                        zIndex: 20,
                                        animation: "fadeSlideLeft 0.18s ease-out",
                                        ...inter,
                                    }}
                                >
                                    <div style={{
                                        background: "#FFFFFF",
                                        borderRadius: "9999px",
                                        padding: "4px 10px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                        border: "1px solid #E2E8F0",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "7px",
                                        whiteSpace: "nowrap",
                                    }}>
                                        <span style={{
                                            width: "7px",
                                            height: "7px",
                                            borderRadius: "50%",
                                            backgroundColor: sliceColor,
                                            flexShrink: 0,
                                        }} />
                                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#1E293B" }}>
                                            {hoveredSlice.type}
                                        </span>
                                        <span style={{
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: sliceColor,
                                            background: `${sliceColor}18`,
                                            padding: "1px 7px",
                                            borderRadius: "9999px",
                                        }}>
                                            {hoveredSlice.percentage}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 w-full mt-3 pt-3 border-t border-gray-100 justify-items-center sm:justify-items-start">
                        {collectionDistribution.map((item) => {
                            const p = Number(item.percentage) || 0;
                            const color = item.color || getTypeColor(item.type, p);
                            const isHovered = hoveredSlice?.type === item.type;
                            return (
                                <div
                                    key={item.type}
                                    onMouseEnter={(e) => {
                                        setHoveredSlice(item);
                                        setTooltipPos({ x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseMove={(e) => {
                                        setHoveredSlice(item);
                                        setTooltipPos({ x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredSlice(null);
                                        setTooltipPos(null);
                                    }}
                                    className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors cursor-pointer w-full ${isHovered ? "bg-violet-50" : "hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                    <span style={{ ...inter, fontSize: "11.5px", fontWeight: isHovered ? 700 : 500 }} className={`truncate ${isHovered ? "text-slate-900" : "text-slate-600"}`}>
                                        {item.type} ({p}%)
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
