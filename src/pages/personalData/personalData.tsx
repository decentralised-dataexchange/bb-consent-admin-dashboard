import { useState } from "react";
import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

import {
  Box,
  Typography,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import EditPersonalDataModal from "../../components/modals/editPersonalDataModal";
import { useFilterStore } from "../../store/store";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "10px",
});

const PersonalData = () => {
  const [openEditPersonalDataModal, setOpenEditPersonalDataModal] =
    useState(false);
  const [listFilterValue, setListFilterValue] = useState("all");

  const refresh = useRefresh();

  const onRefetch = () => {
    refresh();
  };

  const changefilterDataAttribute = (filterDataAgreement: string) => {
    useFilterStore.getState().updateFilterDataAttribute(filterDataAgreement);
  };

  const handleChange = (value: any) => {

    if (value === "data_source") {
      changefilterDataAttribute("data_source");
      setListFilterValue("data_source")
    } else if (value === "data_using_service") {
      changefilterDataAttribute("data_using_service");
      setListFilterValue("data_using_service")
    } else if (value === "all") {
      changefilterDataAttribute("all");
      setListFilterValue("all")
    }
  };

  return (
    <Container>
      <List
        actions={false}
        empty={false}
        sx={{ width: "100%", overflow: "hidden" }}
        filter={{ status: listFilterValue }}
      >
        <Form>
          <BreadCrumb Link="Personal Data" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              Personal Data
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="all"
                  onChange={() => handleChange("all")}
                  control={<Radio name={"all"} color="default" size="small" />}
                  label={<Typography variant="body2">All</Typography>}
                />
                <FormControlLabel
                  value="data_source"
                  onChange={() => handleChange("data_source")}
                  control={<Radio name={"data_source"} color="default" size="small" />}
                  label={<Typography variant="body2">Data Source</Typography>}
                />
                <FormControlLabel
                  value="data_using_service"
                  onChange={() => handleChange("data_using_service")}
                  control={<Radio name={"data_using_service"} color="default" size="small" />}
                  label={
                    <Typography variant="body2">Data Using Service</Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </HeaderContainer>
          <Typography variant="body2" mt={1.25}>
            Manage the personal data attributes. Personal data attributes can be
            used for Internal purposes, can be exposed as a Data Source or is
            consumed as a Data Using Service
          </Typography>
        </Form>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Datagrid
            bulkActionButtons={false}
            sx={{
              overflow: "auto",
              width: "100%",
            }}
            rowClick="edit"
          >
            <TextField
              source="name"
              label={"Data Attribute Name"}
              sortable={false}
            />
            <TextField
              source="description"
              label={"Description"}
              sortable={false}
            />
            <TextField
              source="dataAgreement.purpose"
              label={"Data Agreement"}
              sortable={false}
            />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Tooltip title="Edit Personal Data" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditPersonalDataModal(true);
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Box>
          </Datagrid>
        </Box>
      </List>

      {/* Modals */}

      <EditPersonalDataModal
        open={openEditPersonalDataModal}
        setOpen={setOpenEditPersonalDataModal}
        headerText={"Edit Personal Data: "}
        onRefetch={onRefetch}
      />
    </Container>
  );
};

export default PersonalData;
