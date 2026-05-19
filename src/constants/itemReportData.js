export const itemInfoData = [
  { label: "Product Name", value: "Lg Fridge 2024" },
  { label: "Supplier Name", value: "LG" },
  { label: "Code", value: "L12673581" },
  { label: "Last Purchase", value: "12-07-26" },
];

export const itemPerformanceData = [
  { day: "Sun", value: 13000 },
  { day: "Mon", value: 7500 },
  { day: "Tue", value: 12000 },
  { day: "Wed", value: 11000 },
  { day: "Thu", value: 11500 },
  { day: "Fri", value: 12500 },
  { day: "Sat", value: 12500 },
];

export const itemPurchaseSaleStats = [
  {
    id: "purchased",
    title: "Total Purchased",
    value: "150",
    color: "#E11D48", // Rose 600
    bgColor: "#FFE4E6",
    progress: 80,
  },
  {
    id: "sold",
    title: "Total Sold",
    value: "124",
    color: "#16A34A", // Green 600
    bgColor: "#DCFCE7",
    progress: 65,
  },
  {
    id: "stock",
    title: "Stock Left",
    value: "26",
    color: "#EAB308", // Yellow 500
    bgColor: "#FEF9C3",
    progress: 20,
  },
];

export const itemReportTableData = [
  {
    id: 1,
    date: "Oct 24, 2026",
    itemName: "Ergonomic...",
    sku: "SKU-892",
    type: "Purchase",
    qtyIn: 50,
    qtyOut: null,
    balance: 150,
    cost: "$125.00",
  },
  {
    id: 2,
    date: "Oct 24, 2026",
    itemName: "Mechanical...",
    sku: "SKU-104",
    type: "Sale",
    qtyIn: null,
    qtyOut: 12,
    balance: 88,
    cost: "$45.50",
  },
  // Add more dummy data as needed to fill the view
  {
    id: 3,
    date: "Oct 23, 2026",
    itemName: "Wireless Mo...",
    sku: "SKU-221",
    type: "Sale",
    qtyIn: null,
    qtyOut: 5,
    balance: 100,
    cost: "$25.00",
  },
  {
    id: 4,
    date: "Oct 22, 2026",
    itemName: "Ergonomic...",
    sku: "SKU-892",
    type: "Purchase",
    qtyIn: 100,
    qtyOut: null,
    balance: 100,
    cost: "$125.00",
  },
];
