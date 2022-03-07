import React from 'react';
import { ScheduleModel } from 'src/core/models/schedule.model';
import BaseDialog from '../BaseDialog';

interface CalendarEventDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  schedule: ScheduleModel | undefined;
}

const CalendarEventDetailsDialog = ({
  open,
  setOpen,
  schedule,
}: CalendarEventDetailsDialogProps) => {
  if (!schedule) return null;

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title="Detalhes do horário"
      onClose={() => {}}
      showConfirmButton={false}
    >
      <div>{JSON.stringify(schedule)}</div>
    </BaseDialog>
  );
};

export default CalendarEventDetailsDialog;
