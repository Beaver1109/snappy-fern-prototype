export interface AlertMetaItem {
  label: string;
  value: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'activity';
  alertKind?: string;
  title: string;
  description: string;
  customerName: string;
  tenantId: string;
  appId: string;
  isRead: boolean;
  createdAt: string;
  triggeredLabel: string;
  triggeringUser?: string;
  metadata: AlertMetaItem[];
  archived?: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: 'alert-first-login-ak7816',
    type: 'activity',
    alertKind: 'first-login',
    title: 'New user first login',
    description: 'Sarah Johnson logged into the app for the first time.',
    customerName: 'Alpha Tech Solutions',
    tenantId: 'abc123',
    appId: 'ak7816',
    isRead: false,
    createdAt: '2024-03-15T08:00:00Z',
    triggeredLabel: 'Triggered 2 hours ago',
    triggeringUser: 'Sarah Johnson',
    metadata: [
      { label: 'User', value: 'Sarah Johnson' },
      { label: 'Role', value: 'User' },
    ],
  },
  {
    id: 'alert-1',
    type: 'critical',
    title: 'No users have logged in for 30+ days',
    description: 'No users have logged into this app for 45 days. This signals disengagement and churn risk.',
    customerName: 'Alpha Tech Solutions',
    tenantId: 'abc123',
    appId: 'ak7816',
    isRead: false,
    createdAt: '2024-03-15T10:00:00Z',
    triggeredLabel: 'Triggered 3 hours ago',
    metadata: [
      { label: 'Days since login', value: '45 days (threshold: 30 days)' },
      { label: 'Contract expires', value: 'Oct 31, 2025' },
    ],
  },
  {
    id: 'alert-2',
    type: 'critical',
    title: 'Email complaint rate exceeds 2.8%',
    description: 'Complaint rate has hit 3.2%, above the 2.8% threshold. Review recent campaigns.',
    customerName: 'Beta Dynamics Inc',
    tenantId: 'def456',
    appId: 'bq4951',
    isRead: false,
    createdAt: '2024-03-14T08:00:00Z',
    triggeredLabel: 'Triggered 2 hours ago',
    metadata: [
      { label: 'Complaint rate', value: '3.2% (threshold: 2.8%)' },
      { label: 'Last 7 days', value: '47 complaints' },
    ],
  },
  {
    id: 'alert-2b',
    type: 'warning',
    title: 'Contact usage over 90% of plan limit',
    description: 'This account is using 94% of their contact plan limit. Reach out to discuss an upgrade.',
    customerName: 'Beta Dynamics Inc',
    tenantId: 'def456',
    appId: 'bq4951',
    isRead: false,
    createdAt: '2024-03-13T14:00:00Z',
    triggeredLabel: 'Triggered 1 day ago',
    metadata: [
      { label: 'Contact usage', value: '94% (threshold: 90%)' },
      { label: 'Contacts', value: '4,700 / 5,000' },
    ],
  },
  {
    id: 'alert-2c',
    type: 'warning',
    title: 'Email broadcast bounce rate exceeds 2.8%',
    description: 'The "Spring Promo" broadcast had a 4.1% bounce rate.',
    customerName: 'Beta Dynamics Inc',
    tenantId: 'def456',
    appId: 'bq4951',
    isRead: false,
    createdAt: '2024-03-12T10:00:00Z',
    triggeredLabel: 'Triggered 6 hours ago',
    metadata: [
      { label: 'Bounce rate', value: '4.1% (threshold: 2.8%)' },
      { label: 'Broadcast', value: 'Spring Promo' },
    ],
  },
  {
    id: 'alert-3',
    type: 'critical',
    title: 'Automation has an error that needs action',
    description: '"Welcome Series" automation has stopped. 127 contacts are queued.',
    customerName: 'Cortex Systems Ltd.',
    tenantId: 'ghi789',
    appId: 'ghi8204',
    isRead: false,
    createdAt: '2024-03-13T12:00:00Z',
    triggeredLabel: 'Triggered 1 hour ago',
    metadata: [
      { label: 'Automation', value: 'Welcome Series' },
      { label: 'Contacts affected', value: '127' },
    ],
  },
  {
    id: 'alert-4',
    type: 'warning',
    title: 'Contact usage over 90% of plan limit',
    description: 'This account is using 94% of their contact plan limit. Reach out to discuss an upgrade.',
    customerName: 'Horizon Technologies',
    tenantId: 'jkl012',
    appId: 'bs1037',
    isRead: true,
    createdAt: '2024-03-12T09:00:00Z',
    triggeredLabel: 'Triggered 1 day ago',
    metadata: [
      { label: 'Contact usage', value: '94% (threshold: 90%)' },
      { label: 'Contacts', value: '4,700 / 5,000' },
    ],
  },
  {
    id: 'alert-5',
    type: 'warning',
    title: 'Email broadcast bounce rate exceeds 2.8%',
    description: 'The "Spring Promo" broadcast had a 4.1% bounce rate.',
    customerName: 'Iota Robotics Co.',
    tenantId: 'mno345',
    appId: 'kl6754',
    isRead: false,
    createdAt: '2024-03-11T14:00:00Z',
    triggeredLabel: 'Triggered 6 hours ago',
    metadata: [
      { label: 'Bounce rate', value: '4.1% (threshold: 2.8%)' },
      { label: 'Broadcast', value: 'Spring Promo' },
    ],
  },
  {
    id: 'alert-6',
    type: 'activity',
    title: 'New subscription created',
    description: 'A new Pro plan subscription was created for this account.',
    customerName: 'Lambda Logistics',
    tenantId: 'bcd890',
    appId: 'bc5821',
    isRead: false,
    createdAt: '2024-03-10T11:00:00Z',
    triggeredLabel: 'Triggered 2 hours ago',
    metadata: [
      { label: 'Plan', value: 'Pro' },
      { label: 'Optional data point', value: '' },
    ],
  },
  {
    id: 'alert-7',
    type: 'activity',
    title: 'Client upgraded to Enterprise',
    description: 'Account upgraded from Pro to Enterprise plan.',
    customerName: 'Omega Applications',
    tenantId: 'efg123',
    appId: 'lo7643',
    isRead: false,
    createdAt: '2024-03-09T15:00:00Z',
    triggeredLabel: 'Triggered 1 day ago',
    metadata: [
      { label: 'New plan', value: 'Enterprise' },
      { label: 'Optional data point', value: '' },
    ],
  },
  {
    id: 'alert-8',
    type: 'critical',
    title: 'Payment failed — account at risk',
    description: 'Last payment attempt was declined. Account may be suspended if not resolved.',
    customerName: 'Pinnacle Ventures',
    tenantId: 'hij456',
    appId: 'pv2209',
    isRead: true,
    createdAt: '2024-03-08T09:00:00Z',
    triggeredLabel: 'Triggered 5 hours ago',
    metadata: [
      { label: 'Payment status', value: 'Declined' },
      { label: 'Days overdue', value: '12' },
    ],
    archived: true,
  },
];

export const initialAlerts: Alert[] = mockAlerts.filter((a) => !a.archived);
export const initialArchivedAlerts: Alert[] = mockAlerts.filter((a) => a.archived).map((a) => ({ ...a }));
