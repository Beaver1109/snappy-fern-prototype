export interface AtRiskAutomation {
  automationName: string;
  automationId: string;
  isBroken: boolean;
  businessName: string;
  tenantId: string;
  totalComplaints: number;
  totalBounces: number;
}

export interface PerformanceAutomation {
  automationName: string;
  automationId: string;
  status: string;
  businessName: string;
  tenantId: string;
  uniqueRecipients: number;
  totalDeliveries: number;
  clickThroughRate: number;
}

export interface SubAccount {
  id: string;
  name: string;
  publishedAutomations: number;
  contactsInAutomations: number;
  emailsSent: number;
  delivered: number;
  ctr: number;
  complaints: number;
}

export interface DistributionPoint {
  bucket: number;
  accountCount: number;
}

export interface EmailSubAccountRow {
  tenantId: string;
  name: string;
  broadcastsSent: number;
  emailsSent: number;
  delivered: number;
  openRate: number;
  ctr: number;
  optIns: number;
  optOuts: number;
}

export const mockAtRisk: AtRiskAutomation[] = [
  { automationName: 'Flash Sale Blast', automationId: 'auto-101', isBroken: false, businessName: 'Gamma Services LLC', tenantId: 'ghi789', totalComplaints: 12, totalBounces: 45 },
  { automationName: 'Weekly Digest', automationId: 'auto-102', isBroken: true, businessName: 'Iota Health & Wellness', tenantId: 'yza567', totalComplaints: 8, totalBounces: 23 },
];

export const mockTopTen: PerformanceAutomation[] = [
  { automationName: 'Welcome Series', automationId: 'auto-001', status: 'Published', businessName: 'Alpha Tech Solutions', tenantId: 'abc123', uniqueRecipients: 450, totalDeliveries: 1180, clickThroughRate: 0.032 },
  { automationName: 'Lead Nurture Flow', automationId: 'auto-002', status: 'Published', businessName: 'Delta Marketing Group', tenantId: 'jkl012', uniqueRecipients: 380, totalDeliveries: 920, clickThroughRate: 0.045 },
  { automationName: 'Onboarding Sequence', automationId: 'auto-003', status: 'Published', businessName: 'Kappa Education Center', tenantId: 'bcd890', uniqueRecipients: 320, totalDeliveries: 780, clickThroughRate: 0.051 },
  { automationName: 'Product Launch', automationId: 'auto-004', status: 'Published', businessName: 'Theta Real Estate', tenantId: 'vwx234', uniqueRecipients: 290, totalDeliveries: 650, clickThroughRate: 0.028 },
  { automationName: 'Re-engagement Flow', automationId: 'auto-005', status: 'Published', businessName: 'Zeta Consulting', tenantId: 'pqr678', uniqueRecipients: 210, totalDeliveries: 520, clickThroughRate: 0.039 },
];

export const mockBottomTen: PerformanceAutomation[] = [
  { automationName: 'Old Newsletter', automationId: 'auto-201', status: 'Published', businessName: 'Epsilon Digital Agency', tenantId: 'mno345', uniqueRecipients: 15, totalDeliveries: 12, clickThroughRate: 0.001 },
  { automationName: 'Abandoned Cart', automationId: 'auto-202', status: 'Draft', businessName: 'Mu Creative Studio', tenantId: 'hij456', uniqueRecipients: 0, totalDeliveries: 0, clickThroughRate: 0 },
];

