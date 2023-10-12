import styled from "styled-components";

interface IHairColor {
  hairColor: string;
}

export const Container = styled.div`
  width: 1120px;
  margin: 0 auto;
  padding-top: 169px;
  //border-bottom: 2px solid grey;
`;

export const MainContainer = styled.div`
  background-color: white;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Header = styled.h2`
  text-align: left;
  padding-bottom: 20px;
  color: var(--Natural-Color, #6f767e);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const TableContainer = styled.table`
  text-align: left;
  vertical-align: middle;
  width: 1120px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White-Color, #fff);
  color: var(--Natural-Color, #333);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-family: Roboto;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  color: var(--Natural-Color, #6f767e);
  height: 54px;
  border-bottom: 19px solid white;
  vertical-align: middle;
`;

export const HairColorIcon = styled.p<IHairColor>`
  background: ${(props) => {
    switch (props.hairColor) {
      case "Chestnut":
        return "#954535";
        break;
      case "Blond":
        return "#F8D96C";
        break;
      case "Auburn":
        return "#964b00";
        break;
      default:
        return props.hairColor;
        break;
    }
  }};
  border-radius: 100px;
  width: 21px;
  height: 21px;
  flex-shrink: 0;
`;
