// ─── Chart colour tokens ─────────────────────────────────────────────────────

export const CHART_BLUE = '#3392FF';
export const CHART_GREEN = '#22C55E';
export const CHART_AMBER = '#F59E0B';
export const CHART_RED = '#EF4444';
export const CHART_PARTIAL_BLUE = '#A8C8FF';
export const CHART_BLUE_EMPHASIS = '#0A7CFF';

export interface ChartTheme {
  text: { default: string; subtle: string; reverse: string };
  background: { default: string; reverse: string };
  border: { neutralSubtle: string };
}

export function getChartTokens(): ChartTheme {
  if (typeof document === 'undefined') {
    return {
      text: { default: '#0f172a', subtle: '#64748b', reverse: '#ffffff' },
      background: { default: '#ffffff', reverse: '#1f2937' },
      border: { neutralSubtle: 'rgba(0,0,0,0.08)' },
    };
  }
  const css = getComputedStyle(document.documentElement);
  const get = (v: string, fb: string): string => css.getPropertyValue(v).trim() || fb;
  return {
    text: {
      default: get('--dex-fgColor-default', '#0f172a'),
      subtle: get('--dex-fgColor-subtle', '#64748b'),
      reverse: get('--dex-fgColor-reverse', '#ffffff'),
    },
    background: {
      default: get('--dex-bgColor-default', '#ffffff'),
      reverse: get('--dex-bgColor-reverse', '#1f2937'),
    },
    border: {
      neutralSubtle: get('--dex-borderColor-neutral-subtle', 'rgba(0,0,0,0.08)'),
    },
  };
}

// ─── Login Engagement ────────────────────────────────────────────────────────

export interface LoginSeries {
  key: string;
  label: string;
  color: string;
}

export const LOGIN_SERIES: LoginSeries[] = [
  { key: 'Increasing', label: 'Increasing', color: CHART_GREEN },
  { key: 'Stable',     label: 'Stable',     color: CHART_BLUE  },
  { key: 'Declining',  label: 'Declining',  color: CHART_AMBER },
  { key: 'Dormant',    label: 'No logins',  color: CHART_RED   },
];

export const LOGIN_DONUT_COUNTS: Array<{ name: string; value: number }> = [
  { name: 'Increasing', value: 18 },
  { name: 'Stable',     value: 30 },
  { name: 'Declining',  value: 22 },
  { name: 'No logins',  value: 8  },
];

export const LOGIN_RANGE_OPTIONS = ['Last 30 days', 'Last 60 days', 'Last 90 days'];

export function getLoginRangeLabel(selectedRange: string): string {
  const days = parseInt(selectedRange.match(/\d+/)?.[0] ?? '30', 10);
  const end = new Date(2025, 9, 27);
  const start = new Date(end);
  start.setDate(end.getDate() - days + 1);
  const fmt = (d: Date): string =>
    d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  return `${fmt(start)} - ${fmt(end)}`;
}

// ─── Account Growth ───────────────────────────────────────────────────────────

export interface AccountGrowthPoint {
  label: string;
  accounts: number;
}

export const ACCOUNT_GROWTH_DATA: Record<string, AccountGrowthPoint[]> = {
  Day: [
    { label: '28 Sep', accounts: 2 }, { label: '29 Sep', accounts: 1 }, { label: '30 Sep', accounts: 3 },
    { label: '1 Oct',  accounts: 2 }, { label: '2 Oct',  accounts: 4 }, { label: '3 Oct',  accounts: 1 },
    { label: '4 Oct',  accounts: 3 }, { label: '5 Oct',  accounts: 5 }, { label: '6 Oct',  accounts: 2 },
    { label: '7 Oct',  accounts: 4 }, { label: '8 Oct',  accounts: 3 }, { label: '9 Oct',  accounts: 6 },
    { label: '10 Oct', accounts: 2 }, { label: '11 Oct', accounts: 1 }, { label: '12 Oct', accounts: 4 },
    { label: '13 Oct', accounts: 3 }, { label: '14 Oct', accounts: 5 }, { label: '15 Oct', accounts: 2 },
    { label: '16 Oct', accounts: 4 }, { label: '17 Oct', accounts: 3 }, { label: '18 Oct', accounts: 7 },
    { label: '19 Oct', accounts: 2 }, { label: '20 Oct', accounts: 5 }, { label: '21 Oct', accounts: 3 },
    { label: '22 Oct', accounts: 4 }, { label: '23 Oct', accounts: 6 }, { label: '24 Oct', accounts: 2 },
    { label: '25 Oct', accounts: 5 }, { label: '26 Oct', accounts: 3 }, { label: '27 Oct', accounts: 4 },
  ],
  Week: [
    { label: '5 Aug',  accounts: 8  }, { label: '12 Aug', accounts: 11 }, { label: '19 Aug', accounts: 7  },
    { label: '26 Aug', accounts: 13 }, { label: '2 Sep',  accounts: 9  }, { label: '9 Sep',  accounts: 15 },
    { label: '16 Sep', accounts: 10 }, { label: '23 Sep', accounts: 12 }, { label: '30 Sep', accounts: 8  },
    { label: '7 Oct',  accounts: 14 }, { label: '14 Oct', accounts: 11 }, { label: '21 Oct', accounts: 16 },
  ],
  Month: [
    { label: 'May',       accounts: 18 }, { label: 'June',      accounts: 22 },
    { label: 'July',      accounts: 19 }, { label: 'August',    accounts: 27 },
    { label: 'September', accounts: 24 }, { label: 'October',   accounts: 31 },
  ],
  Quarter: [
    { label: 'Q4 2024', accounts: 58 }, { label: 'Q1 2025', accounts: 71 },
    { label: 'Q2 2025', accounts: 84 }, { label: 'Q3 2025', accounts: 76 },
  ],
};

