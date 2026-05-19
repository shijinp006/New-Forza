import React from 'react';
import ItemReportFilters from '../../components/inventory/item-report/ItemReportFilters';
import ItemReportInfo from '../../components/inventory/item-report/ItemReportInfo';
import ItemPerformanceChart from '../../components/inventory/item-report/ItemPerformanceChart';
import ItemPurchaseVsSale from '../../components/inventory/item-report/ItemPurchaseVsSale';
import ItemReportTable from '../../components/inventory/item-report/ItemReportTable';
import { 
  itemInfoData, 
  itemPerformanceData, 
  itemPurchaseSaleStats, 
  itemReportTableData 
} from '../../constants/itemReportData';

const ItemReport = () => {
  return (
    <main className="min-h-screen w-full bg-[#F8F9FE] px-6 pb-8 pt-6 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0px_4px_30px_rgba(0,0,0,0.03)] border border-[#F1F5F9] w-full">
         
          <ItemReportFilters />
          <ItemReportInfo data={itemInfoData} />
          
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            <ItemPerformanceChart data={itemPerformanceData} />
            <ItemPurchaseVsSale data={itemPurchaseSaleStats} />
          </div>

          <ItemReportTable data={itemReportTableData} />
        </div>

      </div>
    </main>
  );
};

export default ItemReport;
