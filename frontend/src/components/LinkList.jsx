import { useRef, useEffect } from "react";
import LinkCard from "./LinkCard";

export default function LinkList(props) {
    const loader = useRef(null);

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "20px",
            // threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

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
            {props.load_on_scroll && <div className="h-28" ref={loader}></div>}
        </div>
    );
}
