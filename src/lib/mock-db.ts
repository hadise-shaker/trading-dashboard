// ─── Types ────────────────────────────────────────────────────
export type User = {
  name: string;
  email: string;
  password: string;
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

// Allows login immediately without signing up first
userStore.set("test@test.com", {
  name: "Demo User",
  email: "test@test.com",
  password: "123456",
});

export function findUser(email: string): User | undefined {
  return userStore.get(email.toLowerCase());
}
export function createUser(user: User): void {
  userStore.set(user.email.toLowerCase(), { ...user, email: user.email.toLowerCase() });
}
export function userExists(email: string): boolean {
  return userStore.has(email.toLowerCase());
}