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

export const logout = () => {
  cookie.remove("datauser");
  return {
    type: "LOGOUT",
    payload: {
      id: "",
      username: ""
    }
  };
};

export const loginadmin = (useradmin, password) => {
  return dispatch => {
    axios
      .post("/loginadmin", {
        useradmin: useradmin,
        password: password
      })
      .then(res => {
        if (typeof res.data == "string") {
          console.log(res.data);
        } else {
          cookie.set("admin", { useradmin: res.data.useradmin });
          dispatch({
            type: "ADMINLOGIN",
            payload: {
              useradmin: res.data.useradmin
            }
          });
        }
      });
  };
};

export const adminlogin = admin => {
  return {
    type: "ADMINLOGIN",
    payload: {
      useradmin: admin.useradmin
    }
  };
};

export const adminlogout = () => {
  cookie.remove("admin");
  return {
    type: "ADMINLOGOUT",
    payload: {
      useradmin: ""
    }
  };
};
