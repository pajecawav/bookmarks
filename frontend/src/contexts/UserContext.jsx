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

    useEffect(() => {
        isLoggedIn().then((loggedIn) => {
            setUsername(getLocalUsername());
        });
    }, []);

    const login = (token, username) => {
        saveLocalToken(token);
        saveLocalUsername(username);
        setUsername(username);
    };

    const logout = () => {
        deleteLocalToken();
        setUsername(null);
    };

    return (
        <UserContext.Provider value={{ username, logout, login }}>
            {children}
        </UserContext.Provider>
    );
}
