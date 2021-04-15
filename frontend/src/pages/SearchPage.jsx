import { useState } from "react";
import LinksList from "../components/LinksList";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
    const [queryParams, setQueryParams] = useState({});

    return (
        <div>
            <SearchBar
                onSearch={(newQueryParams) => {
                    setQueryParams(newQueryParams);
                }}
            />
            <LinksList
                key={queryParams.query}
                queryParams={queryParams}
                fetchOnRender={false}
            />
        </div>
    );
}
