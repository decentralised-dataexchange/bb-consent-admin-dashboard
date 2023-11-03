import {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
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
import { DataAgreementPayload } from "../dataAgreements/DataAgreementActions";
import { HttpService } from "../../service/HTTPService";
import { Purpose } from "../dataAgreements/Purpose";
import { Version } from "../dataAgreements/Version";
import { DataExchangeModeFormControl } from "../dataAgreements/DataExchangeMode";
import { PurposeDescription } from "../dataAgreements/PurposeDescription";
import { DataAgreementsCRUDProvider } from "../providers/dataAgreementsCRUDProvider";
import { LawfullBasisOfProcessingFormControll } from "../dataAgreements/LawfullBasisOfProcessing";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { useParams } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  successCallback?: any;
  resourceName?: string;
  dataAgrreementRevisionIdForSelectedRecord?: string | undefined;
  policyDetailsForInitialValue?: any;
}

let defaultValue = {
  Name: "",
  Description: "",
  Version: "1.0.0",
  AttributeType: "null",
  LawfulBasisOfProcessing: "consent",
  PolicyURL: "https://igrant.io/policy.html",
  Jurisdiction: "London, GB",
  IndustryScope: "Retail",
  StorageLocation: "Europe",
  dataRetentionPeriodDays: 0,
  Restriction: "Europe",
  Shared3PP: false,
  DpiaDate: new Date().toISOString().slice(0, 16),
  DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
  dataAttributes: [{ attributeName: "", attributeDescription: "" }],
};

