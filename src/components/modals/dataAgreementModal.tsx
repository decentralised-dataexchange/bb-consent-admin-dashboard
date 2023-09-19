import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Form } from "react-admin";

import { Drawer, Typography, Button, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Banner from "../../assets/DummyBanner.jpeg";
import DataAgreementPersonalDataTable from "../dataAgreements/DataAgreementPersonalDataTable";
import DataAgreementPolicy from "../dataAgreements/DataAgreementPolicy";
import DPIAConfigurations from "../dataAgreements/DPIA Configuration";
import DataSchemaModal from "./dataSchemaModal";
import {
  Container,
  HeaderContainer,
  BannerContainer,
  DetailsContainer,
  FooterContainer,
  disabledButtonstyle,
} from "./modalStyle";

const inputStyle = {
  width: "100%",
  border: "1",
  outline: "none",
  fontSize: "16px",
  color: "#495057",
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#F7F6F6",
  borderBottom: "2px solid #DFE0E1",
};

const dropDownStyle = {
  border: "1px solid lightgray",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#ffff",
  height: "38px",
  width: "200px",
  borderRadius: "5px",
  cursor: "pointer",
};

const disabledDropDownStyle = {
  border: "1px solid lightgray",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#ffff",
  height: "38px",
  width: "200px",
  borderRadius: "5px",
  cursor: "not-allowed",
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText?: string;
  dataExchange?: string;
  mode: string;
  daId?: string;
}

export default function DataAgreementModal(props: Props) {
  const { open, setOpen, dataExchange, daId, mode } = props;
  const [dataExchangeModes, setDataExchangeModes] = useState([
    { mode: "Data Source" },
    { mode: "Data Using Service" },
  ]);
  const [openExistingSchemaModal, setOpenExistingSchemaModal] = useState(false);

  const [lawfullBasisOfProcessing, setLawfullBasisOfProcessing] = useState([
    { value: "Consent" },
    { value: "Contract" },
    { value: "Legal Obligation" },
    { value: "Contract" },
    { value: "Vital Interest" },
    { value: "Public Task" },
    { value: "Legitimate Interest" },
  ]);

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <Form>
            <HeaderContainer>
              <Box pl={2}>
                <Typography color="#F3F3F6">
                  {mode === "Create" && "Add Data Agreement"}
                  {mode === "Update" && "Edit Data Agreement: Issue Licence"}
                  {mode === "Read" && "View Data Agreement: Issue Licence"}
                </Typography>
                <Typography color="#F3F3F6">
                  {"964018b7-f978-4a54-b2a9-c49375c35feb"}
                </Typography>
              </Box>
              <CloseIcon
                onClick={() => setOpen(false)}
                sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
              />
            </HeaderContainer>
            <BannerContainer>
              <Box
                style={{ height: "200px", width: "100%" }}
                component="img"
                alt="Banner"
                src={Banner}
              />
            </BannerContainer>
            <Box sx={{ marginBottom: "60px" }}>
              <Avatar
                src=""
                style={{
                  position: "absolute",
                  marginLeft: 50,
                  marginTop: "-75px",
                  width: "130px",
                  height: "130px",
                  border: "solid white 6px",
                }}
              />
            </Box>
            <DetailsContainer>
              <Box p={1.5}>
                <Typography variant="h6" fontWeight="bold">
                  Organisation Name
                </Typography>
                <Typography variant="subtitle1" mt={3}>
                  Overview
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="#9F9F9F"
                  mt={1}
                  sx={{ wordWrap: "breakWord" }}
                >
                  For queries about how we are managing your data please contact
                  the Data Protection Officer, dpo@retail.com
                </Typography>

                <Box mt={2}>
                  <Typography mb={1.3} variant="subtitle1">
                    Usage Purpose
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <input
                    placeholder="E.g. Marketing and campaign (minimum 3 characters)"
                    type="text"
                    disabled={mode === "Read"}
                    style={{
                      ...inputStyle,
                      cursor: mode === "Read" ? "not-allowed" : "auto",
                    }}
                    name="usagePurpose"
                    // value={this.props.dataAgreementState.usagePurpose}
                    // onChange={this.handleChangeDADetails}
                    autoComplete="off"
                  />

                  <Typography mt={1.3} mb={1.3} variant="subtitle1">
                    Version
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <input
                    disabled={mode === "Read"}
                    style={{
                      ...inputStyle,
                      cursor: mode === "Read" ? "not-allowed" : "auto",
                    }}
                    placeholder="E.g. Marketing and campaign (minimum 3 characters)"
                    type="text"
                    name="usagePurpose"
                    value={"1.0.0"}
                    // onChange={this.handleChangeDADetails}
                    autoComplete="off"
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Typography variant="subtitle1">Data Exchange</Typography>
                    <select
                      disabled={mode === "Read"}
                      style={
                        mode === "Read" ? disabledDropDownStyle : dropDownStyle
                      }
                      name={"industryScope"}
                      // value={industryScope}
                      // onChange={handleChangeConfig}
                    >
                      {dataExchangeModes.map((mode, i) => {
                        return (
                          <option key={i} value={mode.mode}>
                            {mode.mode}
                          </option>
                        );
                      })}
                    </select>
                  </Box>
                  <Typography
                    onClick={()=> {mode !== 'Read' && setOpenExistingSchemaModal(true)}}
                    style={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      color: mode === "Read" ? "grey" : "blue",
                      marginTop: "-7px",
                      cursor: mode === "Read" ? "not-allowed" : "pointer",
                    }}
                  >
                    (Choose existing schemas)
                  </Typography>
                  <Typography mb={1.3} mt={1.3} variant="subtitle1">
                    Description
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <textarea
                    disabled={mode === "Read"}
                    placeholder="Brief description about the usage of data (3-500 characters)"
                    // type="text"
                    style={{
                      ...inputStyle,
                      cursor: mode === "Read" ? "not-allowed" : "auto",
                      height: "120px",
                      fontSize: "12px",
                    }}
                    name="usagePurposeDescription"
                    // value={this.props.dataAgreementState.usagePurposeDescription}
                    // onChange={this.handleChangeDADetails}
                    rows={5}
                    cols={25}
                    maxLength={500}
                  />

                  <Typography mb={1.3} mt={1.3} variant="subtitle1">
                    Lawful Basis Of Processing
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <select
                    disabled={mode === "Read"}
                    style={
                      mode === "Read"
                        ? {
                            ...disabledDropDownStyle,
                            width: "100%",
                            marginBottom: "15px",
                            height: "42px",
                          }
                        : {
                            ...dropDownStyle,
                            width: "100%",
                            marginBottom: "15px",
                            height: "42px",
                          }
                    }
                    // style={{ ...dropDownStyle, width: "100%", marginBottom: "15px", height: "42px" }}
                    name={"industryScope"}
                    // value={industryScope}
                    // onChange={handleChangeConfig}
                  >
                    {lawfullBasisOfProcessing.map((value, i) => {
                      return (
                        <option key={i} value={value.value}>
                          {value.value}
                        </option>
                      );
                    })}
                  </select>

                  <Typography variant="subtitle1">
                    Data Policy Configurations
                  </Typography>
                  <DataAgreementPolicy mode={mode} />

                  <Typography variant="subtitle1">
                    DPIA Configurations
                  </Typography>
                  <DPIAConfigurations mode={mode} />
                </Box>

                <DataAgreementPersonalDataTable mode={mode} />
              </Box>
            </DetailsContainer>
            <FooterContainer>
              <Button
                variant="outlined"
                sx={{ cursor: "not-allowed" }}
                style={disabledButtonstyle}
              >
                PUBLISH
              </Button>
              <Button
                variant="outlined"
                style={disabledButtonstyle}
                sx={{ cursor: "not-allowed", marginLeft: "10px" }}
              >
                SAVE
              </Button>
            </FooterContainer>
          </Form>
          <DataSchemaModal
            open={openExistingSchemaModal}
            setOpen={setOpenExistingSchemaModal}
            mode={mode}
          />
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
