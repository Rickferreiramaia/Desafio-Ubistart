import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { signIn } from "../../services/user";
import { useHistory } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";
import { goToSignUp, goToMain } from "../../routes/coordinator";

const LoginForm = ({ setRightButtonText }) => {
  const [form, onChange, clear] = useForm({ email: "", password: "" });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const ret = await signIn(form, setIsLoading);

    if (ret.error) return alert(ret.error);

    const token = ret.success.token;

    localStorage.setItem("token", token);
    setRightButtonText("LOGOUT");
    goToMain(history);
    clear();
  };

  return (
    <form >
      <TextField
        name={"email"}
        value={form.email}
        onChange={onChange}
        label={"E-mail"}
        variant={"outlined"}
        fullWidth
        margin={"normal"}
        required
        type={"email"}
      />
      <TextField
        name={"password"}
        value={form.password}
        onChange={onChange}
        label={"Password"}
        variant={"outlined"}
        fullWidth
        margin={"normal"}
        required
        type={"password"}
      />
      <Button
        onClick={()=>goToMain(history)}
        type={"submit"}
        fullWidth
        variant={"contained"}
        color={"primary"}
        style={{ marginTop: 20, minHeight: 50 }}
      >
       <>Login</>
       
      </Button>
      <Button
        onClick={() => goToSignUp(history)}
        type={"submit"}
        fullWidth
        variant={"outlined"}
        color={"primary"}
        style={{ minHeight: "50px", marginTop: 10 }}
      >
        Ainda não tem conta? registre-se
      </Button>
    </form>
  );
};

export default LoginForm;
