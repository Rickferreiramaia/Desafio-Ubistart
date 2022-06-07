import React, { useState } from "react";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./constants/theme";
import Header from "./components/Header/Header";

const App = () => {
  const token = localStorage.getItem("token");
  const [rightButtonText, setRightButtonText] = useState(
    token ? "Logout" : "Login"
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
        />
        <Router/>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
