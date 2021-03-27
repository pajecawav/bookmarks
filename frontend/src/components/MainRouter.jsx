import { useContext } from "react";
import { ReactComponent as SpinnerIcon } from "../icons/spinner.svg";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

import { UserContext } from "../contexts/UserContext";

export default function MainRouter() {
    const { loggedIn } = useContext(UserContext);

    if (loggedIn === null) {
        return (
            <SpinnerIcon className="m-auto w-24 h-24 text-blue-500 animate-spin sm:w-32 sm:h-32" />
        );
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    {loggedIn === true && <Redirect to="/" />}
                    {loggedIn === false && <Login />}
                </Route>
                {loggedIn === false && <Redirect to="/login" />}
                <Route component={Home}></Route>
            </Switch>
        </Router>
    );
}
