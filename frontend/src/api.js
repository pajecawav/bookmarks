import { getLocalToken } from "./utils";

function getAuthHeaders() {
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

export async function getLinks(offset = 0) {
    const response = await fetch(`/api/links?offset=${offset}`, {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function getLiked(offset = 0) {
    const response = await fetch(`/api/links/liked?offset=${offset}`, {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function getArchived(offset = 0) {
    const response = await fetch(`/api/links/archived?offset=${offset}`, {
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

export async function addLink(url) {
    const response = await fetch("/api/links", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ url }),
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
