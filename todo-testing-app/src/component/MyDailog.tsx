import React, { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Grid, TextField } from "@mui/material";
import { defaultTheme } from "./theme";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  flag: string;
  fetchData: any;
  ID: any;
}

const ResponsiveDialog: React.FC<Props> = ({
  open,
  setOpen,
  formData,
  setFormData,
  flag,
  fetchData,
  ID,
}) => {
  const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setFormData(initialFormData);
    setOpen(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let res: any = "";
      if (flag === "add") {
        res = await axios.post("http://localhost:3001/api/users", formData);
      } else {
        res = await axios.patch(
          `http://localhost:3001/api/users/${ID}`,
          formData
        );
      }

      fetchData();
      alert(res?.data?.message);
      handleClose();
    } catch (error) {
      console.error("Error posting data:");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            background: "black",
            opacity: "0.8",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" color={"white"}>
          {flag === "add" ? "Add User" : "Edit User"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    multiline={true}
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={{ color: "white" }}>
            {flag === "add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ResponsiveDialog;
