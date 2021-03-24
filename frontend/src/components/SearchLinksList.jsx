import { useState } from "react";
import LinksList from "./LinksList";
import SearchBar from "./SearchBar";

export default function SearchLinksList() {
    const [queryParams, setQueryParams] = useState({});

    return (
        <div>
            <SearchBar
                onSearch={(newQueryParams) => {
                    setQueryParams(newQueryParams);
                }}
            />
            <LinksList
                key="search"
                queryParams={queryParams}
                fetchOnRender={false}
            />
        </div>
    );
}
