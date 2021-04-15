import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { logInGetToken, signup } from "../api";
import { UserContext } from "../contexts/UserContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
        <div className="m-auto">
            <form
                className="flex flex-col gap-y-5 px-8 pt-6 pb-8 m-auto w-72 w-80 bg-white rounded-2xl border-2 shadow-md dark:bg-trueGray-900 dark:border-trueGray-800"
                onSubmit={handleLogin}
            >
                <Input
                    className="w-full"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                    className="w-full"
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
                    <Button onClick={handleLogin}>Sign In</Button>
                    <Button onClick={handleSignup}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Login);
