import { useEffect, useState } from "react";
import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

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
import DeleteModal from "../../components/modals/generalModal";
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

const buttonStyle = {
  height: 35,
  borderRadius: 1,
  border: "1px solid #DFDFDF",
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
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);

  const refresh = useRefresh();
  const onRefetch = () => {
    refresh();
  };

  const changefilterDataAgreement = (filterDataAgreement: string) => {
    useFilterStore.getState().updateFilterDataAgreement(filterDataAgreement);
  };

  useEffect(() => {
    refresh();
  }, [handleChangeTriggered]);

  const handleChange = (e: any) => {
    setHandleChangeTriggered(!handleChangeTriggered);
    const { name } = e.target;

    if (name === "complete") {
      changefilterDataAgreement("complete");
    } else if (name === "all") {
      changefilterDataAgreement("all");
    } else {
      changefilterDataAgreement("all");
    }
  };

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
                defaultValue="all"
                name="all"
                row
              >
                <FormControlLabel
                  value="all"
                  name="all"
                  control={<Radio color="default" />}
                  label="All"
                  onClick={handleChange}
                />
                <FormControlLabel
                  value="complete"
                  name="complete"
                  control={<Radio color="default" />}
                  label="Published"
                  onClick={handleChange}
                />
              </RadioGroup>
            </Box>
            <Box>
              <Button
                style={buttonStyle}
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                }}
                onClick={() => setOpenGlobalDataPolicyModal(true)}
              >
                GLOBAL DATA POLICY
              </Button>
            </Box>
          </Box>
        </HeaderContainer>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
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
            rowClick={"edit"}
            bulkActionButtons={false}
            sx={{
              overflow: "auto",
              width: { xs: "359px", sm: "100%", md: "100%", lg: "100%" },
            }}
          >
            <TextField source="purpose" label={"Usage Purpose"} />
            <TextField source="version" label={"Version"} />
            <TextField source="methodOfUse" label={"Data Exchange"} />
            <TextField source="lifecycle" label={"Status"} />
            <TextField
              source="lawfulBasis"
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
        successCallback={onRefetch}
      />

      <GlobalDataPolicyConfigModal
        open={openGlobalDataPolicyModal}
        setOpen={setOpenGlobalDataPolicyModal}
      />

      {/* DeleteDataAgreementModal */}
      <DeleteModal
        open={openDeleteDataAgreementModal}
        setOpen={setOpenDeleteDataAgreementModal}
        headerText={"Delete Data Agreement:"}
        confirmText="DELETE"
        onRefetch={onRefetch}
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
        confirmText="PUBLISH"
        onRefetch={onRefetch}
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
