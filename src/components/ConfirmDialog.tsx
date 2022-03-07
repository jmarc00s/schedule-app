import React from 'react';
import BaseDialog from './BaseDialog';

interface ConfirmDialogProps {
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
}

const ConfirmDialog = ({
  description,
  open,
  setOpen,
  title,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title={title ? title : 'Confirmação'}
      onClose={() => {}}
      onConfirm={onConfirm}
    >
      <p className="py-8 text-lg font-medium text-center text-gray-700">{description}</p>
    </BaseDialog>
  );
};

export default ConfirmDialog;
