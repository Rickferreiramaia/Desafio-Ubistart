import React from "react";
import { Switch, Route } from "react-router-dom";
//pages
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/SignUp">
        <SignUpPage  />
      </Route>
      <Route exact path="/MainPage">
        <MainPage />
      </Route>
      <Route exact path="/">
        <LoginPage  />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default Router;
