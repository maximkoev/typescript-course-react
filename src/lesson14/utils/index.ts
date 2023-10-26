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
  const day = oldDate.getDate();
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

function IsUserValid(user: Partial<TUser>): boolean {
  return !!(
    user &&
    user.birthDate &&
    user.firstName &&
    user.birthDate &&
    user.lastName &&
    user.hair &&
    user.hair.color
  );
}

function CleanUsers(users: TUser[]): TUser[] {
  users.forEach((user, index) => {
    if (IsUserValid(user)) {
      return;
    }
    users.splice(index, 1);
  });
  return users;
}

function SortUsers(users: TUser[]): TUser[] {
  CleanUsers(users);
  return users.sort((a, b) => a.position - b.position);
}

export {
  FormatPhoneNumber,
  CapitaliseWord,
  FormatData,
  PickColor,
  IsUserValid,
  SortUsers,
};
