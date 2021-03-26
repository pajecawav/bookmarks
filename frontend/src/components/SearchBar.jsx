import { useState } from "react";

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
                className="flex-grow flex-shrink py-2 px-4 min-w-0 rounded border border-gray-400 focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Query"
                required
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <input
                className="py-2 px-4 ml-4 h-full text-white bg-gray-900 rounded duration-200 cursor-pointer hover:bg-blue-500 sm:px-8 dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400"
                type="submit"
                value="Search"
            />
        </form>
    );
}
