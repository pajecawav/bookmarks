import { useState } from "react";
import EditLinkModal from "./EditLinkModal";
import { toggleLiked, deleteLink, toggleArchived } from "../api";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as TrashIcon } from "../icons/trash.svg";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { media_query } from "../utils";

const getHostnameFromRegex = (url) => {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    return matches && matches[1];
};

export default function LinkCard(props) {
    const [title, setTitle] = useState(props.title);
    const [url, setUrl] = useState(props.url);
    const [liked, setLiked] = useState(props.liked);
    const [visible, setVisible] = useState(true);
    const [editing, setEditing] = useState(false);

    const onUpdate = (newLink) => {
        setTitle(newLink.title);
        setUrl(newLink.url);
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-full pb-4 mb-4 flex-grow border-b-2">
            <a
                className="text-xl cursor-pointer hover:text-blue-500 mb-1 pr-16"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {title}
            </a>
            <a
                className="text-base text-trueGray-500 cursor-pointer hover:text-blue-500"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {getHostnameFromRegex(url)}
            </a>

            <div className="flex gap-4 mt-3">
                <HeartIcon
                    className={`cursor-pointer rounded ${
                        liked
                            ? "fill-current text-black"
                            : "hover:fill-blue hover:stroke-blue"
                    }`}
                    alt="toggle liked"
                    onClick={() => {
                        toggleLiked(props.id);
                        setLiked(!liked);
                    }}
                />

                <ArchiveIcon
                    className={`cursor-pointer rounded ${
                        props.archived
                            ? "fill-current text-black"
                            : "hover:fill-blue hover:stroke-blue"
                    }`}
                    alt="archive"
                    onClick={() => {
                        toggleArchived(props.id);
                        // TODO: delete link from the list instead of hiding it
                        setVisible(false);
                    }}
                />

                <EditIcon
                    className="cursor-pointer rounded hover:stroke-blue hover:fill-blue"
                    alt="edit"
                    onClick={() => {
                        setEditing(true);
                    }}
                />

                <TrashIcon
                    className="cursor-pointer rounded hover:stroke-blue"
                    alt="delete"
                    onClick={() => {
                        deleteLink(props.id);
                        // TODO: delete link from the list instead of hiding it
                        setVisible(false);
                    }}
                />
            </div>

            {editing && (
                <EditLinkModal
                    isOpen={editing}
                    onUpdate={onUpdate}
                    onRequestClose={() => setEditing(false)}
                    id={props.id}
                    title={title}
                    url={url}
                />
            )}
        </div>
    );
}
