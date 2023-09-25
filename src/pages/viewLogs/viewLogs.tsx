import { useState } from "react";
import { List, Datagrid, TextField, Form } from "react-admin";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import Dropdown from "../../components/dropdowns/dropdown";

const Container = styled("p")(({ theme }) => ({
  margin: "52px 15px 0 15px",
  background: "#FFFF",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
});

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 10,
});

const buttonStyle = {
  color: 'black',
  borderRadius: 0,
  border: '1px solid #DFDFDF',
  backgroundColor: 'transparent',
  width:"200px"
}

const ViewLogs = () => {
  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
        <Form>
          <BreadCrumb Link="Account /  View Logs" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              View Logs
            </Typography>
          </HeaderContainer>
          <Typography variant="body1" mt={1}>
            Provides all logs, can also be filtered against various log
            categories.
          </Typography>
          <DetailsContainer>
          <Dropdown displayValue={"Filter Categories"} selectWidth={"400px"} />
          <Button style={buttonStyle}>View All</Button>
          </DetailsContainer>
        </Form>
        <Box mt={1}>
          <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" }}>
            <TextField source="action" label={"Action"} />
            <TextField source="category" label={"Category"} />
            <TextField source="timestamp" label={"Timestamp"} />
          </Datagrid>
        </Box>
      </List>

      {/* Modals */}
    </Container>
  );
};

export default ViewLogs;