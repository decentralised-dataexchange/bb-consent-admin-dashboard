import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import Dropdown from "../../components/dropdowns/dropdown";
import { useEffect, useState } from "react";
import { useFilterStore } from "../../store/store";
import { useLocation } from "react-router-dom";

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
  height: 35,
  borderRadius: 1,
  border: "1px solid #DFDFDF",
  width: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const filterDrpodownValues = [
  { value: "Security" },
  { value: "API Calls" },
  { value: "Webhooks" },
];

const ViewLogs = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState<any>();
  const [subscriptionMethodValue, setSubscriptionMethodValue] = useState<
    string[]
  >([]);

  const changefilterViewLogs = (filterViewLogs: any) => {
    useFilterStore.getState().updateFilterViewLogs(filterViewLogs);
  };
  const refresh = useRefresh();

  const location = useLocation();

  const resetStore = () => {
    useFilterStore.getState().resetStore();
  };

  // Listen for route changes and reset the Zustand store when the route changes
  useEffect(() => {
    resetStore();
    setTimeout(() => {
      refresh();
    }, 500);
  }, [location.pathname]);

  useEffect(() => {
    if (selectedFilterValue === "Security") {
      changefilterViewLogs(1);
    } else if (selectedFilterValue === "API Calls") {
      changefilterViewLogs(2);
    } else if (selectedFilterValue === "Webhooks") {
      changefilterViewLogs(5);
    } else if (selectedFilterValue === "all") {
      changefilterViewLogs(0);
      setSubscriptionMethodValue([]);
    }

    refresh();
  }, [selectedFilterValue]);

  return (
    <Container>
      <List
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
        empty={false}
      >
        <Form>
          <BreadCrumb Link="Account" Link2="View Logs" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              View Logs
            </Typography>
          </HeaderContainer>
          <Typography variant="body2" mt={1.25}>
            Provides all logs, can also be filtered against various log
            categories.
          </Typography>
          <DetailsContainer>
            <Dropdown
              displayValue={"Filter Categories"}
              selectWidth={"400px"}
              dropdownValues={filterDrpodownValues}
              setSelectedFilterValue={setSelectedFilterValue}
              setSubscriptionMethodValue={setSubscriptionMethodValue}
              subscriptionMethodValue={subscriptionMethodValue}
            />
            <Button
              style={buttonStyle}
              onClick={() => {
                setSelectedFilterValue("all");
              }}
              sx={{
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
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
              width: "100%",
            }}
          >
            <TextField source="action" label={"Action"} sortable={false} />
            <TextField source="typeStr" label={"Category"} sortable={false} />
            <TextField
              source="timestamp"
              label={"Timestamp"}
              sortable={false}
            />
          </Datagrid>
        </Box>
      </List>
    </Container>
  );
};

export default ViewLogs;
