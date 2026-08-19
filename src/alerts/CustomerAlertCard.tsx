import {
  DexCard,
  DexBox,
  DexInline,
  DexText,
  DexIcon,
  DexLink,
  DexStatus,
  DexButton,
  DexIconButton,
  DexCheckbox,
} from '@thryvlabs/dex-react';
import type { Alert } from './alertsData';

interface Props {
  alert: Alert;
  checked?: boolean;
  showCheckbox?: boolean;
  showCustomerDetails?: boolean;
  isArchived?: boolean;
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
  onCheckedChange?: (id: string, checked: boolean) => void;
}

function categoryVariant(type: Alert['type']) {
  if (type === 'critical') return 'danger';
  if (type === 'warning') return 'warning';
  return 'info';
}

function categoryLabel(type: Alert['type']) {
  if (type === 'critical') return 'Critical';
  if (type === 'warning') return 'Warning';
  return 'Activity';
}

function actionLabel(type: Alert['type']) {
  if (type === 'critical') return 'Review account';
  if (type === 'warning') return 'View details';
  return 'View activity';
}

export function CustomerAlertCard({
  alert,
  checked = false,
  showCheckbox = false,
  showCustomerDetails = false,
  isArchived = false,
  onRead,
  onDismiss,
  onAction,
  onCheckedChange,
}: Props) {
  const handleCustomerClick = () => {
    if (!alert.isRead) onRead?.(alert.id);
  };

  return (
    <DexCard elevation="subtle" style={{ width: '100%' }}>
      <DexBox padding="300">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {showCheckbox && !isArchived && (
            <div style={{ flexShrink: 0, paddingTop: '4px' }}>
              <DexCheckbox
                label=""
                labelHidden
                checked={checked}
                onCheckedChange={(val) => onCheckedChange?.(alert.id, val === true)}
              />
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Title + badge + dismiss */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <DexText
                variant="display-3"
                style={{ flex: 1, minWidth: 0, fontWeight: alert.isRead || isArchived ? undefined : 'var(--dex-fontWeight-bold, 700)' as unknown as undefined }}
              >
                {alert.title}
              </DexText>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <DexStatus variant={categoryVariant(alert.type)} emphasis="high">
                  {categoryLabel(alert.type)}
                </DexStatus>
                {!isArchived && (
                  <DexIconButton
                    name="x"
                    label="Dismiss alert"
                    size="dense"
                    onClick={() => onDismiss?.(alert.id)}
                  />
                )}
              </div>
            </div>

            {/* Customer name + App ID */}
            {showCustomerDetails && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DexLink as="button" onClick={handleCustomerClick} style={{ fontWeight: 600, fontSize: '14px' }}>
                  {alert.customerName}
                </DexLink>
                <DexText variant="body-2" color="subtle" style={{ whiteSpace: 'nowrap' }}>
                  App ID:{' '}
                  <DexLink as="button" onClick={handleCustomerClick} style={{ fontSize: '14px' }}>
                    {alert.appId || alert.tenantId}
                  </DexLink>
                </DexText>
              </div>
            )}

            {/* Description */}
            <DexText variant="body-2" color="subtle" style={{ lineHeight: 1.5 }}>
              {alert.description}
            </DexText>

            {/* Metadata chips */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <DexInline alignY="center" gap="050">
                <DexIcon name="clock" size="sm" style={{ color: 'var(--dex-fgColor-subtle)' }} />
                <DexText variant="caption" color="subtle">{alert.triggeredLabel || 'Triggered recently'}</DexText>
              </DexInline>
              {alert.metadata?.filter((m) => m.value).map((meta, idx) => (
                <DexInline key={idx} alignY="center" gap="050">
                  <DexIcon name="zap" size="sm" style={{ color: 'var(--dex-fgColor-subtle)' }} />
                  <DexText variant="caption" color="subtle">{meta.label}: {meta.value}</DexText>
                </DexInline>
              ))}
            </div>

            {/* Action button */}
            {!isArchived && (
              <div style={{ paddingTop: '4px' }}>
                <DexButton variant="outline" size="dense" onClick={() => onAction?.(alert.id)}>
                  {actionLabel(alert.type)}
                </DexButton>
              </div>
            )}
          </div>
        </div>
      </DexBox>
    </DexCard>
  );
}
