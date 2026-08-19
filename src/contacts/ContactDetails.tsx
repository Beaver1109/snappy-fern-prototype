import { useParams } from 'react-router';
import { contacts } from './contacts';
import { DexBox, DexInlineAlert, DexText } from '@thryvlabs/dex-react';

export function ContactDetails() {
  const { id } = useParams<{ id: string }>();
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return (
      <DexBox padding="200">
        <DexInlineAlert variant="danger" leadingIcon>
          Contact not found
        </DexInlineAlert>
      </DexBox>
    );
  }

  return (
    <DexBox padding="200">
      <DexText variant="display-3">{contact.name}</DexText>
    </DexBox>
  );
}
