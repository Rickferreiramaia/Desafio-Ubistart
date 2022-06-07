import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useRequestData = (initialData, url) => {
  const [data, setData] = useState(initialData);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }, [url, history]);

  return data;
};

export default useRequestData;
