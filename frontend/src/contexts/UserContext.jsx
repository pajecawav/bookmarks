import { createContext, useEffect, useState } from "react";
import {
    deleteLocalToken,
    getLocalUsername,
    isLoggedIn,
    saveLocalToken,
    saveLocalUsername,
} from "../utils";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        isLoggedIn().then((loggedIn_) => {
            if (loggedIn_) {
                setUsername(getLocalUsername());
            }
            setLoggedIn(loggedIn_);
        });
    }, []);

    const login = (token, username) => {
        saveLocalToken(token);
        saveLocalUsername(username);
        setUsername(username);
        setLoggedIn(true);
    };

    const logout = () => {
        deleteLocalToken();
        setUsername(null);
        setLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ username, loggedIn, logout, login }}>
            {children}
        </UserContext.Provider>
    );
}
