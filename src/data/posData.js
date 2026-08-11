// ─── Counters ────────────────────────────────────────────────────────────────
export const counters = [
  "All Counters",
  "Counter 1",
  "Counter 2",
  "Counter 3",
  "Counter 4",
];

// ─── Bar Chart Data ───────────────────────────────────────────────────────────
export const barData = [
  { counter: "Counter 1", cash: 42000, card: 28000, credit: 11000 },
  { counter: "Counter 2", cash: 35000, card: 22000, credit: 8000 },
  { counter: "Counter 3", cash: 51000, card: 31000, credit: 14000 },
  { counter: "Counter 4", cash: 27000, card: 18000, credit: 6000 },
];

// ─── Collection Distribution ─────────────────────────────────────────────────
export const collectionDistribution = [
  { type: "Cash", value: 58, color: "#6F57DE" },
  { type: "Card", value: 30, color: "#A78BFA" },
  { type: "Credit", value: 12, color: "#DDD6FE" },
];

// ─── Cashiers ────────────────────────────────────────────────────────────────
export const cashiers = [
  { id: 1, name: "Ahmed Al-Rashidi",  counter: "Counter 1", sales: 84000, transactions: 142, avgTicket: 592 },
  { id: 2, name: "Sara Mohammed",     counter: "Counter 2", sales: 67500, transactions: 118, avgTicket: 572 },
  { id: 3, name: "Khalid Ibrahim",    counter: "Counter 3", sales: 91200, transactions: 159, avgTicket: 574 },
  { id: 4, name: "Fatima Al-Zahra",  counter: "Counter 4", sales: 53400, transactions: 97,  avgTicket: 550 },
];

// ─── Summary Cards ───────────────────────────────────────────────────────────
export const summaryCards = [
  { label: "Total Sales",    value: "SAR 84,200", change: "+12%", positive: true  },
  { label: "Transactions",   value: "142",         change: "+8%",  positive: true  },
  { label: "Avg Ticket",     value: "SAR 592",     change: "-3%",  positive: false },
];

// ─── Counter Details Data ────────────────────────────────────────────────────
export const counterDetailsData = {
  "Counter 1": { cashier: "Ahmed Al-Rashidi", totalSales: 84000, transactions: 142, avgTicket: 592 },
  "Counter 2": { cashier: "Sara Mohammed",    totalSales: 67500, transactions: 118, avgTicket: 572 },
  "Counter 3": { cashier: "Khalid Ibrahim",   totalSales: 91200, transactions: 159, avgTicket: 574 },
  "Counter 4": { cashier: "Fatima Al-Zahra", totalSales: 53400, transactions: 97,  avgTicket: 550 },
};

// ─── Shift Data ───────────────────────────────────────────────────────────────
export const shiftData = [
  { shift: "Morning",   start: "06:00", end: "14:00", sales: 32000, transactions: 58 },
  { shift: "Afternoon", start: "14:00", end: "22:00", sales: 41200, transactions: 63 },
  { shift: "Night",     start: "22:00", end: "06:00", sales: 11000, transactions: 21 },
];

// ─── Terminals ───────────────────────────────────────────────────────────────
export const terminals = [
  { id: "T-001", counter: "Counter 1", status: "active",   cashier: "Ahmed Al-Rashidi", lastTx: "2 min ago"  },
  { id: "T-002", counter: "Counter 2", status: "active",   cashier: "Sara Mohammed",    lastTx: "5 min ago"  },
  { id: "T-003", counter: "Counter 3", status: "active",   cashier: "Khalid Ibrahim",   lastTx: "1 min ago"  },
  { id: "T-004", counter: "Counter 4", status: "idle",     cashier: "Fatima Al-Zahra", lastTx: "18 min ago" },
];

// ─── Live Invoices ────────────────────────────────────────────────────────────
export const liveInvoices = [
  { id: "INV-2041", counter: "Counter 1", amount: 1240, time: "12:45 PM", type: "Cash"   },
  { id: "INV-2042", counter: "Counter 3", amount: 890,  time: "12:43 PM", type: "Card"   },
  { id: "INV-2043", counter: "Counter 2", amount: 3200, time: "12:41 PM", type: "Credit" },
  { id: "INV-2044", counter: "Counter 1", amount: 540,  time: "12:38 PM", type: "Cash"   },
  { id: "INV-2045", counter: "Counter 4", amount: 2100, time: "12:35 PM", type: "Card"   },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
export const getTypeColor = (type) => {
  switch (type) {
    case "Cash":   return "#6F57DE";
    case "Card":   return "#A78BFA";
    case "Credit": return "#DDD6FE";
    default:       return "#94A3B8";
  }
};
