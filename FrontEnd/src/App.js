import "./App.css";
import { history, store } from "./Stores";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Route, Router, Switch } from "react-router";
import Login from "./Components/Auth/Components/Login";
import Signup from "./Components/Auth/Components/Signup";
import UserProfileView from "./Components/UserProfile/Components/UserProfileView";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Router history={history}>
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Route exact path={"/profile"} component={UserProfileView} />
            <Route exact path={"/"} component={UserProfileView} />
          </Switch>
        </Router>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
