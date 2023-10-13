import usersData from "../users-data";
import { TUser } from "../users-data";
import { CapitaliseWord, FormatPhoneNumber, FormatData } from "./utils";
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

interface IUserProps {
  data: TUser;
}

const User = (props: IUserProps, id: number) => {
  const { data } = props;

  return (
    <TableRow key={id}>
      <TableCell>
        {data.firstName} {data.lastName}
      </TableCell>
      <TableCell>{CapitaliseWord(data.gender)}</TableCell>
      <TableCell>
        <HairColorIcon hairColor={data.hair.color} />
      </TableCell>
      <TableCell>
        <time dateTime="DD-MM-YYY">{FormatData(data.birthDate)}</time>
      </TableCell>
      <TableCell>{FormatPhoneNumber(data.phone)}</TableCell>
    </TableRow>
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

const Table = (props: { head: string[] }) => {
  const { head } = props;
  return (
    <TableContainer>
      {<TableHead data={head} />}
      <tbody>
        {usersData.map((user) => (
          <User data={user} key={user.id} />
        ))}
      </tbody>
    </TableContainer>
  );
};

export function Users() {
  const head: string[] = ["Name", "Gender", "Hair Color", "Birthday", "Phone"];

  return (
    <MainContainer>
      <Container>
        <Header>User</Header>
        {<Table head={head} />}
      </Container>
    </MainContainer>
  );
}

export default Users;
