import React, { useState, useMemo } from "react";
import ProductSummary from "../components/products/ProductSummary";
import ProductTable from "../components/products/ProductTable";
import { productData } from "../constants/productData";

const TotalProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock Levels");

  const filteredData = useMemo(() => {
    return productData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStock =
        stockFilter === "All Stock Levels" ||
        (stockFilter === "Low Stock" && item.status === "low") ||
        (stockFilter === "Out of Stock" && item.status === "out");

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, selectedCategory, stockFilter]);

  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <ProductSummary
          onSearch={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onStockFilterChange={setStockFilter}
        />

        <div className="mt-8">
          <ProductTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default TotalProducts;
