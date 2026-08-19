import { DexInlineAlert, DexInline, DexText, DexButton } from '@thryvlabs/dex-react';

interface Props {
  selectedCount: number;
  allSelected: boolean;
  onClose: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onMarkAsRead: () => void;
  onDismiss: () => void;
}

export function BulkActionsBanner({
  selectedCount,
  allSelected,
  onClose,
  onSelectAll,
  onDeselectAll,
  onMarkAsRead,
  onDismiss,
}: Props) {
  return (
    <DexInlineAlert variant="info" leadingIcon={false} onClose={onClose} style={{ marginTop: 'var(--dex-spacing-200)' }}>
      <DexInline alignY="center" alignX="spread" stretch>
        <DexInline gap="025" alignY="center">
          <DexText color="primary" style={{ fontWeight: 'var(--dex-fontWeight-bold)' }}>
            {selectedCount} selected |
          </DexText>
          {allSelected ? (
            <DexButton variant="transparent" onClick={onDeselectAll}>Deselect all</DexButton>
          ) : (
            <DexButton variant="transparent" onClick={onSelectAll}>Select all</DexButton>
          )}
        </DexInline>
        <DexInline gap="150" alignY="center">
          <DexButton variant="outline" size="dense" onClick={onMarkAsRead}>Mark as read</DexButton>
          <DexButton variant="outline" size="dense" onClick={onDismiss}>Dismiss</DexButton>
        </DexInline>
      </DexInline>
    </DexInlineAlert>
  );
}
