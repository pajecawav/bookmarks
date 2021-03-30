import { useContext } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ReactComponent as SpinnerIcon } from "../icons/spinner.svg";
import ShareTarget from "../ShareTarget";
import Home from "./Home";
import Login from "./Login";

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
                <Route path="/_share" component={ShareTarget}></Route>
                <Route component={Home}></Route>
            </Switch>
        </Router>
    );
}
