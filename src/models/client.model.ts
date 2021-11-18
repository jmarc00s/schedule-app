import { BaseModel } from './base.model';

export interface ClientModel extends BaseModel {
  name: string;
  address: string;
}
