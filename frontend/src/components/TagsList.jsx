import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../api";
import { Tag } from "./LinkCard";

export default function TagsList() {
    const [tags, setTags] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (tags === null) {
            getTags()
                .then((availableTags) => {
                    availableTags.sort((a, b) => a.name > b.name);
                    setTags(availableTags);
                })
                .catch((e) => console.error(e));
        }
    });

    const matchingTags = query
        ? tags.filter((tag) => tag.name.includes(query))
        : tags;

    return (
        <div className="px-4 my-6">
            <h1 className="text-xl font-medium">All Tags</h1>
            <input
                className="py-2 px-4 mt-4 w-full min-w-0 rounded border border-gray-400 focus:border-blue-500"
                type="text"
                placeholder="Filter tags"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-3 mt-4">
                {matchingTags?.map((tag) => (
                    <Link to={`/tags/${tag.name}`} key={tag.name}>
                        <Tag name={tag.name} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
