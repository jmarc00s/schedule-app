import React, { useState } from 'react';
import BaseDialog from './BaseDialog';
import ScheduleForm from './ScheduleForm';

interface AddScheduleDialogProps {
  open: boolean;
  onClose?: () => void;
  setOpen: (open: boolean) => void;
}

function AddScheduleDialog({ open, onClose, setOpen }: AddScheduleDialogProps) {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAfterSubmit(success: boolean) {
    setSubmit(false);
    if (success) {
      setOpen(false);
      onClose && onClose();
    }
  }

  return (
    <BaseDialog
      title="Adicionar um horário"
      open={open}
      onClose={() => onClose}
      setOpen={setOpen}
      confirmButtonLabel="Salvar"
      onConfirm={() => setSubmit(true)}
      showLoading={loading}
    >
      <ScheduleForm
        afterSubmit={handleAfterSubmit}
        submit={submit}
        setSubmit={setSubmit}
      />
    </BaseDialog>
  );
}

export default AddScheduleDialog;
