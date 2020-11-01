import * as actionTypes from "../../../Constants/actionTypes";

const initialState = {
  loading: false,
  patchStatus: null,
};

const patch = (state, action) => {
  return {
    ...state,
    loading: true,
    patchStatus: null,
  };
};

const patchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    patchStatus: false,
  };
};

const patchSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    patchStatus: true,
  };
};

const UserProfile = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.PATCH_USER_DETAILS:
        return patch(state, action);
      case actionTypes.PATCH_USER_DETAILS_FAILURE:
        return patchFail(state, action);
      case actionTypes.PATCH_USER_DETAILS_SUCCESS:
        return patchSuccess(state, action);
      default:
        return state;
    }
  }
  return state;
};

export default UserProfile;
