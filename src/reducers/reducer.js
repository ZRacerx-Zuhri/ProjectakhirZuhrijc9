import { combineReducers } from "redux";

const initialstate = {
  username: "",
  id: ""
};

const ReducerUser = (data = initialstate, action) => {
  switch (action.type) {
    case "LOGINSUCCESS":
      return {
        ...data,
        username: action.payload.username,
        id: action.payload.id
      };

    default:
      return data;
  }
};

export default combineReducers({
  users: ReducerUser
});
