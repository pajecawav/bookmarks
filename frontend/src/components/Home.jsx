import { Component } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import LinkList from "./LinkList";
import SearchBar from "./SearchBar";
import { getLinks } from "../api";
import { media_query } from "../utils";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.location = props.location.pathname;

        this.searching = this.location === "/search";

        this.state = {
            sidebar_hidden: !media_query.matches,
            searchbar_hidden: !this.searching,
            links: [],
            load_on_scroll: !this.searching,
        };

        this.fetchLinks = this.fetchLinks.bind(this);
        this.addLink = this.addLink.bind(this);
        this._extendLinks = this._extendLinks.bind(this);
        this.resetLinks = this.resetLinks.bind(this);
        this.updateQueryParams = this.updateQueryParams.bind(this);

        this.updateQueryParams();
    }

    fetchLinks() {
        getLinks(this.query_params).then(this._extendLinks);
    }

    _extendLinks(links) {
        let all_links = this.state.links.concat(links);
        this.setState({
            links: all_links,
            load_on_scroll: links.length !== 0,
        });
        this.query_params["offset"] = all_links.length;
    }

    addLink(link) {
        if (this.location !== "/") {
            return;
        }

        let new_links = [link];
        this.setState({
            links: this.state.links
                ? new_links.concat(this.state.links)
                : new_links,
        });
    }

    resetLinks() {
        this.setState({
            links: [],
            load_on_scroll: false,
            searchbar_hidden: !this.searching,
        });
        this.updateQueryParams();
    }

    updateQueryParams() {
        this.query_params = { offset: 0 };
        if (this.location === "/liked") {
            this.query_params["liked"] = true;
        } else if (this.location === "/archived") {
            this.query_params["archived"] = true;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.location) {
            this.location = nextProps.location.pathname;
            this.searching = this.location === "/search";
            this.updateQueryParams();
            this.resetLinks();

            if (!this.searching) {
                this.fetchLinks();
            }
        }
    }

    render() {
        let preview_styles = this.state.sidebar_hidden
            ? "ml-0"
            : "sm:ml-48 sm:translate-x-0 ml-0 translate-x-48";

        const no_links = !this.state.links.length && !this.state.load_on_scroll;

        return (
            <div className="flex max-w-3xl m-auto">
                <Sidebar hidden={this.state.sidebar_hidden} />
                <div
                    className={`w-full transform transition-all duration-300 ${preview_styles}`}
                >
                    <Topbar
                        onToggleSidebar={() =>
                            this.setState({
                                sidebar_hidden: !this.state.sidebar_hidden,
                            })
                        }
                        onAddLink={this.addLink}
                    />
                    {!this.state.searchbar_hidden && (
                        <SearchBar
                            onSearch={(query) => {
                                this.resetLinks();
                                if (query) {
                                    this.query_params["query"] = query;
                                }
                                this.fetchLinks();
                            }}
                        />
                    )}
                    {no_links && !this.searching && (
                        <div className="h-48 flex items-center justify-center border-b">
                            <h1 className="text-gray-500 text-xl">No links.</h1>
                        </div>
                    )}
                    <LinkList
                        links={this.state.links}
                        fetchMore={this.fetchLinks}
                        load_on_scroll={this.state.load_on_scroll}
                    ></LinkList>
                </div>
            </div>
        );
    }
}
