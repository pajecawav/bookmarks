import { Component } from "react";
import close from "../icons/close.svg";

export default class TagsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: props.tags || [],
            currentTag: "",
        };

        this.getTags = this.getTags.bind(this);
        this.handleTagInput = this.handleTagInput.bind(this);
        this.renderTag = this.renderTag.bind(this);
    }

    getTags() {
        if (this.state.currentTag) {
            return [...this.state.tags, { name: this.state.currentTag }];
        } else {
            return this.state.tags;
        }
    }

    handleTagInput(event) {
        if (event.key === "Enter" && this.state.currentTag) {
            event.preventDefault();
            const tag_exists =
                this.state.tags.filter(
                    (tag) => tag.name === this.state.currentTag
                ).length !== 0;
            if (!tag_exists) {
                this.setState({
                    tags: [...this.state.tags, { name: this.state.currentTag }],
                });
            }
            this.setState({ currentTag: "" });
        } else if (
            event.key === "Backspace" &&
            !this.state.currentTag &&
            this.state.tags.length !== 0
        ) {
            event.preventDefault();
            let lastIndex = this.state.tags.length - 1;
            this.setState({
                tags: this.state.tags.filter((_, i) => i !== lastIndex),
                currentTag: this.state.tags[lastIndex].name,
            });
        }
    }

    renderTag(tag, index) {
        return (
            <div
                key={tag.name}
                className="flex items-center gap-1 h-6 px-3 hover:cursor-default rounded-md text-sm bg-gray-200 hover:bg-blue-200 text-gray-500 hover:text-black"
            >
                {tag.name}
                <img
                    src={close}
                    className="h-4 cursor-pointer"
                    alt="close"
                    onClick={() =>
                        this.setState({
                            tags: this.state.tags.filter((_, i) => i !== index),
                        })
                    }
                />
            </div>
        );
    }

    render() {
        return (
            <div className="flex flex-wrap p-2 gap-2 overflow-y-scroll border border-gray-400 rounded sm:w-96 ">
                {this.state.tags.map(this.renderTag)}
                <input
                    className="w-10 flex-grow border-gray-400 focus:border-blue-500"
                    type="text"
                    value={this.state.currentTag}
                    onKeyDown={this.handleTagInput}
                    onChange={(event) =>
                        this.setState({ currentTag: event.target.value })
                    }
                />
            </div>
        );
    }
}
