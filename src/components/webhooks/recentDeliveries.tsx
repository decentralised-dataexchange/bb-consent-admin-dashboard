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
import WidgetsIcon from "@mui/icons-material/Widgets";

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                //   key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: 0,
                }}
              >
                <TableCell align="left">
                  <DoneIcon color="success" />
                </TableCell>
                <TableCell align="center">
                  <WidgetsIcon color="inherit" />
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentDeliveries;
