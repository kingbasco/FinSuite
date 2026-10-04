import { Transaction, FriendContact, CountryInfo, ToolIntegration, CardDetails } from '../types';

export const INITIAL_BALANCE = 9823.28;
export const EXTRA_EARNED_MONTH = 2832.19;

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Netflix Subscription',
    subtitle: 'Automated Monthly Billing',
    category: 'Subscription',
    amount: -24.00,
    date: 'Today, 2:45 PM',
    iconType: 'netflix',
    isMonthly: true,
    status: 'completed'
  },
  {
    id: 'tx-2',
    title: 'Spotify Premium Family',
    subtitle: 'Automated Monthly Billing',
    category: 'Subscription',
    amount: -13.00,
    date: 'Yesterday, 8:12 AM',
    iconType: 'spotify',
    isMonthly: true,
    status: 'completed'
  },
  {
    id: 'tx-3',
    title: 'Apple iCloud+ Storage',
    subtitle: '2TB Cloud Storage Plan',
    category: 'Subscription',
    amount: -50.00,
    date: 'Oct 01, 2026',
    iconType: 'icloud',
    isMonthly: true,
    status: 'completed'
  },
  {
    id: 'tx-4',
    title: 'Wire Transfer from Client',
    subtitle: 'Acme Corp Q3 Retainer',
    category: 'Income',
    amount: 4239.12,
    date: 'Sep 29, 2026',
    iconType: 'salary',
    status: 'completed'
  },
  {
    id: 'tx-5',
    title: 'Global Transfer to Elena',
    subtitle: 'Sent via SEPA Instant (EUR)',
    category: 'Transfer',
    amount: -350.00,
    date: 'Sep 28, 2026',
    iconType: 'transfer',
    status: 'completed'
  },
  {
    id: 'tx-6',
    title: 'Artisan Dining & Bistro',
    subtitle: 'FinSuite Card ···3507',
    category: 'Expense',
    amount: -86.50,
    date: 'Sep 26, 2026',
    iconType: 'dining',
    status: 'completed'
  }
];

export const EXPENSE_CATEGORIES = [
  {
    name: 'Rent and Living',
    amount: 3839.25,
    percentage: 55,
    color: '#3B82F6', // Blue
    accentBg: 'bg-blue-500'
  },
  {
    name: 'Transportation',
    amount: 1220.45,
    percentage: 20,
    color: '#8B5CF6', // Purple
    accentBg: 'bg-purple-500'
  },
  {
    name: 'Saving & Investments',
    amount: 984.92,
    percentage: 15,
    color: '#10B981', // Green
    accentBg: 'bg-emerald-500'
  },
  {
    name: 'Entertainment',
    amount: 735.12,
    percentage: 10,
    color: '#F59E0B', // Amber
    accentBg: 'bg-amber-500'
  }
];

export const TOTAL_MONTHLY_EXPENSE = 1928.92;

