import clsx from "clsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PinnedTagsContext } from "../contexts/PinnedTagsContext";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import NavigationLink from "../ui/NavigationLink";

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
                <NavigationLink exact to="/" icon={HomeIcon} text="My List" />
                <NavigationLink to="/liked" icon={HeartIcon} text="Liked" />
                <NavigationLink
                    to="/archived"
                    icon={ArchiveIcon}
                    text="Archived"
                />
                <NavigationLink to="/search" icon={SearchIcon} text="Search" />

                <div className="flex flex-col gap-2">
                    <div className="mt-2 text-gray-600">Tags</div>
                    <NavigationLink
                        exact
                        to="/tags"
                        icon={TagIcon}
                        text="Tags"
                    />
                    {pinnedTags.map((tag) => (
                        <NavigationLink
                            to={`/tags/${tag}`}
                            text={tag}
                            key={tag}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
