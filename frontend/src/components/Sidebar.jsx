import { Component } from "react";
import { Link } from "react-router-dom";

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
                    <Link
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        to="/"
                    >
                        <HomeIcon />
                        <span>Home</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        to="/liked"
                    >
                        <HeartIcon />
                        <span>Liked</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        to="/archived"
                    >
                        <ArchiveIcon />
                        <span>Archive</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
                        to="/search"
                    >
                        <SearchIcon />
                        <span>Search</span>
                    </Link>
                </div>
            </div>
        );
    }
}
