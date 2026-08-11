import { useState, useMemo } from "react";
import { stats, employees, vehicles, companyDocs, actionItems } from "../../constants/DocExpiryData.js";

import { StatCard } from "../../pages/docExpiry/StatCard";
import { EmployeesTab } from "../../pages/docExpiry/EmployeesTab";
import { VehiclesTab } from "../../pages/docExpiry/VehiclesTab";
import { CompanyDocsTab } from "../../pages/docExpiry/CompanyDocsTab";
import { OtherTab } from "../../pages/docExpiry/OtherTab";


import EmployeesIcon from "../../assets/Employees.svg?react";
import VehicleIcon from "../../assets/Vehicle.svg?react";
import CompanyIcon from "../../assets/Company.svg?react";
import OtherIcon from "../../assets/Other.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

export const DocExpiry = () => {
    const [activeTab, setActiveTab] = useState("Employees");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [dateFilter, setDateFilter] = useState("All Time");

    const isDetailOpen = Boolean(selectedEmployee) && activeTab === "Employees";
    const isNoScroll = isDetailOpen;

    const filterByDate = (list, filter) => {
        if (!filter || filter === "All Time") return list;

        const getDays = (item) => {
            if (typeof item.days === "number") return item.days;
            if (item.daysLeft) {
                if (item.daysLeft.includes("0") || item.daysLeft.toLowerCase().includes("today")) return 0;
                if (item.daysLeft.toLowerCase().includes("overdue") || item.daysLeft.toLowerCase().includes("yesterday")) return -1;
                const match = item.daysLeft.match(/(\d+)/);
                if (match) return parseInt(match[1], 10);
            }
            if (item.status) {
                if (item.status.toLowerCase().includes("today")) return 0;
                if (item.status.toLowerCase().includes("yesterday")) return -1;
                const match = item.status.match(/(\d+)/);
                if (match) return parseInt(match[1], 10);
            }
            if (item.date) {
                if (item.date.toLowerCase() === "today") return 0;
                if (item.date.toLowerCase() === "yesterday") return -1;
            }
            return 15;
        };

        if (filter === "Today") return list.filter((item) => getDays(item) === 0);
        if (filter === "Yesterday") return list.filter((item) => getDays(item) === -1);
        if (filter === "Last 7 Days") return list.filter((item) => getDays(item) >= -1 && getDays(item) <= 7);
        if (filter === "Last 30 Days" || filter === "This Month") return list.filter((item) => getDays(item) >= -1 && getDays(item) <= 30);
        return list;
    };

    const filteredEmployees = useMemo(() => filterByDate(employees, dateFilter), [dateFilter]);
    const filteredVehicles = useMemo(() => filterByDate(vehicles, dateFilter), [dateFilter]);
    const filteredCompanyDocs = useMemo(() => filterByDate(companyDocs, dateFilter), [dateFilter]);
    const filteredActionItems = useMemo(() => filterByDate(actionItems, dateFilter), [dateFilter]);

    const dynamicStats = useMemo(() => {
        return stats.map((s) => {
            let val = s.value;
            let svgIcon = null;
            if (s.label === "Employees") {
                val = String(filteredEmployees.length).padStart(2, "0");
                svgIcon = EmployeesIcon;
            }
            if (s.label === "Vehicles") {
                val = String(filteredVehicles.length).padStart(2, "0");
                svgIcon = VehicleIcon;
            }
            if (s.label === "Company") {
                val = String(filteredCompanyDocs.length).padStart(2, "0");
                svgIcon = CompanyIcon;
            }
            if (s.label === "Other") {
                val = String(filteredActionItems.length).padStart(2, "0");
                svgIcon = OtherIcon;
            }
            return { ...s, value: val, svgIcon };
        });
    }, [filteredEmployees.length, filteredVehicles.length, filteredCompanyDocs.length, filteredActionItems.length]);

    return (
        <div
            style={inter}
            className="w-full h-full flex flex-col bg-[#F7F9FB] overflow-hidden min-h-0 lg:pb-2"
        >


            {/* ── PAGE TITLE ── */}
            <div className="px-4 sm:px-8 mt-3 mb-1 shrink-0 lg:px-8">
                <h1 style={{ ...inter, fontWeight: 700, fontSize: "22px" }} className="text-gray-900">
                    Doc Expiry
                </h1>
            </div>

            {/* ── 4 INTERACTIVE STAT CARDS ── */}
            <div className="px-4 sm:px-6 mb-2 shrink-0">
                <div
                    className="flex gap-3 overflow-x-auto py-1.5 px-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {dynamicStats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                            isActive={activeTab === stat.label}
                            onClick={() => {
                                setActiveTab(stat.label);
                                if (stat.label !== "Employees") setSelectedEmployee(null);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* ── MODULAR TAB VIEWS ── */}
            <div key={activeTab} className="flex-1 min-h-0 overflow-hidden flex flex-col animate-fade-in">
                {activeTab === "Employees" && (
                    <EmployeesTab
                        employees={filteredEmployees}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />
                )}

                {activeTab === "Vehicles" && (
                    <VehiclesTab vehicles={filteredVehicles} />
                )}

                {activeTab === "Company" && (
                    <CompanyDocsTab companyDocs={filteredCompanyDocs} />
                )}

                {activeTab === "Other" && (
                    <OtherTab actionItems={filteredActionItems} />
                )}
            </div>
        </div>
    );
};

export default DocExpiry;