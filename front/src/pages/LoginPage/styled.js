import styled from "styled-components";
import { secondaryTextColor } from "../../constants/colors";

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 65px);
`;

export const H2Title = styled.h2`
  font-size: 1.6rem;
  color: ${secondaryTextColor}
`
