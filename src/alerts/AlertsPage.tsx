import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexDivider,
  DexButton,
  DexLink,
  DexTabs,
  DexTabsList,
  DexTabsTrigger,
  DexTabsContent,
  DexModal,
  DexModalContent,
  DexModalHeading,
  DexModalBody,
  DexModalFooter,
} from '@thryvlabs/dex-react';
import { CustomerAlertCard } from './CustomerAlertCard';
import { BulkActionsBanner } from './BulkActionsBanner';
import { initialAlerts, initialArchivedAlerts } from './alertsData';
import type { Alert } from './alertsData';

const DISMISS_KEY = (type: string) => `ph-dismiss-seen-${type}`;
const hasSeenDismiss = (type: string) => !!localStorage.getItem(DISMISS_KEY(type));
const markDismissSeen = (type: string) => localStorage.setItem(DISMISS_KEY(type), '1');

export function AlertsPage() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [archivedAlerts, setArchivedAlerts] = useState<Alert[]>(initialArchivedAlerts);
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('all');
  const [isDismissModalOpen, setIsDismissModalOpen] = useState(false);
  const [dismissUndoSnapshot, setDismissUndoSnapshot] = useState<Alert | null>(null);

  const criticalAlerts = useMemo(() => alerts.filter((a) => a.type === 'critical'), [alerts]);
  const warningAlerts = useMemo(() => alerts.filter((a) => a.type === 'warning'), [alerts]);
  const activityAlerts = useMemo(() => alerts.filter((a) => a.type === 'activity'), [alerts]);

  const visibleAlerts = useMemo(() => {
    if (activeTab === 'critical') return criticalAlerts;
    if (activeTab === 'warnings') return warningAlerts;
    if (activeTab === 'activity') return activityAlerts;
    if (activeTab === 'archive') return archivedAlerts;
    return alerts;
  }, [activeTab, alerts, criticalAlerts, warningAlerts, activityAlerts, archivedAlerts]);

  const tabs = [
    { value: 'all', label: `All (${alerts.length})` },
    { value: 'critical', label: `Critical (${criticalAlerts.length})` },
    { value: 'warnings', label: `Warnings (${warningAlerts.length})` },
    { value: 'activity', label: `Activity (${activityAlerts.length})` },
    { value: 'archive', label: `Archive (${archivedAlerts.length})` },
  ];

  const archiveAlert = (id: string) => {
    setAlerts((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target) return prev;
      setArchivedAlerts((arch) => [...arch, { ...target }]);
      return prev.filter((a) => a.id !== id);
    });
  };

  const restoreAlert = (alert: Alert) => {
    setArchivedAlerts((prev) => prev.filter((a) => a.id !== alert.id));
    setAlerts((prev) => [...prev, alert]);
  };

  const handleRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const handleDismiss = (id: string) => {
    setSelectedAlerts((prev) => { const next = new Set(prev); next.delete(id); return next; });
    const alert = alerts.find((a) => a.id === id);
    if (!alert) return;

    if (!hasSeenDismiss(alert.type)) {
      const snapshot = { ...alert };
      archiveAlert(id);
      setDismissUndoSnapshot(snapshot);
      markDismissSeen(alert.type);
      setIsDismissModalOpen(true);
      return;
    }
    archiveAlert(id);
  };

  const handleAction = (id: string) => {
    archiveAlert(id);
    setSelectedAlerts((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsDismissModalOpen(open);
    if (!open) setDismissUndoSnapshot(null);
  };

  const handleUndo = () => {
    if (dismissUndoSnapshot) restoreAlert(dismissUndoSnapshot);
    setDismissUndoSnapshot(null);
    setIsDismissModalOpen(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedAlerts(new Set());
  };

  const toggleChecked = (id: string, checked: boolean) => {
    setSelectedAlerts((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const selectAll = () => setSelectedAlerts(new Set(visibleAlerts.map((a) => a.id)));
  const deselectAll = () => setSelectedAlerts(new Set());
  const isAllSelected = visibleAlerts.length > 0 && selectedAlerts.size === visibleAlerts.length;

  const bulkDismiss = () => {
    const ids = [...selectedAlerts];
    deselectAll();
    ids.forEach((id) => archiveAlert(id));
  };

  const bulkMarkAsRead = () => {
    const ids = [...selectedAlerts];
    deselectAll();
    setAlerts((prev) => prev.map((a) => (ids.includes(a.id) ? { ...a, isRead: true } : a)));
  };

  const renderAlertList = (list: Alert[], isArchive = false) => {
    if (!list.length) return null;
    return (
      <DexBox paddingY="200">
        <DexStack gap="300">
          {list.map((alert) => (
            <CustomerAlertCard
              key={alert.id}
              alert={alert}
              checked={selectedAlerts.has(alert.id)}
              showCheckbox={!isArchive}
              showCustomerDetails
              isArchived={isArchive}
              onRead={handleRead}
              onDismiss={handleDismiss}
              onAction={handleAction}
              onCheckedChange={toggleChecked}
            />
          ))}
        </DexStack>
      </DexBox>
    );
  };

  const emptyState = (message: string) => (
    <DexBox padding="600">
      <DexStack alignX="center" gap="200">
        <DexText variant="display-3" color="subtle">{message}</DexText>
      </DexStack>
    </DexBox>
  );

  return (
    <>
      {/* Page header */}
      <DexBox paddingX="300" paddingY="200">
        <DexInline alignY="center" alignX="spread" stretch>
          <DexText variant="display-2">Alerts</DexText>
          <DexButton color="neutral" trailingIcon="settings" variant="transparent" onClick={() => navigate('/partner-hub/alerts/preferences')}>
            Settings
          </DexButton>
        </DexInline>
      </DexBox>

      <DexBox paddingX="300">
        <DexTabs value={activeTab} defaultValue="all" onValueChange={handleTabChange}>
          <DexTabsList>
            {tabs.map((tab) => (
              <DexTabsTrigger key={tab.value} value={tab.value}>{tab.label}</DexTabsTrigger>
            ))}
          </DexTabsList>
          <DexDivider />

          {selectedAlerts.size > 0 && (
            <BulkActionsBanner
              selectedCount={selectedAlerts.size}
              allSelected={isAllSelected}
              onClose={deselectAll}
              onSelectAll={selectAll}
              onDeselectAll={deselectAll}
              onMarkAsRead={bulkMarkAsRead}
              onDismiss={bulkDismiss}
            />
          )}

          <DexTabsContent value="all">
            {alerts.length > 0 ? renderAlertList(alerts) : emptyState('No unread alerts')}
          </DexTabsContent>
          <DexTabsContent value="critical">
            {criticalAlerts.length > 0 ? renderAlertList(criticalAlerts) : emptyState('No critical alerts')}
          </DexTabsContent>
          <DexTabsContent value="warnings">
            {warningAlerts.length > 0 ? renderAlertList(warningAlerts) : emptyState('No warning alerts')}
          </DexTabsContent>
          <DexTabsContent value="activity">
            {activityAlerts.length > 0 ? renderAlertList(activityAlerts) : emptyState('No activity alerts')}
          </DexTabsContent>
          <DexTabsContent value="archive">
            {archivedAlerts.length > 0 ? renderAlertList(archivedAlerts, true) : emptyState('No archived alerts')}
          </DexTabsContent>
        </DexTabs>
      </DexBox>

      {/* Dismiss confirmation modal */}
      <DexModal open={isDismissModalOpen} onOpenChange={handleModalOpenChange}>
        <DexModalContent size="sm">
          <DexModalHeading title="Alert dismissed" />
          <DexModalBody>
            <DexText variant="body-1">This alert has been moved to the Archive tab.</DexText>
          </DexModalBody>
          <DexModalFooter>
            <DexInline alignX="right" alignY="center" stretch gap="200">
              <DexLink as="button" onClick={handleUndo}>Undo</DexLink>
              <DexButton variant="outline" color="default" onClick={() => { handleModalOpenChange(false); navigate('/partner-hub/alerts/preferences'); }}>
                Alert preferences
              </DexButton>
            </DexInline>
          </DexModalFooter>
        </DexModalContent>
      </DexModal>
    </>
  );
}
