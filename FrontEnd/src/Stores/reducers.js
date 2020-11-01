import { combineReducers } from "redux";
import auth from "../Components/Auth/Reducers";
import userProfile from "../Components/UserProfile/Reducers";
const appReducer = combineReducers({
  auth,
  userProfile,
});
export default appReducer;
