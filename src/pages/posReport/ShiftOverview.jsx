import { useEffect, useState } from "react";
import { shiftData, collectionDistribution, counterDetailsData, cashiers, getTypeColor } from "../../constants/posData";
import DIcon from "../../assets/D.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

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

export function ShiftOverview({ counter }) {
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [tooltipPos, setTooltipPos] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [animProgress, setAnimProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, [counter]);

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
    const currentShiftData = (counter && counterDetailsData[counter]?.shiftData) || shiftData;
    const { employee } = currentShiftData;

    const isAllCounters = !counter || counter === "All Counters";

    let calculatedTotal = 0;
    if (currentShiftData?.totalCollection) {
        calculatedTotal = parseFloat(String(currentShiftData.totalCollection).replace(/[^0-9.]/g, "")) || 0;
    } else if (isAllCounters) {
        calculatedTotal = cashiers.reduce((acc, c) => {
            const num = parseFloat(String(c.sales).replace(/[^0-9.]/g, "")) || 0;
            return acc + num;
        }, 0);
    } else {
        const normalizedActive = counter.replace(/\s+/g, "").toUpperCase();
        const match = cashiers.find((c) => c.counter.replace(/\s+/g, "").toUpperCase() === normalizedActive);
        if (match) {
            calculatedTotal = parseFloat(String(match.sales).replace(/[^0-9.]/g, "")) || 0;
        }
    }

    const totalCollectedFormatted = calculatedTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
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

    /* ── Initials Avatar fallback ── */
    const InitialsAvatar = ({ initials }) => (
        <div
            className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-violet-200 shrink-0"
            style={{ background: "#ede9fe" }}
        >
            <span style={{ ...inter, fontWeight: 700, fontSize: "13px" }} className="text-violet-700">
                {initials}
            </span>
        </div>
    );

    /* ── Simple row ── */
    const Row = ({ label, value, valueClass = "text-slate-800", bold = false, last = false }) => (
        <div className={`flex items-center justify-between py-2.5 ${!last ? "border-b border-gray-100" : ""}`}>
            <span style={{ ...inter, fontSize: "13px" }} className="text-slate-500">{label}</span>
            <span style={{ ...inter, fontSize: "13px", fontWeight: bold ? 700 : 500 }} className={valueClass}>
                {value}
            </span>
        </div>
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col gap-4 h-auto md:h-[520px] overflow-y-auto relative">

            {/* ── Top Row: Title + Denomination + Status ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 gap-2">
                <h2 style={{ ...inter, fontWeight: 700 }} className="text-slate-900 tracking-tight text-sm sm:text-base md:text-lg">
                    {currentShiftData.shiftLabel}
                </h2>
                <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto shrink-0">
                    <span style={{ ...inter, fontWeight: 500 }} className="text-slate-400 text-xs sm:text-xs">
                        {currentShiftData.denomination}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/80 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        <span style={{ ...inter, fontWeight: 600 }} className="text-emerald-600 text-[10px] sm:text-[10.5px]">
                            {currentShiftData.status}
                        </span>
                    </span>
                </div>
            </div>

            {isAllCounters ? (
                /* ── ALL COUNTERS: Full grid with donut chart ── */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">

                    {/* ── Left Panel: Cashier Profile + Details (2 cols) ── */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs gap-4 overflow-y-auto">

                        {/* Employee Profile Header */}
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            {employee.avatar
                                ? <img src={employee.avatar} alt={employee.name} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-violet-100 shadow-sm shrink-0" />
                                : <InitialsAvatar initials={employee.initials} />
                            }
                            <div className="flex flex-col min-w-0">
                                <span style={{ ...inter, fontWeight: 700, fontSize: "14px" }} className="text-slate-900 truncate">
                                    {employee.name}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium text-[11px] text-slate-600">
                                        {employee.role}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span style={{ ...inter, fontSize: "11.5px" }}>ID: {employee.id}</span>
                                    <span className="text-slate-300">•</span>
                                    <span style={{ ...inter, fontSize: "11.5px" }} className="text-violet-600 font-semibold">{employee.counter}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shift Info Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 flex flex-col">
                                <span style={{ ...inter, fontSize: "10.5px" }} className="text-slate-400 font-medium uppercase tracking-wider">Shift Start</span>
                                <span style={{ ...inter, fontSize: "12.5px" }} className="text-slate-800 font-semibold mt-0.5">{currentShiftData.startTime}</span>
                            </div>
                            <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 flex flex-col">
                                <span style={{ ...inter, fontSize: "10.5px" }} className="text-slate-400 font-medium uppercase tracking-wider">Opening Cash</span>
                                <span style={{ ...inter, fontSize: "12.5px" }} className="text-slate-800 font-semibold mt-0.5 inline-flex items-center gap-0.5">
                                    <DIcon className="w-3 h-3 text-slate-800 shrink-0" />
                                    <span>{currentShiftData.openingCash}</span>
                                </span>
                            </div>
                            <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 flex flex-col">
                                <span style={{ ...inter, fontSize: "10.5px" }} className="text-slate-400 font-medium uppercase tracking-wider">Total Invoices</span>
                                <span style={{ ...inter, fontSize: "12.5px" }} className="text-slate-800 font-semibold mt-0.5">{currentShiftData.totalInvoices}</span>
                            </div>
                            <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 flex flex-col">
                                <span style={{ ...inter, fontSize: "10.5px" }} className="text-slate-400 font-medium uppercase tracking-wider">Total Sales</span>
                                <span style={{ ...inter, fontSize: "12.5px" }} className="text-emerald-600 font-bold mt-0.5 inline-flex items-center gap-0.5">
                                    <DIcon className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>{totalCollectedFormatted}</span>
                                </span>
                            </div>
                        </div>

                        {/* Breakdown Summary List */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
                                <span style={{ ...inter }} className="text-slate-500">Gross Sales</span>
                                <span style={{ ...inter, fontWeight: 600 }} className="text-slate-800 inline-flex items-center gap-0.5">
                                    <DIcon className="w-3 h-3 text-slate-800 shrink-0" />
                                    <span>{totalCollectedFormatted}</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
                                <span style={{ ...inter }} className="text-slate-500">Total Discounts</span>
                                <span style={{ ...inter, fontWeight: 600 }} className="text-rose-500 inline-flex items-center gap-0.5">
                                    -<DIcon className="w-3 h-3 text-rose-500 shrink-0" />
                                    <span>{currentShiftData.discounts}</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
                                <span style={{ ...inter }} className="text-slate-500">Returns & Refunds</span>
                                <span style={{ ...inter, fontWeight: 600 }} className="text-amber-600 inline-flex items-center gap-0.5">
                                    -<DIcon className="w-3 h-3 text-amber-600 shrink-0" />
                                    <span>{currentShiftData.refunds}</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1 pt-1.5">
                                <span style={{ ...inter, fontWeight: 700 }} className="text-slate-900">Net Collection</span>
                                <span style={{ ...inter, fontWeight: 700 }} className="text-emerald-600 text-sm inline-flex items-center gap-0.5">
                                    <DIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{totalCollectedFormatted}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Panel: Collection Distribution Donut ── */}
                    <div className="bg-white rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 flex flex-col justify-between items-center h-full shadow-2xs ">
                        <h3 style={{ ...inter, fontWeight: 700, fontSize: "12.5px" }} className="text-slate-800 self-center sm:self-start text-center sm:text-left">
                            Collection Distribution
                        </h3>

                        {/* Donut Chart */}
                        <div className="relative w-48 h-48 sm:w-52 sm:h-52 my-auto flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <defs>
                                    <filter id="donut3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
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

                            {/* Donut Center — static total */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                                <span
                                    style={{ ...inter, fontSize: "12.5px", fontWeight: 400 }}
                                    className="text-[#585C62]"
                                >
                                    Total Collected
                                </span>
                                <span style={{ ...inter, fontSize: "16px", fontWeight: 700 }} className="text-slate-800 mt-0.5 inline-flex items-center gap-1">
                                    <DIcon className="w-4 h-4 text-slate-800 shrink-0" />
                                    <span>{totalCollectedFormatted}</span>
                                </span>
                            </div>

                            {/* Tooltip — compact pill badge on top right with generous spacing */}
                            {hoveredSlice && (() => {
                                const sc = hoveredSlice.color || getTypeColor(hoveredSlice.type, hoveredSlice.percentage);
                                return (
                                    <div style={{ position: "absolute", top: "-26px", right: "0px", pointerEvents: "none", zIndex: 20, animation: "fadeSlideLeft 0.18s ease-out", ...inter }}>
                                        <div style={{ background: "#FFFFFF", borderRadius: "9999px", padding: "4px 10px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}>
                                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: sc, flexShrink: 0 }} />
                                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#1E293B" }}>{hoveredSlice.type}</span>
                                            <span style={{ fontSize: "11px", fontWeight: 700, color: sc, background: `${sc}18`, padding: "1px 7px", borderRadius: "9999px" }}>{hoveredSlice.percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Legend with values */}
                        <div className="flex flex-col gap-1.5 w-full pt-3 border-t border-gray-100 shrink-0">
                            {collectionDistribution.map((item) => {
                                const p = Number(item.percentage) || 0;
                                const color = item.color || getTypeColor(item.type, p);
                                const isHovered = hoveredSlice?.type === item.type;
                                const itemAmount = (calculatedTotal * (p / 100)).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
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
                                        className={`flex items-center justify-between px-2 py-1 rounded-lg transition-colors cursor-pointer ${isHovered ? "bg-violet-50" : "hover:bg-gray-50"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                                style={{ backgroundColor: color }}
                                            />
                                            <span style={{ ...inter, fontSize: "12.5px", fontWeight: isHovered ? 600 : 400 }} className={isHovered ? "text-slate-900" : "text-[#515F73]"}>
                                                {item.type} ({p}%)
                                            </span>
                                        </div>
                                        <span style={{ ...inter, fontSize: "12.5px", fontWeight: isHovered ? 700 : 400 }} className="text-[#2B2F34] inline-flex items-center gap-0.5">
                                            <DIcon className="w-3.5 h-3.5 text-[#2B2F34] shrink-0" />
                                            <span>{itemAmount}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            ) : (
                /* ── C1-C6: Simple employee card with log in/out + stats ── */
                <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">

                    {/* Employee Card */}
                    <div className="bg-white rounded-2xl border border-[#C6C6CD] p-5 flex flex-col shadow-2xs flex-1">

                        {/* Employee Header */}
                        <div className="flex items-center gap-3 mb-4">
                            {employee.avatar
                                ? <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full object-cover border-2 border-violet-100 shadow-sm shrink-0" />
                                : (
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-violet-300 bg-violet-50 shrink-0">
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "14px" }} className="text-[#566166]">
                                            {employee.initials}
                                        </span>
                                    </div>
                                )
                            }
                            <div className="flex flex-col min-w-0">
                                <span style={{ ...inter, fontWeight: 700, fontSize: "15px" }} className="text-[#566166]">
                                    {employee.name}
                                </span>
                                <span style={{ ...inter, fontSize: "12px" }} className="text-[#566166] mt-0.5">
                                    {employee.shift} • ID: {employee.id}
                                </span>
                            </div>
                        </div>

                        {/* Stats List */}
                        <div className="flex flex-col flex-1 divide-y divide-gray-100">
                            <Row label="Log in" value={currentShiftData.logIn} />
                            <Row label="Log out" value={currentShiftData.logOut} />
                            <Row label="VOID Bills" value={currentShiftData.voidBills} />
                            <Row label="Hold Bills" value={currentShiftData.holdBills} />
                            <Row
                                label="Cash in Hand"
                                value={
                                    <span className="inline-flex items-center gap-0.5">
                                        <DIcon className="w-3 h-3 text-[#566166] shrink-0" />
                                        <span>{currentShiftData.cashInHand}</span>
                                    </span>
                                }
                            />
                            <Row
                                label="Total Collection"
                                value={
                                    <span className="inline-flex items-center gap-0.5">
                                        <DIcon className="w-3 h-3 text-[#566166] shrink-0" />
                                        <span>{currentShiftData.totalCollection}</span>
                                    </span>
                                }
                            />
                            <Row
                                label="Total Sale"
                                value={
                                    <span className="inline-flex items-center gap-0.5 font-bold text-[#566166">
                                        <DIcon className="w-3 h-3 text-[#566166] shrink-0" />
                                        <span>{currentShiftData.totalSale}</span>
                                    </span>
                                }
                                bold
                                last
                            />
                        </div>
                    </div>

                    {/* Collection Distribution Donut (right side) */}
                    <div className="bg-white rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 flex flex-col justify-between items-center shadow-2xs flex-1">
                        <h3 style={{ ...inter, fontWeight: 700, fontSize: "12.5px" }} className="text-slate-800 self-start w-full">
                            Collection Distribution
                        </h3>

                        {/* Donut Chart */}
                        <div className="relative w-44 h-44 sm:w-48 sm:h-48 my-auto flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" />
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
                                                <path
                                                    d={pathData}
                                                    stroke="transparent"
                                                    strokeWidth="28"
                                                    fill="none"
                                                    style={{ pointerEvents: "stroke", cursor: "pointer" }}
                                                    onMouseEnter={(e) => { setHoveredSlice(item); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                                                    onMouseMove={(e) => { setHoveredSlice(item); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                                                    onMouseLeave={() => { setHoveredSlice(null); setTooltipPos(null); }}
                                                />
                                                <path
                                                    d={pathData}
                                                    stroke={color}
                                                    strokeWidth={12.5}
                                                    fill="none"
                                                    style={{
                                                        pointerEvents: "none",
                                                        transition: "opacity 0.25s ease, stroke-width 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s ease",
                                                        opacity: hoveredSlice ? (isHovered ? 1 : 0.4) : 1,
                                                        strokeWidth: isHovered ? 15.5 : 12.5,
                                                        filter: isHovered ? `drop-shadow(0 2px 6px ${color}44)` : "none",
                                                    }}
                                                />
                                            </g>
                                        );
                                    });
                                })()}
                            </svg>
                            {/* Donut Center — static total */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                                <span
                                    style={{ ...inter, fontSize: "12px", fontWeight: 400 }}
                                    className="text-[#585C62]"
                                >
                                    Total Collected
                                </span>
                                <span style={{ ...inter, fontSize: "15px", fontWeight: 700 }} className="text-slate-800 mt-0.5 inline-flex items-center gap-1">
                                    <DIcon className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                                    <span>{totalCollectedFormatted}</span>
                                </span>
                            </div>
                            {/* Tooltip — compact pill badge on top right with generous spacing */}
                            {hoveredSlice && (() => {
                                const sc = hoveredSlice.color || getTypeColor(hoveredSlice.type, hoveredSlice.percentage);
                                return (
                                    <div style={{ position: "absolute", top: "-26px", right: "0px", pointerEvents: "none", zIndex: 20, animation: "fadeSlideLeft 0.18s ease-out", ...inter }}>
                                        <div style={{ background: "#FFFFFF", borderRadius: "9999px", padding: "4px 10px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}>
                                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: sc, flexShrink: 0 }} />
                                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#1E293B" }}>{hoveredSlice.type}</span>
                                            <span style={{ fontSize: "11px", fontWeight: 700, color: sc, background: `${sc}18`, padding: "1px 7px", borderRadius: "9999px" }}>{hoveredSlice.percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-1.5 w-full pt-3 border-t border-gray-100 shrink-0">
                            {collectionDistribution.map((item) => {
                                const p = Number(item.percentage) || 0;
                                const color = item.color || getTypeColor(item.type, p);
                                const isHovered = hoveredSlice?.type === item.type;
                                const itemAmount = (calculatedTotal * (p / 100)).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                return (
                                    <div
                                        key={item.type}
                                        onMouseEnter={(e) => { setHoveredSlice(item); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                                        onMouseMove={(e) => { setHoveredSlice(item); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                                        onMouseLeave={() => { setHoveredSlice(null); setTooltipPos(null); }}
                                        className={`flex items-center justify-between px-2 py-1 rounded-lg transition-colors cursor-pointer ${isHovered ? "bg-violet-50" : "hover:bg-gray-50"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                            <span style={{ ...inter, fontSize: "12px", fontWeight: isHovered ? 600 : 400 }} className={isHovered ? "text-slate-900" : "text-[#515F73]"}>
                                                {item.type} ({p}%)
                                            </span>
                                        </div>
                                        <span style={{ ...inter, fontSize: "12px", fontWeight: isHovered ? 700 : 400 }} className="text-[#2B2F34] inline-flex items-center gap-0.5">
                                            <DIcon className="w-3 h-3 text-[#2B2F34] shrink-0" />
                                            <span>{itemAmount}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
