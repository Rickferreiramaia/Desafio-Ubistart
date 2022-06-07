import { goToSignIn } from "../routes/coordinator";

const validateRequestErrors = (ret, history) => {
  if (!localStorage.getItem("token")) {
    alert("Your session has expired, please login again.");
    return goToSignIn(history);
  }

  if (ret.error === "Expired token" || ret.error === "Invalid token") {
    alert("Your session has expired, please login again.");

    localStorage.removeItem("token");
    return goToSignIn(history);
  }

  return alert(ret.error);
};

export default validateRequestErrors;
