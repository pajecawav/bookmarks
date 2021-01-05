import { React, useContext, useState } from "react";
import { AppContext } from "../App";
import { getLocalUsername } from "../utils";
import AddLinkModal from "./AddLinkModal";
import menu from "../icons/menu.svg";

export default function Topbar(props) {
    let [addingLink, setAddingLink] = useState(false);

    let app = useContext(AppContext);
    const username = getLocalUsername();

    return (
        <div className="flex h-10 sticky top-0 bg-white py-2 items-center w-full justify-between px-4 border-b-2">
            <img
                src={menu}
                className="flex sm:hidden cursor-pointer rounded transition duration-100"
                alt="toggle sidebar"
                onClick={props.onToggleSidebar}
            />
            <div className="flex gap-4 ml-auto">
                <div
                    className="hidden sm:block cursor-pointer hover:text-blue-500"
                    onClick={() => setAddingLink(true)}
                >
                    Add Link
                </div>
                <div
                    className="cursor-pointer hover:text-blue-500"
                    onClick={app.logout}
                >
                    {username}
                </div>
            </div>
            <AddLinkModal
                isOpen={addingLink}
                onRequestClose={() => setAddingLink(false)}
                onAddLink={props.onAddLink}
            />
        </div>
    );
}
