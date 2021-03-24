import { useLocation } from "react-router-dom";
import LinksList from "./LinksList";
import SearchLinksList from "./SearchLinksList";

const queryParamsByRoute = {
    "/liked": {
        liked: true,
    },
    "/archived": {
        archived: true,
    },
};

export default function MainContent(props) {
    const location = useLocation();

    if (location.pathname === "/search") {
        return <SearchLinksList {...props} fetchOnRender={false} />;
    }

    let queryParams = null;
    for (let pathname of Object.keys(queryParamsByRoute)) {
        if (location.pathname === pathname) {
            queryParams = queryParamsByRoute[pathname];
            break;
        }
    }

    return <LinksList queryParams={queryParams} {...props} />;
}
