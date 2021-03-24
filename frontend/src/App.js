import { React, Component, createContext } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import {
    saveLocalToken,
    saveLocalUsername,
    getLocalUsername,
    isLoggedIn,
    deleteLocalToken,
} from "./utils";

export let AppContext = createContext(null);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: undefined,
            username: null,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        isLoggedIn().then((loggedIn) => {
            this.setState({
                loggedIn,
                username: getLocalUsername(),
            });
        });
    }

    login(token, username) {
        saveLocalToken(token);
        saveLocalUsername(username);

        this.setState({
            loggedIn: true,
            username: username,
        });
    }

    logout() {
        deleteLocalToken();
        this.setState({
            loggedIn: false,
            username: null,
        });
    }

    render() {
        if (this.state.loggedIn === undefined) {
            return "";
        }

        return (
            <AppContext.Provider value={this}>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            {this.state.loggedIn ? (
                                <Redirect to="/" />
                            ) : (
                                <Login onLogin={this.login} />
                            )}
                        </Route>
                        {!this.state.loggedIn && <Redirect to="/login" />}
                        <Route component={Home}></Route>
                    </Switch>
                </Router>
            </AppContext.Provider>
        );
    }
}
