
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



export const AuthService = { login }
