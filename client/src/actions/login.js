import { LOGIN_SUCCESSFULLY, LOGIN_FAILURE, LOGIN_RESET } from "./actionType";

export const loginSuccessful = token => {
  return {
    type: LOGIN_SUCCESSFULLY,
    token: token
  };
};

export const loginFailed = error => {
  return {
    type: LOGIN_FAILURE,
    error: error
  };
};

export const loginReset = () => {
  return {
    type: LOGIN_RESET
  };
};
