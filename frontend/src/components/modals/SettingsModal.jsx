import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";

const closeTimeoutMS = 200;

export default function SettingsModal({ isOpen, onClose, username }) {
    const [isClosing, setIsClosing] = useState(false);
    const { logout } = useContext(UserContext);
    const selfRef = useRef(null);
    const { theme, setTheme } = useContext(ThemeContext);
    const themes = ["dark", "light"];

    useEffect(() => {
        if (!isOpen || !selfRef.current) {
            return;
        }

        const handler = (event) => {
            if (!selfRef.current.contains(event.target)) {
                const close = () => {
                    if (onClose) {
                        onClose();
                    }
                    setIsClosing(false);
                };
                setIsClosing(true);
                setTimeout(close, closeTimeoutMS);
            }
        };

        document.body.addEventListener("click", handler);
        return () => document.body.removeEventListener("click", handler);
    }, [isOpen, onClose]);

    return (
        <div
            className={clsx(
                "flex flex-col gap-2 absolute transition-opacity shadow-lg duration-200 top-12 right-2 py-3 text-lg mt-2 rounded-md bg-white ml-auto border-2 border-trueGray-300 dark:bg-trueGray-800 dark:border-trueGray-800",
                (!isOpen || isClosing) && "opacity-0",
                isOpen && !isClosing && "opacity-100"
            )}
            ref={selfRef}
        >
            {isOpen && (
                <>
                    <div className="px-2 py-0.5">{username}</div>

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
                                <div className="ml-2 capitalize">
                                    {themeName}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
