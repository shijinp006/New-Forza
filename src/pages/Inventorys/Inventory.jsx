import React from 'react';
import InventorySummaryCards from "../components/inventory/InventorySummaryCards";
import TopSellingItemsCard from "../components/inventory/TopSellingItemsCard";
import InventoryInfoListCard from "../components/inventory/InventoryInfoListCard";
import {
  inventorySummaryCards,
  manufacturedProducts,
  negativeStocks,
} from "../constants/inventoryPageData";
import { Calendar, Settings2 } from 'lucide-react';

const Inventory = () => {
  return (
    <main className="min-h-screen w-full bg-[#F7F8FC] px-6 pb-8 pt-6 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col">
        
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-[32px] font-black text-[#1E293B] tracking-tight">Inventory</h1>
        </div>

        {/* 3. KPI Cards */}
        <InventorySummaryCards cards={inventorySummaryCards} />

        {/* 4. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
                <TopSellingItemsCard />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
                <InventoryInfoListCard title="Manufactured Products" rows={manufacturedProducts} />
                <InventoryInfoListCard title="Negative Stock" rows={negativeStocks} tone="danger" />
            </div>
        </div>
      </div>
    </main>
  );
};


export default Inventory;