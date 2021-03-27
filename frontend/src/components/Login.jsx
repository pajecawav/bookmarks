import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { logInGetToken, signup } from "../api";
import { UserContext } from "../contexts/UserContext";

function Login({ history }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(UserContext);

    const validateForm = () => {
        if (!username) {
            setError("Username is required.");
            return false;
        } else if (!password) {
            setError("Password is required.");
            return false;
        }
        return true;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        logInGetToken(username, password)
            .then((token) => {
                login(token, username);
                history.push("/");
            })
            .catch((error) => setError(error));
    };

    const handleSignup = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        signup(username, password)
            .then(() => {
                logInGetToken(username, password).then((token) => {
                    login(token, username);
                    history.push("/");
                });
            })
            .catch((error) => setError(error));
    };

    return (
        <div className="flex h-screen">
            <form
                className="flex flex-col gap-y-5 px-8 pt-6 pb-8 m-auto w-72 w-80 bg-white rounded-2xl border-2 shadow-md dark:bg-trueGray-900 dark:border-trueGray-800"
                onSubmit={handleLogin}
            >
                <input
                    className="py-2 px-3 w-full placeholder-gray-700 rounded-lg border border-gray-400 transition-colors duration-100 appearance-none text-gray-darker focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    className="py-2 px-3 w-full placeholder-gray-700 rounded-lg border border-gray-400 transition-colors duration-100 appearance-none text-gray-darker focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                {error && (
                    <div className="py-2 px-4 text-red-800 bg-red-200 rounded-md border border-red-800">
                        {error}
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <input
                        className="py-2 px-4 text-white bg-gray-900 rounded-lg duration-200 cursor-pointer dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400 hover:bg-blue-500"
                        type="submit"
                        value="Sign In"
                    ></input>
                    <button
                        className="py-2 px-4 text-white bg-gray-900 rounded-lg duration-200 cursor-pointer dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400 hover:bg-blue-500"
                        type="button"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Login);