export default function DataAgreementModal(props: Props) {
  const {
    open,
    setOpen,
    mode,
    successCallback,
    resourceName,
    dataAgrreementRevisionIdForSelectedRecord,
    policyDetailsForInitialValue,
  } = props;

  const params = useParams();
  const selectedDataAgreementId = params["*"];
  const [selectedDataAgreement, setSelectedDataAgreement] = useState<any>();
  const [dataAgreementIdForUserRecordes, setDataAgreementIdForUserRecordes] =
    useState("");
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

  useEffect(() => {
    if (selectedDataAgreementId && resourceName !== "userrecords") {
      HttpService.getDataAgreementByID(selectedDataAgreementId).then(
        (response) => {
          let dataAgreements = response.data.dataAgreement;
          let dataAttributes = response.data.dataAgreement.dataAttributes;
          setSelectedDataAgreement(dataAgreements);
          if (mode !== "Create") {
            methods.reset({
              Name: dataAgreements.purpose,
              Description: dataAgreements.purposeDescription,
              Version:
                dataAgreements.version === ""
                  ? "1.0.0"
                  : dataAgreements.version,
              AttributeType: dataAgreements.methodOfUse,
              LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
              PolicyURL: dataAgreements.policy.url,
              Jurisdiction: dataAgreements.policy.jurisdiction,
              IndustryScope: dataAgreements.policy.industrySector,
              StorageLocation: dataAgreements.policy.storageLocation,
              dataRetentionPeriodDays:
                dataAgreements.policy.dataRetentionPeriodDays,
              Restriction: dataAgreements.policy.geographicRestriction,
              Shared3PP: dataAgreements.policy.thirdPartyDataSharing,
              DpiaDate: dataAgreements.dpiaDate,
              DpiaSummaryURL: dataAgreements.dpiaSummaryUrl,
              dataAttributes: dataAttributes?.map((attribute: any) => {
                const { name, description, ...otherProps } = attribute;
                return {
                  attributeName: name,
                  attributeDescription: description,
                  ...otherProps,
                };
              }),
            });
          } else {
            methods.reset({
              Name: "",
              Description: "",
              Version: "1.0.0",
              AttributeType: "null",
              LawfulBasisOfProcessing: "consent",
              PolicyURL: policyDetailsForInitialValue?.url,
              Jurisdiction: policyDetailsForInitialValue?.jurisdiction,
              IndustryScope: policyDetailsForInitialValue?.industrySector,
              StorageLocation: policyDetailsForInitialValue?.storageLocation,
              dataRetentionPeriodDays:
                policyDetailsForInitialValue?.dataRetentionPeriodDays,
              Restriction: policyDetailsForInitialValue?.geographicRestriction,
              Shared3PP: policyDetailsForInitialValue?.thirdPartyDataSharing,
              DpiaDate: new Date().toISOString().slice(0, 16),
              DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
              dataAttributes: [{ attributeName: "", attributeDescription: "" }],
            });
          }
        }
      );
    }
  }, [selectedDataAgreementId, open]);

  // This is useEffect is called when resource is user records
  useEffect(() => {
    if (
      dataAgrreementRevisionIdForSelectedRecord &&
      resourceName === "userrecords"
    ) {
      HttpService.listDataAgreements(
        0,
        10,
        "",
        dataAgrreementRevisionIdForSelectedRecord
      ).then((response) => {
        let dataAgreements = response.dataAgreements[0];
        let dataAttributes = response.dataAgreements[0].dataAttributes;
        setDataAgreementIdForUserRecordes(dataAgreements.id);
        setSelectedDataAgreement(dataAgreements);
        methods.reset({
          Name: dataAgreements.purpose,
          Description: dataAgreements.purposeDescription,
          Version: dataAgreements.version,
          AttributeType: dataAgreements.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
          PolicyURL: dataAgreements.policy.url,
          Jurisdiction: dataAgreements.policy.jurisdiction,
          IndustryScope: dataAgreements.policy.industrySector,
          StorageLocation: dataAgreements.policy.storageLocation,
          dataRetentionPeriodDays: dataAgreements.policy.dataRetentionPeriod,
          Restriction: dataAgreements.policy.geographicRestriction,
          Shared3PP: dataAgreements.policy.thirdPartyDataSharing,
          DpiaDate: dataAgreements.dpiaDate,
          DpiaSummaryURL: dataAgreements.dpiaSummaryUrl,
          dataAttributes: dataAttributes.map((attribute: any) => {
            const { name, description, ...otherProps } = attribute;
            return {
              attributeName: name,
              attributeDescription: description,
              ...otherProps,
            };
          }),
        });
      });
    }
  }, [dataAgrreementRevisionIdForSelectedRecord, open]);

  const [active, setActive] = useState(false);
  const [lifecycle, setLifecycle] = useState("draft");

  const [openExistingSchemaModal, setOpenExistingSchemaModal] = useState(false);

  const { organisationDetails, logoImageBase64, coverImageBase64 }: any =
    useContext(OrganizationDetailsCRUDContext);

  const onSubmit = (createdData: any) => {
    if (mode === "Create") {
      HttpService.addDataAgreements(
        DataAgreementPayload(createdData, active, lifecycle, mode)
      ).then((response) => {
        successCallback();
        methods.reset({ ...defaultValue });
        setOpen(false);
      });
    } else if (mode === "Update") {
      HttpService.updateDataAgreementById(
        DataAgreementPayload(
          createdData,
          active,
          lifecycle,
          mode,
          selectedDataAgreement
        ),
        selectedDataAgreementId
      ).then((response) => {
        successCallback();
        methods.reset({ ...defaultValue });
        setOpen(false);
      });
    } else return {};
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
                        `Edit Data Agreement:  ${selectedDataAgreement?.purpose}`}
                      {mode === "Read" &&
                        `View Data Agreement: ${selectedDataAgreement?.purpose}`}
                    </Typography>
                    {mode !== "Create" && (
                      <Typography color="#F3F3F6">
                        {resourceName === "userrecords"
                          ? dataAgreementIdForUserRecordes
                          : selectedDataAgreementId}
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
                        <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>
                          *
                        </span>
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
                      cursor:
                        methods.formState.isValid && mode !== "Read"
                          ? "pointer"
                          : "not-allowed",
                      color:
                        methods.formState.isValid && mode !== "Read"
                          ? "black"
                          : "#6D7676",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    style={
                      methods.formState.isValid && mode !== "Read"
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
                      methods.formState.isValid && mode !== "Read"
                        ? buttonStyle
                        : disabledButtonstyle
                    }
                    sx={{
                      cursor:
                        methods.formState.isValid && mode !== "Read"
                          ? "pointer"
                          : "not-allowed",
                      color:
                        methods.formState.isValid && mode !== "Read"
                          ? "black"
                          : "#6D7676",
                      marginLeft: "10px",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
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
