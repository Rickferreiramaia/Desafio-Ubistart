import axios from "axios";
import { BASE_URL } from "../constants/urls";

export const createTodo = async (body, setIsLoading) => {
  setIsLoading(true);
  return await axios
    .post(`${BASE_URL}/todo`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((ret) => ret.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const updateTodo = async (body, setIsLoading) => {
  setIsLoading(true);
  return await axios
    .put(`${BASE_URL}/todo/`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((ret) => ret.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getTodosByUser = async (setIsLoading) => {
  setIsLoading(true);
  return await axios
    .get(`${BASE_URL}/todo`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((ret) => ret.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getTodosByUserAdmin = async (setIsLoading) => {
  setIsLoading(true);
  return axios
    .get(`${BASE_URL}/todo/adminTodos`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((ret) => ret.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const validateToken = () => {
  return axios
    .get(`${BASE_URL}/todo/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data);
      return err.response.data;
    });
};
