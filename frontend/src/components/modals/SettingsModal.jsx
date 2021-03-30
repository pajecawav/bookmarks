import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";

export default function SettingsModal({ isOpen, onClose }) {
    const { logout } = useContext(UserContext);
    const selfRef = useRef(null);
    const { theme, setTheme } = useContext(ThemeContext);
    const themes = ["dark", "light"];

    useEffect(() => {
        if (isOpen && selfRef.current) {
            const handler = (event) => {
                if (!selfRef.current.contains(event.target)) {
                    onClose();
                }
            };
            document.body.addEventListener("click", handler);
            return () => document.body.removeEventListener("click", handler);
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={clsx(
                "flex flex-col gap-2 absolute transition-opacity shadow-lg duration-200 top-10 right-2 py-3 text-xl mt-2 rounded-md bg-white ml-auto border-2 border-trueGray-300 dark:bg-trueGray-800 dark:border-trueGray-800",
                isOpen ? "opacity-100" : "opacity-0"
            )}
            ref={selfRef}
        >
            <button
                className="px-2 py-0.5 w-full text-left duration-200 hover:bg-blue-200 dark:hover:bg-blue-400 dark:hover:text-gray-800"
                onClick={logout}
            >
                Log out
            </button>

            <div className="flex gap-2 px-2">
                {themes.map((themeName) => (
                    <div
                        className="flex items-center transition-colors duration-200"
                        onClick={() => setTheme(themeName)}
                        key={themeName}
                    >
                        <div
                            className={clsx(
                                "w-5 h-5 flex justify-center items-center rounded-full border-2",
                                theme === themeName
                                    ? "border-blue-400"
                                    : "border-trueGray-600"
                            )}
                        >
                            <div
                                className={clsx(
                                    "w-3 h-3 rounded-full",
                                    theme === themeName && "bg-blue-400"
                                )}
                            />
                        </div>
                        <div className="ml-2 capitalize">{themeName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
