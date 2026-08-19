import { Route, Routes } from 'react-router';
import { ContactsList } from './ContactsList';
import { ContactDetails } from './ContactDetails';
import { DexBox, DexStack, DexText } from '@thryvlabs/dex-react';

function ContactsIndexPage() {
  return (
    <DexBox padding="200">
      <DexStack>
        <DexText variant="display-3">Contacts</DexText>
        <DexText variant="body">Select a contact to view details</DexText>
      </DexStack>
    </DexBox>
  );
}

export function ContactsPage() {
  return (
    <div
      className="grid grid-cols-[375px_1fr] grid-rows-[100%] h-full"
      style={{ backgroundColor: 'var(--dex-surface-flat-bgColor)' }}
    >
      <ContactsList />

      <div>
        <Routes>
          <Route index element={<ContactsIndexPage />} />
          <Route path="contact/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </div>
  );
}
