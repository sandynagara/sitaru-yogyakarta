import { useMainServiceFetch } from "../base";

async function login(username, password) {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "login"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            username: username,
            password: password
        }),
        credentials: 'include',
    })
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // try to parse JSON, fallback to empty object
        const error = new Error(errorData.message || `HTTP error! status: ${res.status}`);
        error.status = res.status;
        error.data = errorData;
        throw error;
    }

    const data = await res.json();
    return data.data;
}

function ssoLogin() {
    const clientId = process.env.REACT_APP_OIDC_CLIENT_ID;
    const currentPath = window.location.pathname + window.location.search;
    const state = encodeURIComponent(currentPath); 
    const redirectUri = encodeURIComponent(window.location.origin + "/callback");
    const authUrl = `https://sso.jogjakota.go.id/realms/jogjakota/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile&state=${state}`;

    window.location.href = authUrl;
}

async function callback(code) {
   const url = `${process.env.REACT_APP_BASE_URL}/callback?code=${code}`
    const res = await fetch(url)

    const data = await res.json();
    return data.data;
}

async function logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh_token:refreshToken}),
    });
    return res
}

export const AuthService = { login, ssoLogin, callback, logout}
