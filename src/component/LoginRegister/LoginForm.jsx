import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { AuthService } from '../../service/login';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { UserService } from '../../service/user';

function LoginForm({ setLogin, setOpen, open }) {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleClose = () => setOpen(false);

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const username = form.elements.username.value.trim();
        const password = form.elements.password.value.trim();

        if (!username) {
            return setSnackbar({
                open: true,
                message: 'Username tidak boleh kosong',
                severity: 'warning',
            });
        }

        if (!password) {
            return setSnackbar({
                open: true,
                message: 'Password tidak boleh kosong',
                severity: 'warning',
            });
        }

        try {
            const token = await AuthService.login(username, password);
            localStorage.setItem('authToken', token);
            const myProfile = await UserService.getMyAccount();
            localStorage.setItem('role', myProfile.status);
            setSnackbar({
                open: true,
                message: 'Anda berhasil login',
                severity: 'success',
            });
            handleClose();
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: 'Username / Password yang anda masukkan salah',
                severity: 'error',
            });
        }
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Login</DialogTitle>
                <form onSubmit={handleSubmit} >
                    <DialogContent className="flex flex-col gap-3">
                        <DialogContentText>
                            Silakan masukkan username dan password
                        </DialogContentText>
                        <TextField
                            name="username"
                            label="Username" />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={handleClose} variant="contained" s>
                            Close
                        </Button>
                        <Button size="small" type="submit" variant="contained">
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Fragment>

    );
}

export default LoginForm;
