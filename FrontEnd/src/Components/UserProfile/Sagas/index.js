import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import { fetchUserDetails, patchUserDetails } from "../Services";
import isEmpty from "lodash/isEmpty";

//********************** USER LOGIN ACTION ******************************************************** */
function* workerPatchUserDetails(action) {
  try {
    const response = yield call(patchUserDetails, action.payload);
    console.log("response is", response);
    if (response.data.status === 200) {
      yield put({
        type: actionTypes.PATCH_USER_DETAILS_SUCCESS,
      });
    } else {
      yield put({
        type: actionTypes.PATCH_USER_DETAILS_FAILURE,
        payload: {},
      });
    }
  } catch (err) {
    yield put({
      type: actionTypes.PATCH_USER_DETAILS_FAILURE,
      payload: {},
    });
  }
}

// watch for event types action.
function* watchPatchUserDetails() {
  yield takeLatest(actionTypes.PATCH_USER_DETAILS, workerPatchUserDetails);
}

function* workerGetUserDetails(action) {
  try {
    const response = yield call(fetchUserDetails, action.payload);
    console.log("response is", response);
    if (response.data.status === 200 && !isEmpty(response.data.data)) {
      yield put({
        type: actionTypes.GET_USER_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: actionTypes.GET_USER_DETAILS_FAIL,
        payload: {},
      });
    }
  } catch (err) {
    yield put({
      type: actionTypes.GET_USER_DETAILS_FAIL,
      payload: {},
    });
  }
}

// watch for event types action.
function* watchGetUserDetails() {
  yield takeLatest(actionTypes.GET_USER_DETAILS, workerGetUserDetails);
}

export default [fork(watchGetUserDetails), fork(watchPatchUserDetails)];
