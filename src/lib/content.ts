export const BRAND = {
  name: 'GlobPayFlow',
  tagline: 'Crypto payments, built for business.',
} as const;

export const BLOCKCHAINS = [
  'Ethereum',
  'BNB Smart Chain',
  'Tron',
  'Solana',
  'Bitcoin',
  'Litecoin',
  'Dogecoin',
  'XRP Ledger',
  'Avalanche C-Chain',
  'Polygon',
  'Base',
] as const;

export type Blockchain = (typeof BLOCKCHAINS)[number];

export const CURRENCIES = [
  'USDT',
  'USDC',
  'BTC',
  'ETH',
  'SOL',
  'BNB',
  'XRP',
  'TRX',
  'LTC',
  'DOGE',
  'SHIB',
  'AVAX',
  'POL',
] as const;

export type Currency = (typeof CURRENCIES)[number];

export const ASSETS = [
  { currency: 'USDT', networks: ['Tron', 'Ethereum', 'BNB Chain', 'Solana', 'Base'] },
  { currency: 'USDC', networks: ['Ethereum', 'BNB Chain', 'Base'] },
  { currency: 'BTC', networks: ['Bitcoin'] },
  { currency: 'ETH', networks: ['Ethereum', 'Base'] },
  { currency: 'SOL', networks: ['Solana'] },
  { currency: 'BNB', networks: ['BNB Chain'] },
  { currency: 'TRX', networks: ['Tron'] },
  { currency: 'XRP', networks: ['XRP Ledger'] },
  { currency: 'LTC', networks: ['Litecoin'] },
  { currency: 'DOGE', networks: ['Dogecoin'] },
  { currency: 'SHIB', networks: ['Ethereum'] },
  { currency: 'AVAX', networks: ['Avalanche C-Chain'] },
  { currency: 'POL', networks: ['Polygon'] },
] as const;

export const MERCHANT_DASHBOARD_PAGES = [
  'Dashboard',
  'Wallet',
  'Deposit',
  'Withdraw',
  'Transactions',
  'Whitelist Addresses',
  'Payment Methods',
] as const;

export type MerchantDashboardPage = (typeof MERCHANT_DASHBOARD_PAGES)[number];

export const FLOWS = {
  deposit: {
    title: 'Deposit',
    description:
      'Order creates a deposit address, customer sends crypto, status updates automatically when the network payment is detected.',
  },
  withdrawal: {
    title: 'Withdrawal',
    description:
      'Crypto to an approved address, may be pending approval before it is sent, optional callback URL, fee and net amount shown in response.',
  },
  cryptoToFiat: {
    title: 'Crypto-to-Fiat',
    description: 'Payout to a bank account in Argentina and Brazil.',
  },
  refunds: {
    title: 'Refunds',
    operations: ['create', 'list', 'pending'],
    description: 'Create, list, and monitor pending refund requests.',
  },
  balancesAndHistory: {
    title: 'Balances and Transaction History',
    description: 'Balances and transaction history with filters.',
  },
} as const;

export const COMPANY_CONTROLS = [
  'companies with multiple merchants',
  'per-company limits',
  'roles and permissions',
  'sub-users',
  'per-company fees',
  'features switched on/off per company',
  'support tickets',
  'activity logs',
] as const;

export const FEES = {
  notice: 'Fees are configured per client.',
  scope: 'configured per company/merchant',
  types: ['percentage', 'fixed', 'network fee'],
  withdrawals: 'tiered withdrawal fees',
} as const;

export const SIGN_IN = {
  passkey:
    'merchants sign in with a passkey (biometrics or device password, no password typing at the second step)',
  otpBackup: 'a one-time password is available as a backup method',
  registration: 'passkey is registered once on a setup page',
  protection: 'login is protected by reCAPTCHA',
} as const;

export const SECURITY = [
  'passkey sign-in',
  'HMAC-SHA256 signed API requests with a 5-minute timestamp window',
  'withdrawals only to approved (whitelisted) addresses',
  'withdrawal approval flow',
  'role-based permissions',
  'activity logs',
  "secret key stays on merchant's server",
  'duplicate-event protection on deposit callbacks',
] as const;

export const API = {
  authHeaders: [
    'api-key',
    'api-timestamp (ms)',
    'api-content-hash (SHA256 of body)',
    'api-signature (HMAC-SHA256 of timestamp + METHOD + path + contentHash)',
  ],
  endpoints: [
    { method: 'GET', path: '/api/deposit/currencies' },
    { method: 'GET', path: '/api/deposit/networks/{currency_id}' },
    { method: 'POST', path: '/api/company/deposit-transactions' },
    {
      method: 'POST',
      path: '/api/company/withdrawal-transactions',
      details: 'type: crypto | crypto_to_fiat',
    },
    { method: 'GET', path: '/api/balances/wallet' },
    { method: 'GET', path: '/api/transactions/history' },
    { method: 'POST', path: '/api/refund/create' },
    { method: 'GET', path: '/api/refund/pending' },
    { method: 'GET', path: '/api/refund/list' },
  ],
  statusCodes: [200, 201, 400, 401, 403, 404, 409, 422, 500, 503],
  successSemantics: 'Success means "accepted", not always final blockchain settlement.',
} as const;
