import LinkCard from "./LinkCard";

export default function LinkList(props) {
    let cards = [];
    for (let link of props.links) {
        cards.push(<LinkCard key={link.id} {...link} />);
    }

    return <div className="flex flex-col my-4 px-4 overflow-auto">{cards}</div>;
}
