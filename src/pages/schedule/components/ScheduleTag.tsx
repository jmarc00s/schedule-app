import classNames from 'classnames';
import React from 'react';
import { EStatusSchedule } from '../../../core/enum/status-schedule.enum';

interface ScheduleTagProps {
  status: EStatusSchedule;
}

const ScheduleTag = ({ status }: ScheduleTagProps) => {
  const [title, setTitle] = React.useState<string>('');

  const colorClasses = {
    'bg-green-300 text-green-900': status === EStatusSchedule.CONFIRMED,
    'bg-blue-300 text-blue-900': status === EStatusSchedule.PENDING,
    'bg-red-300 text-red-900': status === EStatusSchedule.CANCELED,
  };

  React.useEffect(() => {
    setTitle(defineTitle(status));
  }, [status]);

  function defineTitle(status: EStatusSchedule): string {
    switch (status) {
      case EStatusSchedule.PENDING:
        return 'Pendente';
      case EStatusSchedule.CONFIRMED:
        return 'Confirmado';
      case EStatusSchedule.CANCELED:
        return 'Cancelado';
      default:
        return '';
    }
  }

  return (
    <span
      className={classNames([
        'py-1 px-2 rounded-xl text-xs font-semibold uppercase',
        colorClasses,
      ])}
    >
      {title}
    </span>
  );
};

export default ScheduleTag;
