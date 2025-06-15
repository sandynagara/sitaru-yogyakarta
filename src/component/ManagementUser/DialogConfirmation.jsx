import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function ConfirmationDialog({ open, handleClose, onConfirm, message }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || "Are you sure you want to proceed with this action?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={handleClose}>
                    Cancel
                </Button>
                <Button size="small" onClick={onConfirm} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
