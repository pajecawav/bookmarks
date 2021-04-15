import MainRouter from "./components/MainRouter";
import { PinnedTagsProvider } from "./contexts/PinnedTagsContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
    return (
        <div className="flex min-h-screen min-w-screen dark:bg-trueGray-900 dark:text-gray-300">
            <ThemeProvider>
                <UserProvider>
                    <PinnedTagsProvider>
                        <MainRouter />
                    </PinnedTagsProvider>
                </UserProvider>
            </ThemeProvider>
        </div>
    );
}
