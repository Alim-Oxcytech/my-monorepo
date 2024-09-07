import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { Add, DonutSmall } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./theme";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchAppBar: React.FC<Props> = ({
  setOpen,
  setFlag,
  query,
  setQuery,
}) => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollingUp(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleClickOpen = () => {
    setFlag("add");
    setOpen(true);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        opacity: 0.7,
        background: "black",
        transform: scrollingUp ? "translateY(0)" : "translateY(-100%)", // Add this line
        transition: "transform 0.3s ease-in-out", // Add this line
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 0.1, color: "#1976D2" }}
        >
          <DonutSmall sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
            color: "white",
          }}
        >
          Todo List
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ py: 1, ml: 1 }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default SearchAppBar;
