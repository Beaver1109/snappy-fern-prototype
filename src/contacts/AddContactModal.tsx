import { useEffect, useId, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import {
  DexModal,
  DexModalContent,
  DexModalHeading,
  DexModalBody,
  DexInput,
  DexButton,
  DexTextarea,
  DexStack,
  DexButtonGroup,
  DexModalTrigger,
  DexModalFooter,
  DexCheckbox,
  DexInline,
  useNotification,
} from '@thryvlabs/dex-react';

interface AddContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  notes?: string;
}

export function AddContactModal({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddContactForm>();
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createAnother, setCreateAnother] = useState<boolean>(false);
  const notification = useNotification();

  useEffect(() => {
    if (!open) {
      setCreateAnother(false);
      reset();
    }
  }, [open, reset]);

  return (
    <DexModal open={open} onOpenChange={setOpen}>
      <DexModalTrigger>{trigger}</DexModalTrigger>
      <DexModalContent>
        <DexModalHeading title="Add a new contact" />
        <DexModalBody>
          <form
            id={formId}
            noValidate
            onSubmit={handleSubmit((data) => {
              setIsSubmitting(true);
              setTimeout(() => {
                notification.open({
                  title: 'Contact added',
                  description: `The contact "${data.firstName} ${data.lastName}" was added successfully`,
                  variant: 'success',
                });

                if (createAnother) {
                  reset();
                } else {
                  setOpen(false);
                }

                setIsSubmitting(false);
              }, 1000);
            })}
          >
            <DexStack gap="200" stretch>
              <DexInput
                label="First name"
                required
                {...register('firstName', {
                  required: 'First name is required',
                })}
                variant={errors.firstName ? 'danger' : 'default'}
                message={errors.firstName?.message}
              />
              <DexInput
                label="Last name"
                required
                variant={errors.lastName ? 'danger' : 'default'}
                {...register('lastName', {
                  required: 'Last name is required',
                })}
                message={errors.lastName?.message}
              />
              <DexInput
                label="Email"
                required
                {...register('email', { required: 'Email is required' })}
                variant={errors.email ? 'danger' : 'default'}
                message={errors.email?.message}
              />
              <DexInput label="Phone" {...register('phone')} />
              <DexInput label="Company" {...register('company')} />
              <DexInput label="Title" {...register('title')} />
              <DexTextarea label="Notes" {...register('notes')} />
            </DexStack>
          </form>
        </DexModalBody>
        <DexModalFooter>
          <DexInline alignX="spread" alignY="center" stretch>
            <DexCheckbox
              checked={createAnother}
              onCheckedChange={(checked) => setCreateAnother(checked === true)}
              label="Create another"
            />
            <DexButtonGroup alignX="right">
              <DexButton variant="transparent" onClick={() => setOpen(false)}>
                Cancel
              </DexButton>
              <DexButton
                variant="solid"
                type="submit"
                form={formId}
                loading={isSubmitting}
              >
                Add contact
              </DexButton>
            </DexButtonGroup>
          </DexInline>
        </DexModalFooter>
      </DexModalContent>
    </DexModal>
  );
}
