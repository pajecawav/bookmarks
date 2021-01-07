import { media_query } from "../utils";

export default function SearchBar(props) {
    let query = null;

    let handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(query);
    };

    return (
        <form className="flex px-4 mt-4" onSubmit={handleSubmit}>
            <input
                className="flex-grow flex-shrink min-w-0 border rounded px-4 py-2 border-gray-400 focus:border-blue-500"
                type="text"
                placeholder="Search"
                autoFocus={media_query.matches}
                required
                onChange={(event) => (query = event.target.value)}
            ></input>
            <input
                className="text-white h-full bg-gray-900 hover:bg-blue-500 px-4 sm:px-8 py-2 ml-4 rounded"
                type="submit"
                value="Search"
            ></input>
        </form>
    );
}
