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
  FormControl,
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
import {
  getMethodOfUse,
  getLawfulBasisOfProcessing,
  getPublishValues,
} from "../../interfaces/DataAgreement";
import VersionDropdown from "../../components/dataAgreements/versionDropdown";

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
  const [
    selectededDataAgreementFromDataAgreement,
    setSelectededDataAgreementFromDataAgreement,
  ] = useState<any>();
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);
  const [selectedDropdownValue, setSelectedDorpdownValue] = useState({});
  const [listFilterValue, setListFilterValue] = useState("all");
  const refresh = useRefresh();
  const onRefetch = () => {
    refresh();
  };

  const changefilterDataAgreement = (filterDataAgreement: string) => {
    useFilterStore.getState().updateFilterDataAgreement(filterDataAgreement);
  };

  const filter = useFilterStore.getState().filterDataAgreement;


  const handleChange = (value: any) => {
    if (value === "complete") {
      changefilterDataAgreement("complete");
      setListFilterValue("complete");
    } else if (value === "all") {
      changefilterDataAgreement("all");
      setListFilterValue("all");
    }
    setHandleChangeTriggered(!handleChangeTriggered);
  };

  useEffect(() => {
      setSelectedDorpdownValue({});
  }, [handleChangeTriggered]);

  const ColoredField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return record.active === false && filter !== "complete" ? (
      <TextField {...props} sx={{ color: "#FF0C10" }} />
    ) : (
      <TextField {...props} sx={{ color: "black" }} />
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
        sx={{
          color:
            record.active === false && filter !== "complete"
              ? "#FF0C10"
              : "black",
        }}
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
        sx={{
          color:
            record.active === false && filter !== "complete"
              ? "#FF0C10"
              : "black",
        }}
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
        sx={{
          color:
            record.active === false && filter !== "complete"
              ? "#FF0C10"
              : "black",
        }}
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
              onClick={() => {
                record.active === false &&
                  (record?.selectedRevision === undefined ||
                    (record?.selectedRevision &&
                      record?.selectedRevision.version === record.version)) &&
                  setOpenPublishDataAgreementModal(true);
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record.active === true ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version !== record.version)
                    ? "not-allowed"
                    : "pointer",
                color: record.active === false && filter !== "complete"
                ? "#FF0C10"
                : "#B9B9B9",
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
                color: record.active === false && filter !== "complete"
                ? "#FF0C10"
                : "#B9B9B9",
              }}
            />
          </Tooltip>
          <Tooltip title="Edit Data Agreement" placement="top">
            <EditOutlinedIcon
              onClick={() => {
                (record?.selectedRevision === undefined ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version === record.version)) &&
                  setOpenDataAgreementModal(true);
                setDataAgreementMode("Update");
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record?.selectedRevision &&
                  record?.selectedRevision.version !== record.version
                    ? "not-allowed"
                    : "pointer",
                color: record.active === false && filter !== "complete"
                ? "#FF0C10"
                : "#B9B9B9",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Data Agreement" placement="top">
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                (record?.selectedRevision === undefined ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version === record.version)) &&
                  setOpenDeleteDataAgreementModal(true),
                  setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record?.selectedRevision &&
                  record?.selectedRevision.version !== record.version
                    ? "not-allowed"
                    : "pointer",
                color: record.active === false && filter !== "complete"
                ? "#FF0C10"
                : "#B9B9B9",
              }}
            />
          </Tooltip>
        </Box>
      )
    );
  };

  const VersionField = (props: any) => {
    const record = useRecordContext(props);

    if (!record || !props.source) {
      return null;
    }

    return (
      <VersionDropdown
        record={record}
        setSelectedValue={setSelectedDorpdownValue}
        selectedValue={selectedDropdownValue}
        key={record.id}
      />
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
                  setSelectededDataAgreementFromDataAgreement({});
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
                  control={<Radio name="all" color="default" size="small" />}
                  label={<Typography variant="body2">All</Typography>}
                />
                <FormControlLabel
                  value="complete"
                  onChange={() => handleChange("complete")}
                  control={
                    <Radio name="complete" color="default" size="small" />
                  }
                  label={<Typography variant="body2">Published</Typography>}
                />
              </RadioGroup>
            </FormControl>
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
        filter={{ status: listFilterValue }}
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
              width: "100%",
            }}
          >
            <ColoredField
              source="purpose"
              label={"Usage Purpose"}
              sortable={false}
            />
            <VersionField source="id" label={"Version"} sortable={false} />
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
