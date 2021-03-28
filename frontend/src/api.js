import { getLocalToken } from "./utils";

const encodeGetParams = (p) =>
    Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");

// TODO: throw exceptions with errors instead of returning response status

export function getAuthHeaders() {
    let token = getLocalToken();
    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function logInGetToken(username, password) {
    let body = new URLSearchParams({
        username: username,
        password: password,
    });

    const response = await fetch("/api/login/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });
    let json = await response.json();
    if (response.ok) {
        return json.access_token;
    }
    throw json.detail;
}

export async function signup(username, password) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        let json = await response.json();
        throw json.detail;
    }
}

export async function testToken() {
    const response = await fetch("/api/login/test-token", {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return response.ok;
}

export async function getLinks(params = {}) {
    if (!params.cursor) delete params.cursor;

    const response = await fetch(`/api/links?${encodeGetParams(params)}`, {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function getLink(link_id) {
    const response = await fetch(`/api/links/${link_id}`, {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function addLink(link) {
    const response = await fetch("/api/links", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(link),
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    throw json.detail;
}

export async function updateLink(id, link) {
    const response = await fetch(`/api/links/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(link),
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    throw json.detail;
}

export async function deleteLink(link_id) {
    await fetch(`/api/links/${link_id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}

export async function getTags() {
    const response = await fetch("/api/tags", {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}
