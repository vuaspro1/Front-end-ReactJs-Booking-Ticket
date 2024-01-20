import loginApi from "../../services/LoginService";
import { toast } from "react-toastify";

export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_LOGIN = "FETCH_USER-LOGIN";
export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (userName, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let res = await loginApi(userName.trim(), password);
    if (res && res.accessToken) {
      localStorage.setItem("token", res?.accessToken);
      localStorage.setItem("userName", res?.userName.trim());
      localStorage.setItem("auth", res?.roles[0].name);
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: {
          userName: userName.trim(),
          token: res.accessToken,
          auth: res?.roles[0].name,
        },
      });
    } else {
      if (res && res.status === 400) {
        toast.error("Login failed!");
      }
      dispatch({
        type: FETCH_USER_ERROR,
        // data: { userName: userName.trim(), token: res.accessToken },
      });
    }
  };
};

export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export const handleRefresh = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_REFRESH,
    });
  };
};
