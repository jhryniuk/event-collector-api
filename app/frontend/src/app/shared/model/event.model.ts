import { IUser } from "./user.model";

export interface IEvent {
  id: number;
  name: string;
  dateTime: Date;
  owners: string[];
  participants: string[];
  description: string;
}
