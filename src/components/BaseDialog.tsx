import { ReactNode, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';

export interface BaseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showLoading?: boolean;
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
  showLoading,
  onConfirm,
}: BaseDialogProps) => {
  function closeDialog() {
    setOpen(false);
  }

  function renderButtons() {
    return (
      <>
        {showCloseButton && (
          <Button
            color="Normal"
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
      </>
    );
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className={`fixed inset-0 z-10 overflow-y-auto`}
        open={open}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0  bg-black bg-opacity-50 transition-opacity`}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-1/3 mx-auto my-auto bg-white rounded-lg">
              <Dialog.Title
                as="h3"
                className={`text-lg font-medium leading-6 text-white bg-indigo-800 rounded-t-lg flex items-center px-10 py-5 w-full`}
              >
                {title}
              </Dialog.Title>
              <div className="px-5 py-3">{children}</div>
              <div className="flex justify-end gap-2 px-5 py-3 bg-gray-100">
                {showLoading ? 'Carregando...' : renderButtons()}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BaseDialog;
