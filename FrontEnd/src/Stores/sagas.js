import { all } from "redux-saga/effects";
import Auth from "../Components/Auth/Sagas/";
import UserDetails from "../Components/UserProfile/Sagas";
export default function* root() {
  yield all([...Auth, ...UserDetails]);
}