export const mockSubAccounts: SubAccount[] = [
  { id: 'acc-001', name: 'Sunrise Dental', publishedAutomations: 9, contactsInAutomations: 1840, emailsSent: 18200, delivered: 17900, ctr: 0.048, complaints: 2 },
  { id: 'acc-002', name: 'Green Valley Spa', publishedAutomations: 5, contactsInAutomations: 1200, emailsSent: 11400, delivered: 11100, ctr: 0.031, complaints: 4 },
  { id: 'acc-003', name: 'Peak Fitness Studio', publishedAutomations: 3, contactsInAutomations: 980, emailsSent: 8600, delivered: 8200, ctr: 0.019, complaints: 9 },
  { id: 'acc-004', name: 'Harbor View Realty', publishedAutomations: 14, contactsInAutomations: 2600, emailsSent: 26800, delivered: 26400, ctr: 0.052, complaints: 1 },
  { id: 'acc-005', name: 'Oakwood Pet Clinic', publishedAutomations: 2, contactsInAutomations: 640, emailsSent: 5900, delivered: 5600, ctr: 0.022, complaints: 7 },
  { id: 'acc-006', name: 'Metro Auto Repair', publishedAutomations: 8, contactsInAutomations: 1560, emailsSent: 15200, delivered: 14900, ctr: 0.038, complaints: 3 },
  { id: 'acc-007', name: 'Bright Minds Tutoring', publishedAutomations: 11, contactsInAutomations: 2100, emailsSent: 20400, delivered: 20000, ctr: 0.044, complaints: 2 },
  { id: 'acc-008', name: 'Coastal Yoga Works', publishedAutomations: 4, contactsInAutomations: 860, emailsSent: 9100, delivered: 8700, ctr: 0.026, complaints: 6 },
  { id: 'acc-009', name: 'Riverbend Chiropractic', publishedAutomations: 7, contactsInAutomations: 1320, emailsSent: 13400, delivered: 13100, ctr: 0.041, complaints: 2 },
  { id: 'acc-010', name: 'Lakeside Landscaping', publishedAutomations: 6, contactsInAutomations: 1100, emailsSent: 10800, delivered: 10500, ctr: 0.033, complaints: 3 },
  { id: 'acc-011', name: 'Northgate Insurance', publishedAutomations: 12, contactsInAutomations: 2240, emailsSent: 22100, delivered: 21700, ctr: 0.047, complaints: 1 },
  { id: 'acc-012', name: 'Pineview Plumbing', publishedAutomations: 3, contactsInAutomations: 720, emailsSent: 6800, delivered: 6500, ctr: 0.021, complaints: 5 },
  { id: 'acc-013', name: 'Crestwood Catering', publishedAutomations: 5, contactsInAutomations: 980, emailsSent: 9600, delivered: 9300, ctr: 0.029, complaints: 4 },
  { id: 'acc-014', name: 'Elmwood Photography', publishedAutomations: 8, contactsInAutomations: 1480, emailsSent: 14600, delivered: 14200, ctr: 0.036, complaints: 2 },
  { id: 'acc-015', name: 'Silverton Law Group', publishedAutomations: 10, contactsInAutomations: 1900, emailsSent: 18800, delivered: 18400, ctr: 0.043, complaints: 1 },
  { id: 'acc-016', name: 'Maple Street Bakery', publishedAutomations: 2, contactsInAutomations: 540, emailsSent: 5100, delivered: 4900, ctr: 0.018, complaints: 8 },
  { id: 'acc-017', name: 'Clearview Optometry', publishedAutomations: 6, contactsInAutomations: 1160, emailsSent: 11200, delivered: 10900, ctr: 0.034, complaints: 3 },
  { id: 'acc-018', name: 'Thornfield Veterinary', publishedAutomations: 9, contactsInAutomations: 1700, emailsSent: 16800, delivered: 16400, ctr: 0.039, complaints: 2 },
  { id: 'acc-019', name: 'Brookside Accounting', publishedAutomations: 4, contactsInAutomations: 880, emailsSent: 8400, delivered: 8100, ctr: 0.027, complaints: 5 },
  { id: 'acc-020', name: 'Westfield Auto Body', publishedAutomations: 3, contactsInAutomations: 680, emailsSent: 6400, delivered: 6200, ctr: 0.022, complaints: 6 },
  { id: 'acc-021', name: 'Foxhill Financial', publishedAutomations: 13, contactsInAutomations: 2380, emailsSent: 23500, delivered: 23100, ctr: 0.050, complaints: 1 },
  { id: 'acc-022', name: 'Sunrise Hair Studio', publishedAutomations: 2, contactsInAutomations: 460, emailsSent: 4400, delivered: 4200, ctr: 0.016, complaints: 10 },
  { id: 'acc-023', name: 'Hillcrest HVAC', publishedAutomations: 7, contactsInAutomations: 1280, emailsSent: 12600, delivered: 12300, ctr: 0.035, complaints: 3 },
  { id: 'acc-024', name: 'Meadow Creek Florist', publishedAutomations: 4, contactsInAutomations: 820, emailsSent: 7800, delivered: 7500, ctr: 0.025, complaints: 4 },
  { id: 'acc-025', name: 'Oakdale Roofing Co.', publishedAutomations: 5, contactsInAutomations: 1020, emailsSent: 9900, delivered: 9600, ctr: 0.030, complaints: 4 },
  { id: 'acc-026', name: 'Sterling Real Estate', publishedAutomations: 11, contactsInAutomations: 2060, emailsSent: 20200, delivered: 19800, ctr: 0.046, complaints: 2 },
  { id: 'acc-027', name: 'Pinecrest Pediatrics', publishedAutomations: 8, contactsInAutomations: 1540, emailsSent: 15200, delivered: 14900, ctr: 0.040, complaints: 2 },
  { id: 'acc-028', name: 'Bayside Marine Supply', publishedAutomations: 3, contactsInAutomations: 700, emailsSent: 6600, delivered: 6300, ctr: 0.020, complaints: 7 },
  { id: 'acc-029', name: 'Redwood Tax Services', publishedAutomations: 6, contactsInAutomations: 1140, emailsSent: 11000, delivered: 10700, ctr: 0.032, complaints: 3 },
  { id: 'acc-030', name: 'Ironwood CrossFit', publishedAutomations: 5, contactsInAutomations: 960, emailsSent: 9200, delivered: 8900, ctr: 0.028, complaints: 5 },
  { id: 'acc-031', name: 'Willowbrook Dentistry', publishedAutomations: 9, contactsInAutomations: 1760, emailsSent: 17400, delivered: 17000, ctr: 0.042, complaints: 2 },
  { id: 'acc-032', name: 'Summit Security Systems', publishedAutomations: 7, contactsInAutomations: 1300, emailsSent: 12800, delivered: 12500, ctr: 0.037, complaints: 3 },
  { id: 'acc-033', name: 'Harborlight Therapy', publishedAutomations: 6, contactsInAutomations: 1080, emailsSent: 10400, delivered: 10100, ctr: 0.031, complaints: 4 },
  { id: 'acc-034', name: 'Canyon Ridge Winery', publishedAutomations: 10, contactsInAutomations: 1940, emailsSent: 19200, delivered: 18800, ctr: 0.044, complaints: 2 },
  { id: 'acc-035', name: 'Goldenrod Childcare', publishedAutomations: 4, contactsInAutomations: 800, emailsSent: 7600, delivered: 7300, ctr: 0.024, complaints: 5 },
  { id: 'acc-036', name: 'Pacific Rim Imports', publishedAutomations: 8, contactsInAutomations: 1460, emailsSent: 14400, delivered: 14000, ctr: 0.038, complaints: 2 },
  { id: 'acc-037', name: 'Vantage Point Realty', publishedAutomations: 12, contactsInAutomations: 2200, emailsSent: 21600, delivered: 21200, ctr: 0.049, complaints: 1 },
  { id: 'acc-038', name: 'Blue Ridge Brewing', publishedAutomations: 5, contactsInAutomations: 1000, emailsSent: 9500, delivered: 9200, ctr: 0.029, complaints: 4 },
  { id: 'acc-039', name: 'Cedarwood Counseling', publishedAutomations: 3, contactsInAutomations: 660, emailsSent: 6200, delivered: 5900, ctr: 0.020, complaints: 6 },
  { id: 'acc-040', name: 'Horizon Solar Co.', publishedAutomations: 15, contactsInAutomations: 2800, emailsSent: 27600, delivered: 27100, ctr: 0.054, complaints: 1 },
];

