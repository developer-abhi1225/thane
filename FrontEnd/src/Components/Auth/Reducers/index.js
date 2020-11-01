import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
  loading: false,
  userDetails: {},
  loginStatus: null,
  createStatus: null,
};

const loginSuccess = (state, action) => {
  localStorage.setItem("token", action.payload.id);
  return {
    ...state,
    userDetails: action.payload,
    loading: false,
    loginStatus: true,
  };
};
const loginFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
const login = (state, action) => {
  return {
    ...state,
    loading: true,
    loginStatus: null,
  };
};

const createSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    createStatus: true,
  };
};
const createFail = (state, action) => {
  return {
    ...state,
    loading: false,
    createStatus: false,
  };
};
const createUser = (state, action) => {
  return {
    ...state,
    loading: true,
    createStatus: null,
  };
};

const reset = (state, action) => {
  return {
    ...state,
    ...initialState,
  };
};

const upload = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const uploadSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const uploadFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const fetchUserDetailsSuccess = (state, action) => {
  return {
    ...state,
    userDetails: action.payload,
  };
};
const Auth = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.LOGIN:
        return login(state, action);
      case actionTypes.LOGIN_FAIL:
        return loginFail(state, action);
      case actionTypes.LOGIN_SUCCESS:
        return loginSuccess(state, action);
      case actionTypes.CREATE_USER:
        return createUser(state, action);
      case actionTypes.CREATE_USER_SUCCESS:
        return createSuccess(state, action);
      case actionTypes.CREATE_USER_FAIL:
        return createFail(state, action);
      case actionTypes.RESET_AUTH:
        return reset(state, action);
      case actionTypes.UPLOAD_PITCURE:
        return upload(state, action);
      case actionTypes.UPLOAD_PITCURE_SUCCESS:
        return uploadSuccess(state, action);
      case actionTypes.UPLOAD_PITCURE_FAIL:
        return uploadFail(state, action);
      case actionTypes.GET_USER_DETAILS_SUCCESS:
        return fetchUserDetailsSuccess(state, action);

      default:
        return state;
    }
  }
  return state;
};

export default Auth;
