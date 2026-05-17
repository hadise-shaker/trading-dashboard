export type User = {
  name: string;
  email: string;
  passwordHash: string;
};

export type DashboardStats = {
  balance: number;
  equity: number;
  profitLoss: number;
  profitPercentage: number;
  change: {
    balance: number;
    equity: number;
    profitLoss: number;
    profitPercentage: number;
  };
};

export const userStore = new Map<string, User>();
export const dashboardStore = new Map<string, DashboardStats>();