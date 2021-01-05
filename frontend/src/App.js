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
            logged_in: undefined,
            username: null,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        isLoggedIn().then((isLogged) => {
            this.setState({
                logged_in: isLogged,
                username: getLocalUsername(),
            });
        });
    }

    login(token, username) {
        saveLocalToken(token);
        saveLocalUsername(username);

        this.setState({
            logged_in: true,
            username: username,
        });
    }

    logout() {
        deleteLocalToken();
        this.setState({
            logged_in: false,
            username: null,
        });
    }

    render() {
        if (this.state.logged_in === undefined) {
            return "";
        }

        return (
            <AppContext.Provider value={this}>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            {this.state.logged_in ? (
                                <Redirect to="/" />
                            ) : (
                                <Login onLogin={this.login} />
                            )}
                        </Route>
                        {!this.state.logged_in && <Redirect to="/login" />}
                        <Route path={["/", "/liked"]} component={Home}></Route>
                    </Switch>
                </Router>
            </AppContext.Provider>
        );
    }
}
