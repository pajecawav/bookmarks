import { React, useContext, useState } from "react";
import { AppContext } from "../App";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { getLocalUsername } from "../utils";
import AddLinkModal from "./AddLinkModal";

export default function Topbar({ onToggleSidebar }) {
    const [addingLink, setAddingLink] = useState(false);

    const app = useContext(AppContext);
    const username = getLocalUsername();

    return (
        <div className="flex sticky top-0 justify-between items-center py-2 px-4 w-full h-10 bg-white border-b-2">
            <MenuIcon
                className="flex rounded transition duration-100 cursor-pointer sm:hidden"
                alt="toggle sidebar"
                onClick={onToggleSidebar}
            />
            <div className="flex gap-4 ml-auto">
                <div
                    className="duration-100 cursor-pointer hover:text-blue-500"
                    onClick={() => setAddingLink(true)}
                >
                    Add Link
                </div>
                <div
                    className="duration-100 cursor-pointer hover:text-blue-500"
                    onClick={app.logout}
                >
                    {username}
                </div>
            </div>
            <AddLinkModal
                isOpen={addingLink}
                onRequestClose={() => setAddingLink(false)}
            />
        </div>
    );
}
