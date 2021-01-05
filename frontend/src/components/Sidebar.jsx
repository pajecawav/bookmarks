import { Component } from "react";
import { Link } from "react-router-dom";

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
        console.log("SIDEBAR RENDERING");

        const toggable_styles = this.state.hidden ? "-translate-x-48" : "";

        return (
            <div
                className={`flex flex-col pt-4 fixed border-r-2 sm:border-r-0 gap-3 w-48 h-full px-4 text-xl ${toggable_styles} transform transition-transform duration-300`}
            >
                <Link className="font-bold text-2xl mb-6 cursor-pointer" to="/">
                    Bookmarks
                </Link>

                <div className="flex flex-col gap-2">
                    <Link className="cursor-pointer hover:text-blue-500" to="/">
                        Home
                    </Link>
                    <Link
                        className="cursor-pointer hover:text-blue-500"
                        to="/liked"
                    >
                        Liked
                    </Link>
                    <div className="cursor-pointer hover:text-blue-500">
                        Archive
                    </div>
                </div>
            </div>
        );
    }
}
