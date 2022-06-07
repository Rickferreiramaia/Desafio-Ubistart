import React from "react";
import { ScreenContainer, TitlePage } from "./styled";
import SignUpForm from "./SignUpForm";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const SignUpPage = ({ setRightButtonText }) => {
  useUnprotectedPage();
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
        <TitlePage>Sign up</TitlePage>
        <CardContent sx={{ width: 450 }}>
          <SignUpForm setRightButtonText={setRightButtonText} />
        </CardContent>
      </Card>
    </ScreenContainer>
  );
};

export default SignUpPage;
