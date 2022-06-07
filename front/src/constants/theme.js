import { createTheme } from "@mui/material/styles";
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
} from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: primaryTextColor,
    },
    secondary: {
      main: secondaryColor,
      contrastText: secondaryTextColor,
    },
  },
});

export default theme;
