import {
  USER_LOGOUT,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { userName: "", auth: null, token: "" },
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: null,
        },
        isError: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        account: {
          userName: action.data.userName,
          token: action.data.token,
          auth: action.data.auth,
        },
        isError: false,
      };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("auth");
      return {
        ...state,
        account: {
          userName: "",
          auth: null,
          token: "",
        },
      };
    case USER_REFRESH:
      return {
        ...state,
        account: {
          userName: localStorage.getItem("userName"),
          token: localStorage.getItem("token"),
          auth: localStorage.getItem("auth"),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
