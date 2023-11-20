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
import { LawfullBasisOfProcessingFormControll } from "../dataAgreements/LawfullBasisOfProcessing";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  successCallback?: any;
  resourceName?: string;
  selectededDataAgreementFromDataAgreement?: any;
  dataAgrreementRevisionIdForSelectedRecord?: string | undefined;
  setSelectedDropdownValue?: any;
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
    selectededDataAgreementFromDataAgreement,
    dataAgrreementRevisionIdForSelectedRecord,
    setSelectedDropdownValue,
  } = props;

  const [selectedDataAgreement, setSelectedDataAgreement] = useState<any>();
  const [dataAgreementIdForUserRecordes, setDataAgreementIdForUserRecordes] =
    useState("");
  const [policyDetailsForInitialValue, setPolicyDetailsForInitialValue] =
    useState<any>();

  useEffect(() => {
    HttpService.listAllPolicies().then((response) => {
      setPolicyDetailsForInitialValue(response[0]);
    });
  }, [open]);

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
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    if (mode === "Create") {
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
        dataRetentionPeriodDays: Math.floor(
          policyDetailsForInitialValue?.dataRetentionPeriodDays / 365
        ),
        Restriction: policyDetailsForInitialValue?.geographicRestriction,
        Shared3PP: policyDetailsForInitialValue?.thirdPartyDataSharing,
        DpiaDate: new Date().toISOString().slice(0, 16),
        DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
        dataAttributes: [{ attributeName: "", attributeDescription: "" }],
      });
    }

    if (
      selectededDataAgreementFromDataAgreement &&
      resourceName !== "userrecords" &&
      mode !== "Create"
    ) {
      let dataAgreements = selectededDataAgreementFromDataAgreement;
      let dataAttributes =
        selectededDataAgreementFromDataAgreement.dataAttributes;

      setSelectedDataAgreement(dataAgreements);
      if (mode === "Update") {
        methods.reset({
          Name: dataAgreements.purpose,
          Description: dataAgreements.purposeDescription,
          Version:
            dataAgreements.version === "" ? "0.0.0" : dataAgreements.version,
          AttributeType: dataAgreements.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
          PolicyURL: dataAgreements.policy.url,
          Jurisdiction: dataAgreements.policy.jurisdiction,
          IndustryScope: dataAgreements.policy.industrySector,
          StorageLocation: dataAgreements.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.policy.dataRetentionPeriodDays / 365
          ),

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
      } else if (
        mode === "Read" &&
        dataAgreements.selectedRevision !== undefined &&
        dataAgreements?.selectedRevision?.version !== dataAgreements.version
      ) {
        methods.reset({
          Name: dataAgreements.selectedRevision.purpose,
          Description: dataAgreements.selectedRevision.purposeDescription,
          Version: dataAgreements.selectedRevision.version,
          AttributeType: dataAgreements.selectedRevision.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.selectedRevision.lawfulBasis,
          PolicyURL: dataAgreements.selectedRevision.policy.url,
          Jurisdiction: dataAgreements.selectedRevision.policy.jurisdiction,
          IndustryScope: dataAgreements.selectedRevision.policy.industrySector,
          StorageLocation:
            dataAgreements.selectedRevision.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.selectedRevision.policy.dataRetentionPeriodDays / 365
          ),

          Restriction:
            dataAgreements.selectedRevision.policy.geographicRestriction,
          Shared3PP:
            dataAgreements.selectedRevision.policy.thirdPartyDataSharing,
          DpiaDate: dataAgreements.selectedRevision.dpiaDate,
          DpiaSummaryURL: dataAgreements.selectedRevision.dpiaSummaryUrl,
          dataAttributes: dataAgreements.selectedRevision.dataAttributes?.map(
            (attribute: any) => {
              const { name, description, ...otherProps } = attribute;
              return {
                attributeName: name,
                attributeDescription: description,
                ...otherProps,
              };
            }
          ),
        });
      } else if (
        mode === "Read" &&
        (dataAgreements?.selectedRevision?.version === dataAgreements.version ||
          dataAgreements.selectedRevision === undefined)
      ) {
        methods.reset({
          Name: dataAgreements.purpose,
          Description: dataAgreements.purposeDescription,
          Version:
            dataAgreements.version === "" ? "0.0.0" : dataAgreements.version,
          AttributeType: dataAgreements.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
          PolicyURL: dataAgreements.policy.url,
          Jurisdiction: dataAgreements.policy.jurisdiction,
          IndustryScope: dataAgreements.policy.industrySector,
          StorageLocation: dataAgreements.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.policy.dataRetentionPeriodDays / 365
          ),

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
      }
    }
  }, [
    selectededDataAgreementFromDataAgreement,
    open,
    mode,
    policyDetailsForInitialValue,
  ]);

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
        dataAgrreementRevisionIdForSelectedRecord,
        ""
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
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.policy.dataRetentionPeriodDays / 365
          ),
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

  // To check the input field is change during update
  const isFormDataChanged = () => {
    const dirtyFields = methods.formState.dirtyFields;
    return Object.keys(dirtyFields).length > 0;
  };

  const [openExistingSchemaModal, setOpenExistingSchemaModal] = useState(false);

  const { organisationDetails, logoImageBase64, coverImageBase64 }: any =
    useContext(OrganizationDetailsCRUDContext);

  const onPublish = (createdData: any) => {
    let active = true;
    let lifecycle = "complete";

    if (mode === "Create") {
      HttpService.addDataAgreements(
        DataAgreementPayload(createdData, active, lifecycle, mode)
      ).then(() => {
        successCallback();
        methods.reset({ ...defaultValue });
        setSelectedDropdownValue({});
        setOpen(false);
      });
    } else if (
      mode === "Update" &&
      (selectedDataAgreement && selectedDataAgreement.lifecycle === "draft"
        ? selectedDataAgreement.lifecycle === "draft"
        : isFormDataChanged())
    ) {
      HttpService.updateDataAgreementById(
        DataAgreementPayload(
          createdData,
          active,
          lifecycle,
          mode,
          selectedDataAgreement
        ),
        selectedDataAgreement?.id
      ).then((response) => {
        successCallback();
        setSelectedDropdownValue({});
        methods.reset({ ...defaultValue });
        setOpen(false);
      });
    } else return {};
  };

  const onSave = (createdData: any) => {
    let active = false;
    let lifecycle = "draft";

    if (mode === "Create") {
      HttpService.addDataAgreements(
        DataAgreementPayload(createdData, active, lifecycle, mode)
      ).then(() => {
        successCallback();
        methods.reset({ ...defaultValue });
        setSelectedDropdownValue({});
        setOpen(false);
      });
    } else if (mode === "Update" && isFormDataChanged()) {
      HttpService.updateDataAgreementById(
        DataAgreementPayload(
          createdData,
          active,
          lifecycle,
          mode,
          selectedDataAgreement
        ),
        selectedDataAgreement?.id
      ).then((response) => {
        successCallback();
        setSelectedDropdownValue({});
        methods.reset({ ...defaultValue });
        setOpen(false);
      });
    } else return {};
  };

  return (
    <>
      <Drawer anchor="right" open={open}>
        <Container>
          <FormProvider {...methods}>
            <form>
              <HeaderContainer>
                <Box pl={2}>
                  <Typography color="#F3F3F6">
                    {mode === "Create" && "Add Data Agreement"}
                    {mode === "Update" &&
                      `Edit Data Agreement:  ${selectedDataAgreement?.purpose}`}
                    {mode === "Read" &&
                      `View Data Agreement: ${
                        selectedDataAgreement?.selectedRevision?.purpose ||
                        selectedDataAgreement?.purpose
                      }`}
                  </Typography>
                  {mode !== "Create" && (
                    <Typography color="#F3F3F6">
                      {resourceName === "userrecords"
                        ? dataAgreementIdForUserRecordes
                        : selectedDataAgreement?.id}
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
                  style={{ height: "150px", width: "100%" }}
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
                    marginTop: "-65px",
                    width: "110px",
                    height: "110px",
                    border: "solid white 6px",
                  }}
                />
              </Box>
              <DetailsContainer>
                <Box p={1.5}>
                  <Typography variant="h6" fontWeight="bold">
                    {organisationDetails.name}
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
                    {organisationDetails.description}
                  </Typography>

                  <Box mt={2}>
                    <Purpose open={props.open} mode={props.mode} />

                    <Version />

                    <DataExchangeModeFormControl
                      open={props.open}
                      mode={props.mode}
                      selectededDataAgreementFromDataAgreement={
                        selectededDataAgreementFromDataAgreement
                      }
                    />

                    {/* Required for future purpose in enterprise dashboard */}
                    {/* <Typography
                        style={{
                          fontSize: "14px",
                          textDecoration: "underline",
                          color: "grey",
                          marginTop: "-7px",
                          cursor: "not-allowed",
                        }}
                      >
                        (Choose existing schemas)
                      </Typography> */}

                    <PurposeDescription open={props.open} mode={props.mode} />

                    <LawfullBasisOfProcessingFormControll
                      open={props.open}
                      mode={props.mode}
                    />

                    <Typography variant="subtitle1">
                      Data Policy Configurations
                      <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
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
              <FooterContainer
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  style={
                    methods.formState.isValid &&
                    mode !== "Read" &&
                    isFormDataChanged()
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor:
                      methods.formState.isValid &&
                      mode !== "Read" &&
                      isFormDataChanged()
                        ? "pointer"
                        : "not-allowed",
                    color:
                      methods.formState.isValid &&
                      mode !== "Read" &&
                      isFormDataChanged()
                        ? "black"
                        : "#6D7676",
                    marginRight: "15px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={methods.handleSubmit(onSave)}
                >
                  SAVE
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    cursor:
                      methods.formState.isValid &&
                      mode !== "Read" &&
                      (selectedDataAgreement &&
                      selectedDataAgreement.lifecycle === "draft"
                        ? selectedDataAgreement.lifecycle === "draft"
                        : isFormDataChanged())
                        ? "pointer"
                        : "not-allowed",
                    color:
                      methods.formState.isValid &&
                      mode !== "Read" &&
                      (selectedDataAgreement &&
                      selectedDataAgreement.lifecycle === "draft"
                        ? selectedDataAgreement.lifecycle === "draft"
                        : isFormDataChanged())
                        ? "black"
                        : "#6D7676",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                    marginLeft: "15px",
                  }}
                  style={
                    methods.formState.isValid &&
                    mode !== "Read" &&
                    (selectedDataAgreement &&
                    selectedDataAgreement.lifecycle === "draft"
                      ? selectedDataAgreement.lifecycle === "draft"
                      : isFormDataChanged())
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  onClick={methods.handleSubmit(onPublish)}
                >
                  PUBLISH
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
      </Drawer>
    </>
  );
}
