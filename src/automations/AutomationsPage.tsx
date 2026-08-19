import { Route, Routes } from 'react-router';
import { AutomationsIndexPage } from './AutomationsIndexPage';

export function AutomationsPage() {
  return (
    <div
      className="h-full overflow-y-hidden flex flex-col"
      style={{ backgroundColor: 'var(--dex-surface-flat-bgColor)' }}
    >
      <div className="h-full overflow-y-auto flex-1">
        <Routes>
          <Route index element={<AutomationsIndexPage />} />
        </Routes>
      </div>
    </div>
  );
}
