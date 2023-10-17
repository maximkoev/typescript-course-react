import {
  Spinner,
  SpinnerContainer,
  StyledInput,
} from "./Users-homework.styled";
import { CreateUser, FullEditUser, GETUser } from "./http-client";
import { ChangeEvent, useEffect, useState } from "react";
import { IsUserValid } from "./utils";
import { TUser } from "../users-data";

export function LoadingSpinner() {
  return <SpinnerContainer>{<Spinner />}</SpinnerContainer>;
}

enum SearchDirection {
  UP = "up",
  DOWN = "down",
}

async function FindValidUser(
  id: number,
  direction: SearchDirection,
): Promise<TUser | null> {
  const i = direction === SearchDirection.UP ? id - 1 : id + 1;
  console.log(`i: ${i}`);
  const user = await GETUser(i);
  if (typeof user === "number") {
    return null;
  }
  const isValid = IsUserValid(user);
  if (isValid) {
    return user;
  }
  return await FindValidUser(i, direction);
}

async function move(id: number, direction: SearchDirection) {
  const currentUser = await GETUser(id);
  const changeUser = await FindValidUser(id, direction);
  if (!changeUser) {
    const text = direction === SearchDirection.UP ? "top" : "bottom";
    alert(`User already on the ${text}`);
    return;
  }
  await FullEditUser(changeUser.id, { ...currentUser, id: changeUser.id });
  return FullEditUser(currentUser.id, { ...changeUser, id: currentUser.id });
}

export function MoveUp(userId: number) {
  return move(userId, SearchDirection.UP);
}

export function MoveDown(userId: number) {
  return move(userId, SearchDirection.DOWN);
}

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  id: number | undefined;
  gender: "male" | "female";
  hair: {
    color: string;
  };
  birthDate: string;
  email: string;
  phone: string;
}

export function NewUserForm() {
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: undefined,
    firstName: "",
    lastName: "",
    age: 30,
    gender: "male",
    hair: {
      color: "Blond",
    },
    birthDate: "2017-06-01",
    email: "",
    phone: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  useEffect(() => {
    if (IsUserValid(currentUser as TUser)) {
      setIsSubmitDisabled(false);
    }
  }, [currentUser]);

  const handleFormSubmit = () => {
    CreateUser(currentUser);
  };
  const handleUserAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserAge = e.target.value;

    setCurrentUser({
      ...currentUser,
      age: Number(newUserAge),
    });
  };
  const handleUserGenderChange = () => {
    if (!currentUser) {
      return;
    }
    const newUserGender = isFemale ? "female" : "male";
    setCurrentUser({
      ...currentUser,
      gender: newUserGender,
    });
  };
  useEffect(handleUserGenderChange, [isFemale]);
  const handleUserHairColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!currentUser) {
      return;
    }

    const newColor = e.target.value;

    setCurrentUser({
      ...currentUser,
      hair: {
        color: newColor,
      },
    });
  };
  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserFirstName = e.target.value;

    setCurrentUser({
      ...currentUser,
      firstName: newUserFirstName,
    });
  };
  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserLastName = e.target.value;

    setCurrentUser({
      ...currentUser,
      lastName: newUserLastName,
    });
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newEmail = e.target.value;

    setCurrentUser({
      ...currentUser,
      email: newEmail,
    });
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newPhone = e.target.value;

    setCurrentUser({
      ...currentUser,
      phone: newPhone,
    });
  };
  const handleBirthDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newBD = e.target.value;

    setCurrentUser({
      ...currentUser,
      birthDate: newBD,
    });
  };

  return (
    <div>
      {currentUser && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            aria-label="age"
            value={currentUser.age}
            onChange={handleUserAgeChange}
          />
          <label htmlFor="gender">Is Female?</label>
          <input
            name="gender"
            id="gender"
            type="checkbox"
            checked={isFemale}
            onChange={() => setIsFemale(!isFemale)}
          />
          <select onChange={handleUserHairColorChange}>
            {userHairColorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="string"
            aria-label="firstname"
            onChange={handleFirstnameChange}
          />
          <input
            type="string"
            aria-label="lastname"
            onChange={handleLastnameChange}
          />
          <label htmlFor="email">Email</label>
          <StyledInput
            type="email"
            name="email"
            aria-label="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={handleEmailChange}
          />
          <input
            id="birthday"
            type="date"
            name="birthday-date"
            value={currentUser.birthDate}
            onChange={handleBirthDayChange}
          />
          <label htmlFor="phone">Phone number:</label>
          <StyledInput
            type="tel"
            id="phone"
            name="phone"
            pattern="+[0-9]{2} [0-9]{3} [0-9]{4}"
            onChange={handlePhoneChange}
          />

          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

type TSelectOptions = { label: string; value: string };
const userGenderOptions: TSelectOptions[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
const userHairColorOptions: TSelectOptions[] = [
  {
    label: "Blond",
    value: "blond",
  },
  {
    label: "Black",
    value: "black",
  },
  {
    label: "Brown",
    value: "brown",
  },
  {
    label: "Auburn",
    value: "auburn",
  },
  {
    label: "Chestnut",
    value: "chestnut",
  },
];
