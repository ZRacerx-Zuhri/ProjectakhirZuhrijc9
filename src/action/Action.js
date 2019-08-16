import axios from "../config/axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const login = (name, password) => {
  return dispatch => {
    axios
      .post("/user/login", {
        Username: name,
        Password: password
      })
      .then(res => {
        if (typeof res.data == "string") {
          console.log(res.data);
        } else {
          cookie.set("datauser", {
            id: res.data.id,
            username: res.data.username
          });
          dispatch({
            type: "LOGINSUCCESS",
            payload: {
              id: res.data.id,
              username: res.data.username
            }
          });
        }
      });
  };
};

export const keeplogin = user => {
  return {
    type: "LOGINSUCCESS",
    payload: {
      id: user.id,
      username: user.username
    }
  };
};
