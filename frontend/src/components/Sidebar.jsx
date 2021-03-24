import clsx from "clsx";
import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as ArchiveIcon } from "../icons/archive.svg";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
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
        return (
            <div
                className={clsx(
                    "flex flex-col pt-4 fixed border-r-2 sm:border-r-0 gap-3 w-48 h-full px-4 transform transition-transform duration-300",
                    this.state.hidden && "-translate-x-48"
                )}
            >
                <Link className="mb-4 text-2xl font-bold cursor-pointer" to="/">
                    Bookmarks
                </Link>

                <div className="flex flex-col gap-4">
                    <NavLink
                        className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        exact
                        to="/"
                    >
                        <HomeIcon className="duration-200 group-hover:stroke-blue" />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/liked"
                    >
                        <HeartIcon className="duration-200 group-hover:stroke-blue" />
                        <span>Liked</span>
                    </NavLink>
                    <NavLink
                        className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/archived"
                    >
                        <ArchiveIcon className="duration-200 group-hover:stroke-blue" />
                        <span>Archive</span>
                    </NavLink>
                    <NavLink
                        className="flex gap-3 items-center cursor-pointer group hover:text-blue-500"
                        activeClassName="font-bold text-blue-500"
                        to="/search"
                    >
                        <SearchIcon className="duration-200 group-hover:stroke-blue" />
                        <span>Search</span>
                    </NavLink>
                </div>
            </div>
        );
    }
}
