import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { bigScreenMediaQuery } from "../utils";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Home({ location }) {
    const [sidebarHidden, setSidebarHidden] = useState(
        !bigScreenMediaQuery.matches
    );

    const urlParams = new URLSearchParams(location.search);
    const [message, setMessage] = useState(urlParams.get("message"));

    return (
        <div
            className={clsx(
                "flex m-auto max-w-3xl",
                !sidebarHidden &&
                    !bigScreenMediaQuery.matches &&
                    "h-screen overflow-hidden"
            )}
        >
            <Sidebar hidden={sidebarHidden} />
            <div
                className={clsx(
                    "w-full transform transition-all duration-300",
                    sidebarHidden
                        ? "ml-0"
                        : "sm:ml-48 sm:translate-x-0 ml-0 translate-x-48"
                )}
            >
                <Topbar
                    onToggleSidebar={() => setSidebarHidden(!sidebarHidden)}
                />
                {message && (
                    <div className="flex py-2 px-4 my-4 mx-4 bg-blue-100 rounded border border-gray-600">
                        <div className="flex-grow">{message}</div>
                        <CloseIcon
                            className="mb-auto cursor-pointer"
                            onClick={() => setMessage(null)}
                        />
                    </div>
                )}
                <MainContent />
            </div>
        </div>
    );
}
