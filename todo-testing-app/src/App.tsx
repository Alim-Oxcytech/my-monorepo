import { Box, Grid, Toolbar } from "@mui/material";
import SearchAppBar from "./component/MyAppBar";
import { useEffect, useState } from "react";
import ResponsiveDialog from "./component/MyDailog";
import MultiActionAreaCard from "./component/MyCard";
import axios from "axios";
import { SearchWithFuse } from "./component/SearchWithFuse";

function App() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [data, setData] = useState([]);
  const [ID, setID] = useState(null);
  const [flag, setFlag] = useState("");
  const [query, setQuery] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: any) => {
    setFlag("edit");
    setID(item?._id);
    setOpen(true);
    setFormData(item);
  };

  const newResults = SearchWithFuse(
    ["firstName", "lastName", "email", "address"],
    query,
    data
  );

  return (
    <>
      <SearchAppBar
        open={open}
        setOpen={setOpen}
        setFlag={setFlag}
        query={query}
        setQuery={setQuery}
      />
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `url(https://source.unsplash.com/random/?city,evening)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            transition: "all .85s ease-in-out",
            opacity: 0.7,
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 1,
              height: "95vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                width: "2px",
                background: "#0f0f0f",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <Toolbar />

            <Grid container spacing={2}>
              {newResults?.map((item: any) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <MultiActionAreaCard
                      item={item}
                      fetchData={fetchData}
                      handleEdit={handleEdit}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
      <ResponsiveDialog
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        flag={flag}
        fetchData={fetchData}
        ID={ID}
      />
    </>
  );
}

export default App;
