import { Route, Switch } from "react-router-dom";
import LinksList from "./LinksList";
import SearchLinksList from "./SearchLinksList";
import TagLinksList from "./TagLinksList";
import TagsList from "./TagsList";

export default function MainContent(props) {
    return (
        <Switch>
            <Route exact path="/" key="all">
                <LinksList queryParams={{}} {...props} />
            </Route>
            <Route path="/liked" key="liked">
                <LinksList queryParams={{ liked: true }} {...props} />
            </Route>
            <Route path="/archived" key="archived">
                <LinksList queryParams={{ archived: true }} {...props} />
            </Route>
            <Route path="/search" key="search">
                <SearchLinksList fetchOnRender={false} {...props} />
            </Route>
            <Route exact path="/tags" key="tags">
                <TagsList {...props} />
            </Route>
            <Route
                path="/tags/:tag"
                key="single-tag"
                render={(props) => (
                    <TagLinksList key={props.match.params.tag} {...props} />
                )}
            />
        </Switch>
    );
}
