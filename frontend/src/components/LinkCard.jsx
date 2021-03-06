import clsx from "clsx";
import { Link } from "react-router-dom";
import { deleteLink, updateLink } from "../api";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as TrashIcon } from "../icons/trash.svg";
import { ReactComponent as SendIcon } from "../icons/send.svg";

const getHostnameFromURL = (url) => {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    return matches && matches[1];
};

export function Tag({ name, className, ...props }) {
    return (
        <div
            {...props}
            className={clsx(
                "flex items-center px-3 h-6 text-sm text-gray-500 dark:text-white bg-gray-200 rounded-md duration-100 cursor-pointer hover:text-black hover:bg-blue-200 dark:bg-trueGray-700 dark:hover:bg-blue-200 dark:hover:text-trueGray-700",
                className
            )}
        >
            {name}
        </div>
    );
}

export default function LinkCard({ link, onEdit, onRemove, onUpdate }) {
    const handleShare = () => {
        navigator.share({ title: link.title, url: link.url });
    };

    return (
        <div className="flex flex-col flex-grow pb-4 mb-4 min-h-full border-b-2 dark:border-trueGray-700">
            <a
                className="mb-1 text-xl duration-200 cursor-pointer hover:text-blue-500"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {link.title}
            </a>
            <a
                className="text-base duration-200 cursor-pointer hover:text-blue-500 text-trueGray-500"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {getHostnameFromURL(link.url)}
            </a>

            <div className="flex flex-wrap gap-2 mt-3">
                {link.tags.map((tag) => (
                    <Link to={`/tags/${tag.name}`} key={tag.name}>
                        <Tag name={tag.name} />
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 mt-3">
                <HeartIcon
                    className={clsx(
                        "w-6 h-6 rounded duration-200 cursor-pointer sm:w-5 sm:h-5 hover:stroke-blue-500",
                        link.liked
                            ? "fill-blue-200 text-gray-600"
                            : "dark:fill-trueGray-900 fill-white hover:stroke-blue-500"
                    )}
                    alt="toggle liked"
                    onClick={() => {
                        const updatedLink = { ...link, liked: !link.liked };
                        updateLink(link.id, updatedLink)
                            .then(() => onUpdate(updatedLink))
                            .catch((e) => console.error(e));
                    }}
                    title="Like link"
                />

                <ArchiveIcon
                    className={clsx(
                        "w-6 h-6 rounded duration-200 cursor-pointer sm:w-5 sm:h-5 hover:stroke-blue-500",
                        link.archived
                            ? "fill-blue-200 text-gray-600"
                            : "dark:fill-trueGray-900 fill-white hover:stroke-blue-500"
                    )}
                    alt="archive"
                    onClick={() => {
                        const updatedLink = {
                            ...link,
                            archived: !link.archived,
                        };
                        updateLink(link.id, updatedLink)
                            .then(() => {
                                onUpdate(updatedLink);
                            })
                            .catch((e) => console.error(e));
                    }}
                    title="Archive link"
                />

                <EditIcon
                    className="w-6 h-6 rounded duration-200 cursor-pointer sm:w-5 sm:h-5 hover:stroke-blue-500"
                    alt="edit"
                    onClick={() => {
                        onEdit(link);
                    }}
                    title="Edit link"
                />

                <TrashIcon
                    className="w-6 h-6 rounded duration-200 cursor-pointer sm:w-5 sm:h-5 hover:stroke-blue-500"
                    alt="delete"
                    onClick={() => {
                        deleteLink(link.id)
                            .then(() => onRemove(link))
                            .catch((e) => console.error(e));
                    }}
                    title="Delete link"
                />

                {navigator.share && (
                    <SendIcon
                        className="w-6 h-6 rounded duration-200 cursor-pointer sm:w-5 sm:h-5 hover:stroke-blue-500"
                        alt="share"
                        onClick={handleShare}
                    />
                )}
            </div>
        </div>
    );
}
