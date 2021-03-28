import { useState, createContext } from "react";
import { getLocalPinnedTags, setLocalPinnedTags } from "../utils";

export const PinnedTagsContext = createContext();

export function PinnedTagsProvider({ children }) {
    const [pinnedTags, setPinnedTags] = useState(getLocalPinnedTags() || []);

    const setPinnedTagsHandler = (newTags) => {
        setLocalPinnedTags(newTags);
        setPinnedTags(newTags);
    };

    return (
        <PinnedTagsContext.Provider
            value={{ pinnedTags, setPinnedTags: setPinnedTagsHandler }}
        >
            {children}
        </PinnedTagsContext.Provider>
    );
}
