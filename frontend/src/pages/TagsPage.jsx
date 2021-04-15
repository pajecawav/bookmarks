import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../api";
import { Tag } from "../components/LinkCard";
import Input from "../ui/Input";

export default function TagsPage() {
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
            <Input
                className="mt-4 w-full min-w-0"
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
