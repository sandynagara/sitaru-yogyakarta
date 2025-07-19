// src/pages/OIDCCallback.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../service/login';

function OIDCCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code) {
            alert('No code found in URL');
            return;
        }

        const sendCodeToBackend = async () => {
            try {
                const data = await AuthService.callback(code);
                            
                if (data) {
                    localStorage.setItem('authToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    navigate(state);
                } else {
                    throw new Error('No token returned from backend');
                }

            } catch (err) {
                console.error('Login failed:', err);
                navigate('/');
            }
        };

        sendCodeToBackend();
    }, [navigate]);

    return <div>Logging you in, please wait...</div>;
}

export default OIDCCallback;
