import { createContext, React } from "react";
import MainRouter from "./components/MainRouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";

export let AppContext = createContext(null);

export default function App() {
    return (
        <div className="flex min-h-screen min-w-screen dark:bg-trueGray-900 dark:text-gray-300">
            <ThemeProvider>
                <UserProvider>
                    <MainRouter />
                </UserProvider>
            </ThemeProvider>
        </div>
    );
}
