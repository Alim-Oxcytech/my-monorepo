import { InputBase, createTheme, styled } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              transition:
                "transform 0.35s cubic-bezier(0.36, 1, 0.62, 0.98) 0.085s, opacity 0.3s ease-in-out 0.2s, background 0.15s ease-in-out, border 0.3s ease-in-out",
              opacity: 1,
              color: "white",
              fontSize: 16,
              padding: "5px",
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid",
              borderRadius: 5,
              borderColor: "white",
            },
          },
          "& .MuiOutlinedInput-root.Mui-disabled": {
            "& fieldset": {
              color: "white",
              borderColor: "white",
            },
          },
          "& .MuiOutlinedInput-root:hover fieldset": {
            borderColor: "white",
          },
          "& .MuiOutlinedInput-root.Mui-disabled:hover fieldset": {
            borderColor: "white",
          },
          "& .MuiOutlinedInput-input": {
            color: "#FFF !important",
          },
          "& .MuiOutlinedInput-input.Mui-disabled": {
            WebkitTextFillColor: "white",
            opacity: 0.6,
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-disabled": {
            color: "white",
          },
        },
      },
    },
  },
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  color: "#1976D2",
  "&:hover": {
    backgroundColor: "white",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
