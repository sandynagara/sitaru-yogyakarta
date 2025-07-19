import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiFillDelete, AiFillEye, AiOutlineDownload } from 'react-icons/ai';
import Swal from 'sweetalert2';

export default function TablePetaLibrary({ data = [], onDeleteEvent }) {

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    const openPdf = (data) => {
        var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + data["namaId"];
        var w = window.open("", "_blank");
        if (w.document) {
            w.document.write(
                "<html><head><title>" +
                data["nama"] +
                '</title></head><body style="margin:0px;overflow:"hidden"><iframe src="' +
                url +
                '" height="100%" width="100%"></iframe></body></html>'
            );
        }
    };

    const downloadFile = (idFile, nama = "No name") => {
        var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + idFile;
        fetch(url)
            .then((res) => res.blob())
            .then((res) => {
                var data = new Blob([res], { type: "application/pdf" });
                var csvURL = window.URL.createObjectURL(data);
                var tempLink = document.createElement("a");
                tempLink.href = csvURL;
                tempLink.setAttribute("download", `${nama}.pdf`);
                tempLink.click();
            });
    };

    const deleteFile = (idFile) => {
        Swal.fire({
            title: "Apa anda yakin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus",
        }).then(async (result) => {
            if (result.isConfirmed) {
                onDeleteEvent(idFile)
            }
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className='font-bold text-[#0C2879] text-lg'>
                        <TableCell>Nama Peta</TableCell>
                        <TableCell align="right">Tanggal diunggah</TableCell>
                        <TableCell align="right">Ukuran</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nama}
                                </TableCell>
                                <TableCell align="right">{row.tanggal}</TableCell>
                                <TableCell align="right">{formatBytes(row.ukuran)}</TableCell>
                                <TableCell align="right">
                                    <div className="flex justify-end">
                                        <AiFillEye
                                            size={23}
                                            className="mr-2 text-slate-600 cursor-pointer"
                                            onClick={() => openPdf(row)}
                                        />
                                        <AiOutlineDownload
                                            size={23}
                                            onClick={() => downloadFile(row["namaId"], row["nama"])}
                                            className="cursor-pointer mr-2"
                                        />
                                        {localStorage.getItem("authToken") && (
                                            <AiFillDelete
                                                size={23}
                                                color="red"
                                                onClick={() => deleteFile(row["namaId"])}
                                                className="cursor-pointer"
                                            />
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                Data tidak ditemukan
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
