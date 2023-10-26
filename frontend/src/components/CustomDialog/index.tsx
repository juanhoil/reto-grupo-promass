import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title = "",
  description = "",
  onClose,
  onCancel,
  onConfirm,
  cancelButtonText = "Cancelar",
  confirmButtonText = "Aceptar",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            onClose();
            onCancel();
          }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
          variant="outlined"
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
