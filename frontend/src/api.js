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
        return { ok: true, token: json.access_token };
    }
    return { ok: false, error: json.detail };
}

export async function signup(username, password) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        return { ok: true };
    }
    let json = await response.json();
    return { ok: false, error: json.detail };
}

export async function testToken() {
    const response = await fetch("/api/login/test-token", {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return response.ok;
}

export async function getLinks(params = {}) {
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
        console.log(json);
        return { ok: true, link: json };
    }
    return { ok: false, error: json.detail };
}

export async function updateLink(id, link) {
    const response = await fetch(`/api/links/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(link),
    });
    const json = await response.json();
    if (response.ok) {
        return { ok: true, link: json };
    }
    return { ok: false, error: json.detail };
}

export async function deleteLink(link_id) {
    await fetch(`/api/links/${link_id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}

export async function toggleLiked(link_id) {
    await fetch(`/api/links/${link_id}/toggle_liked`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
}

export async function toggleArchived(link_id) {
    await fetch(`/api/links/${link_id}/toggle_archived`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
}
