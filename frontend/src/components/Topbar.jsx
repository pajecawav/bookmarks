import { React, useState } from "react";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import { ReactComponent as UserIcon } from "../icons/user.svg";
import { getLocalUsername } from "../utils";
import AddLinkModal from "./modals/AddLinkModal";
import SettingsModal from "./modals/SettingsModal";

export default function Topbar({ onToggleSidebar }) {
    const [addingLink, setAddingLink] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const username = getLocalUsername();

    return (
        <div className="flex sticky top-0 justify-between items-center py-2 px-4 w-full gap-3 bg-white border-b-2 dark:border-trueGray-700 dark:bg-trueGray-900">
            <MenuIcon
                className="flex rounded transition duration-200 cursor-pointer sm:hidden"
                alt="toggle sidebar"
                onClick={onToggleSidebar}
            />

            <PlusIcon
                className="ml-auto rounded duration-200 cursor-pointer hover:stroke-blue-500"
                onClick={() => setAddingLink(true)}
                title="Add link"
                alt="add link"
            />
            <UserIcon
                className="rounded duration-200 cursor-pointer hover:stroke-blue-500"
                onClick={() => {
                    if (!settingsOpen) {
                        setSettingsOpen(!settingsOpen);
                    }
                }}
                title="Open settings"
                alt="open settings"
            />
            <AddLinkModal
                isOpen={addingLink}
                onRequestClose={() => setAddingLink(false)}
            />
            <SettingsModal
                username={username}
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </div>
    );
}
