import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { addLink } from "./api";
import { ReactComponent as SpinnerIcon } from "./icons/spinner.svg";

export default function ShareTarget() {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        addLink({ url: params.get("url"), title: params.get("title") }).then(
            () => {
                const redirectParams = new URLSearchParams();
                redirectParams.append(
                    "message",
                    "Successfully added new link."
                );
                history.push(`/?${redirectParams.toString()}`);
            }
        );
    }, [history, location.search]);

    return (
        <SpinnerIcon className="m-auto w-24 h-24 text-blue-500 animate-spin sm:w-32 sm:h-32" />
    );
}