export const COUNTRIES: CountryInfo[] = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸', rateToUSD: 1.0, symbol: '$' },
  { code: 'ES', name: 'Spain', currency: 'EUR', flag: '🇪🇸', rateToUSD: 0.92, symbol: '€' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', flag: '🇵🇹', rateToUSD: 0.92, symbol: '€' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', rateToUSD: 0.78, symbol: '£' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪', rateToUSD: 0.92, symbol: '€' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵', rateToUSD: 148.5, symbol: '¥' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺', rateToUSD: 1.52, symbol: 'A$' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦', rateToUSD: 1.36, symbol: 'C$' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', flag: '🇨🇭', rateToUSD: 0.88, symbol: 'CHF' },
  { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷', rateToUSD: 0.92, symbol: '€' },
];

export const FRIENDS_CONTACTS: FriendContact[] = [
  { id: 'f1', name: 'Sarah Jenkins', handle: '@sarahj', avatarColor: 'from-pink-400 to-rose-500', country: 'United States', flag: '🇺🇸', initials: 'SJ' },
  { id: 'f2', name: 'John Carter', handle: '@johnc', avatarColor: 'from-blue-400 to-indigo-600', country: 'United Kingdom', flag: '🇬🇧', initials: 'JC' },
  { id: 'f3', name: 'Elena Rostova', handle: '@elenar', avatarColor: 'from-purple-400 to-violet-600', country: 'Spain', flag: '🇪🇸', initials: 'ER' },
  { id: 'f4', name: 'Marcus Vance', handle: '@marcusv', avatarColor: 'from-amber-400 to-orange-500', country: 'Germany', flag: '🇩🇪', initials: 'MV' },
  { id: 'f5', name: 'David Chen', handle: '@davidc', avatarColor: 'from-emerald-400 to-teal-600', country: 'Japan', flag: '🇯🇵', initials: 'DC' }
];

export const MOCK_CARDS: CardDetails[] = [
  {
    id: 'c1',
    cardNumber: '3455 4562 7710 3507',
    holderName: 'John Carter',
    expiryDate: '12/28',
    cvv: '892',
    cardType: 'FinSuite Cosmic Purple',
    gradientClass: 'from-indigo-600 via-purple-600 to-violet-800',
    balance: 9823.28,
    isFrozen: false,
    dailyLimit: 2500,
    spentToday: 412.50
  },
  {
    id: 'c2',
    cardNumber: '5421 8890 2341 9104',
    holderName: 'John Carter',
    expiryDate: '06/29',
    cvv: '341',
    cardType: 'FinSuite Emerald',
    gradientClass: 'from-emerald-600 via-teal-700 to-slate-900',
    balance: 4210.00,
    isFrozen: false,
    dailyLimit: 5000,
    spentToday: 120.00
  },
  {
    id: 'c3',
    cardNumber: '4929 1102 7482 6631',
    holderName: 'John Carter',
    expiryDate: '11/30',
    cvv: '715',
    cardType: 'FinSuite Black',
    gradientClass: 'from-slate-900 via-zinc-900 to-black',
    balance: 15420.50,
    isFrozen: false,
    dailyLimit: 10000,
    spentToday: 890.00
  }
];

export const TOOL_INTEGRATIONS: ToolIntegration[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Instant transaction notifications and approval alerts directly in your team channels.',
    iconName: 'slack',
    connected: true,
    syncFrequency: 'Real-time',
    color: '#ECB22E'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design Tools',
    description: 'Sync design budget spending, seat licenses, and plugin micro-transactions.',
    iconName: 'figma',
    connected: true,
    syncFrequency: 'Daily',
    color: '#F24E1E'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Workspace',
    description: 'Auto-sync categorized monthly expenses into your team finance & runway database.',
    iconName: 'notion',
    connected: true,
    syncFrequency: 'Hourly',
    color: '#000000'
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    category: 'Browser Extension',
    description: 'One-click virtual card creation and cashback alerts while browsing e-commerce sites.',
    iconName: 'chrome',
    connected: true,
    syncFrequency: 'Active',
    color: '#4285F4'
  },
  {
    id: 'instagram',
    name: 'Instagram Shop',
    category: 'Social Commerce',
    description: 'Track ad spend ROAS and social merchant checkout receipts in unified analytics.',
    iconName: 'instagram',
    connected: false,
    syncFrequency: 'Manual',
    color: '#E4405F'
  },
  {
    id: 'gmail',
    name: 'Gmail & Workspace',
    category: 'Email & Receipts',
    description: 'AI-assisted receipt scraping and invoice attachment matching for effortless tax prep.',
    iconName: 'gmail',
    connected: true,
    syncFrequency: 'Real-time',
    color: '#EA4335'
  },
  {
    id: 'messenger',
    name: 'Messenger',
    category: 'Messaging',
    description: 'Receive monthly spending summaries and two-factor payment approvals on Messenger.',
    iconName: 'messenger',
    connected: false,
    syncFrequency: 'Manual',
    color: '#00B2FF'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    category: 'Cloud Storage',
    description: 'Automatically backup monthly encrypted PDF statements and tax archives.',
    iconName: 'drive',
    connected: true,
    syncFrequency: 'Monthly',
    color: '#34A853'
  }
];

export const CHART_DATA_POINTS = [
  { label: 'Jan', val: 3200, height: '35%' },
  { label: 'Feb', val: 4100, height: '45%' },
  { label: 'Mar', val: 5600, height: '58%' },
  { label: 'Apr', val: 6800, height: '70%' },
  { label: 'May', val: 4239.12, height: '88%', isHighlight: true },
  { label: 'Jun', val: 5100, height: '52%' },
  { label: 'Jul', val: 6200, height: '64%' },
  { label: 'Aug', val: 4900, height: '50%' },
  { label: 'Sep', val: 5900, height: '60%' },
];