export const ACCOUNT_GROWTH_RANGE_META: Array<{ label: string; key: string }> = [
  { label: 'Last 30 days',  key: 'Day'     },
  { label: 'Last 90 days',  key: 'Week'    },
  { label: 'Last 6 months', key: 'Month'   },
  { label: 'Last year',     key: 'Quarter' },
];

const GROWTH_REF_DATE = new Date(2025, 9, 27);

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

export function getAccountGrowthRangeLabel(key: string): string {
  const end = GROWTH_REF_DATE;
  if (key === 'Day') {
    const start = new Date(end); start.setDate(end.getDate() - 29);
    return `${fmtDate(start)} – ${fmtDate(end)}`;
  }
  if (key === 'Week') {
    const start = new Date(end); start.setDate(end.getDate() - 83);
    return `${fmtDate(start)} – ${fmtDate(end)}`;
  }
  if (key === 'Month') {
    const start = new Date(end); start.setMonth(end.getMonth() - 6); start.setDate(1);
    return `${fmtDate(start)} – ${fmtDate(end)}`;
  }
  if (key === 'Quarter') {
    const start = new Date(end); start.setMonth(end.getMonth() - 11); start.setDate(1);
    return `${fmtDate(start)} – ${fmtDate(end)}`;
  }
  return '';
}

// ─── Churned Accounts ─────────────────────────────────────────────────────────

export const MONTHLY_CHURN: Array<{ month: string; churned: number }> = [
  { month: 'October',  churned: 4 },
  { month: 'November', churned: 6 },
  { month: 'December', churned: 3 },
  { month: 'January',  churned: 8 },
  { month: 'February', churned: 5 },
  { month: 'March',    churned: 7 },
];

export const TOTAL_CHURNED = 33;
export const PREV_CHURNED  = 28;
export const CHURN_DELTA_PCT = Math.round(((TOTAL_CHURNED - PREV_CHURNED) / PREV_CHURNED) * 100);

export const CHURN_RANGE_OPTIONS = [
  '30 days', '60 days', '90 days',
  'Month to date', 'Quarter to date', 'Year to date',
  '6 months', '12 months', 'All time (13 months)',
];

export function getChurnRangeLabel(opt: string): string {
  const end = new Date(2026, 2, 31);
  let start = new Date(end);
  if      (opt === '30 days')              { start.setDate(end.getDate() - 30); }
  else if (opt === '60 days')              { start.setDate(end.getDate() - 60); }
  else if (opt === '90 days')              { start.setDate(end.getDate() - 90); }
  else if (opt === 'Month to date')        { start = new Date(end.getFullYear(), end.getMonth(), 1); }
  else if (opt === 'Quarter to date')      { start = new Date(end.getFullYear(), Math.floor(end.getMonth() / 3) * 3, 1); }
  else if (opt === 'Year to date')         { start = new Date(end.getFullYear(), 0, 1); }
  else if (opt === '6 months')             { start = new Date(end); start.setMonth(end.getMonth() - 6);  start.setDate(1); }
  else if (opt === '12 months')            { start = new Date(end); start.setMonth(end.getMonth() - 12); start.setDate(1); }
  else if (opt === 'All time (13 months)') { start = new Date(end); start.setMonth(end.getMonth() - 13); start.setDate(1); }
  const fmt = (d: Date): string =>
    d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  return `${fmt(start)} - ${fmt(end)}`;
}

