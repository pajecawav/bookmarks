import { Component } from "react";
import { withRouter } from "react-router-dom";
import { logInGetToken, signup } from "../api";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = { error: null };

        this.username = null;
        this.password = null;

        this.validateForm = this.validateForm.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    validateForm() {
        if (!this.username) {
            this.setState({ error: "Username is required." });
            return false;
        } else if (!this.password) {
            this.setState({ error: "Password is required." });
            return false;
        }
        return true;
    }

    handleLogin(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        logInGetToken(this.username, this.password).then((result) => {
            if (result.ok) {
                this.props.onLogin(result.token, this.username);
                this.props.history.push("/");
            } else {
                this.setState({ error: result.error });
            }
        });
    }

    handleSignup(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        signup(this.username, this.password).then((result) => {
            if (result.ok) {
                logInGetToken(this.username, this.password).then((result) => {
                    this.props.onLogin(result.token, this.username);
                    this.props.history.push("/");
                });
            } else {
                this.setState({ error: result.error });
            }
        });
    }

    render() {
        return (
            <div className="flex h-screen">
                <form
                    className="flex flex-col w-80 gap-y-5 px-8 pt-6 pb-8 m-auto border-2 bg-white rounded-2xl shadow-md w-72"
                    onSubmit={this.handleLogin}
                >
                    <input
                        className="w-full text-gray-darker placeholder-gray-700 px-3 py-2 rounded-lg appearance-none border border-gray-400 focus:border-blue-500"
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(event) =>
                            (this.username = event.target.value)
                        }
                    />
                    <input
                        className="w-full text-gray-darker placeholder-gray-700 px-3 py-2 rounded-lg appearance-none border border-gray-400 focus:border-blue-500"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(event) =>
                            (this.password = event.target.value)
                        }
                    />
                    {this.state.error && (
                        <div className="bg-red-200 text-red-800 border border-red-800 px-4 py-2 rounded-md">
                            {this.state.error}
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <input
                            className="px-4 py-2 font-bold text-white bg-gray-900 hover:bg-blue-500 rounded-lg hover:bg-blue-400"
                            type="submit"
                            value="Sign In"
                        ></input>
                        <button
                            className="px-4 py-2 font-bold text-white bg-gray-900 hover:bg-blue-500 rounded-lg hover:bg-blue-400"
                            type="button"
                            onClick={this.handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
