import {
    LOAD_USER,
    SUCCESS_USER,
    ERROR_USER,
    AUTHETICATE_USER,
    CREATE_USER
  } from "../constants";
  
  const userAuthentication = localStorage.getItem("user@authentication") || null

  
  const initialState = {
    userInfo: userAuthentication ? JSON.parse(userAuthentication) : {} ,
    success: false,
    error: false,
    loading: false,
    isLoggd: false
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
  
      case AUTHETICATE_USER: {
        const { payload } = action;
        return {
          ...state,
          userInfo:payload,
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
          loading: false
        };
      }
  
      case CREATE_USER: {
        const { payload } = action;
        return {
          ...state,
          userLog: payload,
        };
      }
  
      default:
        return state;
    }
  };
  
  export default user;
  