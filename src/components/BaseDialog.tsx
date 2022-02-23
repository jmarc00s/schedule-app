import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import Button from './Button';

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  setOpen: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  closeButtonLabel?: string;
  confirmButtonLabel?: string;
  onConfirm?: () => void;
}

const BaseDialog = ({
  open,
  onClose,
  setOpen,
  title,
  children,
  showCloseButton = true,
  showConfirmButton = true,
  closeButtonLabel = 'Fechar',
  confirmButtonLabel = 'Confirmar',
  onConfirm,
}: BaseDialogProps) => {
  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog
      className={`fixed inset-0 z-10 overflow-y-auto`}
      open={open}
      onClose={onClose}
    >
      <div className="min-h-screen flex items-center justify-center">
        <Dialog.Overlay
          className={`fixed inset-0 bg-black opacity-30`}
          onClick={closeDialog}
        />
        <div className="relative bg-white rounded-lg mx-auto my-auto w-1/2">
          <Dialog.Title
            as="h3"
            className={`text-lg font-medium leading-6 text-white bg-indigo-800 rounded-t-lg flex items-center px-10 py-5 w-full`}
          >
            {title}
          </Dialog.Title>
          <div className="px-5 py-3">{children}</div>
          <div className="flex justify-end gap-2 px-5 pb-3">
            {showCloseButton && (
              <Button
                color="normal"
                label={closeButtonLabel}
                handleClick={closeDialog}
              ></Button>
            )}
            {showConfirmButton && (
              <Button
                color="Dark indigo"
                label={confirmButtonLabel}
                handleClick={onConfirm}
              ></Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseDialog;
