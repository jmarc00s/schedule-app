import { EStatusSchedule } from '../enum/status-schedule.enum';
import { ClientModel } from './client.model';
import { ServiceModel } from './service.model';

export interface ScheduleModel {
  id: number;
  clientId: number;
  serviceId: number;
  date: Date;
  note: string;
  status: EStatusSchedule;

  client?: ClientModel;
  service?: ServiceModel;
}
