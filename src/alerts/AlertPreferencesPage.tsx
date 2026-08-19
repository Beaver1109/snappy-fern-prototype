import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexButton,
  DexCard,
  DexDivider,
  DexStatus,
  DexSwitch,
  DexSelect,
  DexSelectItem,
  DexConfirmDialog,
  DexConfirmDialogContent,
  DexIconButton,
} from '@thryvlabs/dex-react';
import {
  createDefaultAlertGroups,
  frequencyOptions,
  alertActionOptions,
  individualFrequencyOptions,
  ALERTS_ON,
  SELECT_ACTION,
  SELECT_FREQUENCY,
} from './alertPreferencesData';
import type { AlertGroup } from './alertPreferencesData';

export function AlertPreferencesPage() {
  const navigate = useNavigate();
  const [alertGroups, setAlertGroups] = useState<AlertGroup[]>(createDefaultAlertGroups());
  const [bulkAlertAction, setBulkAlertAction] = useState(SELECT_ACTION);
  const [bulkFrequency, setBulkFrequency] = useState(SELECT_FREQUENCY);
  const [showResetModal, setShowResetModal] = useState(false);

  const toggleAlert = (groupId: string, alertId: string, enabled: boolean) => {
    setAlertGroups((prev) =>
      prev.map((g) =>
        g.id !== groupId
          ? g
          : { ...g, alerts: g.alerts.map((a) => (a.id !== alertId ? a : { ...a, enabled })) },
      ),
    );
  };

  const setAlertFrequency = (groupId: string, alertId: string, frequency: string) => {
    setAlertGroups((prev) =>
      prev.map((g) =>
        g.id !== groupId
          ? g
          : { ...g, alerts: g.alerts.map((a) => (a.id !== alertId ? a : { ...a, frequency })) },
      ),
    );
  };

  const applyBulkAlertAction = (action: string) => {
    if (action === SELECT_ACTION) return;
    const enabled = action === ALERTS_ON;
    setAlertGroups((prev) =>
      prev.map((g) => ({ ...g, alerts: g.alerts.map((a) => ({ ...a, enabled })) })),
    );
    setBulkAlertAction(SELECT_ACTION);
  };

  const applyBulkFrequency = (frequency: string) => {
    if (frequency === SELECT_FREQUENCY) return;
    setAlertGroups((prev) =>
      prev.map((g) => ({ ...g, alerts: g.alerts.map((a) => ({ ...a, frequency })) })),
    );
    setBulkFrequency(SELECT_FREQUENCY);
  };

  const handleReset = () => {
    setAlertGroups(createDefaultAlertGroups());
    setBulkAlertAction(SELECT_ACTION);
    setBulkFrequency(SELECT_FREQUENCY);
    setShowResetModal(false);
  };

  return (
    <>
      {/* Page header */}
      <DexBox paddingX="300" paddingY="200">
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="100">
            <DexIconButton name="arrow-left" label="Back to alerts" variant="transparent" onClick={() => navigate('/partner-hub/alerts')} />
            <DexText variant="display-1">Alert preferences</DexText>
          </DexInline>
          <DexButton variant="transparent" onClick={() => setShowResetModal(true)}>
            Reset to default
          </DexButton>
        </DexInline>
      </DexBox>

      <DexBox paddingX="300" paddingY="300">
        <DexStack gap="200">
          <DexText variant="body-1">Configure which alerts you receive and how often.</DexText>

          {/* Bulk controls */}
          <DexCard elevation="subtle">
            <DexBox padding="200">
              <DexInline alignY="center" gap="300">
                <DexInline alignY="center" gap="100">
                  <DexText variant="body-2" style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                    Manage all alerts:
                  </DexText>
                  <div style={{ width: '160px' }}>
                    <DexSelect
                      label="Manage all alerts"
                      labelHidden
                      value={bulkAlertAction}
                      onValueChange={(val) => { setBulkAlertAction(val); applyBulkAlertAction(val); }}
                    >
                      {alertActionOptions.map((opt) => (
                        <DexSelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </DexSelectItem>
                      ))}
                    </DexSelect>
                  </div>
                </DexInline>

                <DexInline alignY="center" gap="100">
                  <DexText variant="body-2" style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                    Apply frequency to all:
                  </DexText>
                  <div style={{ width: '160px' }}>
                    <DexSelect
                      label="Apply frequency to all"
                      labelHidden
                      value={bulkFrequency}
                      onValueChange={(val) => { setBulkFrequency(val); applyBulkFrequency(val); }}
                    >
                      {frequencyOptions.map((opt) => (
                        <DexSelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </DexSelectItem>
                      ))}
                    </DexSelect>
                  </div>
                </DexInline>
              </DexInline>
            </DexBox>
          </DexCard>

          {/* Alert groups */}
          <DexCard elevation="subtle">
            <DexBox padding="300">
              <DexStack gap="300">
                {alertGroups.map((group, groupIdx) => (
                  <div key={group.id}>
                    {groupIdx > 0 && <DexDivider />}
                    <DexStack gap="300">
                      <DexInline alignY="center" gap="100">
                        <DexStatus variant={group.badgeVariant} emphasis="high">{group.badge}</DexStatus>
                        <DexText variant="headline-5">{group.title}</DexText>
                      </DexInline>

                      <DexStack gap="200">
                        {group.alerts.map((alert) => (
                          <div
                            key={alert.id}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <DexSwitch
                                checked={alert.enabled}
                                label={alert.label}
                                onCheckedChange={(val) => toggleAlert(group.id, alert.id, val)}
                              />
                            </div>
                            <div style={{ width: '140px', flexShrink: 0 }}>
                              <DexSelect
                                label="Frequency"
                                labelHidden
                                value={alert.frequency}
                                disabled={!alert.enabled}
                                onValueChange={(val) => setAlertFrequency(group.id, alert.id, val)}
                              >
                                {individualFrequencyOptions.map((opt) => (
                                  <DexSelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </DexSelectItem>
                                ))}
                              </DexSelect>
                            </div>
                          </div>
                        ))}
                      </DexStack>
                    </DexStack>
                  </div>
                ))}
              </DexStack>
            </DexBox>
          </DexCard>
        </DexStack>
      </DexBox>

      {/* Reset confirmation dialog */}
      <DexConfirmDialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DexConfirmDialogContent
          title="Reset to default?"
          description="Are you sure you want to reset all alert preferences to default? This cannot be undone."
          confirmText="Reset"
          cancelText="Cancel"
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      </DexConfirmDialog>
    </>
  );
}
