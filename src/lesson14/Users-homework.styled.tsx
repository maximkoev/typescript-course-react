import styled from "styled-components";
import { PickColor } from "./utils";
import { IHairColor } from "./utils/types";

export const Container = styled.div`
  width: 1120px;
  margin: 0 auto;
  padding-top: 169px;
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
  background: ${({ hairColor }) => PickColor(hairColor)};
  border-radius: 100px;
  width: 21px;
  height: 21px;
  flex-shrink: 0;
`;

export const TableRow = styled.tr`
  background: #fff;
  box-shadow: 0px -1px 0px 0px rgba(30, 32, 37, 0.08) inset;
  width: 1120px;
  height: 54px;
  flex-shrink: 0;
`;

export const TableCell = styled.td`
  vertical-align: middle;
  padding-left: 91px;
`;

export const Spinner = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: purple purple purple purple;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: purple;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  :invalid {
    background-color: #ffdddd;
  }

  :required {
    border-color: #800000;
    border-width: 3px;
  }

  :required:invalid {
    border-color: #c00000;
  }

  :valid {
    background-color: #3b3b3b;
  }
`;
