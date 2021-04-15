import { Route, Switch } from "react-router-dom";
import MyListPage from "../pages/MyListPage";
import LikedPage from "../pages/LikedPage";
import ArchivedPage from "../pages/ArchivedPage";
import SearchPage from "../pages/SearchPage";
import TagsPage from "../pages/TagsPage";
import TagPage from "../pages/TagPage";

export default function ContentRouter() {
    return (
        <Switch>
            <Route exact path="/" component={MyListPage} />
            <Route path="/liked" component={LikedPage} />
            <Route path="/archived" component={ArchivedPage} />
            <Route path="/search" component={SearchPage} />
            <Route exact path="/tags" component={TagsPage} />
            <Route
                path="/tags/:tag"
                render={(props) => (
                    <TagPage key={props.match.params.tag} {...props} />
                )}
            />
        </Switch>
    );
}
