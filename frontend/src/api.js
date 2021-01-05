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

    const response = await fetch("/login/token", {
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
    const response = await fetch("/users", {
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
    const response = await fetch("/login/test-token", {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return response.ok;
}

export async function getLinks() {
    const response = await fetch("/links", {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function getLiked() {
    const response = await fetch("/links/liked", {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function getLink(link_id) {
    const response = await fetch(`/links/${link_id}`, {
        headers: getAuthHeaders(),
    });
    const json = await response.json();
    return json;
}

export async function addLink(url) {
    await fetch("/links", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ url }),
    });
}

export async function deleteLink(link_id) {
    await fetch(`/links/${link_id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}

export async function toggleLiked(link_id) {
    await fetch(`/links/${link_id}/toggle_liked`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
}
