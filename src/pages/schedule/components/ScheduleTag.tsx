import classNames from 'classnames';
import React from 'react';
import { EStatusSchedule } from '../../../enum/status-schedule.enum';

interface ScheduleTagProps {
  status: EStatusSchedule;
}

const ScheduleTag = ({ status }: ScheduleTagProps) => {
  const [title, setTitle] = React.useState<string>('');

  const colorClasses = {
    'bg-green-500': status === EStatusSchedule.CONFIRMED,
    'bg-blue-500': status === EStatusSchedule.PENDING,
    'bg-red-500': status === EStatusSchedule.CANCELED,
  };

  React.useEffect(() => {
    setTitle(defineTitle(status));
  }, []);

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
    <span className={classNames(['p-1 rounded-md text-white', colorClasses])}>
      {title}
    </span>
  );
};

export default ScheduleTag;
