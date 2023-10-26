import { TUser } from "../../users-data";

export interface IHairColor {
  hairColor: string;
}

type THex = `#${string}`;
export type TColorDictionary = { [key: string]: THex };

export interface IUserProps {
  data: TUser;
  onMove: () => void;
}
