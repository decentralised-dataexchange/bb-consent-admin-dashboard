import { useState } from "react";
import { List, Datagrid, TextField, Form } from "react-admin";

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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditPersonalDataModal from "../../components/modals/editPersonalDataModal";

const Container = styled("p")(({ theme }) => ({
  margin: "52px 15px 0 15px",
  background: "#FFFF",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 10,
});

const PersonalData = () => {
  const [openEditPersonalDataModal, setOpenEditPersonalDataModal] =
    useState(false);
  const [openDeletePersonalDataModal, setOpenDeletePersonalDataModal] =
    useState(false);

  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
        <Form>
          <BreadCrumb Link="Personal Data" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              Personal Data
            </Typography>
            <Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="All"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="All"
                  control={<Radio color="default" />}
                  label="All"
                />
                <FormControlLabel
                  value="dataSource"
                  control={<Radio color="default" />}
                  label="Data Source"
                />
                <FormControlLabel
                  value="dataUsingService"
                  control={<Radio color="default" />}
                  label="Data Using Service"
                />
              </RadioGroup>
            </Box>
          </HeaderContainer>
          <Typography variant="body1" mt={1}>
            Manage the personal data attributes. Personal data attributes can be
            used for Internal purposes, can be exposed as a Data Source or is
            consumed as a Data Using Service
          </Typography>
        </Form>
        <Box
          mt={1}
          // style={{ overflowX: 'auto',width:"360px", display: "flex", justifyContent:"center"}}
        >
          <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" }}>
            <TextField
              source="dataAttributeName"
              label={"Data Attribute Name"}
            />
            <TextField source="description" label={"Description"} />
            <TextField source="dataAgreement" label={"Data Agreement"} />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Tooltip title="Edit Data Agreement" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditPersonalDataModal(true);
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="Delete Data Agreement" placement="top">
                <DeleteOutlineOutlinedIcon
                  onClick={() => setOpenDeletePersonalDataModal(true)}
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

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeletePersonalDataModal}
        setOpen={setOpenDeletePersonalDataModal}
        headerText={"Delete Personal Data: "}
        dataExchange={"Aadhar name"}
        daId={"964018b7-f978-4a54-b2a9-c49375c35feb"}
        confirmText="DELETE"
        buttonName={"DELETE"}
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing personal data. Please type{" "}
            <span style={{ fontWeight: "bold" }}>DELETE</span> to confirm and
            click DELETE. This action is not reversible.
          </Typography>
        }
      />

      <EditPersonalDataModal
        open={openEditPersonalDataModal}
        setOpen={setOpenEditPersonalDataModal}
        headerText={"Edit Personal Data: "}
        dataExchange={"Aadhar name"}
        daId={"964018b7-f978-4a54-b2a9-c49375c35feb"}
      />
    </Container>
  );
};

export default PersonalData;
