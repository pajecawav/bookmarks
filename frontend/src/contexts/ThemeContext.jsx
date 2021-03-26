import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getTheme = (_) => {
    const storedTheme = window.localStorage.getItem("color-theme");
    if (typeof storedTheme === "string") {
        return storedTheme;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
        return "dark";
    }

    return "dark";
};

export const ThemeProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = useState(getTheme);

    const rawSetTheme = (theme) => {
        const root = document.documentElement;
        const isDark = theme === "dark";

        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("color-theme", theme);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (initialTheme) {
        rawSetTheme(initialTheme);
    }

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
