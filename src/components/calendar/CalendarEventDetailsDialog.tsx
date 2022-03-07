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
      <div className="border-t border-b border-gray-200">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Cliente</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {schedule.client?.name}
            </dd>
          </div>

          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Horário</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {schedule.date} - {schedule.time}
            </dd>
          </div>

          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Serviço</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {schedule.service?.description}
            </dd>
          </div>
        </dl>
      </div>
    </BaseDialog>
  );
};

export default CalendarEventDetailsDialog;
