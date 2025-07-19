import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { AuthService } from '../../service/login';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { UserService } from '../../service/user';

function LoginForm({ setLogin, setOpen, open }) {

    const handleClose = () => setOpen(false);

    const handleSSOLogin = () => {
        const clientId = 'gatra-matra-jogja';
        const redirectUri = encodeURIComponent('http://localhost:3000/'); // Change this to your app's real redirect URL
        const authUrl = `https://sso.jogjakota.go.id/realms/jogjakota/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile`;

        // Redirect the browser
        window.location.href = authUrl;
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Klik tombol di bawah ini untuk login melalui Jogja SSO.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained">Close</Button>
                <Button onClick={handleSSOLogin} variant="contained" color="primary">
                    Login with Jogja SSO
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default LoginForm;
