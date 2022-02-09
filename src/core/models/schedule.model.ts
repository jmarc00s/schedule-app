import { EStatusSchedule } from '../enum/status-schedule.enum';
import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import { ServiceModel } from './service.model';

export interface ScheduleModel extends BaseModel {
  clientId: number;
  serviceId: number;
  date: string;
  time: string;
  note: string;
  status: EStatusSchedule;

  client?: ClientModel;
  service?: ServiceModel;
}
