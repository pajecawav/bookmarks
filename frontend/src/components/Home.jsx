import { Component } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import LinkList from "./LinkList";
import { getLiked, getLinks, getArchived } from "../api";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.location = props.location.pathname;

        this.state = {
            sidebar_hidden: false,
            links: [],
            extendable_list: false,
        };

        this.fetchLinks = this.fetchLinks.bind(this);
        this.addLink = this.addLink.bind(this);
    }

    componentDidMount() {
        this.fetchLinks();
    }

    fetchLinks() {
        if (this.location === "/liked") {
            getLiked().then((links) => {
                this.setState({ links: links, extendable_list: false });
            });
        } else if (this.location === "/archived") {
            getArchived().then((links) => {
                this.setState({ links: links, extendable_list: false });
            });
        } else {
            getLinks().then((links) => {
                this.setState({ links: links, extendable_list: true });
            });
        }
    }

    addLink(link) {
        if (!this.state.extendable_list) {
            return;
        }

        let new_links = [link];
        this.setState({
            links: this.state.links
                ? new_links.concat(this.state.links)
                : new_links,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.location) {
            this.location = nextProps.location.pathname;
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
                    <LinkList links={this.state.links}></LinkList>
                </div>
            </div>
        );
    }
}
