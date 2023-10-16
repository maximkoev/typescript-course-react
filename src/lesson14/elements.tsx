import { Spinner, SpinnerContainer } from "./Users-homework.styled";
import { CreateUser, FullEditUser, GETUser } from "./http-client";
import React, { ChangeEvent } from "react";

export function LoadingSpinner() {
  return <SpinnerContainer>{<Spinner />}</SpinnerContainer>;
}

export async function MoveUp(userID: number) {
  const currentUser = await GETUser(userID);
  const prevUser = await GETUser(userID - 1);

  await FullEditUser(currentUser.id, { ...prevUser, id: currentUser.id });
  await FullEditUser(prevUser.id, { ...currentUser, id: prevUser.id });

  // if (currentUser.id === undefined) {
  //   throw new Error("Returned user in invalid");
  // }
  // await CreateUser({ ...currentUser, id: currentUser.id - 1 });
  // if (prevUser.id === undefined) {
  //   throw new Error("Returned user in invalid");
  // }
  // await CreateUser({ ...prevUser, id: prevUser.id + 1 });
}

interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  id: number | undefined;
  gender: "male" | "female";
  hair: {
    color: string;
  };
  birthDate: string;
  email: string;
}

export function NewUserForm() {
  const [currentUser, setCurrentUser] = React.useState<IUser>({
    id: undefined,
    firstname: "",
    lastname: "",
    age: 30,
    gender: "male",
    hair: {
      color: "",
    },
    birthDate: "",
    email: "",
  });
  const handleFormSubmit = () => {
    console.log("On submit");
    CreateUser(currentUser);
  };
  const handleuserAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserAge = e.target.value;

    setCurrentUser({
      ...currentUser,
      age: Number(newUserAge),
    });
  };
  const handleUserGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserGender = e.target.value;

    setCurrentUser({
      ...currentUser,
      gender: newUserGender as "male" | "female",
    });
  };
  const handleFirstnameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!currentUser) {
      return;
    }

    const newUserFirstName = e.target.value;

    setCurrentUser({
      ...currentUser,
      firstname: newUserFirstName,
    });
  };

  return (
    <div>
      {currentUser && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            aria-label={"Age"}
            value={currentUser.age}
            onChange={handleuserAgeChange}
          />
          <select value={currentUser.gender} onChange={handleUserGenderChange}>
            {userGenderOptions.map((option) => (
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
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

const userGenderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
