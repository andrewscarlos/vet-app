import {
  LOAD_USER,
  SUCCESS_USER,
  ERROR_USER,
  AUTHETICATE_USER,
  CREATE_USER,
  EXIT_PESSOA,
} from "../constants";

const userAuthentication = localStorage.getItem("user@authentication") || null;

const initialState = {
  userInfo: userAuthentication ? JSON.parse(userAuthentication) : {},
  success: false,
  error: false,
  loading: false,
  isLoggd: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHETICATE_USER: {
      const { payload } = action;
      return {
        ...state,
        isLoggd: true,
        userInfo: payload,
      };
    }

    case LOAD_USER: {
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    }
    case SUCCESS_USER: {
      return {
        ...state,
        isLoggd: true,
        success: true,
        error: false,
        loading: false,
      };
    }

    case ERROR_USER: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
      };
    }

    case CREATE_USER: {
      const { payload } = action;
      return {
        ...state,
      };
    }
    case EXIT_PESSOA: {
      return {
        ...state,
        isLoggd: false,
      };
    }
    default:
      return state;
  }
};

export default user;