export const mockDistribution: DistributionPoint[] = [
  { bucket: 0, accountCount: 3 },
  { bucket: 1, accountCount: 5 },
  { bucket: 2, accountCount: 8 },
  { bucket: 3, accountCount: 6 },
  { bucket: 4, accountCount: 9 },
  { bucket: 5, accountCount: 11 },
  { bucket: 6, accountCount: 7 },
  { bucket: 7, accountCount: 5 },
  { bucket: 8, accountCount: 8 },
  { bucket: 9, accountCount: 6 },
  { bucket: 10, accountCount: 4 },
  { bucket: 11, accountCount: 3 },
  { bucket: 12, accountCount: 2 },
  { bucket: 13, accountCount: 4 },
  { bucket: 14, accountCount: 2 },
  { bucket: 15, accountCount: 1 },
];

export const emailSubAccountRows: EmailSubAccountRow[] = [
  { tenantId: 'abc123', name: 'Alpha Tech Solutions', broadcastsSent: 12, emailsSent: 2040, delivered: 1978, openRate: 24.3, ctr: 5.8, optIns: 67, optOuts: 3 },
  { tenantId: 'def456', name: 'Beta Dynamics Inc', broadcastsSent: 8, emailsSent: 1360, delivered: 1341, openRate: 18.7, ctr: 4.1, optIns: 45, optOuts: 2 },
  { tenantId: 'ghi789', name: 'Cortex Systems Ltd.', broadcastsSent: 5, emailsSent: 850, delivered: 825, openRate: 12.4, ctr: 2.9, optIns: 18, optOuts: 8 },
  { tenantId: 'jkl012', name: 'Horizon Technologies', broadcastsSent: 15, emailsSent: 2550, delivered: 2474, openRate: 21.8, ctr: 6.2, optIns: 88, optOuts: 4 },
  { tenantId: 'mno345', name: 'Iota Robotics Co.', broadcastsSent: 4, emailsSent: 680, delivered: 662, openRate: 16.9, ctr: 3.7, optIns: 22, optOuts: 1 },
  { tenantId: 'pqr678', name: 'Zeta Consulting', broadcastsSent: 6, emailsSent: 1020, delivered: 995, openRate: 22.5, ctr: 5.1, optIns: 38, optOuts: 2 },
  { tenantId: 'stu901', name: 'Eta Financial Advisors', broadcastsSent: 9, emailsSent: 1530, delivered: 1499, openRate: 28.1, ctr: 7.4, optIns: 52, optOuts: 1 },
  { tenantId: 'vwx234', name: 'Theta Real Estate', broadcastsSent: 11, emailsSent: 1870, delivered: 1813, openRate: 19.4, ctr: 4.6, optIns: 61, optOuts: 5 },
  { tenantId: 'yza567', name: 'Iota Health & Wellness', broadcastsSent: 3, emailsSent: 510, delivered: 490, openRate: 10.2, ctr: 2.1, optIns: 12, optOuts: 9 },
  { tenantId: 'bcd890', name: 'Lambda Logistics', broadcastsSent: 14, emailsSent: 2380, delivered: 2313, openRate: 25.7, ctr: 6.8, optIns: 79, optOuts: 3 },
  { tenantId: 'efg123', name: 'Omega Applications', broadcastsSent: 7, emailsSent: 1190, delivered: 1162, openRate: 20.3, ctr: 4.9, optIns: 43, optOuts: 2 },
  { tenantId: 'hij456', name: 'Pinnacle Ventures', broadcastsSent: 0, emailsSent: 0, delivered: 0, openRate: 0, ctr: 0, optIns: 0, optOuts: 0 },
  { tenantId: 'n001', name: 'Apex Digital Marketing', broadcastsSent: 10, emailsSent: 1700, delivered: 1649, openRate: 23.1, ctr: 5.5, optIns: 57, optOuts: 3 },
  { tenantId: 'n002', name: 'Blue Horizon Analytics', broadcastsSent: 6, emailsSent: 1020, delivered: 993, openRate: 20.8, ctr: 4.8, optIns: 34, optOuts: 2 },
  { tenantId: 'n003', name: 'Cedar Valley Consulting', broadcastsSent: 8, emailsSent: 1360, delivered: 1326, openRate: 21.4, ctr: 5.0, optIns: 46, optOuts: 1 },
  { tenantId: 'n004', name: 'Delphi Software Group', broadcastsSent: 16, emailsSent: 2720, delivered: 2639, openRate: 26.4, ctr: 7.1, optIns: 91, optOuts: 4 },
  { tenantId: 'n005', name: 'Emerald Coast Realty', broadcastsSent: 3, emailsSent: 510, delivered: 499, openRate: 17.2, ctr: 3.8, optIns: 16, optOuts: 1 },
  { tenantId: 'n006', name: 'Frontier Biotech', broadcastsSent: 9, emailsSent: 1530, delivered: 1491, openRate: 22.9, ctr: 5.3, optIns: 51, optOuts: 2 },
  { tenantId: 'n007', name: 'Global Trade Partners', broadcastsSent: 18, emailsSent: 3060, delivered: 2969, openRate: 27.8, ctr: 7.8, optIns: 102, optOuts: 5 },
  { tenantId: 'n008', name: 'Harbor Light Studios', broadcastsSent: 5, emailsSent: 850, delivered: 832, openRate: 19.6, ctr: 4.4, optIns: 28, optOuts: 1 },
  { tenantId: 'n009', name: 'Indigo Systems', broadcastsSent: 7, emailsSent: 1190, delivered: 1161, openRate: 21.0, ctr: 4.7, optIns: 39, optOuts: 2 },
  { tenantId: 'n010', name: 'Jade River Exports', broadcastsSent: 4, emailsSent: 680, delivered: 664, openRate: 16.4, ctr: 3.5, optIns: 20, optOuts: 1 },
  { tenantId: 'n011', name: 'Keystone Financial', broadcastsSent: 13, emailsSent: 2210, delivered: 2145, openRate: 24.8, ctr: 6.4, optIns: 74, optOuts: 3 },
  { tenantId: 'n012', name: 'Lunar Tech Inc', broadcastsSent: 6, emailsSent: 1020, delivered: 997, openRate: 20.1, ctr: 4.6, optIns: 35, optOuts: 2 },
  { tenantId: 'n013', name: 'Maple Street Media', broadcastsSent: 8, emailsSent: 1360, delivered: 1323, openRate: 19.8, ctr: 4.3, optIns: 47, optOuts: 2 },
  { tenantId: 'n014', name: 'Northern Light Solutions', broadcastsSent: 4, emailsSent: 680, delivered: 667, openRate: 17.5, ctr: 3.9, optIns: 21, optOuts: 1 },
  { tenantId: 'n015', name: 'Orion Consulting LLC', broadcastsSent: 11, emailsSent: 1870, delivered: 1815, openRate: 22.3, ctr: 5.2, optIns: 63, optOuts: 3 },
  { tenantId: 'n016', name: 'Pacific Crest Advisors', broadcastsSent: 3, emailsSent: 510, delivered: 499, openRate: 15.8, ctr: 3.3, optIns: 15, optOuts: 1 },
  { tenantId: 'n017', name: 'Quartz Software Co', broadcastsSent: 9, emailsSent: 1530, delivered: 1492, openRate: 21.6, ctr: 5.0, optIns: 52, optOuts: 2 },
  { tenantId: 'n018', name: 'Redwood Analytics', broadcastsSent: 6, emailsSent: 1020, delivered: 999, openRate: 18.9, ctr: 4.2, optIns: 33, optOuts: 2 },
];
