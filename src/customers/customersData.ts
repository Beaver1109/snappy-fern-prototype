export interface Customer {
  tenantId: string;
  appId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  product: string;
  billingStatus: string;
  creationDate: string;
  activeUsers: string;
  contactsUsage: string;
  markatableContacts: number;
  complaintRate: number;
  allAutomations: number;
  partnerAutomations: number;
  customerAutomations: number;
  contactsInAutomation: number;
  newContacts: number;
  broadcasts: number;
  logins: number;
  lastLoginDate: string;
  totalLoginTrend: string;
  loginTrendPercent: number | null;
  daysSinceLastLogin: number;
}

export interface CustomerUser {
  firstName: string;
  lastName: string;
  userRole: string;
  email: string;
  userStatus: string;
  userType: string;
  lastLoginDatetime: string | null;
  totalLoginCount: number;
  totalLoginTrend: string | null;
  loginTrendPercent: number | null;
  daysSinceLastLogin: number | null;
}

export interface CustomerAutomation {
  automationName: string;
  automationId: string;
  status: string;
  uniqueRecipients: number;
  totalSends: number;
  totalDeliveries: number;
  clickThroughRate: number;
  totalComplaints: number;
}

export interface CustomerDetailData {
  users: CustomerUser[];
  automations: CustomerAutomation[];
  activity: { broadcastsSent: number; contactsInAutomation: number; newContacts: number };
  loginSummary: { totalLogins: number };
  cardData: { complaintRate: number; markatableContacts: number };
}

