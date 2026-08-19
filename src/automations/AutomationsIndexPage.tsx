import {
  DexBox,
  DexStack,
  DexText,
  DexTable,
  DexTableHeader,
  DexTableHeaderCell,
  DexTableRow,
  DexTableCheckboxCell,
  DexTableButtonCell,
  DexTableHeaderCheckboxCell,
  DexCheckbox,
  DexTableBody,
  DexTableCell,
  DexDropdownMenu,
  DexIconButton,
  DexDropdownMenuItem,
  DexStatus,
  DexInline,
  DexButtonGroup,
  DexButton,
  DexInput,
  DexIcon,
  useConfirmDialog,
  useNotification,
  DexOffsetPager,
  DexDropdownMenuCheckboxItem,
  DexSkeletonText,
} from '@thryvlabs/dex-react';
import { automations, type Automation } from './automations';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type RowSelectionState,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

function AutomationIndexHeader() {
  return (
    <DexInline gap="200" stretch alignX="spread" alignY="center">
      <DexText variant="display-2" as="h2">
        Automations
      </DexText>

      <DexButtonGroup>
        <DexDropdownMenu
          align="end"
          content={
            <DexDropdownMenuItem>
              Manage automation categories
            </DexDropdownMenuItem>
          }
        >
          <DexIconButton name="more-vertical" label="More options" />
        </DexDropdownMenu>

        <DexDropdownMenu
          align="end"
          content={
            <>
              <DexDropdownMenuItem
                leadingIcon="copy"
                title="Start from template"
              />
              <DexDropdownMenuItem
                leadingIcon="copy"
                title="Advanced automation"
                description="Automation builder"
              />
              <DexDropdownMenuItem
                leadingIcon="add-circle"
                title="Easy automation"
              />
            </>
          }
        >
          <DexButton variant="solid" trailingIcon="chevron-down">
            Create an automation
          </DexButton>
        </DexDropdownMenu>
      </DexButtonGroup>
    </DexInline>
  );
}

function AutomationRowStatus({ status }: { status: Automation['status'] }) {
  switch (status) {
    case 'draft':
      return (
        <DexStatus variant="default" emphasis="high">
          Draft
        </DexStatus>
      );
    case 'active':
      return (
        <DexStatus variant="success" emphasis="high">
          Active
        </DexStatus>
      );
    case 'disabled':
      return (
        <DexStatus variant="default" emphasis="high">
          Disabled
        </DexStatus>
      );
    default:
      return null;
  }
}

function formatDate(date: string) {
  const d = new Date(date);
  const dateString = d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  const timeString = d
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase();
  return `${dateString} ${timeString}`;
}

const columnHelper = createColumnHelper<Automation>();

const SkeletonAutomationRow = () => {
  return (
    <DexTableRow>
      <DexTableCheckboxCell>
        <DexCheckbox label="Select" labelHidden disabled checked={false} />
      </DexTableCheckboxCell>
      <DexTableCell>
        <DexSkeletonText variant="body-2" style={{ width: '200px' }} />
      </DexTableCell>
      <DexTableCell>
        <DexSkeletonText variant="body-2" style={{ width: '66px' }} />
      </DexTableCell>
      <DexTableCell>
        <DexSkeletonText variant="body-2" style={{ width: '150px' }} />
      </DexTableCell>
      <DexTableButtonCell>
        <DexIconButton name="more-vertical" disabled />
      </DexTableButtonCell>
    </DexTableRow>
  );
};

