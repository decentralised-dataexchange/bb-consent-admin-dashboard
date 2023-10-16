import { useState } from "react";
import { List, Datagrid, TextField, Form, useGetList } from "react-admin";

import {
  Box,
  Typography,
  Button,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GlobalDataPolicyConfigModal from "../../components/modals/globalDataPolicyConfig";
import GeneralModal from "../../components/modals/generalModal";
import DataAgreementModal from "../../components/modals/dataAgreementModal";
import { DataAgreementsCRUDProvider } from "../../components/providers/dataAgreementsCRUDProvider";

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

const buttonStyle = {
  color: "black",
  borderRadius: 5,
  border: "1px solid black",
  backgroundColor: "#E5E4E4",
};

const DataAgreement = () => {
  const [openGlobalDataPolicyModal, setOpenGlobalDataPolicyModal] =
    useState(false);
  const [openDeleteDataAgreementModal, setOpenDeleteDataAgreementModal] =
    useState(false);
  const [openPublishDataAgreementModal, setOpenPublishDataAgreementModal] =
    useState(false);
  const [openDataAgreementModal, setOpenDataAgreementModal] = useState(false);
  const [dataAgreementMode, setDataAgreementMode] = useState("");
 
  const { refetch } = useGetList("dataagreement")
  const onDACreate = () =>{
    refetch()
  }
  return (
    <Container>
      <Form>
        <BreadCrumb Link="Data Agreements" />
        <HeaderContainer>
          <Box
            style={{
              maxWidth: "300px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Data Agreements
            </Typography>
            <Tooltip title="Create Data Agreement" placement="top">
              <AddCircleOutlineOutlinedIcon
                onClick={() => {
                  setOpenDataAgreementModal(true);
                  setDataAgreementMode("Create");
                }}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </Tooltip>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
                  value="Published"
                  control={<Radio color="default" />}
                  label="Published"
                />
              </RadioGroup>
            </Box>
            <Box>
              <Button
                style={buttonStyle}
                variant="contained"
                onClick={() => setOpenGlobalDataPolicyModal(true)}
              >
                GLOBAL DATA POLICY
              </Button>
            </Box>
          </Box>
        </HeaderContainer>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Manage Data Agreements for your organisation.
        </Typography>
      </Form>
      <List
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
        empty={false}
      >
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
          >
            <TextField source="Name" label={"Usage Purpose"} />
            <TextField source="Version" label={"Version"} />
            <TextField source="MethodOfUse" label={"Data Exchange"} />
            <TextField source="PublishFlag" label={"Status"} />
            <TextField
              source="LawfulBasisOfProcessing"
              label={"Lawful Basis Of Processing"}
            />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Tooltip title="Publish Data Agreement" placement="top">
                <UploadOutlinedIcon
                  onClick={() => setOpenPublishDataAgreementModal(true)}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="View Data Agreement" placement="top">
                <RemoveRedEyeOutlinedIcon
                  onClick={() => {
                    setOpenDataAgreementModal(true);
                    setDataAgreementMode("Read");
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="Edit Data Agreement" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenDataAgreementModal(true);
                    setDataAgreementMode("Update");
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="Delete Data Agreement" placement="top">
                <DeleteOutlineOutlinedIcon
                  onClick={() => setOpenDeleteDataAgreementModal(true)}
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

      {/* Create, Update & Read Data agreement */}
        <DataAgreementModal
          open={openDataAgreementModal}
          setOpen={setOpenDataAgreementModal}
          mode={dataAgreementMode}
          successCallback={onDACreate}
        />

      <GlobalDataPolicyConfigModal
        open={openGlobalDataPolicyModal}
        setOpen={setOpenGlobalDataPolicyModal}
      />

      {/* DeleteDataAgreementModal */}
      <GeneralModal
        open={openDeleteDataAgreementModal}
        setOpen={setOpenDeleteDataAgreementModal}
        headerText={"Delete Data Agreement:"}
        dataExchange={"Issue Licence"}
        daId={"964018b7-f978-4a54-b2a9-c49375c35feb"}
        confirmText="DELETE"
        buttonName={"DELETE"}
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing data agreement. Please type{" "}
            <span style={{ fontWeight: "bold" }}>DELETE</span> to confirm and
            click DELETE. This action is not reversible.
          </Typography>
        }
      />

      {/* PublishDataAgreementModal */}
      <GeneralModal
        open={openPublishDataAgreementModal}
        setOpen={setOpenPublishDataAgreementModal}
        headerText={"Publish Data Agreement:"}
        dataExchange={"Issue Licence"}
        daId={"964018b7-f978-4a54-b2a9-c49375c35feb"}
        confirmText="PUBLISH"
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to publish a data agreement. Please type{" "}
            <span style={{ fontWeight: "bold" }}>PUBLISH</span> to confirm and
            click PUBLISH. This action is not reversible.
          </Typography>
        }
      />
    </Container>
  );
};

export default DataAgreement;
