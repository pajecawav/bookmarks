import LinksList from "../components/LinksList";

export default function MyListPage() {
    return <LinksList queryParams={{ archived: false }} />;
}
