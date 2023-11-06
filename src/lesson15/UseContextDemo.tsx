import React from "react";
import { StateContext } from "./StateContext";

interface IUserProps {
  data: IUser;
}

const User = (props: IUserProps) => {
  const { kind: theme, setKind: setTheme } = React.useContext(StateContext);
  console.log(theme);
  const {
    data: { firstName, lastName, age, gender },
  } = props;

  return (
    <li>
      {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle
      </button>
      <span>
        {firstName} {lastName}
      </span>
      <span>{age}</span>
      <span>{gender}</span>
    </li>
  );
};

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  id: number;
  gender: string; //"male" | "female" | (string | {});
}

export function Users() {
  const { usersList } = React.useContext(StateContext);

  console.log("Users render", usersList);

  return (
    <>
      <ul>
        {usersList.map((user) => (
          <User data={user} key={user.id} />
        ))}
      </ul>
      <br />
      <br />
      <br />
      <ThemeChanger />
    </>
  );
}

const ThemeChanger = () => {
  const {
    kind: theme,
    setKind: setTheme,
    data,
  } = React.useContext(StateContext);

  return (
    <div>
      {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle
      </button>
      {data}
    </div>
  );
};

export default Users;
