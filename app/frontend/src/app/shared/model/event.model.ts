export interface IEvent {
  id: number;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
  owner: string;
  participants: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
