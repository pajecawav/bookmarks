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

        logInGetToken(this.username, this.password)
            .then((token) => {
                this.props.onLogin(token, this.username);
                this.props.history.push("/");
            })
            .catch((error) => this.setState({ error: error }));
    }

    handleSignup(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        signup(this.username, this.password)
            .then(() => {
                logInGetToken(this.username, this.password).then((token) => {
                    this.props.onLogin(token, this.username);
                    this.props.history.push("/");
                });
            })
            .catch((error) => this.setState({ error: error }));
    }

    render() {
        return (
            <div className="flex h-screen">
                <form
                    className="flex flex-col gap-y-5 px-8 pt-6 pb-8 m-auto w-72 w-80 bg-white rounded-2xl border-2 shadow-md"
                    onSubmit={this.handleLogin}
                >
                    <input
                        className="py-2 px-3 w-full placeholder-gray-700 rounded-lg border border-gray-400 transition-colors duration-100 appearance-none text-gray-darker focus:border-blue-500"
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(event) =>
                            (this.username = event.target.value)
                        }
                    />
                    <input
                        className="py-2 px-3 w-full placeholder-gray-700 rounded-lg border border-gray-400 transition-colors duration-100 appearance-none text-gray-darker focus:border-blue-500"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(event) =>
                            (this.password = event.target.value)
                        }
                    />
                    {this.state.error && (
                        <div className="py-2 px-4 text-red-800 bg-red-200 rounded-md border border-red-800">
                            {this.state.error}
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <input
                            className="py-2 px-4 font-bold text-white bg-gray-900 rounded-lg duration-100 cursor-pointer hover:bg-blue-400 hover:bg-blue-500"
                            type="submit"
                            value="Sign In"
                        ></input>
                        <button
                            className="py-2 px-4 font-bold text-white bg-gray-900 rounded-lg duration-100 cursor-pointer hover:bg-blue-400 hover:bg-blue-500"
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
