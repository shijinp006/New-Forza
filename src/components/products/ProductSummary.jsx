import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Search, SlidersHorizontal } from "lucide-react";
import { productCategories } from "../../constants/productData";

const ProductSummary = ({
  onSearch,
  onCategoryChange,
  onStockFilterChange,
}) => {
  const formik = useFormik({
    initialValues: {
      search: "",
      category: "All Categories",
      stockLevel: "All Stock Levels",
    },
    onSubmit: (values) => {
      onSearch(values.search);
    },
  });

  const handleCategoryClick = (cat) => {
    formik.setFieldValue("category", cat);
    onCategoryChange(cat);
  };

  const handleStockChange = (e) => {
    formik.setFieldValue("stockLevel", e.target.value);
    onStockFilterChange(e.target.value);
  };



  return (
    <div className="mb-8">
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-[24px] font-bold text-[#1E293B]">Total Products</h1>

        <div className="flex flex-wrap gap-3">
          {productCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-300 ${formik.values.category === cat
                ? "bg-[#5949BE] text-white shadow-md"
                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="relative flex-1 w-full lg:max-w-[400px]"
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              size={18}
            />
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search Name , Code"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5949BE]/20 focus:border-[#5949BE] transition-all"
              onChange={formik.handleChange}
              value={formik.values.search}
            />
          </form>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="relative min-w-[200px]">
              <select
                name="stockLevel"
                className="w-full pl-4 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] font-semibold text-[#1E293B] appearance-none focus:outline-none focus:ring-2 focus:ring-[#5949BE]/20 transition-all"
                onChange={handleStockChange}
                value={formik.values.stockLevel}
              >
                <option value="All Stock Levels">All Stock Levels</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SlidersHorizontal size={16} className="text-[#64748B]" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                <span className="text-[12px] font-bold text-[#64748B]">
                  Low Stock
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="text-[12px] font-bold text-[#64748B]">
                  Out of Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