// ─── Automation Performance ───────────────────────────────────────────────────

export interface AutomationMetrics {
  contactsInAutomations: number;
  emailsSent: number;
  delivered: number;
  ctr: number;
  complaints: number;
  publishedAutomations: number;
  contactsInAutomationsDelta: number;
  emailsSentDelta: number;
  deliveredDelta: number;
  ctrDelta: number;
  complaintsDelta: number;
  publishedAutomationsDelta: number;
}

export const MOCK_PORTFOLIO_METRICS: AutomationMetrics = {
  contactsInAutomations:        14_820,
  emailsSent:                   142_500,
  delivered:                    138_230,
  ctr:                          0.034,
  complaints:                   42,
  publishedAutomations:         187,
  contactsInAutomationsDelta:   1_240,
  emailsSentDelta:              9_800,
  deliveredDelta:               9_200,
  ctrDelta:                     0.003,
  complaintsDelta:              5,
  publishedAutomationsDelta:    12,
};

export interface DistributionPoint {
  bucket: number;
  accountCount: number;
}

export const MOCK_DISTRIBUTION: DistributionPoint[] = [
  { bucket: 0,  accountCount: 3  }, { bucket: 1,  accountCount: 5  },
  { bucket: 2,  accountCount: 8  }, { bucket: 3,  accountCount: 6  },
  { bucket: 4,  accountCount: 9  }, { bucket: 5,  accountCount: 11 },
  { bucket: 6,  accountCount: 7  }, { bucket: 7,  accountCount: 5  },
  { bucket: 8,  accountCount: 8  }, { bucket: 9,  accountCount: 6  },
  { bucket: 10, accountCount: 4  }, { bucket: 11, accountCount: 3  },
  { bucket: 12, accountCount: 2  }, { bucket: 13, accountCount: 4  },
  { bucket: 14, accountCount: 2  }, { bucket: 15, accountCount: 1  },
];

export const AUTOMATION_DATE_RANGE_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Last 30 days', value: 'last30' },
  { label: 'Last 60 days', value: 'last60' },
  { label: 'Last 90 days', value: 'last90' },
  { label: 'Custom range', value: 'custom' },
];

export interface AutomationMetricDef {
  key: keyof AutomationMetrics;
  deltaKey: keyof AutomationMetrics;
  label: string;
  isRate: boolean;
  invertDelta: boolean;
}

export const AUTOMATION_METRIC_DEFS: AutomationMetricDef[] = [
  { key: 'contactsInAutomations', deltaKey: 'contactsInAutomationsDelta', label: 'Contacts in automations', isRate: false, invertDelta: false },
  { key: 'emailsSent',            deltaKey: 'emailsSentDelta',            label: 'Emails sent',            isRate: false, invertDelta: false },
  { key: 'delivered',             deltaKey: 'deliveredDelta',             label: 'Delivered',              isRate: false, invertDelta: false },
  { key: 'ctr',                   deltaKey: 'ctrDelta',                   label: 'Click-through rate',     isRate: true,  invertDelta: false },
  { key: 'complaints',            deltaKey: 'complaintsDelta',            label: 'Complaints',             isRate: false, invertDelta: true  },
  { key: 'publishedAutomations',  deltaKey: 'publishedAutomationsDelta',  label: 'Published automations',  isRate: false, invertDelta: false },
];

// ─── Email Broadcast ──────────────────────────────────────────────────────────

export interface EmailMetric {
  key: string;
  label: string;
  format: 'number' | 'percent';
  invertDelta: boolean;
}

export const EMAIL_METRICS: EmailMetric[] = [
  { key: 'broadcastsSent', label: 'Broadcasts sent',   format: 'number',  invertDelta: false },
  { key: 'emailsSent',     label: 'Emails sent',        format: 'number',  invertDelta: false },
  { key: 'delivered',      label: 'Delivered',           format: 'number',  invertDelta: false },
  { key: 'ctr',            label: 'Click-through rate', format: 'percent', invertDelta: false },
  { key: 'optIns',         label: 'Opt-ins',            format: 'number',  invertDelta: false },
  { key: 'optOuts',        label: 'Opt-outs',           format: 'number',  invertDelta: true  },
];

