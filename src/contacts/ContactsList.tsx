/* eslint-disable @typescript-eslint/no-empty-function */

import {
  DexBox,
  DexButtonGroup,
  DexIconButton,
  DexInline,
  DexText,
  DexList,
  DexListItem,
  DexAvatar,
  DexTag,
  DexIcon,
  DexDropdownMenuRadioGroup,
  DexDropdownMenuRadioItem,
  DexDropdownMenu,
  DexDropdownMenuHeading,
  DexCursorPager,
  DexSkeletonAvatar,
  DexSkeletonItem,
  DexSkeletonText,
  DexTooltip,
  DexDropdownMenuCheckboxItem,
  DexStatus,
} from '@thryvlabs/dex-react';
import { useSearchParams } from 'react-router';
import { contacts, type Contact } from './contacts';
import { AddContactModal } from './AddContactModal';
import { useState, useEffect, useMemo } from 'react';

const PAGE_SIZE = 20;

const SkeletonContactListItem = () => {
  return (
    <DexListItem
      leading={<DexSkeletonAvatar />}
      trailing={
        <DexSkeletonItem
          style={{
            width: '66px',
            height: '24px',
            borderRadius: 'var(--dex-borderRadius-150)',
          }}
        />
      }
      title={<DexSkeletonText variant="body" style={{ width: '100px' }} />}
      description={
        <DexSkeletonText variant="body-2" style={{ width: '150px' }} />
      }
    />
  );
};

