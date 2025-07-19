import { AuthService } from "../service/login";

async function callbackHandle(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
        alert('No code found in URL');
        return;
    }

    const response = await AuthService.callback(code);
    if (response) {
        localStorage.setItem('authToken', response.data);
    } else {
        throw new Error('No token returned from backend');
    }
}

export default callbackHandle;