export function AutomationsIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isLoading, setIsLoading] = useState(true);

  const initialStatusFilter = searchParams.get('status');
  const initialSearchFilter = searchParams.get('search');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (initialStatusFilter) {
      const statusValues = initialStatusFilter.split(',');
      filters.push({ id: 'status', value: statusValues });
    }
    if (initialSearchFilter) {
      filters.push({ id: 'name', value: initialSearchFilter });
    }
    return filters;
  });

  useEffect(() => {
    const loadingTimeout = Math.random() * 2000 + 500;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, loadingTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const { open: openConfirmDialog } = useConfirmDialog();
  const { open: openNotification } = useNotification();

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <DexCheckbox
          label="Select all"
          labelHidden
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? 'indeterminate'
                : false
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <DexCheckbox
          label={`Select ${row.original.name}`}
          labelHidden
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <AutomationRowStatus status={info.getValue()} />,
      filterFn: (row, columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        return filterValue.includes(row.getValue(columnId));
      },
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Last Updated',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const handleDelete = () => {
          openConfirmDialog({
            title: 'Delete automation',
            description: `If you delete "${row.original.name}", it can't be undone.`,
            confirmLabel: 'Delete automation',
            cancelLabel: 'Go back',
            variant: 'danger',
            onConfirm: () => {
              openNotification({
                title: 'Automation deleted',
                description: `"${row.original.name}" has been deleted.`,
              });
            },
          });
        };

        return (
          <DexDropdownMenu
            align="end"
            content={
              <>
                <DexDropdownMenuItem leadingIcon="edit">
                  Edit
                </DexDropdownMenuItem>
                <DexDropdownMenuItem
                  leadingIcon="trash-2"
                  variant="danger"
                  onSelect={handleDelete}
                >
                  Delete
                </DexDropdownMenuItem>
              </>
            }
          >
            <DexIconButton name="more-vertical" />
          </DexDropdownMenu>
        );
      },
    }),
  ];

  const currentPage = Number(searchParams.get('page')) || 1;
  const pageIndex = Math.max(0, currentPage - 1);
  const PAGE_SIZE = 20;

  const table = useReactTable({
    data: automations,
    columns,
    state: {
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: PAGE_SIZE,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const statusFilterCount =
    (table.getColumn('status')?.getFilterValue() as string[] | undefined)
      ?.length ?? 0;

  const isStatusFilterSelected = (status: string) => {
    return (
      (
        table.getColumn('status')?.getFilterValue() as string[] | undefined
      )?.includes(status) ?? false
    );
  };

  const toggleStatusFilter = (status: string) => {
    const currentFilter =
      (table.getColumn('status')?.getFilterValue() as string[]) || [];
    const isSelected = currentFilter.includes(status);
    const newFilter = isSelected
      ? currentFilter.filter((v) => v !== status)
      : [...currentFilter, status];

    table
      .getColumn('status')
      ?.setFilterValue(newFilter.length > 0 ? newFilter : undefined);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    if (newFilter.length > 0) {
      newSearchParams.set('status', newFilter.join(','));
    } else {
      newSearchParams.delete('status');
    }
    setSearchParams(newSearchParams);
  };

  const handleNameSearchChange = (value: string) => {
    table.getColumn('name')?.setFilterValue(value || undefined);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const clearStatusFilters = () => {
    if (statusFilterCount === 0) return;

    table.getColumn('status')?.setFilterValue(undefined);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('status');
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowCount = selectedRows.length;
  const selectedNames = useMemo(
    () => selectedRows.map((row) => row.original.name),
    [selectedRows],
  );

  const handleBulkDeactivate = () => {
    openNotification({
      title: 'Automations deactivated',
      description:
        selectedRowCount === 1
          ? `"${selectedNames[0]}" has been deactivated.`
          : `${selectedRowCount} automations have been deactivated.`,
    });
  };

  const handleBulkDelete = () => {
    openConfirmDialog({
      title: 'Delete automations',
      description:
        selectedRowCount === 1
          ? `If you delete "${selectedNames[0]}", it can't be undone.`
          : `If you delete these ${selectedRowCount} automations, it can't be undone.`,
      confirmLabel: 'Delete automations',
      cancelLabel: 'Go back',
      variant: 'danger',
      onConfirm: () => {
        openNotification({
          title: 'Automations deleted',
          description:
            selectedRowCount === 1
              ? `"${selectedNames[0]}" has been deleted.`
              : `${selectedRowCount} automations have been deleted.`,
        });
      },
    });
  };

  return (
    <DexBox padding="200">
      <DexStack gap="200">
        <AutomationIndexHeader />

        <DexInline gap="200" stretch alignX="spread" alignY="center">
          <DexInline gap="100">
            <DexInput
              type="search"
              label="Search"
              leading={<DexIcon name="search" />}
              labelHidden
              placeholder="Search"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onValueChange={(value) => handleNameSearchChange(value)}
            />

            <DexDropdownMenu
              content={
                <>
                  <DexDropdownMenuItem
                    onSelect={() => clearStatusFilters()}
                    leadingIcon="x"
                  >
                    Clear status filters
                  </DexDropdownMenuItem>
                  <DexDropdownMenuCheckboxItem
                    title="Active"
                    selected={isStatusFilterSelected('active')}
                    onSelect={() => toggleStatusFilter('active')}
                  />
                  <DexDropdownMenuCheckboxItem
                    title="Draft"
                    selected={isStatusFilterSelected('draft')}
                    onSelect={() => toggleStatusFilter('draft')}
                  />
                  <DexDropdownMenuCheckboxItem
                    title="Disabled"
                    selected={isStatusFilterSelected('disabled')}
                    onSelect={() => toggleStatusFilter('disabled')}
                  />
                </>
              }
            >
              {(() => {
                return (
                  <DexButton
                    variant="transparent"
                    leadingIcon="filter"
                    selected={statusFilterCount > 0}
                    trailing={
                      statusFilterCount > 0 ? (
                        <DexStatus variant="info" emphasis="high">
                          {statusFilterCount}
                        </DexStatus>
                      ) : undefined
                    }
                  >
                    Filter
                  </DexButton>
                );
              })()}
            </DexDropdownMenu>
          </DexInline>

          <DexInline gap="100" alignY="center">
            {selectedRowCount > 0 && (
              <>
                <DexText variant="body-2" color="subtle">
                  {selectedRowCount} selected
                </DexText>

                <DexDropdownMenu
                  align="end"
                  content={
                    <>
                      <DexDropdownMenuItem
                        leadingIcon="zap-off"
                        onSelect={handleBulkDeactivate}
                      >
                        Deactivate
                      </DexDropdownMenuItem>
                      <DexDropdownMenuItem
                        variant="danger"
                        leadingIcon="trash-2"
                        onSelect={handleBulkDelete}
                      >
                        Delete
                      </DexDropdownMenuItem>
                    </>
                  }
                >
                  <DexButton variant="outline" trailingIcon="chevron-down">
                    Bulk actions
                  </DexButton>
                </DexDropdownMenu>
              </>
            )}

            <DexIconButton name="settings" label="Settings" />
          </DexInline>
        </DexInline>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <DexTable style={{ minWidth: '800px' }}>
            <DexTableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <DexTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.id === 'select') {
                      return (
                        <DexTableHeaderCheckboxCell key={header.id}>
                          {isLoading ? (
                            <DexCheckbox
                              label="Select all"
                              labelHidden
                              disabled
                              checked={false}
                            />
                          ) : header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </DexTableHeaderCheckboxCell>
                      );
                    }
                    return (
                      <DexTableHeaderCell
                        key={header.id}
                        width={header.id === 'actions' ? 'content' : undefined}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </DexTableHeaderCell>
                    );
                  })}
                </DexTableRow>
              ))}
            </DexTableHeader>

            <DexTableBody>
              {isLoading
                ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <SkeletonAutomationRow key={index} />
                  ))
                : table.getRowModel().rows.map((row) => (
                    <DexTableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === 'select') {
                          return (
                            <DexTableCheckboxCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </DexTableCheckboxCell>
                          );
                        }
                        if (cell.column.id === 'actions') {
                          return (
                            <DexTableButtonCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </DexTableButtonCell>
                          );
                        }
                        return (
                          <DexTableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </DexTableCell>
                        );
                      })}
                    </DexTableRow>
                  ))}
            </DexTableBody>
          </DexTable>
        </div>

        {table.getFilteredRowModel().rows.length > 0 && !isLoading && (
          <DexInline alignY="center" stretch alignX="spread" gap="100">
            <DexOffsetPager
              size="dense"
              currentPage={pageIndex + 1}
              totalPages={Math.ceil(
                table.getFilteredRowModel().rows.length / PAGE_SIZE,
              )}
              onCurrentPageChange={(page: number) => {
                if (isLoading) return;
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set('page', page.toString());
                setSearchParams(newSearchParams);
              }}
            />

            <DexText variant="body-2">
              {pageIndex * PAGE_SIZE + 1} -{' '}
              {Math.min(
                (pageIndex + 1) * PAGE_SIZE,
                table.getFilteredRowModel().rows.length,
              )}{' '}
              of {table.getFilteredRowModel().rows.length}
            </DexText>
          </DexInline>
        )}
      </DexStack>
    </DexBox>
  );
}
