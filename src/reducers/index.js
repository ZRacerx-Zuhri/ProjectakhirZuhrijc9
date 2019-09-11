import { combineReducers } from "redux";

const initialstate = {
  username: "",
  id: "",
  adminuser: ""
};
const initSearch = {
  search: ""
};
const ReducerSearch = (data = initSearch, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        search: action.payload
      };
    default:
      return data;
  }
};

const ReducerUser = (data = initialstate, action) => {
  switch (action.type) {
    case "LOGINSUCCESS":
      return {
        ...data,
        username: action.payload.username,
        id: action.payload.id
      };
    case "LOGOUT":
      return {
        ...data,
        username: action.payload.username,
        id: action.payload.id
      };
    case "ADMINLOGIN":
      return {
        ...data,
        adminuser: action.payload.useradmin
      };
    case "ADMINLOGOUT":
      return { ...data, adminuser: action.payload.useradmin };
    default:
      return data;
  }
};

export default combineReducers({
  users: ReducerUser,
  search: ReducerSearch
});
