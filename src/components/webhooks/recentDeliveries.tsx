import {
  Paper,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { FiBox } from "react-icons/fi";

function createData(id: string, timestamp: string) {
  return { id, timestamp };
}

const rows = [
  createData("64fbd2d73eaf080001b587c6", "9 September 2023 at 07:35:11 am"),
  createData("64fbd2d73eaf080001b587c6", "9 September 2023 at 07:35:11 am"),
  createData("64fbd2d73eaf080001b587c6", "9 September 2023 at 07:35:11 am"),
  createData("64fbd2d73eaf080001b587c6", "9 September 2023 at 07:35:11 am"),
  createData("64fbd2d73eaf080001b587c6", "9 September 2023 at 07:35:11 am"),
];

const RecentDeliveries = () => {
  return (
    <Box mt={-3}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Recent Deliveries
      </Typography>
      <TableContainer component={Paper} sx={{display:"flex",justifyContent:"center",boxShadow:"none", }}>
        <Table aria-label="simple table" sx={{ overflow: "auto",width:{xs:"359px",sm:"100%",md:"100%", lg:"100%"}}}>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                //   key={row.name}
                sx={{
                  height: 0,
                }}
              >
                <TableCell sx={{ width: "10px" }}>
                  <DoneIcon
                    color="success"
                    style={{ height: "15px", width: "15px" }}
                  />
                </TableCell>
                {/* <TableCell sx={{ width: "10px" }}>
                  <FiBox style={{ color: "grey", height:"15px", width:"15px" }} />
                </TableCell> */}
                <TableCell align="left">
                  <Typography
                    sx={{
                      color: "grey",
                      fontSize: "14px",
                      display: "inline-block",
                      backgroundColor: "#E1F3FE",
                      textAlign: "center",
                    }}
                  >
                    <FiBox
                      style={{
                        color: "grey",
                        height: "15px",
                        width: "15px",
                        marginRight: "10",
                      }}
                    />
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "grey", fontSize: "14px" }}>
                    {row.timestamp}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentDeliveries;
