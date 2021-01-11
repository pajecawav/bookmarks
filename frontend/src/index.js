import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { getAuthHeaders } from "./api";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorkerRegistration.register();

navigator.serviceWorker.addEventListener("message", (event) => {
    const { action } = event.data;
    const port = event.ports[0];

    if (action === "getAuthTokenHeader") {
        port.postMessage({
            authHeader: getAuthHeaders(),
        });
    } else {
        console.error("Unknown event", event);
        port.postMessage({
            error: "Unknown request",
        });
    }
});