export const mockCustomers: Customer[] = [
  { tenantId: 'abc123', appId: 'ak7816', companyName: 'Alpha Tech Solutions', contactName: 'John Smith', contactEmail: 'john@alphatech.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-01-15', activeUsers: '5/10', contactsUsage: '2,450/5,000', markatableContacts: 1250, complaintRate: 0.5, allAutomations: 18, partnerAutomations: 16, customerAutomations: 2, contactsInAutomation: 145, newContacts: 67, broadcasts: 2, logins: 17, lastLoginDate: '10/28/25', totalLoginTrend: 'increasing', loginTrendPercent: 42, daysSinceLastLogin: 3 },
  { tenantId: 'def456', appId: 'bq4951', companyName: 'Beta Dynamics Inc', contactName: 'Lisa Chen', contactEmail: 'lisa@betadynamics.com', product: 'Max', billingStatus: 'Active', creationDate: '2023-03-22', activeUsers: '3/5', contactsUsage: '890/2,500', markatableContacts: 650, complaintRate: 0.2, allAutomations: 24, partnerAutomations: 20, customerAutomations: 4, contactsInAutomation: 582, newContacts: 83, broadcasts: 5, logins: 7, lastLoginDate: '10/29/25', totalLoginTrend: 'declining', loginTrendPercent: 28, daysSinceLastLogin: 12 },
  { tenantId: 'ghi789', appId: 'ghi8204', companyName: 'Cortex Systems Ltd.', contactName: 'David Park', contactEmail: 'david@cortexsystems.com', product: 'Pro', billingStatus: 'Cancelled', creationDate: '2022-11-08', activeUsers: '0/3', contactsUsage: '1,200/2,500', markatableContacts: 400, complaintRate: 3.1, allAutomations: 5, partnerAutomations: 3, customerAutomations: 2, contactsInAutomation: 749, newContacts: 29, broadcasts: 7, logins: 0, lastLoginDate: '10/30/25', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 34 },
  { tenantId: 'jkl012', appId: 'bs1037', companyName: 'Horizon Technologies', contactName: 'Rachel Kim', contactEmail: 'rachel@horizontech.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2024-02-14', activeUsers: '8/15', contactsUsage: '4,100/10,000', markatableContacts: 3200, complaintRate: 0.8, allAutomations: 16, partnerAutomations: 14, customerAutomations: 2, contactsInAutomation: 837, newContacts: 74, broadcasts: 3, logins: 9, lastLoginDate: '11/03/25', totalLoginTrend: 'increasing', loginTrendPercent: 18, daysSinceLastLogin: 7 },
  { tenantId: 'mno345', appId: 'kl6754', companyName: 'Iota Robotics Co.', contactName: 'Nadia Reeves', contactEmail: 'nadia@iotarobotics.com', product: 'Classic', billingStatus: 'Active', creationDate: '2023-07-30', activeUsers: '2/5', contactsUsage: '500/1,000', markatableContacts: 280, complaintRate: 1.5, allAutomations: 10, partnerAutomations: 5, customerAutomations: 5, contactsInAutomation: 104, newContacts: 11, broadcasts: 2, logins: 12, lastLoginDate: '11/04/25', totalLoginTrend: 'stable', loginTrendPercent: 4, daysSinceLastLogin: 6 },
  { tenantId: 'pqr678', appId: 'zc3021', companyName: 'Zeta Consulting', contactName: 'Alex Morgan', contactEmail: 'alex@zetaconsulting.com', product: 'Max', billingStatus: 'Active', creationDate: '2023-09-12', activeUsers: '4/8', contactsUsage: '1,800/5,000', markatableContacts: 920, complaintRate: 0.3, allAutomations: 15, partnerAutomations: 10, customerAutomations: 5, contactsInAutomation: 756, newContacts: 95, broadcasts: 1, logins: 15, lastLoginDate: '11/05/25', totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 5 },
  { tenantId: 'stu901', appId: 'ef7802', companyName: 'Eta Financial Advisors', contactName: 'Sam Taylor', contactEmail: 'sam@etafinancial.com', product: 'Pro', billingStatus: 'Active', creationDate: '2024-06-01', activeUsers: '1/3', contactsUsage: '120/500', markatableContacts: 80, complaintRate: 0, allAutomations: 9, partnerAutomations: 7, customerAutomations: 2, contactsInAutomation: 265, newContacts: 38, broadcasts: 8, logins: 80, lastLoginDate: '11/02/25', totalLoginTrend: 'increasing', loginTrendPercent: 61, daysSinceLastLogin: 8 },
  { tenantId: 'vwx234', appId: 'tr9154', companyName: 'Theta Real Estate', contactName: 'Jordan Blake', contactEmail: 'jordan@thetarealestate.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-05-18', activeUsers: '6/10', contactsUsage: '3,200/5,000', markatableContacts: 2100, complaintRate: 0.6, allAutomations: 21, partnerAutomations: 18, customerAutomations: 3, contactsInAutomation: 912, newContacts: 92, broadcasts: 8, logins: 12, lastLoginDate: '10/31/25', totalLoginTrend: 'stable', loginTrendPercent: 5, daysSinceLastLogin: 10 },
  { tenantId: 'yza567', appId: 'ih4390', companyName: 'Iota Health & Wellness', contactName: 'Morgan Lee', contactEmail: 'morgan@iotahealth.com', product: 'Classic', billingStatus: 'Cancelled', creationDate: '2022-08-25', activeUsers: '0/5', contactsUsage: '750/2,500', markatableContacts: 310, complaintRate: 2.0, allAutomations: 11, partnerAutomations: 9, customerAutomations: 2, contactsInAutomation: 318, newContacts: 50, broadcasts: 10, logins: 0, lastLoginDate: '11/01/25', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 52 },
  { tenantId: 'bcd890', appId: 'bc5821', companyName: 'Lambda Logistics', contactName: 'Marcus Lee', contactEmail: 'marcus@lambdalogistics.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-01-10', activeUsers: '7/12', contactsUsage: '2,900/5,000', markatableContacts: 1800, complaintRate: 0.4, allAutomations: 17, partnerAutomations: 12, customerAutomations: 5, contactsInAutomation: 490, newContacts: 8, broadcasts: 8, logins: 95, lastLoginDate: '11/06/25', totalLoginTrend: 'increasing', loginTrendPercent: 33, daysSinceLastLogin: 4 },
  { tenantId: 'efg123', appId: 'lo7643', companyName: 'Omega Applications', contactName: 'Ana Morales', contactEmail: 'ana@omegaapps.com', product: 'Pro', billingStatus: 'Active', creationDate: '2023-11-20', activeUsers: '3/5', contactsUsage: '680/1,000', markatableContacts: 450, complaintRate: 0.7, allAutomations: 9, partnerAutomations: 6, customerAutomations: 3, contactsInAutomation: 213, newContacts: 54, broadcasts: 7, logins: 37, lastLoginDate: '11/07/25', totalLoginTrend: 'declining', loginTrendPercent: 31, daysSinceLastLogin: 3 },
  { tenantId: 'hij456', appId: 'pv2209', companyName: 'Pinnacle Ventures', contactName: 'Grant Phillips', contactEmail: 'grant@pinnacleventures.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2024-07-15', activeUsers: '0/10', contactsUsage: '0/5,000', markatableContacts: 0, complaintRate: 0, allAutomations: 0, partnerAutomations: 0, customerAutomations: 0, contactsInAutomation: 0, newContacts: 0, broadcasts: 0, logins: 0, lastLoginDate: '-', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 87 },
  { tenantId: 'n001', appId: 'ad1001', companyName: 'Apex Digital Marketing', contactName: 'Tara Sullivan', contactEmail: 'tara@apexdigital.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-04-15', activeUsers: '9/12', contactsUsage: '3,100/10,000', markatableContacts: 2800, complaintRate: 0.3, allAutomations: 22, partnerAutomations: 18, customerAutomations: 4, contactsInAutomation: 620, newContacts: 88, broadcasts: 4, logins: 45, lastLoginDate: '11/08/25', totalLoginTrend: 'increasing', loginTrendPercent: 38, daysSinceLastLogin: 2 },
  { tenantId: 'n002', appId: 'bh2002', companyName: 'Blue Horizon Analytics', contactName: 'Owen Castillo', contactEmail: 'owen@bluehorizon.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-01-20', activeUsers: '6/8', contactsUsage: '1,400/2,500', markatableContacts: 1100, complaintRate: 0.2, allAutomations: 14, partnerAutomations: 11, customerAutomations: 3, contactsInAutomation: 340, newContacts: 61, broadcasts: 3, logins: 32, lastLoginDate: '11/09/25', totalLoginTrend: 'increasing', loginTrendPercent: 25, daysSinceLastLogin: 1 },
  { tenantId: 'n003', appId: 'cv3003', companyName: 'Cedar Valley Consulting', contactName: 'Diana Reyes', contactEmail: 'diana@cedarvalley.com', product: 'Pro', billingStatus: 'Active', creationDate: '2023-08-10', activeUsers: '4/5', contactsUsage: '610/1,000', markatableContacts: 490, complaintRate: 0.1, allAutomations: 11, partnerAutomations: 9, customerAutomations: 2, contactsInAutomation: 215, newContacts: 44, broadcasts: 6, logins: 28, lastLoginDate: '11/07/25', totalLoginTrend: 'increasing', loginTrendPercent: 44, daysSinceLastLogin: 3 },
  { tenantId: 'n004', appId: 'ds4004', companyName: 'Delphi Software Group', contactName: 'Nathan Brooks', contactEmail: 'nathan@delphisw.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2022-12-05', activeUsers: '11/15', contactsUsage: '5,200/10,000', markatableContacts: 4100, complaintRate: 0.4, allAutomations: 28, partnerAutomations: 24, customerAutomations: 4, contactsInAutomation: 890, newContacts: 107, broadcasts: 7, logins: 58, lastLoginDate: '11/10/25', totalLoginTrend: 'increasing', loginTrendPercent: 31, daysSinceLastLogin: 0 },
  { tenantId: 'n005', appId: 'ec5005', companyName: 'Emerald Coast Realty', contactName: 'Priya Sharma', contactEmail: 'priya@emeraldcoast.com', product: 'Classic', billingStatus: 'Active', creationDate: '2024-03-01', activeUsers: '2/3', contactsUsage: '280/500', markatableContacts: 220, complaintRate: 0.0, allAutomations: 6, partnerAutomations: 4, customerAutomations: 2, contactsInAutomation: 95, newContacts: 22, broadcasts: 2, logins: 14, lastLoginDate: '11/06/25', totalLoginTrend: 'increasing', loginTrendPercent: 55, daysSinceLastLogin: 4 },
  { tenantId: 'n006', appId: 'fb6006', companyName: 'Frontier Biotech', contactName: 'Carlos Mendez', contactEmail: 'carlos@frontierbio.com', product: 'Max', billingStatus: 'Active', creationDate: '2023-06-22', activeUsers: '7/10', contactsUsage: '1,900/2,500', markatableContacts: 1650, complaintRate: 0.2, allAutomations: 19, partnerAutomations: 16, customerAutomations: 3, contactsInAutomation: 510, newContacts: 73, broadcasts: 5, logins: 41, lastLoginDate: '11/08/25', totalLoginTrend: 'increasing', loginTrendPercent: 27, daysSinceLastLogin: 2 },
  { tenantId: 'n007', appId: 'gt7007', companyName: 'Global Trade Partners', contactName: 'Amara Osei', contactEmail: 'amara@globaltradepart.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2024-05-10', activeUsers: '13/20', contactsUsage: '6,800/10,000', markatableContacts: 5200, complaintRate: 0.5, allAutomations: 31, partnerAutomations: 26, customerAutomations: 5, contactsInAutomation: 1180, newContacts: 142, broadcasts: 8, logins: 67, lastLoginDate: '11/09/25', totalLoginTrend: 'increasing', loginTrendPercent: 18, daysSinceLastLogin: 1 },
  { tenantId: 'n008', appId: 'hl8008', companyName: 'Harbor Light Studios', contactName: 'Fiona Walsh', contactEmail: 'fiona@harborlightstudios.com', product: 'Pro', billingStatus: 'Active', creationDate: '2023-11-15', activeUsers: '3/5', contactsUsage: '430/1,000', markatableContacts: 360, complaintRate: 0.1, allAutomations: 8, partnerAutomations: 6, customerAutomations: 2, contactsInAutomation: 155, newContacts: 33, broadcasts: 3, logins: 22, lastLoginDate: '11/07/25', totalLoginTrend: 'increasing', loginTrendPercent: 62, daysSinceLastLogin: 3 },
  { tenantId: 'n009', appId: 'is9009', companyName: 'Indigo Systems', contactName: 'Marcus Chen', contactEmail: 'marcus@indigosystems.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-02-28', activeUsers: '5/8', contactsUsage: '1,100/2,500', markatableContacts: 940, complaintRate: 0.3, allAutomations: 13, partnerAutomations: 10, customerAutomations: 3, contactsInAutomation: 290, newContacts: 55, broadcasts: 4, logins: 35, lastLoginDate: '11/10/25', totalLoginTrend: 'increasing', loginTrendPercent: 34, daysSinceLastLogin: 0 },
  { tenantId: 'n010', appId: 'jr1010', companyName: 'Jade River Exports', contactName: 'Lena Voigt', contactEmail: 'lena@jaderiverex.com', product: 'Classic', billingStatus: 'Active', creationDate: '2023-03-12', activeUsers: '2/4', contactsUsage: '190/500', markatableContacts: 150, complaintRate: 0.1, allAutomations: 5, partnerAutomations: 3, customerAutomations: 2, contactsInAutomation: 65, newContacts: 18, broadcasts: 2, logins: 11, lastLoginDate: '11/06/25', totalLoginTrend: 'increasing', loginTrendPercent: 22, daysSinceLastLogin: 4 },
  { tenantId: 'n011', appId: 'kf1011', companyName: 'Keystone Financial', contactName: 'Brett Lawson', contactEmail: 'brett@keystonefin.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2022-09-30', activeUsers: '8/12', contactsUsage: '3,600/5,000', markatableContacts: 3100, complaintRate: 0.4, allAutomations: 25, partnerAutomations: 21, customerAutomations: 4, contactsInAutomation: 745, newContacts: 98, broadcasts: 6, logins: 49, lastLoginDate: '11/08/25', totalLoginTrend: 'increasing', loginTrendPercent: 41, daysSinceLastLogin: 2 },
  { tenantId: 'n012', appId: 'lt1012', companyName: 'Lunar Tech Inc', contactName: 'Yuki Tanaka', contactEmail: 'yuki@lunartech.com', product: 'Pro', billingStatus: 'Active', creationDate: '2024-04-15', activeUsers: '4/6', contactsUsage: '520/1,000', markatableContacts: 410, complaintRate: 0.2, allAutomations: 10, partnerAutomations: 8, customerAutomations: 2, contactsInAutomation: 185, newContacts: 40, broadcasts: 3, logins: 26, lastLoginDate: '11/09/25', totalLoginTrend: 'increasing', loginTrendPercent: 29, daysSinceLastLogin: 1 },
  { tenantId: 'n013', appId: 'ms2001', companyName: 'Maple Street Media', contactName: 'Carmen Ruiz', contactEmail: 'carmen@maplestreetmedia.com', product: 'Max', billingStatus: 'Active', creationDate: '2023-07-25', activeUsers: '5/8', contactsUsage: '1,200/2,500', markatableContacts: 980, complaintRate: 0.3, allAutomations: 16, partnerAutomations: 13, customerAutomations: 3, contactsInAutomation: 395, newContacts: 52, broadcasts: 4, logins: 19, lastLoginDate: '11/05/25', totalLoginTrend: 'stable', loginTrendPercent: 4, daysSinceLastLogin: 5 },
  { tenantId: 'n014', appId: 'nl2002', companyName: 'Northern Light Solutions', contactName: 'Erik Johansson', contactEmail: 'erik@northernlight.com', product: 'Pro', billingStatus: 'Active', creationDate: '2024-01-08', activeUsers: '3/4', contactsUsage: '390/500', markatableContacts: 310, complaintRate: 0.1, allAutomations: 7, partnerAutomations: 5, customerAutomations: 2, contactsInAutomation: 130, newContacts: 28, broadcasts: 2, logins: 16, lastLoginDate: '11/04/25', totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 6 },
  { tenantId: 'n015', appId: 'oc2003', companyName: 'Orion Consulting LLC', contactName: 'Diane Foster', contactEmail: 'diane@orionconsulting.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-05-14', activeUsers: '7/10', contactsUsage: '2,800/5,000', markatableContacts: 2300, complaintRate: 0.5, allAutomations: 20, partnerAutomations: 17, customerAutomations: 3, contactsInAutomation: 620, newContacts: 81, broadcasts: 5, logins: 31, lastLoginDate: '11/06/25', totalLoginTrend: 'stable', loginTrendPercent: 5, daysSinceLastLogin: 4 },
  { tenantId: 'n016', appId: 'pc2004', companyName: 'Pacific Crest Advisors', contactName: 'Hugo Delgado', contactEmail: 'hugo@pacificcrest.com', product: 'Classic', billingStatus: 'Active', creationDate: '2022-10-20', activeUsers: '2/3', contactsUsage: '210/500', markatableContacts: 170, complaintRate: 0.2, allAutomations: 5, partnerAutomations: 3, customerAutomations: 2, contactsInAutomation: 70, newContacts: 15, broadcasts: 1, logins: 10, lastLoginDate: '11/03/25', totalLoginTrend: 'stable', loginTrendPercent: 2, daysSinceLastLogin: 7 },
  { tenantId: 'n017', appId: 'qs2005', companyName: 'Quartz Software Co', contactName: 'Isla McDonagh', contactEmail: 'isla@quartzsoftware.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-02-01', activeUsers: '6/9', contactsUsage: '1,650/2,500', markatableContacts: 1380, complaintRate: 0.3, allAutomations: 18, partnerAutomations: 15, customerAutomations: 3, contactsInAutomation: 460, newContacts: 64, broadcasts: 4, logins: 24, lastLoginDate: '11/05/25', totalLoginTrend: 'stable', loginTrendPercent: 4, daysSinceLastLogin: 5 },
  { tenantId: 'n018', appId: 'ra2006', companyName: 'Redwood Analytics', contactName: 'Travis Coleman', contactEmail: 'travis@redwoodanalytics.com', product: 'Pro', billingStatus: 'Active', creationDate: '2023-09-18', activeUsers: '4/6', contactsUsage: '540/1,000', markatableContacts: 430, complaintRate: 0.1, allAutomations: 9, partnerAutomations: 7, customerAutomations: 2, contactsInAutomation: 190, newContacts: 36, broadcasts: 3, logins: 20, lastLoginDate: '11/04/25', totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 6 },
  { tenantId: 'n019', appId: 'sd2007', companyName: 'Summit Data Group', contactName: 'Olivia Pearce', contactEmail: 'olivia@summitdata.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2024-06-10', activeUsers: '9/14', contactsUsage: '3,900/10,000', markatableContacts: 3300, complaintRate: 0.4, allAutomations: 23, partnerAutomations: 19, customerAutomations: 4, contactsInAutomation: 810, newContacts: 112, broadcasts: 6, logins: 38, lastLoginDate: '11/06/25', totalLoginTrend: 'stable', loginTrendPercent: 5, daysSinceLastLogin: 4 },
  { tenantId: 'n020', appId: 'tw2008', companyName: 'Tidal Wave Creative', contactName: 'Simon Okafor', contactEmail: 'simon@tidalwavecreative.com', product: 'Classic', billingStatus: 'Active', creationDate: '2023-02-28', activeUsers: '2/4', contactsUsage: '230/500', markatableContacts: 185, complaintRate: 0.1, allAutomations: 6, partnerAutomations: 4, customerAutomations: 2, contactsInAutomation: 80, newContacts: 19, broadcasts: 2, logins: 12, lastLoginDate: '11/03/25', totalLoginTrend: 'stable', loginTrendPercent: 4, daysSinceLastLogin: 7 },
  { tenantId: 'n021', appId: 'up2009', companyName: 'Urban Pixel Agency', contactName: 'Mia Santos', contactEmail: 'mia@urbanpixel.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-03-20', activeUsers: '5/7', contactsUsage: '1,350/2,500', markatableContacts: 1120, complaintRate: 0.2, allAutomations: 15, partnerAutomations: 12, customerAutomations: 3, contactsInAutomation: 375, newContacts: 57, broadcasts: 4, logins: 21, lastLoginDate: '11/05/25', totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 5 },
  { tenantId: 'n022', appId: 'vp3001', companyName: 'Vantage Point Research', contactName: 'Ronald Sterling', contactEmail: 'ronald@vantageresearch.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-08-05', activeUsers: '6/10', contactsUsage: '2,100/5,000', markatableContacts: 1700, complaintRate: 0.8, allAutomations: 14, partnerAutomations: 11, customerAutomations: 3, contactsInAutomation: 330, newContacts: 29, broadcasts: 3, logins: 8, lastLoginDate: '11/02/25', totalLoginTrend: 'declining', loginTrendPercent: 35, daysSinceLastLogin: 8 },
  { tenantId: 'n023', appId: 'wg3002', companyName: 'Westgate Communications', contactName: 'Patricia Bloom', contactEmail: 'patricia@westgatecomm.com', product: 'Pro', billingStatus: 'Active', creationDate: '2022-11-12', activeUsers: '3/5', contactsUsage: '410/1,000', markatableContacts: 320, complaintRate: 1.1, allAutomations: 8, partnerAutomations: 6, customerAutomations: 2, contactsInAutomation: 145, newContacts: 14, broadcasts: 2, logins: 5, lastLoginDate: '10/30/25', totalLoginTrend: 'declining', loginTrendPercent: 41, daysSinceLastLogin: 11 },
  { tenantId: 'n024', appId: 'xm3003', companyName: 'Xcell Marketing Group', contactName: 'Dion Whitfield', contactEmail: 'dion@xcellmarketing.com', product: 'Max', billingStatus: 'Active', creationDate: '2024-01-25', activeUsers: '4/8', contactsUsage: '800/2,500', markatableContacts: 640, complaintRate: 0.9, allAutomations: 11, partnerAutomations: 8, customerAutomations: 3, contactsInAutomation: 200, newContacts: 18, broadcasts: 2, logins: 6, lastLoginDate: '10/28/25', totalLoginTrend: 'declining', loginTrendPercent: 28, daysSinceLastLogin: 13 },
  { tenantId: 'n025', appId: 'yv3004', companyName: 'Yellowstone Ventures', contactName: 'Theresa Haynes', contactEmail: 'theresa@yellowstonevc.com', product: 'Classic', billingStatus: 'Active', creationDate: '2023-04-30', activeUsers: '2/4', contactsUsage: '160/500', markatableContacts: 125, complaintRate: 1.4, allAutomations: 5, partnerAutomations: 3, customerAutomations: 2, contactsInAutomation: 55, newContacts: 8, broadcasts: 1, logins: 4, lastLoginDate: '10/25/25', totalLoginTrend: 'declining', loginTrendPercent: 52, daysSinceLastLogin: 16 },
  { tenantId: 'n026', appId: 'zc3005', companyName: 'Zenith Cloud Services', contactName: 'Alicia Nguyen', contactEmail: 'alicia@zenithcloud.com', product: 'Ultimate', billingStatus: 'Active', creationDate: '2023-12-01', activeUsers: '8/15', contactsUsage: '3,300/10,000', markatableContacts: 2600, complaintRate: 0.7, allAutomations: 17, partnerAutomations: 14, customerAutomations: 3, contactsInAutomation: 410, newContacts: 36, broadcasts: 4, logins: 11, lastLoginDate: '11/01/25', totalLoginTrend: 'declining', loginTrendPercent: 23, daysSinceLastLogin: 9 },
  { tenantId: 'n027', appId: 'ar3006', companyName: 'Apex Recruiting Inc', contactName: 'James Thornton', contactEmail: 'james@apexrecruiting.com', product: 'Pro', billingStatus: 'Active', creationDate: '2024-05-15', activeUsers: '2/4', contactsUsage: '180/1,000', markatableContacts: 140, complaintRate: 0.9, allAutomations: 6, partnerAutomations: 4, customerAutomations: 2, contactsInAutomation: 65, newContacts: 10, broadcasts: 1, logins: 3, lastLoginDate: '10/22/25', totalLoginTrend: 'declining', loginTrendPercent: 44, daysSinceLastLogin: 19 },
  { tenantId: 'n028', appId: 'bs4001', companyName: 'Bastion Security LLC', contactName: 'Victor Russo', contactEmail: 'victor@bastionsec.com', product: 'Max', billingStatus: 'Active', creationDate: '2023-01-18', activeUsers: '1/6', contactsUsage: '90/2,500', markatableContacts: 70, complaintRate: 0.2, allAutomations: 4, partnerAutomations: 2, customerAutomations: 2, contactsInAutomation: 20, newContacts: 2, broadcasts: 0, logins: 0, lastLoginDate: '09/15/25', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 47 },
  { tenantId: 'n029', appId: 'cp4002', companyName: 'Cascade Print Works', contactName: 'Debra Manning', contactEmail: 'debra@cascadeprint.com', product: 'Classic', billingStatus: 'Active', creationDate: '2022-07-04', activeUsers: '0/3', contactsUsage: '30/500', markatableContacts: 25, complaintRate: 0.0, allAutomations: 2, partnerAutomations: 1, customerAutomations: 1, contactsInAutomation: 10, newContacts: 0, broadcasts: 0, logins: 0, lastLoginDate: '08/20/25', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 72 },
  { tenantId: 'n030', appId: 'dp4003', companyName: 'Delta Pro Services', contactName: 'Lionel Graves', contactEmail: 'lionel@deltaproserv.com', product: 'Pro', billingStatus: 'Active', creationDate: '2023-10-10', activeUsers: '1/4', contactsUsage: '50/1,000', markatableContacts: 40, complaintRate: 0.1, allAutomations: 3, partnerAutomations: 2, customerAutomations: 1, contactsInAutomation: 15, newContacts: 1, broadcasts: 0, logins: 1, lastLoginDate: '09/01/25', totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 81 },
];

