import React from "react";
import { ScreenContainer, H2Title } from "./styled";
import LoginForm from "./LoginForm";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
//material
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const LoginPage = ({ setRightButtonText }) => {
  

  return (
    <ScreenContainer>
      <Card
        sx={{
          width: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: 500,
        }}
        >
        <H2Title>Login</H2Title>
        <CardContent sx={{ width: 450 }}>
          <LoginForm setRightButtonText={setRightButtonText} />
        </CardContent>
      </Card>
    </ScreenContainer>
  );
};

export default LoginPage;
