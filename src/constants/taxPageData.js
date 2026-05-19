/**
 * Tax Report page dummy data.
 *
 * Replace this module with API responses later while keeping
 * the same object shapes to avoid UI refactors.
 */

export const taxSummaryCards = [
  {
    id: "output-tax",
    title: "Output Tax",
    amount: "450,000",
    currency: "Ð",
    tone: "output",
  },
  {
    id: "input-tax",
    title: "Input Tax",
    amount: "22,500",
    currency: "Ð",
    tone: "input",
  },
  {
    id: "total-payable",
    title: "Total Payable",
    amount: "47,050",
    currency: "Ð",
    tone: "payable",
  },
];

export const taxCategoryRows = [
  {
    id: "t1",
    category: "Sales",
    amount: "450,000.00",
    tax: "22,500.00",
    taxTone: "default",
    total: "472,500.00",
  },
  {
    id: "t2",
    category: "Sales Returns",
    amount: "450,000.00",
    tax: "22,500.00",
    taxTone: "default",
    total: "472,500.00",
  },
  {
    id: "t3",
    category: "Purchase",
    amount: "450,000.00",
    tax: "22,500.00",
    taxTone: "positive",
    total: "472,500.00",
  },
  {
    id: "t4",
    category: "Purchase Returns",
    amount: "450,000.00",
    tax: "22,500.00",
    taxTone: "default",
    total: "472,500.00",
  },
  {
    id: "t5",
    category: "Credit settlement",
    amount: "300,000.00",
    tax: "15,000.00",
    taxTone: "default",
    total: "315,000.00",
  },
  {
    id: "t6",
    category: "Net Income",
    amount: "200,000.00",
    tax: "10,000.00",
    taxTone: "default",
    total: "210,000.00",
  },
];

export const taxCategoryDetails = {
  "t1": [
    { id: 1, date: "01 Jan 2026", amount: "15,000.00", tax: "750.00", total: "15,750.00" },
    { id: 2, date: "01 Jan 2026", amount: "12,500.00", tax: "625.00", total: "13,125.00" },
    { id: 3, date: "01 Jan 2026", amount: "18,200.00", tax: "910.00", total: "19,110.00" },
    { id: 4, date: "01 Jan 2026", amount: "20,000.00", tax: "1,000.00", total: "21,000.00" },
    { id: 5, date: "01 Jan 2026", amount: "16,750.00", tax: "837.50", total: "17,587.50" },
    { id: 6, date: "01 Jan 2026", amount: "14,300.00", tax: "715.00", total: "15,015.00" },
    { id: 7, date: "01 Jan 2026", amount: "22,500.00", tax: "1,125.00", total: "23,625.00" },
    { id: 8, date: "01 Jan 2026", amount: "19,800.00", tax: "990.00", total: "20,790.00" },
  ],
  "t2": [
    { id: 1, date: "01 Jan 2026", amount: "10,000.00", tax: "500.00", total: "10,500.00" },
    { id: 2, date: "02 Jan 2026", amount: "5,000.00", tax: "250.00", total: "5,250.00" },
  ],
  "t3": [
    { id: 1, date: "05 Jan 2026", amount: "50,000.00", tax: "2,500.00", total: "52,500.00" },
    { id: 2, date: "06 Jan 2026", amount: "40,000.00", tax: "2,000.00", total: "42,000.00" },
  ],
  "t4": [
    { id: 1, date: "10 Jan 2026", amount: "8,000.00", tax: "400.00", total: "8,400.00" },
  ],
  "t5": [
    { id: 1, date: "15 Jan 2026", amount: "100,000.00", tax: "5,000.00", total: "105,000.00" },
  ],
  "t6": [
    { id: 1, date: "31 Jan 2026", amount: "200,000.00", tax: "10,000.00", total: "210,000.00" },
  ],
};
