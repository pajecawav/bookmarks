import { useRef, useEffect } from "react";
import LinkCard from "./LinkCard";
import { ReactComponent as SpinnerIcon } from "../icons/spinner.svg";

export default function LinkList(props) {
    const loader = useRef(null);

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "20px",
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.disconnect();
    });

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.intersectionRatio <= 0) return;
        props.fetchMore();
    };

    let cards = [];
    for (let link of props.links) {
        cards.push(<LinkCard key={link.id} {...link} />);
    }

    return (
        <div>
            <div className="flex flex-col my-4 px-4 overflow-auto">{cards}</div>
            {props.load_on_scroll && (
                <SpinnerIcon className="animate-spin m-auto" ref={loader} />
            )}
        </div>
    );
}
