import { omit } from 'lodash';

export async function useMainServiceFetch(path, opt) {
    const token = localStorage.getItem("authToken");
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/`;
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token ?? ""}`);

    let body = null;
    if (opt.body != null) {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(opt.body);
    }

    const res = await fetch(apiUrl + path, {
        ...omit(opt, ["headers", "removeAuth"]),
        headers,
        ...(body == null ? {} : { body }),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // try to parse JSON, fallback to empty object
        const error = new Error(errorData.message || `HTTP error! status: ${res.status}`);
        error.status = res.status;
        error.data = errorData;
        throw error;
    }

    const data = await res.json();
    return data;
}
