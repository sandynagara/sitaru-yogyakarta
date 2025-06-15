import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { UserService } from "../../service/user";
import { Fragment, useEffect, useState } from "react";

export default function DialogAddUser({ open, handleClose, onSubmit }) {

    const [dataUser, setDataUser] = useState({
        username: "",
        namaLengkap: "",
        alamat: '',
        noHp: '',
        status: 'user',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataUser(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!regex.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    password: "Min. 8 chars, 1 uppercase letter, 1 number",
                }));
            } else {
                setErrors(prev => ({ ...prev, password: "" }));
            }
        }

        if (name === "confirmPassword" || name === "password") {
            const otherValue = name === "confirmPassword" ? dataUser.password : value;
            const confirmValue = name === "confirmPassword" ? value : dataUser.confirmPassword;

            if (confirmValue && confirmValue !== otherValue) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: "Passwords do not match",
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: "",
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            username: dataUser.username,
            namaLengkap: dataUser.namaLengkap,
            alamat: dataUser.alamat,
            noHp: dataUser.noHp,
            status: dataUser.status,
            password: dataUser.password
        };
        onSubmit(form)
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Add User</DialogTitle>
            <form onSubmit={handleSubmit} >
                <DialogContent className="flex flex-col gap-3">
                    <DialogContentText>
                        Silakan isi informasi pengguna di bawah ini. Pastikan semua data yang dimasukkan sudah benar sebelum menyimpan.
                    </DialogContentText>
                    <TextField name="username" label="Username" value={dataUser.username ?? ""} onChange={handleInputChange} />
                    <TextField name="namaLengkap" label="Nama Lengkap" value={dataUser.namaLengkap ?? ""} onChange={handleInputChange} />
                    <TextField name="alamat" label="Alamat" value={dataUser.alamat ?? ""} onChange={handleInputChange} />
                    <TextField name="noHp" type="number" label="Nomor Handphone" value={dataUser.noHp ?? ""} onChange={handleInputChange} />
                    <Select
                        name="status"
                        value={dataUser.status ?? "user"}
                        label="Role"
                        onChange={handleInputChange}
                    >
                        {[
                            ...(localStorage.getItem("role") === "superadmin"
                                ? [
                                    <MenuItem key="admin" value="admin">
                                        Admin
                                    </MenuItem>,
                                    <MenuItem key="superadmin" value="superadmin">
                                        Super Admin
                                    </MenuItem>,
                                ]
                                : []),
                            <MenuItem key="user" value="user">
                                User
                            </MenuItem>,
                        ]}

                    </Select>
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={dataUser.password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                    />
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={dataUser.confirmPassword}
                        onChange={handleInputChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button size="small" type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
}
