import { omit } from 'lodash';

async function makeRequest(path, opt) {
    const token = localStorage.getItem("authToken");
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/`;
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token ?? ""}`);

    let body = null;
     if (opt.body instanceof FormData) {
        body = opt.body;
    } else if (opt.body != null) {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(opt.body);
    }

    return fetch(apiUrl + path, {
        ...omit(opt, ["headers", "removeAuth"]),
        headers,
        ...(body == null ? {} : { body }),
    });
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh_token:refreshToken}),
    });

    const data = await res.json();
    localStorage.setItem("authToken", data.access_token);
    if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token); // some servers rotate it
    }
    return data.access_token;
}

export async function useMainServiceFetch(path, opt) {
    let res = await makeRequest(path, opt);

    if (res.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();
            localStorage.setItem("authToken", newAccessToken);
            res = await makeRequest();
        } catch (refreshErr) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            throw new Error("Session expired. Please log in again.");
        }
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(errorData.message || `HTTP error! status: ${res.status}`);
        error.status = res.status;
        error.data = errorData;
        throw error;
    }

    const data = await res.json();
    return data;
}

