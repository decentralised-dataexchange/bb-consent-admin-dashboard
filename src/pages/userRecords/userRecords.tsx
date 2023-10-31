import { useEffect, useState } from "react";
import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

import {
  Box,
  Typography,
  Tooltip,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import DataAgreementModal from "../../components/modals/dataAgreementModal";
import { HttpService } from "../../service/HTTPService";
import { useParams } from "react-router-dom";
import { useFilterStore } from "../../store/store";
import FilterByPurposeDropdown from "../../components/dropdowns/filterByPurposeDropDown";
import FilterByLawfulBasisDropdown from "../../components/dropdowns/filterByLawfulBasisDropDown";
import { SearchByIdRecordsAutoselect } from "../../components/dropdowns/searchByIdRecordsAutoselect";

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
  width: "100%",
});

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 30px 10px 30px",
  marginTop: "16px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  color: "#0000",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
  [theme.breakpoints.down("sm")]: {
    display: "grid",
  },
}));

const UserRecords = () => {
  const [openDataAgreementModal, setOpenDataAgreementModal] = useState(false);
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);
  const [handleFilterDropDownTriggered, setHandleFilterDropDownTriggered] =
    useState(false);
  const [handleSearchTriggered, sethandleSearchTriggered] = useState(false);

  const lawfullBasisOfProcessingDropdownvalues = [
    { label: "Consent", value: "consent" },
    { label: "Legal Obligation", value: "legal_obligation" },
    { label: "Contract", value: "contract" },
    { label: "Vital Interest", value: "vital_interest" },
    { label: "Public Task", value: "public_task" },
    { label: "Legitimate Interest", value: "legitimate_interest" },
  ];

  const params = useParams();
  const selectedDataRecordId = params["*"];
  const [
    dataAgreementIdForSelectedRecord,
    setDataAgreementIdForSelectedRecord,
  ] = useState<string | undefined>();

  useEffect(() => {
    if (selectedDataRecordId && openDataAgreementModal === true) {
      HttpService.getDataAgreementRecordByID(selectedDataRecordId).then(
        (res) => {
          setDataAgreementIdForSelectedRecord(
            res.data.dataAgreementRecord.dataAgreementId
          );
        }
      );
    }
  }, [selectedDataRecordId, openDataAgreementModal === true]);

  const refresh = useRefresh();

  const changefilter = (filterDataAgreement: any) => {
    useFilterStore.getState().updateFilterUserRecords(filterDataAgreement);
  };

  const updateDisabledPurposeDropDown = (disabledPurposeDropDown: any) => {
    useFilterStore
      .getState()
      .updateDisabledPurposeDropDown(disabledPurposeDropDown);
  };

  const updateDisabledLawfulBasisDropDown = (
    disabledLawfulBasisDropDown: any
  ) => {
    useFilterStore
      .getState()
      .updateDisabledLawfulBasisDropDown(disabledLawfulBasisDropDown);
  };

  useEffect(() => {
    refresh();
  }, [
    handleChangeTriggered,
    handleFilterDropDownTriggered,
    handleSearchTriggered,
  ]);

  const handleChange = (e: any) => {
    setHandleChangeTriggered(!handleChangeTriggered);
    const { name } = e.target;

    if (name === "dataAgreementId") {
      updateDisabledPurposeDropDown(false);
      updateDisabledLawfulBasisDropDown(true);
    } else if (name === "lawfulBasis") {
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(false);
    } else if (name === "all") {
      changefilter({
        filterType: "all",
        value: "all",
      });
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(true);
    } else {
      changefilter({
        filterType: "all",
        value: "all",
      });
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(true);
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
          <BreadCrumb Link="Manage Users" Link2="Consent Records" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              Consent Records
            </Typography>
          </HeaderContainer>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2">
              Do queries on the consent records for audit purpose
            </Typography>
            <SearchByIdRecordsAutoselect
              changefilter={changefilter}
              handleSearchTriggered={handleSearchTriggered}
              sethandleSearchTriggered={sethandleSearchTriggered}
            />
          </Box>
          <Item>
            <Typography color="grey" variant="body2">
              Filter query
            </Typography>
            <FormControl
              sx={{
                width: "70%",
              }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="all"
                defaultValue="all"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="all"
                    name="all"
                    onClick={handleChange}
                    control={<Radio color="default" size="small" />}
                    label=""
                    sx={{ color: "black" }}
                  />
                  <Typography sx={{ color: "black" }} variant="body2">View All</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="dataAgreementId"
                    name="dataAgreementId"
                    control={<Radio color="default" size="small" />}
                    label=""
                    onClick={handleChange}
                  />
                  <FilterByPurposeDropdown
                    displayValue={"Filter by Purpose"}
                    changefilter={changefilter}
                    setHandleFilterDropDownTriggered={
                      setHandleFilterDropDownTriggered
                    }
                    handleFilterDropDownTriggered={
                      handleFilterDropDownTriggered
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <FormControlLabel
                    name={"lawfulBasis"}
                    value="lawfulBasis"
                    onClick={handleChange}
                    control={<Radio color="default" size="small" />}
                    label=""
                  />
                  <FilterByLawfulBasisDropdown
                    displayValue={"Filter by Lawful Basis"}
                    dropdownValues={lawfullBasisOfProcessingDropdownvalues}
                    changefilter={changefilter}
                    setHandleFilterDropDownTriggered={
                      setHandleFilterDropDownTriggered
                    }
                    handleFilterDropDownTriggered={
                      handleFilterDropDownTriggered
                    }
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Item>
        </Form>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "18px",
          }}
        >
          <Datagrid
            rowClick="edit"
            bulkActionButtons={false}
            sx={{
              overflow: "auto",
              width: "100%"
            }}
          >
            <TextField source="id" label={"Consent Record ID"} />
            <TextField source="individualId" label={"Individual ID"} />
            <TextField source="dataAgreement.purpose" label={"Purpose"} />
            <TextField
              source="dataAgreement.lawfulBasis"
              label={"Lawful Basis"}
            />
            <TextField source="optIn" label={"Agreement Event"} />
            <TextField source="timestamp" label={"Timestamp"} />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Tooltip title="View Data Agreement" placement="top">
                <RemoveRedEyeOutlinedIcon
                  onClick={() => setOpenDataAgreementModal(true)}
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

      {/* Read Data agreement */}
      <DataAgreementModal
        open={openDataAgreementModal}
        setOpen={setOpenDataAgreementModal}
        mode={"Read"}
        resourceName="userrecords"
        dataAgreementIdForSelectedRecord={dataAgreementIdForSelectedRecord}
      />
    </Container>
  );
};

export default UserRecords;
