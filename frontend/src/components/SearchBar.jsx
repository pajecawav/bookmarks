import { useState } from "react";
import { bigScreenMediaQuery } from "../utils";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({
            query,
        });
    };

    return (
        <form className="flex px-4 mt-4" onSubmit={handleSubmit}>
            <input
                className="flex-grow flex-shrink py-2 px-4 min-w-0 rounded border border-gray-400 focus:border-blue-500"
                type="text"
                placeholder="Query"
                autoFocus={bigScreenMediaQuery.matches}
                required
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <input
                className="py-2 px-4 ml-4 h-full text-white bg-gray-900 rounded duration-100 cursor-pointer hover:bg-blue-500 sm:px-8"
                type="submit"
                value="Search"
            />
        </form>
    );
}
