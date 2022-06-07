import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { goToMain, goToSignIn } from "../../routes/coordinator";
import logo from "../../assets/logo.png";
import { StyledToolbar, LogoImage } from "./styled";

import { Button, AppBar } from "@mui/material";

const Header = ({ rightButtonText, setRightButtonText }) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
  };

  const leftButtonAction = () => {
    if (location.pathname === "/Login" || location.pathname === "/SignUp") {
      goToSignIn(history);
    } else {
      goToMain(history);
    }
  };

  const rightButtonAction = () => {
    if (token) {
      logout();
      setRightButtonText("Login");
      goToSignIn(history);
    } else {
      goToSignIn(history);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <StyledToolbar>
        <Button onClick={leftButtonAction} color="inherit">
          HOME
        </Button>
        <LogoImage src={logo} />
        <Button onClick={rightButtonAction} color="inherit">
          {rightButtonText}
        </Button>
        
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
