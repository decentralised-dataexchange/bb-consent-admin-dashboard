import { useState, Dispatch, SetStateAction, useContext } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import { Drawer, Typography, Button, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DefaultBanner from "../../assets/OrganisationDefaultBanner.jpg";
import DefaultLogo from "../../assets/OrganisationDefaultLogo.png";

import DataAgreementPersonalDataTable from "../dataAgreements/DataAgreementPersonalDataTable";
import DataAgreementPolicy from "../dataAgreements/DataAgreementPolicy";
import DPIAConfigurations from "../dataAgreements/DPIAConfiguration";
import DataSchemaModal from "./dataSchemaModal";
import {
  Container,
  HeaderContainer,
  BannerContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import {
  AddDataAttributesPayload,
  DataAgreementPayload,
  UpdateDataAttributesPayload,
} from "../dataAgreements/DataAgreementActions";
import { HttpService } from "../../service/HTTPService";
import { Purpose } from "../dataAgreements/Purpose";
import { Version } from "../dataAgreements/Version";
import { DataExchangeModeFormControl } from "../dataAgreements/DataExchangeMode";
import { PurposeDescription } from "../dataAgreements/PurposeDescription";
import { DataAgreementsCRUDProvider } from "../providers/dataAgreementsCRUDProvider";
import { LawfullBasisOfProcessingFormControll } from "../dataAgreements/LawfullBasisOfProcessing";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  successCallback?: any;
}
const defaultValue = {
  Name: "",
  Description: "",
  Version: "1.0.0",
  AttributeType: "null",
  LawfulBasisOfProcessing: "consent",
  PolicyURL: "https://igrant.io/policy.html",
  Jurisdiction: "London, GB",
  IndustryScope: "Retail",
  StorageLocation: "Europe",
  DataRetentionPeriod: 0,
  Restriction: "Europe",
  Shared3PP: false,
  DpiaDate: new Date().toISOString().slice(0, 16),
  DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
  dataAttributes: [{ attributeName: "", attributeDescription: "" }],
};

export default function DataAgreementModal(props: Props) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      ...defaultValue,
    },
  });

  const { control } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "dataAttributes",
  });

  const { open, setOpen, mode, successCallback } = props;
  const [active, setActive] = useState(false);
  const [lifecycle, setLifecycle] = useState("draft");

  const [openExistingSchemaModal, setOpenExistingSchemaModal] = useState(false);

  const { organisationDetails, logoImageBase64, coverImageBase64 }: any =
    useContext(OrganizationDetailsCRUDContext);

  const onSubmit = (createdData: any) => {
    HttpService.addDataAgreements(
      DataAgreementPayload(createdData, active, lifecycle)
    ).then((response) => {
      let responsePurpose = {
        id: response.data.dataAgreement.id,
        purpose: response.data.dataAgreement.purpose,
      };

      let UpdateDataAttributesValues = createdData?.dataAttributes?.filter(
        (value: any) => value.id !== undefined
      );
      let AddDataAttributesValues = createdData?.dataAttributes.filter(
        (value: any) => value.id === undefined
      );

      AddDataAttributesValues.length !== 0 &&
        AddDataAttributesValues.map((AddDataAttributes: any) => {
          HttpService.addDataAttributes(
            AddDataAttributesPayload(AddDataAttributes, responsePurpose)
          ).then((response) => {});
        });

      UpdateDataAttributesValues.length !== 0 &&
        UpdateDataAttributesValues.map((UpdateDataAttribute: any) => {
          HttpService.updateDataAttributes(
            UpdateDataAttributesPayload(UpdateDataAttribute, responsePurpose),
            UpdateDataAttribute.id
          ).then((response) => {});
        });
      successCallback();
      methods.reset({ ...defaultValue });
      setOpen(false);
    });
  };

  return (
    <>
      <Drawer anchor="right" open={open}>
        <DataAgreementsCRUDProvider>
          <Container>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <HeaderContainer>
                  <Box pl={2}>
                    <Typography color="#F3F3F6">
                      {mode === "Create" && "Add Data Agreement"}
                      {mode === "Update" &&
                        "Edit Data Agreement: Issue Licence"}
                      {mode === "Read" && "View Data Agreement: Issue Licence"}
                    </Typography>
                    {mode !== "Create" && (
                      <Typography color="#F3F3F6">
                        {"964018b7-f978-4a54-b2a9-c49375c35feb"}
                      </Typography>
                    )}
                  </Box>
                  <CloseIcon
                    onClick={() => {
                      setOpen(false);
                      methods.reset({ ...defaultValue });
                    }}
                    sx={{
                      paddingRight: 2,
                      cursor: "pointer",
                      color: "#F3F3F6",
                    }}
                  />
                </HeaderContainer>
                <BannerContainer>
                  <Box
                    style={{ height: "200px", width: "100%" }}
                    component="img"
                    alt="Banner"
                    src={
                      coverImageBase64
                        ? `data:image/jpeg;charset=utf-8;base64,${coverImageBase64}`
                        : DefaultBanner
                    }
                  />
                </BannerContainer>
                <Box sx={{ marginBottom: "60px" }}>
                  <Avatar
                    src={
                      logoImageBase64
                        ? `data:image/jpeg;charset=utf-8;base64,${logoImageBase64}`
                        : DefaultLogo
                    }
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
                      {organisationDetails.Name}
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
                      {organisationDetails.Description}
                    </Typography>

                    <Box mt={2}>
                      <Purpose open={props.open} mode={props.mode} />

                      <Version />

                      <DataExchangeModeFormControl
                        open={props.open}
                        mode={props.mode}
                      />

                      <Typography
                        style={{
                          fontSize: "14px",
                          textDecoration: "underline",
                          color: "grey",
                          marginTop: "-7px",
                          cursor: "not-allowed",
                        }}
                      >
                        (Choose existing schemas)
                      </Typography>

                      <PurposeDescription open={props.open} mode={props.mode} />

                      <LawfullBasisOfProcessingFormControll
                        open={props.open}
                        mode={props.mode}
                      />

                      <Typography variant="subtitle1">
                        Data Policy Configurations
                      </Typography>
                      <DataAgreementPolicy mode={mode} />

                      <Typography variant="subtitle1">
                        DPIA Configurations
                      </Typography>
                      <DPIAConfigurations mode={mode} />
                    </Box>

                    <DataAgreementPersonalDataTable
                      mode={mode}
                      append={append}
                      fields={fields}
                      remove={remove}
                      formController={control}
                    />
                  </Box>
                </DetailsContainer>
                <FooterContainer>
                  <Button
                    variant="outlined"
                    sx={{
                      cursor: methods.formState.isValid
                        ? "pointer"
                        : "not-allowed",
                    }}
                    style={
                      methods.formState.isValid
                        ? buttonStyle
                        : disabledButtonstyle
                    }
                    type="submit"
                    onClick={() => {
                      setActive(true);
                      setLifecycle("complete");
                    }}
                  >
                    PUBLISH
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    style={
                      methods.formState.isValid
                        ? buttonStyle
                        : disabledButtonstyle
                    }
                    sx={{
                      cursor: methods.formState.isValid
                        ? "pointer"
                        : "not-allowed",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      setActive(false);
                      setLifecycle("draft");
                    }}
                  >
                    SAVE
                  </Button>
                </FooterContainer>
              </form>
            </FormProvider>

            <DataSchemaModal
              open={openExistingSchemaModal}
              setOpen={setOpenExistingSchemaModal}
              mode={mode}
            />
          </Container>
        </DataAgreementsCRUDProvider>
      </Drawer>
    </>
  );
}
