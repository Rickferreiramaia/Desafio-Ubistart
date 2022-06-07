import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { signUp } from "../../services/user";
import { goToMain } from "../../routes/coordinator";
//material
import { TextField, Button, CircularProgress } from "@mui/material/";

const SignUpForm = ({ setRightButtonText }) => {
  const history = useHistory();
  const [form, onChange, clear] = useForm({
    name: "",
    email: "",
    password: "",
    admin: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const ret = await signUp(form, setIsLoading);

    if (ret.error) return alert(ret.error);

    const token = ret.success.token;

    localStorage.setItem("token", token);
    setRightButtonText("LOGOUT");
    goToMain(history);
    clear();
  };

  return (
    <form onSubmit={()=>goToMain(history)} >
      <TextField
        id="name"
        name={"name"}
        value={form.name}
        onChange={onChange}
        label={"Nome"}
        variant={"outlined"}
        fullWidth
        required
        margin={"normal"}
        autoFocus
      />
      <TextField
        id="email"
        name={"email"}
        value={form.email}
        onChange={onChange}
        label={"E-mail"}
        variant={"outlined"}
        fullWidth
        required
        margin={"normal"}
        type={"email"}
      />
      <TextField
        id="password"
        name={"password"}
        value={form.password}
        onChange={onChange}
        label={"Senha"}
        variant={"outlined"}
        fullWidth
        required
        margin={"normal"}
        type={"password"}
      />

      <Button
        id="register"
        name="register"
        color={"primary"}
        variant={"contained"}
        type={"submit"}
        fullWidth
        style={{ marginTop: 20, minHeight: 50 }}
      >
        {isLoading ? (
          <CircularProgress color={"inherit"} size={24} />
        ) : (
          <>CADASTRAR</>
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
