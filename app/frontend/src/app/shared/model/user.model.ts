import {IImage} from "./image.model";

export interface IUser {
  id: number;
  email: string;
  userIdentifier: string;
  roles: string[];
  password: string;
  image: string;
  imageContent: IImage;
}
