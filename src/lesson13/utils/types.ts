export interface IHairColor {
  hairColor: string;
}

type THex = `#${string}`;
export type TColorDictionary = { [key: string]: THex };
