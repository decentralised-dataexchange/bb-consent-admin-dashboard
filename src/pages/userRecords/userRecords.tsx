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
  width: "100%",
});

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 30px 10px 30px",
  marginTop: "13px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  color: "#0000",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const UserRecords = () => {
  const [openDataAgreementModal, setOpenDataAgreementModal] = useState(false);

  return (
    <Container>
      <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
        <Form>
          <BreadCrumb Link="Manage Users  /  User Records" />
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
                <FormControlLabel
                  value="viewall"
                  control={<Radio color="default" />}
                  label="View All"
                  sx={{ color: "black" }}
                />
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:"center"
                }}>
                  <FormControlLabel
                    value="filter1"
                    control={<Radio color="default" />}
                    label=""
                  />
                  <Dropdown displayValue={"Filter by Purpose"} />
                </Box>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:"center"
                }}>                  <FormControlLabel
                    value="filter2"
                    control={<Radio color="default" />}
                    label=""
                  />
                  <Dropdown displayValue={"Filter by Lawful Basis"} />
                </Box>
              </RadioGroup>
            </FormControl>
          </Item>
        </Form>
        <Box mt={1.5}>
          <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" }}>
            <TextField source="subscriberID" label={"Subscriber ID"} />
            <TextField source="dataAgreement" label={"Data Agreement "} />
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
