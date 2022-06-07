import axios from "axios";
import { BASE_URL } from "../constants/urls";

export const signIn = (body, setIsLoading) => {
  setIsLoading(true);
  return axios
    .post(`${BASE_URL}/users/signin`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const signUp = (body, setIsLoading) => {
  setIsLoading(true);
  return axios
    .post(`${BASE_URL}/users/signup`, body)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};