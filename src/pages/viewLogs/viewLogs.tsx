import { List, Datagrid, TextField, Form } from "react-admin";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import Dropdown from "../../components/dropdowns/dropdown";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TableEmptyMessage } from "../../components/tableEmptyMessage";
import useLanguageChange from "../../utils/translateTableLanguage";

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

const ViewLogs = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState<any>();
  const [subscriptionMethodValue, setSubscriptionMethodValue] = useState<
    string[]
  >([]);
  const [listFilterValue, setListFilterValue] = useState(0);
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const filterDrpodownValues = [
    { value: "Security", label: t("viewLogs.security") },
    { value: "API Calls", label: t("viewLogs.apiCalls") },
    { value: "Webhooks", label: t("sidebar.webhooks") },
  ];

  useEffect(() => {
    if (selectedFilterValue === "Security") {
      setListFilterValue(1);
    } else if (selectedFilterValue === "API Calls") {
      setListFilterValue(2);
    } else if (selectedFilterValue === "Webhooks") {
      setListFilterValue(5);
    } else if (selectedFilterValue === "all") {
      setListFilterValue(0);
      setSubscriptionMethodValue([]);
    }
  }, [selectedFilterValue]);

  return (
    <Container>
      <Form>
        <BreadCrumb Link={t("sidebar.account")} Link2={t("sidebar.viewLogs")} />
        <HeaderContainer>
          <Typography variant="h6" fontWeight="bold">
            {t("sidebar.viewLogs")}
          </Typography>
        </HeaderContainer>
        <Typography variant="body2" mt={1.25}>
          {t("viewLogs.pageDescription")}
        </Typography>
        <DetailsContainer>
          <Dropdown
            displayValue={t("viewLogs.filterCategories")}
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
            {t("common.viewAll")}
          </Button>
        </DetailsContainer>
      </Form>
      <List
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
        empty={<TableEmptyMessage />}
        filter={{ status: listFilterValue }}
      >
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
            key={key}
          >
            <TextField source="action" label={t("viewLogs.action")} sortable={false} />
            <TextField source="typeStr" label={t("viewLogs.category")} sortable={false} />
            <TextField
              source="timestamp"
              label={t("common.timestamp")}
              sortable={false}
            />
          </Datagrid>
        </Box>
      </List>
    </Container>
  );
};

export default ViewLogs;
