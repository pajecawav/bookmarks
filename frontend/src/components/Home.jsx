import { Component } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import LinkList from "./LinkList";
import { getLinks } from "../api";

const media_query = window.matchMedia("(min-width: 640px)");

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.location = props.location.pathname;

        this.state = {
            sidebar_hidden: !media_query.matches,
            links: [],
            load_on_scroll: true,
        };

        this.fetchLinks = this.fetchLinks.bind(this);
        this.addLink = this.addLink.bind(this);
        this._extendLinks = this._extendLinks.bind(this);
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

    updateQueryParams() {
        this.query_params = { offset: 0 };
        if (this.location === "/liked") {
            this.query_params["liked"] = true;
        } else if (this.location === "/archived") {
            this.query_params["archived"] = true;
        } else {
            this.query_params["archived"] = false;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.location) {
            this.location = nextProps.location.pathname;
            this.updateQueryParams();
            this.setState({ links: [], load_on_scroll: false });
            this.fetchLinks();
        }
    }

    render() {
        let preview_styles = this.state.sidebar_hidden
            ? "ml-0"
            : "sm:ml-48 sm:translate-x-0 ml-0 translate-x-48";

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
