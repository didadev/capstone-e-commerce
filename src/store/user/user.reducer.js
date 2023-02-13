import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = { currentUser: null, isLoading: false, error: null };

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    //case USER_ACTION_TYPE.SET_CURRENT_USER:
    // return { currentUser: payload };
    case USER_ACTION_TYPE.CHECK__USER_SESSION:
      return { ...state, isLoading: true };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
