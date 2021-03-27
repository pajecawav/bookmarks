import { Route, Switch } from "react-router-dom";
import LinksList from "./LinksList";
import SearchLinksList from "./SearchLinksList";
import TagLinksList from "./TagLinksList";
import TagsList from "./TagsList";

export default function MainContent(props) {
    return (
        <Switch>
            <Route exact path="/">
                <LinksList key="all" queryParams={{}} {...props} />
            </Route>
            <Route path="/liked">
                <LinksList
                    key="liked"
                    queryParams={{ liked: true }}
                    {...props}
                />
            </Route>
            <Route path="/archived">
                <LinksList
                    key="archived"
                    queryParams={{ archived: true }}
                    {...props}
                />
            </Route>
            <Route path="/search">
                <SearchLinksList
                    key="search"
                    fetchOnRender={false}
                    {...props}
                />
            </Route>
            <Route exact path="/tags">
                <TagsList key="tags" {...props} />
            </Route>
            <Route
                path="/tags/:tag"
                render={(props) => (
                    <TagLinksList key={props.match.params.tag} {...props} />
                )}
            />
        </Switch>
    );
}
