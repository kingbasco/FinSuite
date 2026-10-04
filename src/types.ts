export type ActiveScreen = 'home' | 'dashboard' | 'transfers' | 'cards' | 'integrations' | 'pricing';

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  category: 'Subscription' | 'Transfer' | 'Income' | 'Expense';
  amount: number;
  date: string;
  iconType: 'netflix' | 'spotify' | 'icloud' | 'transfer' | 'salary' | 'dining';
  isMonthly?: boolean;
  status: 'completed' | 'pending' | 'failed';
}

export interface FriendContact {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
  country: string;
  flag: string;
  initials: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  flag: string;
  rateToUSD: number;
  symbol: string;
}

export interface ToolIntegration {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: 'slack' | 'figma' | 'chrome' | 'instagram' | 'notion' | 'gmail' | 'messenger' | 'drive';
  connected: boolean;
  syncFrequency: string;
  color: string;
}

export interface CardDetails {
  id: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
  cardType: 'FinSuite Black' | 'FinSuite Cosmic Purple' | 'FinSuite Emerald' | 'FinSuite Cyber Blue';
  gradientClass: string;
  balance: number;
  isFrozen: boolean;
  dailyLimit: number;
  spentToday: number;
}