const ContactListItem = ({ id, name, email, status }: Contact) => {
  const [searchParams] = useSearchParams();

  const tagDisplay =
    status === 'lead' ? 'Lead' : status === 'client' ? 'Client' : 'Other';
  const tagColor =
    status === 'lead'
      ? 'var(--dex-color-accent-orange-emphasis)'
      : status === 'client'
        ? 'var(--dex-color-accent-blue-emphasis)'
        : 'var(--dex-color-accent-gray-emphasis)';

  return (
    <DexListItem
      to={`/contacts/contact/${id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
      title={<span className="break-all line-clamp-1">{name}</span>}
      description={<span className="break-all line-clamp-1">{email}</span>}
      leading={<DexAvatar name={name} />}
      trailing={
        <DexDropdownMenu
          content={
            <DexDropdownMenuRadioGroup value={status}>
              <DexDropdownMenuRadioItem value="lead" title="Lead" />
              <DexDropdownMenuRadioItem value="client" title="Client" />
              <DexDropdownMenuRadioItem value="other" title="Other" />
            </DexDropdownMenuRadioGroup>
          }
        >
          <DexTag
            leading={<DexIcon name="circle-fill" style={{ fill: tagColor }} />}
            onClick={() => {}}
          >
            {tagDisplay}
          </DexTag>
        </DexDropdownMenu>
      }
      className="break-all"
    />
  );
};

export function ContactsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  useEffect(() => {
    const loadingTimeout = Math.random() * 2000 + 500;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, loadingTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'firstName:asc';
  const filterParam = searchParams.get('filter');
  const filters = useMemo(
    () => (filterParam ? filterParam.split(',') : []),
    [filterParam],
  );

  const filteredAndSortedContacts = useMemo(() => {
    let filteredArray = [...contacts];
    if (filters.length > 0) {
      filteredArray = filteredArray.filter((contact) =>
        filters.includes(contact.status),
      );
    }

    const [field, direction] = sort.split(':');
    const sortedArray = filteredArray.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (field === 'firstName') {
        aValue = a.name.split(' ')[0] || '';
        bValue = b.name.split(' ')[0] || '';
      } else if (field === 'lastName') {
        const aParts = a.name.split(' ');
        const bParts = b.name.split(' ');
        aValue = aParts[aParts.length - 1] || '';
        bValue = bParts[bParts.length - 1] || '';
      } else if (field === 'email') {
        aValue = a.email;
        bValue = b.email;
      } else {
        return 0;
      }

      const comparison = aValue.localeCompare(bValue, undefined, {
        sensitivity: 'base',
      });
      return direction === 'asc' ? comparison : -comparison;
    });

    return sortedArray;
  }, [sort, filters]);

  const totalPages = Math.ceil(filteredAndSortedContacts.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(
    startIndex + PAGE_SIZE,
    filteredAndSortedContacts.length,
  );
  const currentContacts = filteredAndSortedContacts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (newSort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSort);
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  const handleSortDropdownOpenChange = (open: boolean) => {
    setIsSortDropdownOpen(open);
  };

  const isFilterSelected = (status: string) => {
    return filters.includes(status);
  };

  const toggleFilter = (status: string) => {
    const isSelected = filters.includes(status);
    const newFilters = isSelected
      ? filters.filter((f) => f !== status)
      : [...filters, status];

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    if (newFilters.length > 0) {
      newSearchParams.set('filter', newFilters.join(','));
    } else {
      newSearchParams.delete('filter');
    }
    setSearchParams(newSearchParams);
  };

  const handleFilterDropdownOpenChange = (open: boolean) => {
    setIsFilterDropdownOpen(open);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ borderRight: '1px solid var(--dex-borderColor-alpha-subtle)' }}
    >
      <DexBox
        padding="200"
        style={{
          borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)',
        }}
      >
        <DexInline alignY="center" alignX="spread" stretch>
          <DexText as="h2" variant="display-3">
            People
          </DexText>

          <DexButtonGroup>
            <DexTooltip content="Sort contacts" disabled={isSortDropdownOpen}>
              <DexInline>
                <DexDropdownMenu
                  open={isSortDropdownOpen}
                  onOpenChange={handleSortDropdownOpenChange}
                  content={
                    <>
                      <DexDropdownMenuHeading>
                        Sort contacts by
                      </DexDropdownMenuHeading>
                      <DexDropdownMenuRadioGroup
                        value={sort}
                        onValueChange={handleSortChange}
                      >
                        <DexDropdownMenuRadioItem
                          value="firstName:asc"
                          title="First name, A-Z"
                        />
                        <DexDropdownMenuRadioItem
                          value="firstName:desc"
                          title="First name, Z-A"
                        />
                        <DexDropdownMenuRadioItem
                          value="lastName:asc"
                          title="Last name, A-Z"
                        />
                        <DexDropdownMenuRadioItem
                          value="lastName:desc"
                          title="Last name, Z-A"
                        />
                        <DexDropdownMenuRadioItem
                          value="email:asc"
                          title="Email, A-Z"
                        />
                        <DexDropdownMenuRadioItem
                          value="email:desc"
                          title="Email, Z-A"
                        />
                      </DexDropdownMenuRadioGroup>
                    </>
                  }
                >
                  <DexIconButton name="sort" label="Sort" />
                </DexDropdownMenu>
              </DexInline>
            </DexTooltip>
            <DexTooltip
              content="Filter contacts"
              disabled={isFilterDropdownOpen}
            >
              <DexInline style={{ position: 'relative' }}>
                <DexDropdownMenu
                  open={isFilterDropdownOpen}
                  onOpenChange={handleFilterDropdownOpenChange}
                  content={
                    <>
                      <DexDropdownMenuHeading>
                        Filter by contact type
                      </DexDropdownMenuHeading>
                      <DexDropdownMenuCheckboxItem
                        title="Lead"
                        selected={isFilterSelected('lead')}
                        onSelect={() => toggleFilter('lead')}
                      />
                      <DexDropdownMenuCheckboxItem
                        title="Client"
                        selected={isFilterSelected('client')}
                        onSelect={() => toggleFilter('client')}
                      />
                      <DexDropdownMenuCheckboxItem
                        title="Other"
                        selected={isFilterSelected('other')}
                        onSelect={() => toggleFilter('other')}
                      />
                    </>
                  }
                >
                  <DexIconButton
                    name="filter"
                    label="Filter"
                    selected={filters.length > 0}
                  />
                </DexDropdownMenu>
                {filters.length > 0 && (
                  <DexStatus
                    variant="info"
                    emphasis="high"
                    style={{
                      position: 'absolute',
                      top: 'calc(var(--dex-spacing-050) * -1)',
                      right: 'calc(var(--dex-spacing-050) * -1)',
                      pointerEvents: 'none',
                    }}
                  >
                    {filters.length}
                  </DexStatus>
                )}
              </DexInline>
            </DexTooltip>
            <DexTooltip content="Add contact">
              <DexInline>
                <AddContactModal
                  trigger={
                    <DexIconButton name="add-circle" label="Add Contact" />
                  }
                />
              </DexInline>
            </DexTooltip>
          </DexButtonGroup>
        </DexInline>
      </DexBox>
      <DexList border="stretch" className="flex-1 overflow-y-auto">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <SkeletonContactListItem key={index} />
            ))
          : currentContacts.map((contact) => (
              <ContactListItem key={contact.id} {...contact} />
            ))}
      </DexList>
      {totalPages > 0 && (
        <DexBox
          padding="200"
          style={{ borderTop: '1px solid var(--dex-borderColor-alpha-subtle)' }}
        >
          <DexInline alignY="center" stretch alignX="spread" gap="100">
            <DexCursorPager
              aria-label="Contacts pagination"
              labelsHidden
              size="dense"
            >
              <DexCursorPager.First
                disabled={currentPage === 1 || isLoading}
                onClick={() => handlePageChange(1)}
              />
              <DexCursorPager.Previous
                disabled={currentPage === 1 || isLoading}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              <DexCursorPager.Next
                disabled={currentPage === totalPages || isLoading}
                onClick={() => handlePageChange(currentPage + 1)}
              />
              <DexCursorPager.Last
                disabled={currentPage === totalPages || isLoading}
                onClick={() => handlePageChange(totalPages)}
              />
            </DexCursorPager>

            {isLoading ? (
              <DexSkeletonText variant="body-2" style={{ width: '100px' }} />
            ) : (
              <DexText variant="body-2">
                {startIndex + 1} - {endIndex} of{' '}
                {filteredAndSortedContacts.length}
              </DexText>
            )}
          </DexInline>
        </DexBox>
      )}
    </div>
  );
}
