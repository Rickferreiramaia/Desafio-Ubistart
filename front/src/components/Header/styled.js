import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";
import { primaryColor } from "../../constants/colors";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${primaryColor};
`;
export const LogoImage = styled.img`
  width: 400px;
  height: 50px;
  max-width: 450px;
  object-fit: contain;
`;
