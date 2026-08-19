import { Route, Routes } from 'react-router';
import { Nav } from './Nav';
import { HomePage } from './home/HomePage';
import { ContactsPage } from './contacts/ContactsPage';
import { AutomationsPage } from './automations/AutomationsPage';
import { AlertsPage } from './alerts/AlertsPage';
import { AlertPreferencesPage } from './alerts/AlertPreferencesPage';
import { DashboardPage } from './dashboard/DashboardPage';
import { CustomersPage } from './customers/CustomersPage';
import { CustomerDetailsPage } from './customers/CustomerDetailsPage';
import { PerformancePage } from './performance/PerformancePage';
import { ToolsPage } from './tools/ToolsPage';
import { ListingsPage } from './listings/ListingsPage';
import { LocationsPage } from './locations/LocationsPage';
import { ReputationPage } from './reputation/ReputationPage';
import { AdvancedReportingPage } from './advanced-reporting/AdvancedReportingPage';

export function App() {
  return (
    <div className="app dex-app">
      <Nav />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts/*" element={<ContactsPage />} />
          <Route path="/automations/*" element={<AutomationsPage />} />
          <Route path="/partner-hub/alerts" element={<AlertsPage />} />
          <Route path="/partner-hub/alerts/preferences" element={<AlertPreferencesPage />} />
          <Route path="/partner-hub/dashboard" element={<DashboardPage />} />
          <Route path="/partner-hub/customers" element={<CustomersPage />} />
          <Route path="/partner-hub/customers/:appId" element={<CustomerDetailsPage />} />
          <Route path="/partner-hub/performance" element={<PerformancePage />} />
          <Route path="/partner-hub/tools" element={<ToolsPage />} />
          <Route path="/partner-hub/locations" element={<LocationsPage />} />
          <Route path="/partner-hub/listings" element={<ListingsPage />} />
          <Route path="/partner-hub/reputation" element={<ReputationPage />} />
          <Route path="/partner-hub/advanced-reporting" element={<AdvancedReportingPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
