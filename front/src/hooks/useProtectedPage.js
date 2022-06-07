import { useHistory } from "react-router-dom";
import { useLayoutEffect } from "react";
import { goToSignIn } from "../routes/coordinator";

const useProtectedPage = () => {
  const history = useHistory();

  useLayoutEffect(() => {
    if (!localStorage.getItem()) {
      return goToSignIn(history);
    }
  }, [history]);
};

export default useProtectedPage;
