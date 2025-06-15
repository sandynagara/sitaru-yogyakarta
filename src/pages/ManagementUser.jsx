import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BackHome from "../component/Permohonan/BackHome";
import TableManagementUser from "../component/ManagementUser/TableManagementUser";
import { UserService } from "../service/user";
import DialogEditUser from "../component/ManagementUser/DialogEditUser";
import DialogConfirmation from "../component/ManagementUser/DialogConfirmation";
import { Alert, Button, Snackbar } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import DialogAddUser from "../component/ManagementUser/DialogAddUser";

function ManagementUser() {
    const [dafterUser, setDaftarUser] = useState([]);
    const [openAddUser, setOpenAddUser] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const changeKeyword = debounce((e) => fetchListUser(e));

    function debounce(func, timeout = 2000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const onEditUser = (id) => {
        setSelectedId(id)
        setOpenEditUser(true)
    }

    const onCloseToast = () => {
        setToast({ open: false, message: "", severity: "success" })
    }

    const onSubmitEditUser = async (form) => {
        setToast({
            message: "Proses edit user",
            open: true,
            severity: "warning"
        })
        setOpenEditUser(false)

        try {
            await UserService.updateProfile(selectedId, form)
            setToast({
                message: "Edit user berhasil",
                open: true,
                severity: "success"
            })
            fetchListUser()
        } catch {
            setToast({
                message: "Edit user gagal",
                open: true,
                severity: "error"
            })
        }
    }

    const onSubmitAddUser = async (form) => {
        setToast({
            message: "Proses Add user",
            open: true,
            severity: "warning"
        })
        setOpenAddUser(false)

        try {
            await UserService.create(form)
            setToast({
                message: "Add user berhasil",
                open: true,
                severity: "success"
            })
            fetchListUser()
        } catch {
            setToast({
                message: "Add user gagal",
                open: true,
                severity: "error"
            })
        }
    }

    const onOpenDeleteUser = (id) => {
        setOpenDeleteUser(true)
        setSelectedId(id)
    }

    const onDeleteUser = async () => {
        setToast({
            message: "Proses delete user",
            open: true,
            severity: "warning"
        })
        setOpenDeleteUser(false)

        try {
            await UserService.deleteUser(selectedId)
            setToast({
                message: "delete user berhasil",
                open: true,
                severity: "success"
            })
            fetchListUser()
        } catch {
            setToast({
                message: "delete user gagal",
                open: true,
                severity: "error"
            })
        }
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 800px)",
    });

    const fetchListUser = async (keyword = "") => {
        const data = await UserService.getMany(keyword)
        setDaftarUser(data);
    }

    useEffect(() => {
        fetchListUser()
    }, []);

    return (
        <div className="h-screen bg-[#F9FAFE] lg:py-5 lg:px-10">
            <div className="py-3 px-3 text-black flex items-center justify-between font-medium ">
                <BackHome />
                <div className="flex">
                    {isDesktopOrLaptop && (
                        <input
                            className=" px-3 py-2 mx-2 rounded-lg   text-sm"
                            placeholder="Cari User"
                            onChange={(e) => changeKeyword(e.target.value)}
                        />
                    )}
                    <Button startIcon={<AiOutlinePlus />} size="small" variant="contained" onClick={() => setOpenAddUser(true)}>
                        User
                    </Button>
                </div>
            </div>
            <div className="rounded-lg bg-white text-black mx-2">
                <TableManagementUser data={dafterUser} onEditUser={onEditUser} onDeleteUser={onOpenDeleteUser} />
                <DialogConfirmation open={openDeleteUser} onConfirm={onDeleteUser} handleClose={() => setOpenDeleteUser(false)} />
                <DialogEditUser id={selectedId} open={openEditUser} handleClose={() => setOpenEditUser(false)} onSubmit={onSubmitEditUser} />
                <DialogAddUser open={openAddUser} handleClose={() => setOpenAddUser(false)} onSubmit={onSubmitAddUser} />
            </div>
            <Snackbar open={toast.open} autoHideDuration={4000} onClose={onCloseToast}>
                <Alert
                    onClose={onCloseToast}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ManagementUser;
