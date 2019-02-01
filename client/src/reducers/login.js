import {
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILURE,
  LOGIN_RESET
} from "../actions/actionType";

const initialState = {
  token: token,
  loggedIn: false,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFULLY:
      return Object.assign({}, state, {
        token: action.token,
        loggedIn: true
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        error: action.error
      });
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
}