export const EMAIL_WEEK_LABELS = ['7 Apr', '14 Apr', '21 Apr', '28 Apr', '5 May', '12 May', '19 May', '26 May'];

export const EMAIL_TREND_DATA: Record<string, number[]> = {
  broadcastsSent: [31, 27, 35, 29, 42, 38, 44, 18],
  emailsSent:     [4810, 4290, 5340, 4970, 6120, 5680, 6440, 2620],
  delivered:      [4650, 4150, 5190, 4820, 5940, 5510, 6240, 2540],
  ctr:            [3.4, 3.1, 3.7, 3.5, 3.9, 3.8, 4.1, 1.8],
  optIns:         [148, 132, 161, 155, 172, 168, 184, 78],
  optOuts:        [12, 10, 14, 11, 13, 9, 15, 6],
};

interface EmailMetricEntry { value: number; prev: number; }
type EmailRangeData = Record<string, EmailMetricEntry>;

export const EMAIL_AGGREGATE_DATA: Record<string, EmailRangeData> = {
  'Last 30 days': {
    broadcastsSent: { value: 248,    prev: 220   },
    emailsSent:     { value: 42150,  prev: 38900 },
    delivered:      { value: 40820,  prev: 37640 },
    ctr:            { value: 3.8,    prev: 4.1   },
    optIns:         { value: 1240,   prev: 1075  },
    optOuts:        { value: 89,     prev: 82    },
  },
  'Last 60 days': {
    broadcastsSent: { value: 512,    prev: 468   },
    emailsSent:     { value: 86300,  prev: 79100 },
    delivered:      { value: 83580,  prev: 76440 },
    ctr:            { value: 3.6,    prev: 3.9   },
    optIns:         { value: 2510,   prev: 2210  },
    optOuts:        { value: 182,    prev: 168   },
  },
  'Last 90 days': {
    broadcastsSent: { value: 780,    prev: 695    },
    emailsSent:     { value: 131200, prev: 120000 },
    delivered:      { value: 127100, prev: 115900 },
    ctr:            { value: 3.5,    prev: 3.7    },
    optIns:         { value: 3820,   prev: 3490   },
    optOuts:        { value: 271,    prev: 248    },
  },
  'Custom range': {
    broadcastsSent: { value: 248,   prev: 220   },
    emailsSent:     { value: 42150, prev: 38900 },
    delivered:      { value: 40820, prev: 37640 },
    ctr:            { value: 3.8,   prev: 4.1   },
    optIns:         { value: 1240,  prev: 1075  },
    optOuts:        { value: 89,    prev: 82    },
  },
};

export const EMAIL_AVERAGE_DATA: Record<string, EmailRangeData> = {
  'Last 30 days': {
    broadcastsSent: { value: 8.3,   prev: 7.3   },
    emailsSent:     { value: 1405,  prev: 1297  },
    delivered:      { value: 1361,  prev: 1255  },
    ctr:            { value: 3.8,   prev: 4.1   },
    optIns:         { value: 41.3,  prev: 35.8  },
    optOuts:        { value: 3.0,   prev: 2.7   },
  },
  'Last 60 days': {
    broadcastsSent: { value: 17.1,  prev: 15.6  },
    emailsSent:     { value: 2877,  prev: 2637  },
    delivered:      { value: 2786,  prev: 2548  },
    ctr:            { value: 3.6,   prev: 3.9   },
    optIns:         { value: 83.7,  prev: 73.7  },
    optOuts:        { value: 6.1,   prev: 5.6   },
  },
  'Last 90 days': {
    broadcastsSent: { value: 26.0,  prev: 23.2  },
    emailsSent:     { value: 4373,  prev: 4000  },
    delivered:      { value: 4237,  prev: 3863  },
    ctr:            { value: 3.5,   prev: 3.7   },
    optIns:         { value: 127.3, prev: 116.3 },
    optOuts:        { value: 9.0,   prev: 8.3   },
  },
  'Custom range': {
    broadcastsSent: { value: 8.3,  prev: 7.3  },
    emailsSent:     { value: 1405, prev: 1297 },
    delivered:      { value: 1361, prev: 1255 },
    ctr:            { value: 3.8,  prev: 4.1  },
    optIns:         { value: 41.3, prev: 35.8 },
    optOuts:        { value: 3.0,  prev: 2.7  },
  },
};

export const EMAIL_RANGE_OPTIONS = ['Last 30 days', 'Last 60 days', 'Last 90 days', 'Custom range'];
