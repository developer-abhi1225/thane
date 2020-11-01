import * as actionTypes from "../../../Constants/actionTypes";

export const updateUserDetails = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: payload,
  });
};

export const patchUserDetails = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.PATCH_USER_DETAILS,
    payload: payload,
  });
};

export const fetchUserDetails = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_USER_DETAILS,
    payload: payload,
  });
};
