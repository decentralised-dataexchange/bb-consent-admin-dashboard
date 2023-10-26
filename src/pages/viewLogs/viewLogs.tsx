import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import Dropdown from "../../components/dropdowns/dropdown";
import { useEffect, useState } from "react";
import { useFilterStore } from "../../store/store";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const DetailsContainer = styled("div")(({ theme }) => ({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    display: "grid",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "10px",
});

const buttonStyle = {
  color: "black",
  borderRadius: 0,
  border: "1px solid #DFDFDF",
  backgroundColor: "transparent",
  width: "200px",
};

const filterDrpodownValues = [
  { value: "Security" },
  { value: "API Calls" },
  { value: "Orgainsation" },
  { value: "End User" },
  { value: "Webhooks" },
];

const ViewLogs = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState<any>();
  const changefilterViewLogs = (filterViewLogs: any) => {
    useFilterStore.getState().updateFilterViewLogs(filterViewLogs);
  };
  const refresh = useRefresh();

  useEffect(() => {
    console.log("Dispatch", selectedFilterValue);
    if (selectedFilterValue === "Security") {
      changefilterViewLogs(1);
    } else if (selectedFilterValue === "API Calls") {
      changefilterViewLogs(2);
    } else if (selectedFilterValue === "Orgainsation") {
      changefilterViewLogs(3);
    } else if (selectedFilterValue === "End User") {
      changefilterViewLogs(4);
    } else if (selectedFilterValue === "Webhooks") {
      changefilterViewLogs(5);
    } else if (selectedFilterValue === "all") {
      changefilterViewLogs(0);
    } else 0;

    refresh()
  }, [selectedFilterValue]);

  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }} empty={false}>
        <Form>
          <BreadCrumb Link="Account" Link2="View Logs" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              View Logs
            </Typography>
          </HeaderContainer>
          <Typography variant="body1" mt={1.25}>
            Provides all logs, can also be filtered against various log
            categories.
          </Typography>
          <DetailsContainer>
            <Dropdown
              displayValue={"Filter Categories"}
              selectWidth={"400px"}
              dropdownValues={filterDrpodownValues}
              setSelectedFilterValue={setSelectedFilterValue}
            />
            <Button
              style={buttonStyle}
              onClick={() => {
                setSelectedFilterValue("all");
              }}
            >
              View All
            </Button>
          </DetailsContainer>
        </Form>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "18px",
          }}
        >
          <Datagrid
            bulkActionButtons={false}
            sx={{
              overflow: "auto",
              width: { xs: "359px", sm: "100%", md: "100%", lg: "100%" },
            }}
          >
            <TextField source="action" label={"Action"} />
            <TextField source="typeStr" label={"Category"} />
            <TextField source="timestamp" label={"Timestamp"} />
          </Datagrid>
        </Box>
      </List>

    </Container>
  );
};

export default ViewLogs;