export const customerDetailData: Record<string, CustomerDetailData> = {
  ak7816: {
    users: [
      { firstName: 'John', lastName: 'Smith', userRole: 'Admin', email: 'john@alphatech.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-15T10:30:00Z', totalLoginCount: 28, totalLoginTrend: 'increasing', loginTrendPercent: 42, daysSinceLastLogin: 3 },
      { firstName: 'Sarah', lastName: 'Johnson', userRole: 'User', email: 'sarah@alphatech.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-14T14:20:00Z', totalLoginCount: 15, totalLoginTrend: 'stable', loginTrendPercent: 8, daysSinceLastLogin: 4 },
      { firstName: 'Mike', lastName: 'Davis', userRole: 'User', email: 'mike@alphatech.com', userStatus: 'Invited', userType: 'customer', lastLoginDatetime: null, totalLoginCount: 0, totalLoginTrend: null, loginTrendPercent: null, daysSinceLastLogin: null },
      { firstName: 'Greta', lastName: 'Gerwig', userRole: 'Admin', email: 'g.gerwig@partnerhub.io', userStatus: 'Active', userType: 'partner', lastLoginDatetime: '2024-03-14T16:00:00Z', totalLoginCount: 12, totalLoginTrend: 'increasing', loginTrendPercent: 20, daysSinceLastLogin: 4 },
    ],
    automations: [
      { automationName: 'Welcome Series', automationId: 'auto-001', status: 'Published', uniqueRecipients: 450, totalSends: 1200, totalDeliveries: 1180, clickThroughRate: 0.032, totalComplaints: 2 },
      { automationName: 'Lead Nurture Flow', automationId: 'auto-002', status: 'Published', uniqueRecipients: 280, totalSends: 850, totalDeliveries: 840, clickThroughRate: 0.045, totalComplaints: 0 },
      { automationName: 'Re-engagement Campaign', automationId: 'auto-003', status: 'Draft', uniqueRecipients: 0, totalSends: 0, totalDeliveries: 0, clickThroughRate: 0, totalComplaints: 0 },
    ],
    activity: { broadcastsSent: 156, contactsInAutomation: 890, newContacts: 234 },
    loginSummary: { totalLogins: 42 },
    cardData: { complaintRate: 0.5, markatableContacts: 1250 },
  },
  bq4951: {
    users: [
      { firstName: 'Michael', lastName: 'Jordan', userRole: 'Admin', email: 'm.jordan@nebuladynamics.io', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-15T09:00:00Z', totalLoginCount: 45, totalLoginTrend: 'declining', loginTrendPercent: 28, daysSinceLastLogin: 12 },
      { firstName: 'Emma', lastName: 'Watson', userRole: 'Limited Admin', email: 'e.watson@nebuladynamics.io', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-14T11:15:00Z', totalLoginCount: 32, totalLoginTrend: 'stable', loginTrendPercent: 5, daysSinceLastLogin: 13 },
      { firstName: 'Greta', lastName: 'Gerwig', userRole: 'Admin', email: 'g.gerwig@partnerhub.io', userStatus: 'Active', userType: 'partner', lastLoginDatetime: '2024-03-14T16:00:00Z', totalLoginCount: 8, totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 13 },
    ],
    automations: [
      { automationName: 'New Client Onboarding', automationId: 'auto-010', status: 'Published', uniqueRecipients: 320, totalSends: 640, totalDeliveries: 635, clickThroughRate: 0.038, totalComplaints: 1 },
      { automationName: 'Monthly Newsletter', automationId: 'auto-011', status: 'Published', uniqueRecipients: 890, totalSends: 2670, totalDeliveries: 2620, clickThroughRate: 0.021, totalComplaints: 8 },
    ],
    activity: { broadcastsSent: 42, contactsInAutomation: 320, newContacts: 89 },
    loginSummary: { totalLogins: 53 },
    cardData: { complaintRate: 0.2, markatableContacts: 650 },
  },
  ghi8204: {
    users: [
      { firstName: 'David', lastName: 'Park', userRole: 'Admin', email: 'david@cortexsystems.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-01-05T08:00:00Z', totalLoginCount: 3, totalLoginTrend: 'dormant', loginTrendPercent: null, daysSinceLastLogin: 34 },
      { firstName: 'Greta', lastName: 'Gerwig', userRole: 'Admin', email: 'g.gerwig@partnerhub.io', userStatus: 'Active', userType: 'partner', lastLoginDatetime: '2024-01-02T09:00:00Z', totalLoginCount: 2, totalLoginTrend: 'declining', loginTrendPercent: 33, daysSinceLastLogin: 37 },
    ],
    automations: [
      { automationName: 'Welcome Series', automationId: 'auto-020', status: 'Published', uniqueRecipients: 150, totalSends: 300, totalDeliveries: 280, clickThroughRate: 0.012, totalComplaints: 5 },
    ],
    activity: { broadcastsSent: 8, contactsInAutomation: 150, newContacts: 12 },
    loginSummary: { totalLogins: 3 },
    cardData: { complaintRate: 3.1, markatableContacts: 400 },
  },
  bs1037: {
    users: [
      { firstName: 'Rachel', lastName: 'Kim', userRole: 'Admin', email: 'rachel@horizontech.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-15T11:00:00Z', totalLoginCount: 67, totalLoginTrend: 'increasing', loginTrendPercent: 51, daysSinceLastLogin: 1 },
      { firstName: 'James', lastName: 'Miller', userRole: 'Admin', email: 'james@horizontech.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-15T09:30:00Z', totalLoginCount: 46, totalLoginTrend: 'increasing', loginTrendPercent: 28, daysSinceLastLogin: 1 },
      { firstName: 'Greta', lastName: 'Gerwig', userRole: 'Admin', email: 'g.gerwig@partnerhub.io', userStatus: 'Active', userType: 'partner', lastLoginDatetime: '2024-03-14T16:00:00Z', totalLoginCount: 5, totalLoginTrend: 'stable', loginTrendPercent: 3, daysSinceLastLogin: 2 },
    ],
    automations: [
      { automationName: 'Product Launch Sequence', automationId: 'auto-030', status: 'Published', uniqueRecipients: 1200, totalSends: 3600, totalDeliveries: 3560, clickThroughRate: 0.055, totalComplaints: 0 },
      { automationName: 'Customer Feedback Loop', automationId: 'auto-031', status: 'Published', uniqueRecipients: 800, totalSends: 800, totalDeliveries: 795, clickThroughRate: 0.042, totalComplaints: 1 },
    ],
    activity: { broadcastsSent: 312, contactsInAutomation: 2100, newContacts: 578 },
    loginSummary: { totalLogins: 113 },
    cardData: { complaintRate: 0.8, markatableContacts: 3200 },
  },
};

export const defaultDetailData: CustomerDetailData = {
  users: [
    { firstName: 'Admin', lastName: 'User', userRole: 'Admin', email: 'admin@company.com', userStatus: 'Active', userType: 'customer', lastLoginDatetime: '2024-03-10T10:00:00Z', totalLoginCount: 12, totalLoginTrend: 'stable', loginTrendPercent: 5, daysSinceLastLogin: 6 },
  ],
  automations: [
    { automationName: 'Welcome Email', automationId: 'auto-default', status: 'Published', uniqueRecipients: 100, totalSends: 200, totalDeliveries: 195, clickThroughRate: 0.025, totalComplaints: 0 },
  ],
  activity: { broadcastsSent: 20, contactsInAutomation: 50, newContacts: 15 },
  loginSummary: { totalLogins: 12 },
  cardData: { complaintRate: 0.3, markatableContacts: 100 },
};

export function findCustomer(id: string): Customer | null {
  return mockCustomers.find((c) => c.appId === id || c.tenantId === id) ?? null;
}

export function getDetailData(appId: string): CustomerDetailData {
  return customerDetailData[appId] ?? defaultDetailData;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`;
  } catch {
    return '-';
  }
}
