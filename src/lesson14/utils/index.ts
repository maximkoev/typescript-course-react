import { colorDic, monthDictionary } from "./consntants";
import { TUser } from "../../users-data";

function FormatPhoneNumber(num: string): string {
  const numArr = num.split("");
  if (numArr[0] === "+") {
    numArr.splice(0, 1);
  }
  numArr.forEach((char, index) => {
    if (char === " ") {
      numArr.splice(index, 1);
    }
  });
  return numArr.join("");
}

function CapitaliseWord(word: string): string {
  const toCpt = word.split("");
  toCpt[0] = toCpt[0].toUpperCase();
  return toCpt.join("");
}

function FormatData(date: string): string {
  const oldDate = new Date(date);
  const month = oldDate.getMonth();
  const day = oldDate.getDay() + 1;
  const year = oldDate.getFullYear();
  return `${day} ${monthDictionary[month]}, ${year}`;
}

function PickColor(color: string): string {
  if (color === undefined) {
    return "white";
  }
  color = color.toLowerCase();
  return color in colorDic ? colorDic[color] : color;
}

export function IsUserValid(user: TUser): boolean {
  return !!(
    user &&
    user.id &&
    user.birthDate &&
    user.firstName &&
    user.birthDate &&
    user.lastName &&
    user.hair &&
    user.hair.color
  );
}

export { FormatPhoneNumber, CapitaliseWord, FormatData, PickColor };
