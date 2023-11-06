import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  Form,
  useRefresh,
  useRecordContext,
} from "react-admin";

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
import { HttpService } from "../../service/HTTPService";
import {
  getMethodOfUse,
  getLawfulBasisOfProcessing,
  getPublishValues,
} from "../../interfaces/DataAgreement";

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
  width: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
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
  const [
    selectededDataAgreementFromDataAgreement,
    setSelectededDataAgreementFromDataAgreement,
  ] = useState<any>();

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

  const ColoredField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return record.active === true ? (
      <TextField {...props} sx={{ color: "black" }} />
    ) : (
      <TextField {...props} sx={{ color: "#FF0C10" }} />
    );
  };

  const DataExchangeField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{ color: record.active === true ? "black" : "#FF0C10" }}
      >
        {getMethodOfUse(record[props.source])}
      </Typography>
    );
  };

  const PublishStatusField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{ color: record.active === true ? "black" : "#FF0C10" }}
      >
        {getPublishValues(record[props.source])}
      </Typography>
    );
  };

  const LawfulBasisField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{ color: record.active === true ? "black" : "#FF0C10" }}
      >
        {getLawfulBasisOfProcessing(record[props.source])}
      </Typography>
    );
  };

  const IconsFIeld = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box display={"flex"} justifyContent={"space-around"}>
          <Tooltip
            title={
              record.active === true
                ? "Data Agreement Is Published"
                : "Publish Data Agreement"
            }
            placement="top"
          >
            <UploadOutlinedIcon
              onClick={() =>{
                record.active === false &&
                setOpenPublishDataAgreementModal(true);
                setSelectededDataAgreementFromDataAgreement(record)
              }}
              fontSize="small"
              style={{
                cursor: record.active === true ? "not-allowed" : "pointer",
                color: record.active === true ? "#B9B9B9" : "#FF0C10",
              }}
            />
          </Tooltip>
          <Tooltip title="View Data Agreement" placement="top">
            <RemoveRedEyeOutlinedIcon
              onClick={() => {
                setOpenDataAgreementModal(true);
                setDataAgreementMode("Read");
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor: "pointer",
                color: record.active === true ? "#B9B9B9" : "#FF0C10",
              }}
            />
          </Tooltip>
          <Tooltip title="Edit Data Agreement" placement="top">
            <EditOutlinedIcon
              onClick={() => {
                setOpenDataAgreementModal(true);
                setDataAgreementMode("Update");
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor: "pointer",
                color: record.active === true ? "#B9B9B9" : "#FF0C10",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Data Agreement" placement="top">
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                setOpenDeleteDataAgreementModal(true);
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor: "pointer",
                color: record.active === true ? "#B9B9B9" : "#FF0C10",
              }}
            />
          </Tooltip>
        </Box>
      )
    );
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
                  control={<Radio color="default" size="small" />}
                  label={<Typography variant="body2">All</Typography>}
                  onClick={handleChange}
                />
                <FormControlLabel
                  value="complete"
                  name="complete"
                  control={<Radio color="default" size="small" />}
                  label={<Typography variant="body2">Published</Typography>}
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
            bulkActionButtons={false}
            sx={{
              overflow: "auto",
              width: "100%",
            }}
          >
            <ColoredField
              source="purpose"
              label={"Usage Purpose"}
              sortable={false}
            />
            <ColoredField source="version" label={"Version"} sortable={false} />
            <DataExchangeField
              source="methodOfUse"
              label={"Data Exchange"}
              sortable={false}
            />
            <PublishStatusField
              source="lifecycle"
              label={"Status"}
              sortable={false}
            />
            <LawfulBasisField
              source="lawfulBasis"
              label={"Lawful Basis Of Processing"}
              sortable={false}
            />
            <IconsFIeld source="purpose" label={""} sortable={false} />
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
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
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
        resourceName="dataagreements"
        onRefetch={onRefetch}
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
        modalDescriptionText={
          <Typography sx={{ wordWrap: "breakWord" }}>
            You are about to delete an existing data agreement and ALL its
            revisions. Please type{" "}
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
        resourceName="dataagreements"
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
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
