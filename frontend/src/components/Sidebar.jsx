import { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            hidden: props.hidden,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hidden !== this.props.hidden) {
            this.setState({ hidden: this.props.hidden });
        }
    }

    render() {
        const toggable_styles = this.state.hidden ? "-translate-x-48" : "";

        return (
            <div
                className={`flex flex-col pt-4 fixed border-r-2 sm:border-r-0 gap-3 w-48 h-full px-4 ${toggable_styles} transform transition-transform duration-300`}
            >
                <Link className="font-bold text-2xl mb-4 cursor-pointer" to="/">
                    Bookmarks
                </Link>

                <div className="flex flex-col gap-4">
                    <NavLink
                        className="group flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        exact
                        to="/"
                    >
                        <HomeIcon className="group-hover:fill-blue group-hover:stroke-blue" />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        className="group flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/liked"
                    >
                        <HeartIcon className="group-hover:fill-blue group-hover:stroke-blue" />
                        <span>Liked</span>
                    </NavLink>
                    <NavLink
                        className="group flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/archived"
                    >
                        <ArchiveIcon className="group-hover:fill-blue group-hover:stroke-blue" />
                        <span>Archive</span>
                    </NavLink>
                    <NavLink
                        className="group flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/search"
                    >
                        <SearchIcon className="group-hover:fill-blue group-hover:stroke-blue" />
                        <span>Search</span>
                    </NavLink>
                </div>
            </div>
        );
    }
}
