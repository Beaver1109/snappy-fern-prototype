import {
  DexText,
  DexCard,
  DexBox,
  DexStack,
  DexDropdownMenu,
  DexDropdownMenuItem,
  DexIcon,
  DexIconButton,
  DexInline,
} from '@thryvlabs/dex-react';

function formatNumber(value: number, format?: 'number' | 'currency'): string {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US').format(value);
}

export function MetricCard({
  title,
  description,
  value,
  trend,
  range,
  format = 'number',
}: {
  title: string;
  description: string;
  value: number;
  trend?: number;
  range: string;
  format?: 'number' | 'currency';
}) {
  return (
    <DexCard elevation="subtle" style={{ width: '200px' }}>
      <div
        style={{
          height: '200px',
        }}
      >
        <DexStack stretch alignY="spread">
          <DexStack>
            <DexBox paddingLeft="200" paddingRight="100" paddingTop="100">
              <DexInline stretch alignX="spread" alignY="center">
                <DexText variant="headline-4">{title}</DexText>
                <DexDropdownMenu
                  align="end"
                  content={
                    <>
                      <DexDropdownMenuItem>Manage widgets</DexDropdownMenuItem>
                      <DexDropdownMenuItem>Move widgets</DexDropdownMenuItem>
                    </>
                  }
                >
                  <DexIconButton size="dense" label="More">
                    <DexIcon name="more-vertical" size="sm" />
                  </DexIconButton>
                </DexDropdownMenu>
              </DexInline>
            </DexBox>

            <DexBox paddingX="200">
              <DexStack gap="050">
                <DexText variant="caption" color="subtle">
                  {range}
                </DexText>

                <DexText variant="caption" color="subtle">
                  {description}
                </DexText>
              </DexStack>

              <DexText variant="display-2">
                {formatNumber(value, format)}
              </DexText>

              {trend && (
                <DexInline gap="025" alignY="center">
                  <DexIcon
                    name={trend > 0 ? 'arrow-up-fill' : 'arrow-down-fill'}
                    size="sm"
                    color={trend > 0 ? 'success' : 'danger'}
                  />
                  <DexText
                    variant="body-2"
                    color={trend > 0 ? 'success' : 'danger'}
                  >
                    {Math.abs(trend)}%
                  </DexText>
                </DexInline>
              )}
            </DexBox>
          </DexStack>

          <DexBox paddingX="100" paddingBottom="100">
            <DexInline stretch alignX="spread">
              <DexIconButton size="dense" label="Add">
                <DexIcon name="add-circle" size="sm" color="primary" />
              </DexIconButton>
              <DexIconButton size="dense" label="Go to item">
                <DexIcon name="arrow-right" size="sm" color="primary" />
              </DexIconButton>
            </DexInline>
          </DexBox>
        </DexStack>
      </div>
    </DexCard>
  );
}
