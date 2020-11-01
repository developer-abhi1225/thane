import { takeLatest, fork, call, put } from "redux-saga/effects";
import * as actionTypes from "../../../Constants/actionTypes";
import { createUser, getUser } from "../Services";
import isEmpty from "lodash/isEmpty";
//********************** USER LOGIN ACTION ******************************************************** */
function* workerUserLogin(action) {
  try {
    const response = yield call(getUser, action.payload);
    console.log("response", response);
    if (response.data.status === 200 && !isEmpty(response.data.data)) {
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: actionTypes.LOGIN_FAIL,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: actionTypes.LOGIN_FAIL,
      payload: {},
    });
  }
}

// watch for event types action.
function* watchUserLogin() {
  yield takeLatest(actionTypes.LOGIN, workerUserLogin);
}

function* workerCreateUser(action) {
  try {
    const response = yield call(createUser, action.payload);
    if (response.data?.status === 201) {
      yield put({
        type: actionTypes.CREATE_USER_SUCCESS,
      });
    } else {
      yield put({
        type: actionTypes.CREATE_USER_FAIL,
        payload: {},
      });
    }
  } catch (err) {
    yield put({
      type: actionTypes.CREATE_USER_FAIL,
      payload: {},
    });
  }
}

// watch for event types action.
function* watchCreateUser() {
  yield takeLatest(actionTypes.CREATE_USER, workerCreateUser);
}

export default [fork(watchUserLogin), fork(watchCreateUser)];
