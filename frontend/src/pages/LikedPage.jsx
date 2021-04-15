import LinksList from "../components/LinksList";

export default function LikedPage() {
    return <LinksList queryParams={{ liked: true }} />;
}
