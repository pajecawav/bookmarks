import { React, useState } from "react";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { getLocalUsername } from "../utils";
import AddLinkModal from "./AddLinkModal";
import SettingsModal from "./SettingsModal";

export default function Topbar({ onToggleSidebar }) {
    const [addingLink, setAddingLink] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const username = getLocalUsername();

    return (
        <div className="flex sticky top-0 justify-between items-center py-2 px-4 w-full h-10 bg-white border-b-2 dark:border-trueGray-700 dark:bg-trueGray-900">
            <MenuIcon
                className="flex rounded transition duration-200 cursor-pointer sm:hidden"
                alt="toggle sidebar"
                onClick={onToggleSidebar}
            />

            <div className="flex relative gap-4 ml-auto">
                <div
                    className="duration-200 cursor-pointer hover:text-blue-500"
                    onClick={() => setAddingLink(true)}
                >
                    Add Link
                </div>
                <div>
                    <div
                        className="duration-200 cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            if (!settingsOpen) {
                                setSettingsOpen(!settingsOpen);
                            }
                        }}
                    >
                        {username}
                    </div>
                </div>
            </div>
            <AddLinkModal
                isOpen={addingLink}
                onRequestClose={() => setAddingLink(false)}
            />
            <SettingsModal
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </div>
    );
}
