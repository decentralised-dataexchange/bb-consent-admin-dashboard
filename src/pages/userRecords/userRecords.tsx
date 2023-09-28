import { useState } from "react";
import { List, Datagrid, TextField, Form, TextInput } from "react-admin";

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
import Dropdown from "../../components/dropdowns/dropdown";

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

  const lawfullBasisOfProcessingDropdownvalues = [
    { value: "Consent" },
    { value: "Contract" },
    { value: "Legal Obligation" },
    { value: "Contract" },
    { value: "Vital Interest" },
    { value: "Public Task" },
    { value: "Legitimate Interest" },
  ]

  const purposeDropdownvalues = [
    { value: "Market and Campaign	" },
    { value: "Campaign" },
    { value: "Market and Campaign	" },
  ]


  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
        <Form>
          <BreadCrumb Link="Manage Users" Link2="User Records" />
          <HeaderContainer>
            <Typography variant="h6" fontWeight="bold">
              User Records
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
            <Typography variant="body1">
              Do queries on the data agreement records for audit purpose
            </Typography>
            <TextInput
              source="overview"
              autoFocus
              variant="outlined"
              label={false}
              placeholder="Search by Data Agreement ID, Data Agreement Record ID or Subscriber ID"
              helperText={false}
              style={{ width: "40%" }}
            />
          </Box>
          <Item>
            <Typography color="grey" variant="subtitle1">
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
                name="row-radio-buttons-group"
                defaultValue="viewall"
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
                    value="viewall"
                    control={<Radio color="default" />}
                    label=""
                    sx={{ color: "black" }}
                  />
                  <Typography sx={{ color: "black" }}>View All</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="filter1"
                    control={<Radio color="default" />}
                    label=""
                  />
                  <Dropdown displayValue={"Filter by Purpose"} dropdownValues={purposeDropdownvalues} />
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
                    value="filter2"
                    control={<Radio color="default" />}
                    label=""
                  />
                  <Dropdown displayValue={"Filter by Lawful Basis"} dropdownValues={lawfullBasisOfProcessingDropdownvalues}/>
                </Box>
              </RadioGroup>
            </FormControl>
          </Item>
        </Form>
        <Box style={{ display: "flex", justifyContent:"center", marginTop:"18px"}}>
          <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" , width:{xs:"359px",sm:"100%",md:"100%", lg:"100%"}}} >
            <TextField source="subscriberID" label={"Subscriber ID"} />
            <TextField source="purpose" label={"Purpose"} />
            <TextField source="lawfulBasis" label={"Lawful Basis"} />
            <TextField source="agreementEvent" label={"Agreement Event"} />
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
      />
    </Container>
  );
};

export default UserRecords;
