import { useEffect, useRef, useState } from "react";
import { getLinks } from "../api";
import { ReactComponent as SpinnerIcon } from "../icons/spinner.svg";
import EditLinkModal from "./EditLinkModal";
import LinkCard from "./LinkCard";

export default function LinksList({ queryParams, fetchOnRender = true }) {
    const [links, setLinks] = useState([]);
    const [loadOnScroll, setLoadOnScroll] = useState(fetchOnRender);
    const [editingLink, setEditingLink] = useState(null);
    const loader = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.disconnect();
    });

    useEffect(() => {
        setLinks([]);
        setLoadOnScroll(true);
    }, []);

    const fetchMoreLinks = () => {
        getLinks({ ...queryParams, offset: links.length })
            .then((newLinks) => {
                const extendedLinks = [...links, ...newLinks];
                setLinks(extendedLinks);
                setLoadOnScroll(newLinks.length !== 0);
            })
            .catch((e) => console.error(e));
    };

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.intersectionRatio <= 0) return;
        fetchMoreLinks();
    };

    const showEditLinkModal = (link) => {
        setEditingLink(link);
    };

    const updateLink = (updatedLink) => {
        const updatedLinks = links.map((link) =>
            link.id === updatedLink.id ? updatedLink : link
        );
        setLinks(updatedLinks);
    };

    const removeLink = ({ id }) => {
        const updatedLinks = links.filter((link) => link.id !== id);
        setLinks(updatedLinks);
    };

    const cards = links.map((link) => {
        return (
            <LinkCard
                key={link.id}
                link={link}
                onEdit={showEditLinkModal}
                onRemove={removeLink}
                onUpdate={updateLink}
            />
        );
    });

    const hasLinks = links.length || loadOnScroll;

    return (
        <div>
            <div className="flex overflow-auto flex-col px-4 my-4">{cards}</div>
            {loadOnScroll && (
                <SpinnerIcon
                    className="m-auto text-blue-500 animate-spin"
                    ref={loader}
                />
            )}
            {!hasLinks && (
                <div className="flex justify-center items-center mx-4 h-48 border-b">
                    <h1 className="text-xl text-gray-500">No links.</h1>
                </div>
            )}

            <EditLinkModal
                isOpen={editingLink !== null}
                link={editingLink}
                onUpdate={updateLink}
                onRequestClose={() => setEditingLink(null)}
                closeTimeoutMS={200}
            />
        </div>
    );
}
