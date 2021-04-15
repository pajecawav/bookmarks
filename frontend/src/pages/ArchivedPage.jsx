import LinksList from "../components/LinksList";

export default function ArchivedPage() {
    return <LinksList queryParams={{ archived: true }} />;
}
