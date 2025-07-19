import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { UserService } from "../../service/user";
import { useEffect, useState } from "react";

export default function DialogEditUser({ id, open, handleClose, onSubmit }) {

    const [dataUser, setDataUser] = useState({
        status: 'user'
    })

    const fetchUserData = async () => {
        const data = await UserService.getOne(id)
        setDataUser(data)
    }

    useEffect(() => {
        fetchUserData()
    }, [id])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            status: dataUser.status,
        };
        onSubmit(form)
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Edit User</DialogTitle>
            <form onSubmit={handleSubmit} >
                <DialogContent className="flex flex-col gap-3">
                    <DialogContentText>
                        Silakan perbarui informasi pengguna di bawah ini. Pastikan semua data yang dimasukkan sudah benar sebelum menyimpan.
                    </DialogContentText>
                
                    <Select
                        name="status"
                        value={dataUser.status ?? "user"}
                        label="Status"
                        onChange={handleInputChange}
                    >
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                    </Select>
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
