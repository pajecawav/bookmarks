import LinksList from "./LinksList";

export default function TagLinksList({ match, ...props }) {
    const tag = match.params.tag;
    return (
        <>
            <h1 className="px-4 mt-6 text-xl font-medium">{tag}</h1>
            <LinksList queryParams={{ tags: [tag] }} {...props} />
        </>
    );
}
