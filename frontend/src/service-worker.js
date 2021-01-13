/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
    if (request.mode !== "navigate") {
        return false;
    }

    if (url.pathname.startsWith("/_")) {
        return false;
    }

    if (url.pathname.startsWith("/api")) {
        return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
        return false;
    }

    return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
    ({ url }) =>
        url.origin === self.location.origin && url.pathname.endsWith(".png"),
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [new ExpirationPlugin({ maxEntries: 50 })],
    })
);

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

const shareTargetHandler = async ({ event }) => {
    // taken from https://itnext.io/using-service-worker-as-an-auth-relay-5abc402878dd

    const allClients = await self.clients.matchAll();
    const client = allClients.filter((client) => client.type === "window")[0];

    if (!client) {
        return null;
    }

    const channel = new MessageChannel();

    client.postMessage(
        {
            action: "getAuthTokenHeader",
        },
        [channel.port1]
    );

    let authHeader = await new Promise((resolve, reject) => {
        channel.port2.onmessage = (event) => {
            if (event.data.error) {
                console.error("Port error", event.error);
                reject(event.data.error);
            }

            resolve(event.data.authHeader);
        };
    });

    const formData = await event.request.formData();
    const response = await fetch("/api/links", {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
            title: formData.get("title"),
            url: formData.get("text"),
        }),
    });
    let params = new URLSearchParams();
    params.append("message", "Successfully added new link.");
    return Response.redirect(`/?${params.toString()}`);
};
registerRoute("/_share", shareTargetHandler, "POST");
