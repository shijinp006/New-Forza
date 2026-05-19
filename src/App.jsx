import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Loader from "./utils/Loader";
// Lazy load pages
const Login = lazy(() => import("./pages/Login"));

const SelectBranch = lazy(() => import("./pages/Branches/Branches"));

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Sale = lazy(() => import("./pages/sales/Sale"));
const RevenueDetails = lazy(() => import("./pages/sales/RevenueDetails"));
const CustomerOutstanding = lazy(() => import("./pages/sales/CustomerOutstanding"));

const Purchase = lazy(() => import("./pages/purchase/Purchase"));
const SupplierPerformance = lazy(() => import("./pages/purchase/SupplierPerformance"));


const Inventory = lazy(() => import("./pages/Inventorys/Inventory"));
const StockCard = lazy(() => import("./pages/Inventorys/StockCard"));
const TotalProducts = lazy(() => import("./pages/Inventorys/TotalProducts"));

const Tax = lazy(() => import("./pages/tax/Tax"));

const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));
const Help = lazy(() => import("./pages/Help"));
const Notifications = lazy(() => import("./pages/Notifications"));












function App() {


  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/select-branch" element={<SelectBranch />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="sale">
              <Route index element={<Sale />} />
              <Route path="revenue-details" element={<RevenueDetails />} />
              <Route path="customer-outstanding" element={<CustomerOutstanding />} />
            </Route>

            <Route path="purchase">
              <Route index element={<Purchase />} />
              <Route path="supplier-performance" element={<SupplierPerformance />} />
            </Route>

            <Route path="inventory">
              <Route index element={<Inventory />} />
              <Route path="total-products" element={<TotalProducts />} />
              <Route path="stock-card" element={<StockCard />} />
              <Route path="item-report" element={<ItemReport />} />
            </Route>
            
             <Route path="tax" element={<Tax />} />

            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="notifications" element={<Notifications />} />
           

          </Route>





        </Routes>
      </Suspense>
    </>
  );
}

export default App;
