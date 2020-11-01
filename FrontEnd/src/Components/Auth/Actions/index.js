import * as actionTypes from "../../../Constants/actionTypes";
export const userLogin = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN,
    payload: payload,
  });
};

export const createUser = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_USER,
    payload: payload,
  });
};
export const resetAuth = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_AUTH,
    payload: payload,
  });
};

export const uploadProfilePitcure = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPLOAD_PITCURE,
  });
};

export const uploadProfilePitcureSuccess = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPLOAD_PITCURE_SUCCESS,
  });
};

export const uploadProfilePitcureFail = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPLOAD_PITCURE_FAIL,
  });
};
