import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Loader from "./utils/Loader";
// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const SelectBranch = lazy(() => import("./pages/SelectBranch"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sale = lazy(() => import("./pages/Sale"));
const Purchase = lazy(() => import("./pages/Purchase"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));
const Help = lazy(() => import("./pages/Help"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Tax = lazy(() => import("./pages/Tax"));
const RevenueDetails = lazy(() => import("./pages/RevenueDetails"));
const TotalProducts = lazy(() => import("./pages/TotalProducts"));
const CustomerOutstanding = lazy(() => import("./pages/CustomerOutstanding"));
const SupplierPerformance = lazy(() => import("./pages/SupplierPerformance"));
const StockCard = lazy(() => import("./pages/StockCard"));
const ItemReport = lazy(() => import("./pages/inventory/ItemReport"));






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
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="tax">
              <Route index element={<Tax />} />
              <Route path=":categoryId" element={<Tax />} />
            </Route>

          </Route>





        </Routes>
      </Suspense>
    </>
  );
}

export default App;
