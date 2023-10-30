import { useState, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  Form,
  useRefresh,
} from "react-admin";

import {
  Box,
  Typography,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
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
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);

  const refresh = useRefresh();

  const onRefetch = () => {
    refresh();
  };

  const changefilterDataAttribute = (filterDataAgreement: string) => {
    useFilterStore.getState().updateFilterDataAttribute(filterDataAgreement);
  };

  useEffect(() => {
    refresh();
  }, [handleChangeTriggered]);

  const handleChange = (e: any) => {
    setHandleChangeTriggered(!handleChangeTriggered);
    const { name } = e.target;

    if (name === "data_source") {
      changefilterDataAttribute("data_source");
    } else if (name === "data_using_service") {
      changefilterDataAttribute("data_using_service");
    } else if (name === "all") {
      changefilterDataAttribute("all");
    } else {
      changefilterDataAttribute("all");
    }
  };

  return (
    <Container>
      <List
        actions={false}
        empty={false}
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <Form>
          <BreadCrumb Link="Personal Data" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              Personal Data
            </Typography>
            <Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="all"
                  control={<Radio color="default" />}
                  label="All"
                  onClick={handleChange}
                  name={"all"}
                />
                <FormControlLabel
                  value="data_source"
                  control={<Radio color="default" />}
                  label="Data Source"
                  onClick={handleChange}
                  name={"data_source"}
                />
                <FormControlLabel
                  value="data_using_service"
                  control={<Radio color="default" />}
                  label="Data Using Service"
                  onClick={handleChange}
                  name={"data_using_service"}
                />
              </RadioGroup>
            </Box>
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
              width: { xs: "359px", sm: "100%", md: "100%", lg: "100%" },
            }}
            rowClick="edit"
          >
            <TextField source="name" label={"Data Attribute Name"} />
            <TextField source="description" label={"Description"} />
            <TextField source="dataAgreements.[0].purpose" label={"Data Agreement"} />
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
