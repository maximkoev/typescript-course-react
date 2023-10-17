import { TUser } from "../users-data";
import {
  Container,
  HairColorIcon,
  Header,
  MainContainer,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./Users-homework.styled";
import {
  CapitaliseWord,
  FormatData,
  FormatPhoneNumber,
  IsUserValid,
} from "./utils";
import { IUserProps } from "./utils/types";
import { useEffect, useState } from "react";
import { GETUsers } from "./http-client";
import { LoadingSpinner, MoveDown, MoveUp, NewUserForm } from "./elements";

// # Users list and form with api

// 1. Update User list component to fetch data from api
// 2. Add loading state to User list component (show loading message while list is loading)
// 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
//    1. User first name (text input)
//    2. User last name (text input)
//    3. User hair color (select input)
//    4. User birthDate (datetime input)
//    5. User is female (checkbox input)
//    6. User email (email input)
// 6. Add form validation to the form component
//    1. User first name is required
//    2. User last name is required
//    3. User email is required and should be valid email
//    4. User birthDate is required and should be valid date
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields
const User = (props: IUserProps, id: number) => {
  const [data, setData] = useState<TUser>(props.data);
  const { onMove } = props;
  const handleUp = () => {
    MoveUp(data.id).then(setData);
    onMove();
  };
  const handleDown = () => {
    MoveDown(data.id).then((data) => {
      setData(data);
      //onMove();
    });
  };

  return (
    IsUserValid(data) && (
      <TableRow key={id}>
        <TableCell>
          <button onClick={handleUp}>Up</button>
          <button onClick={handleDown}>Down</button>
          {data.firstName} {data.lastName}
        </TableCell>
        <TableCell>{CapitaliseWord(data.gender)}</TableCell>
        <TableCell>{<HairColorIcon hairColor={data.hair.color} />}</TableCell>
        <TableCell>
          <time dateTime={data.birthDate}>{FormatData(data.birthDate)}</time>
        </TableCell>
        <TableCell>{data.phone && FormatPhoneNumber(data.phone)}</TableCell>
      </TableRow>
    )
  );
};

const TableData = (prop: { data: string }) => {
  const { data } = prop;
  return <TableCell>{data}</TableCell>;
};
const TableHead = (props: { data: string[] }) => {
  const { data } = props;
  return (
    <TableHeader>
      <tr>
        {data.map((element, index) => (
          <TableData data={element} key={index} />
        ))}
      </tr>
    </TableHeader>
  );
};

const TableBody = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fetchUsers = () => {
    setIsLoaded(false);
    setTimeout(() => {
      GETUsers().then((users) => {
        setUsers(users);
        setIsLoaded(true);
      });
    }, 1000);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return isLoaded ? (
    <tbody>
      {users.map((user) => (
        <User data={user} key={user.id} onMove={fetchUsers} />
      ))}
    </tbody>
  ) : (
    <LoadingSpinner />
  );
};

const Table = (props: { head: string[] }) => {
  const { head } = props;
  return (
    <TableContainer>
      {<TableHead data={head} />}
      {<TableBody />}
    </TableContainer>
  );
};

export function Users() {
  const head: string[] = ["Name", "Gender", "Hair Color", "Birthday", "Phone"];

  return (
    <MainContainer>
      <NewUserForm />
      <Container>
        <Header>User</Header>
        <Table head={head} />
      </Container>
    </MainContainer>
  );
}

export default Users;
