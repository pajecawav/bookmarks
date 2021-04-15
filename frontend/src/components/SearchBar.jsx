import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
            <Input
                className="flex-grow flex-shrink min-w-0"
                type="text"
                placeholder="Query"
                required
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <Button className="ml-4 h-full">Search</Button>
        </form>
    );
}
