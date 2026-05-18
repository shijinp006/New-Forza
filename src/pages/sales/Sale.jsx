import React from 'react';

import SalesStatCard from '../components/sales/SalesStatCard';
import SalesByTransaction from '../components/sales/SalesByTransaction';
import TargetVsSales from '../components/sales/TargetVsSales';
import OutstandingDueAgeing from '../components/sales/OutstandingDueAgeing';
import CustomerSalesTable from '../components/sales/CustomerSalesTable';
import { salesStatsData, customerSalesTableData } from '../constants/salesData';

/**
 * Sale (Sales Analysis) Page
 * 
 * Layout:
 * 1. Overview Header (Alfuttaim Bar + Title)
 * 2. Sales Stats (4 KPI Cards)
 * 3. Charts Row (Sales By Transaction + Target/Due Ageing column)
 * 4. Performance Table (Customer Sales Performance)
 */
const Sale = () => {
  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
   
   
      {/* 2. Sales Stats Section */}
      <div className="flex flex-wrap gap-6 mb-8">
        {salesStatsData.map((stat, index) => (
          <SalesStatCard key={index} {...stat} />
        ))}
      </div>

      {/* 3. Charts & Analysis Section */}
      <div className="flex flex-col xl:flex-row gap-6 mb-8">
        {/* Left: Bar Chart */}
        <SalesByTransaction />
        
        {/* Right: Target & Ageing column */}
        <div className="flex flex-col gap-6 w-full xl:w-[350px]">
          <TargetVsSales />
          <OutstandingDueAgeing />
        </div>
      </div>

      {/* 4. Table Section */}
      <CustomerSalesTable rowsByTab={customerSalesTableData} />
    </div>
  );
};

export default Sale;