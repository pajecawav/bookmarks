import { useContext } from "react";
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
    const { username } = useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    {username && <Redirect to="/" />}
                    {!username && <Login />}
                </Route>
                {!username && <Redirect to="/login" />}
                <Route component={Home}></Route>
            </Switch>
        </Router>
    );
}
