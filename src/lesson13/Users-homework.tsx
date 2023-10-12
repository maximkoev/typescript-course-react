import usersData from "../users-data";
import { TUser } from "../users-data";
import {
  Container,
  HairColorIcon,
  Header,
  MainContainer,
  TableContainer,
  TableHeader,
} from "./Users-homework.styled";

interface IUserProps {
  data: TUser;
}

// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const User = (props: IUserProps, id: number) => {
  const { data } = props;

  return (
    <tr
      style={{
        background: " var(--White-Color, #FFF)",
        boxShadow: "0px -1px 0px 0px rgba(30, 32, 37, 0.08) inset",
        width: "1120px",
        height: "54px",
        flexShrink: 0,
      }}
      key={id}
    >
      <td style={{ verticalAlign: "middle", paddingLeft: "91px" }}>
        {data.firstName} {data.lastName}
      </td>
      <td style={{ verticalAlign: "middle", paddingLeft: 91 }}>
        {CapitaliseWord(data.gender)}
      </td>
      <td style={{ verticalAlign: "middle", paddingLeft: 91 }}>
        <HairColorIcon hairColor={data.hair.color} />
      </td>
      <td style={{ verticalAlign: "middle", paddingLeft: 91 }}>
        <time dateTime="DD-MM-YYY">{FormatData(data.birthDate)}</time>
      </td>
      <td style={{ verticalAlign: "middle", paddingLeft: 91 }}>
        {FormatPhoneNumber(data.phone)}
      </td>
    </tr>
  );
};
const TableData = (prop: { data: string; id: number }) => {
  const { data, id } = prop;
  return (
    <td
      style={{ verticalAlign: "middle", textAlign: "left", paddingLeft: 91 }}
      key={id}
    >
      {data}
    </td>
  );
};
const TableHead = (props: { data: string[] }) => {
  const { data } = props;
  return (
    <TableHeader>
      <tr>
        {data.map((element, index) => (
          <TableData data={element} id={index} />
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

  // TODO: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

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

function FormatData(date: string): string {
  const oldDate = new Date(date);
  const month = oldDate.getMonth();
  const day = oldDate.getDay() + 1;
  const year = oldDate.getFullYear();
  return `${day} ${monthDictionary[month]}, ${year}`;
}

const monthDictionary = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
