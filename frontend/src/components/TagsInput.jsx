import { useState } from "react";
import close from "../icons/close.svg";

export default function TagsInput(props) {
    const [tags, setTags] = useState(props.tags || []);
    const [currentTag, setCurrentTag] = useState("");

    const handleTagInput = (event) => {
        if (event.key === "Enter" && currentTag) {
            event.preventDefault();
            const tagExists =
                tags.filter((tag) => tag.name === currentTag).length !== 0;
            if (!tagExists) {
                const newTags = [...tags, { name: currentTag }];
                setTags(newTags);
                if (props.onTagsUpdate) {
                    props.onTagsUpdate(newTags);
                }
            }
            setCurrentTag("");
        } else if (
            event.key === "Backspace" &&
            !currentTag &&
            tags.length !== 0
        ) {
            event.preventDefault();
            const lastTagIndex = tags.length - 1;
            setCurrentTag(tags[lastTagIndex].name || "");
            setTags(tags.filter((_, i) => i !== lastTagIndex));
        }
    };

    const removeTag = (name) =>
        setTags(tags.filter((tag) => tag.name !== name));

    const renderTag = ({ name }) => {
        return (
            <div
                key={name}
                className="flex gap-1 items-center px-3 h-6 text-sm text-gray-500 bg-gray-200 rounded-md duration-100 hover:text-black hover:bg-blue-200 hover:cursor-default dark:text-white dark:bg-trueGray-700 dark:hover:bg-blue-200 dark:hover:text-trueGray-700"
            >
                {name}
                <img
                    src={close}
                    className="h-4 cursor-pointer"
                    alt="close"
                    onClick={() => removeTag(name)}
                />
            </div>
        );
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 rounded border border-gray-400 sm:w-96 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:focus:border-blue-500">
            {tags.map(renderTag)}
            <input
                className="flex-grow border-gray-400 min-w-2 focus:border-blue-500 dark:bg-trueGray-800 dark:placeholder-gray-500 "
                type="text"
                size={1}
                value={currentTag}
                onKeyDown={handleTagInput}
                onChange={(event) => setCurrentTag(event.target.value)}
            />
        </div>
    );
}
