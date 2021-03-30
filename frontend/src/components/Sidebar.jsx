import clsx from "clsx";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { PinnedTagsContext } from "../contexts/PinnedTagsContext";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as TagIcon } from "../icons/tag.svg";

export default function Sidebar({ hidden }) {
    const { pinnedTags } = useContext(PinnedTagsContext);

    return (
        <div
            className={clsx(
                "flex flex-col pt-4 fixed border-r-2 sm:border-r-0 dark:border-trueGray-800 gap-3 w-48 h-full px-4 transform transition-transform duration-300",
                hidden && "-translate-x-48"
            )}
        >
            <Link className="mb-4 text-2xl font-bold cursor-pointer" to="/">
                Bookmarks
            </Link>

            <div className="flex flex-col gap-4">
                <NavLink
                    className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                    activeClassName="font-bold text-blue-500"
                    exact
                    to="/"
                >
                    <HomeIcon className="duration-200 group-hover:stroke-blue-500" />
                    <div className="duration-200">My List</div>
                </NavLink>
                <NavLink
                    className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                    activeClassName="font-bold text-blue-500"
                    to="/liked"
                >
                    <HeartIcon className="duration-200 group-hover:stroke-blue-500" />
                    <div className="duration-200">Liked</div>
                </NavLink>
                <NavLink
                    className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                    activeClassName="font-bold text-blue-500"
                    to="/archived"
                >
                    <ArchiveIcon className="duration-200 group-hover:stroke-blue-500" />
                    <div className="duration-200">Archive</div>
                </NavLink>
                <NavLink
                    className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                    activeClassName="font-bold text-blue-500"
                    to="/search"
                >
                    <SearchIcon className="duration-200 group-hover:stroke-blue-500" />
                    <div className="duration-200">Search</div>
                </NavLink>

                <div className="flex flex-col gap-2">
                    <div className="mt-2 text-gray-600">Tags</div>
                    <NavLink
                        className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/tags"
                        exact
                    >
                        <TagIcon className="duration-200 group-hover:stroke-blue-500" />
                        <div className="duration-200">All Tags</div>
                    </NavLink>
                    {pinnedTags.map((tag) => (
                        <NavLink
                            className="duration-200 cursor-pointer hover:text-blue-500"
                            activeClassName="font-bold text-blue-500"
                            to={`/tags/${tag}`}
                            key={tag}
                        >
                            {tag}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
