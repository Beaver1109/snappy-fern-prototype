export const DAILY = 'daily';
export const WEEKLY = 'weekly';
export const MONTHLY = 'monthly';
export const ALERTS_ON = 'turn-all-on';
export const ALERTS_OFF = 'turn-all-off';
export const SELECT_ACTION = 'select-action';
export const SELECT_FREQUENCY = 'select-frequency';

export interface AlertPrefItem {
  id: string;
  label: string;
  enabled: boolean;
  frequency: string;
}

export interface AlertGroup {
  id: string;
  badge: string;
  badgeVariant: 'danger' | 'warning' | 'info';
  title: string;
  alerts: AlertPrefItem[];
}

export function createDefaultAlertGroups(): AlertGroup[] {
  return [
    {
      id: 'critical',
      badge: 'Critical',
      badgeVariant: 'danger',
      title: 'Require immediate action',
      alerts: [
        { id: 'no-logins-30-days', label: 'No logins for 30+ days', enabled: true, frequency: DAILY },
        { id: 'email-complaint-rate', label: 'Email complaint rate exceeds 2.8%', enabled: true, frequency: DAILY },
        { id: 'automation-error', label: 'Automation error', enabled: true, frequency: DAILY },
        { id: 'google-business-profile-disconnected', label: 'Google Business Profile disconnected', enabled: true, frequency: DAILY },
        { id: 'social-account-disconnected', label: 'Social account disconnected', enabled: true, frequency: DAILY },
      ],
    },
    {
      id: 'warning',
      badge: 'Warning',
      badgeVariant: 'warning',
      title: 'Needs attention',
      alerts: [
        { id: 'contact-usage-over-90', label: 'Contact usage over 90%', enabled: true, frequency: DAILY },
        { id: 'bounce-rate-over-threshold', label: 'Email bounce rate exceeds 2.8%', enabled: true, frequency: DAILY },
        { id: 'no-broadcasts-60-days', label: 'No broadcasts in 60+ days', enabled: true, frequency: DAILY },
      ],
    },
    {
      id: 'activity',
      badge: 'Activity',
      badgeVariant: 'info',
      title: 'Updates',
      alerts: [
        { id: 'first-user-login', label: "User's first login", enabled: true, frequency: DAILY },
        { id: 'new-user-added', label: 'New user added', enabled: true, frequency: DAILY },
        { id: 'new-automation-published', label: 'New automation published', enabled: false, frequency: DAILY },
      ],
    },
  ];
}

export const frequencyOptions = [
  { value: DAILY, label: 'Daily' },
  { value: WEEKLY, label: 'Weekly' },
  { value: MONTHLY, label: 'Monthly' },
  { value: SELECT_FREQUENCY, label: 'Select frequency', disabled: true },
];

export const alertActionOptions = [
  { value: ALERTS_ON, label: 'Turn all on' },
  { value: ALERTS_OFF, label: 'Turn all off' },
  { value: SELECT_ACTION, label: 'Select action', disabled: true },
];

export const individualFrequencyOptions = [
  { value: DAILY, label: 'Daily' },
  { value: WEEKLY, label: 'Weekly' },
  { value: MONTHLY, label: 'Monthly' },
];
