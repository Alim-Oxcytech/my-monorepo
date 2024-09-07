import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

interface Props {
  item: any;
  fetchData: any;
  handleEdit: any;
}
const MultiActionAreaCard: React.FC<Props> = ({
  item,
  fetchData,
  handleEdit,
}) => {
  const handleDelete = async (userId: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/users/${userId}`
      );
      // If deletion is successful, update the UI by refetching the data
      fetchData();
      alert(res?.data?.message);
    } catch (error: any) {
      alert("Error deleting user:");
    }
  };

  return (
    <Card
      sx={{
        borderLeft: "5px solid #1976D2",
        background: "black",
        opacity: "0.9",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            {" "}
            <Avatar sx={{ width: 40, height: 40, background: "#1976D2" }}>
              AM
            </Avatar>{" "}
            <Typography gutterBottom variant="h6" ml={1} color={"white"}>
              {item.firstName} {item.lastName}
            </Typography>
          </Box>

          <Typography variant="body2" color={"white"} mt={1}>
            {item.email}
          </Typography>
          <Typography variant="body2" color={"white"} mt={1}>
            {item.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <IconButton
          aria-label="edit"
          size="small"
          onClick={() => handleEdit(item)}
        >
          <Edit fontSize="inherit" sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => handleDelete(item._id)}
        >
          <Delete fontSize="inherit" sx={{ color: "white" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MultiActionAreaCard;
