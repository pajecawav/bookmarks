import { useContext, useState } from "react";
import { PinnedTagsContext } from "../contexts/PinnedTagsContext";
import { ReactComponent as PinIcon } from "../icons/pin.svg";
import LinksList from "./LinksList";
import clsx from "clsx";

export default function TagLinksList({ match, ...props }) {
    const tag = match.params.tag;
    const { pinnedTags, setPinnedTags } = useContext(PinnedTagsContext);
    const [pinned, setPinned] = useState(pinnedTags.includes(tag));

    const togglePinned = () => {
        if (pinned) {
            setPinnedTags(pinnedTags.filter((t) => t !== tag));
        } else {
            setPinnedTags([...pinnedTags, tag]);
        }
        setPinned(!pinned);
    };

    return (
        <>
            <div className="flex items-center px-4 mt-6 mb-8 ">
                <h1 className="mr-2 text-xl font-semibold">{tag}</h1>
                <PinIcon
                    className={clsx(
                        "cursor-pointer duration-200",
                        pinned ? "fill-blue-200" : "hover:stroke-blue-500"
                    )}
                    onClick={togglePinned}
                />
            </div>
            <LinksList queryParams={{ tags: [tag] }} {...props} />
        </>
    );
}
