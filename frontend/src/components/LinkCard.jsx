import { useState } from "react";
import { toggleLiked, deleteLink } from "../api";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as TrashIcon } from "../icons/trash.svg";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";

const getHostnameFromRegex = (url) => {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    return matches && matches[1];
};

export default function LinkCard(props) {
    const [liked, setLiked] = useState(props.liked);
    const [visible, setVisible] = useState(true);

    if (!visible) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-full pb-4 mb-4 flex-grow border-b-2">
            <a
                className="text-xl cursor-pointer hover:text-blue-500 mb-1"
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {props.title}
            </a>
            <a
                className="text-base text-trueGray-500 cursor-pointer hover:text-blue-500"
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {getHostnameFromRegex(props.url)}
            </a>

            <div className="flex gap-2 mt-3">
                <HeartIcon
                    className={`cursor-pointer rounded ${
                        liked ? "fill-current text-black" : "hover:fill-blue"
                    }`}
                    alt="toggle liked"
                    onClick={() => {
                        toggleLiked(props.id);
                        setLiked(!liked);
                    }}
                />

                <ArchiveIcon
                    className="cursor-pointer rounded hover:fill-blue"
                    alt="archive"
                    onClick={() => {
                        // TODO: implement archiving links
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
        </div>
    );
}
