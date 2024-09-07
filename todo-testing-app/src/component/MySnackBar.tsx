import { Snackbar } from "@mui/material";
import React from "react";
interface Props {
  value: any;
  message: any;
}
export const CustomToast: React.FC<Props> = ({ value, message }) => {
  const [open, setOpen] = React.useState(value);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
};
