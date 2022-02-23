import React from 'react';
import BaseDialog from './BaseDialog';

interface AddScheduleDialogProps {
  open: boolean;
  onClose?: () => void;
  setOpen: (open: boolean) => void;
}

function AddScheduleDialog({ open, onClose, setOpen }: AddScheduleDialogProps) {
  return (
    <BaseDialog
      title="Adicionar um horário"
      open={open}
      onClose={() => onClose}
      setOpen={setOpen}
      confirmButtonLabel="Salvar"
      onConfirm={() => console.log('confirmou')}
    >
      <form></form>
    </BaseDialog>
  );
}

export default AddScheduleDialog;
