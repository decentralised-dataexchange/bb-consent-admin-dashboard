import { convertYearsToDays } from "../../utils/convertYearsToDays";

export interface createdDataProps {
  Name: string;
  Version: string;
  AttributeType: string;
  Description: string;
  LawfulBasisOfProcessing: number;
  PolicyURL: string;
  Jurisdiction: string;
  IndustryScope: string;
  StorageLocation: string;
  dataRetentionPeriodDays: number;
  Restriction: string;
  Shared3PP: boolean;
  DpiaDate: any;
  DpiaSummaryURL: string;
  dataAttributes: any;
  dataSources: any;
}

export const DataAgreementPayload = (
  createdData: createdDataProps,
  active: boolean,
  lifecycle: string,
  mode: string,
  selectedDataAgreement?: any
): any => {
  const payload: any = {
    dataAgreement: {
      id: mode === "Update" ? selectedDataAgreement.id : "",
      version: createdData.Version,
      controllerId: "Update" ? selectedDataAgreement?.controllerId : "string",
      controllerUrl: "string",
      controllerName: "string",
      policy: {
        id: "Update" ? selectedDataAgreement?.policy?.name : "string",
        name: "string",
        version: "Update" ? selectedDataAgreement?.policy?.version : "string",
        url: createdData.PolicyURL,
        jurisdiction: createdData.Jurisdiction,
        industrySector: createdData.IndustryScope,
        dataRetentionPeriodDays: convertYearsToDays(
          createdData.dataRetentionPeriodDays
        ),
        geographicRestriction: createdData.Restriction,
        storageLocation: createdData.StorageLocation,
        thirdPartyDataSharing: createdData.Shared3PP,
      },
      purpose: createdData.Name,
      purposeDescription: createdData.Description,
      lawfulBasis: createdData.LawfulBasisOfProcessing,
      methodOfUse: createdData.AttributeType,
      dpiaDate: createdData.DpiaDate,
      dpiaSummaryUrl: createdData.DpiaSummaryURL,
      signature: {
        id: "Update" ? selectedDataAgreement?.signature.id : "",
        payload: "Update" ? selectedDataAgreement?.signature.payload : "string",
        signature: "Update"
          ? selectedDataAgreement?.signature?.signature
          : "string",
        verificationMethod: "Update"
          ? selectedDataAgreement?.signature?.verificationMethod
          : "string",
        verificationPayload: "Update"
          ? selectedDataAgreement?.signature?.verificationPayload
          : "string",
        verificationPayloadHash: "Update"
          ? selectedDataAgreement?.signature?.verificationPayloadHash
          : "string",
        verificationArtifact: "Update"
          ? selectedDataAgreement?.signature?.verificationArtifact
          : "string",
        verificationSignedBy: "Update"
          ? selectedDataAgreement?.signature?.verificationSignedBy
          : "string",
        verificationSignedAs: "Update"
          ? selectedDataAgreement?.signature?.verificationSignedAs
          : "string",
        verificationJwsHeader: "Update"
          ? selectedDataAgreement?.signature?.verificationJwsHeader
          : "string",
        timestamp: "Update"
          ? selectedDataAgreement?.signature?.timestamp
          : "string",
        signedWithoutObjectReference: "Update"
          ? selectedDataAgreement?.signature?.signedWithoutObjectReference
          : false,
        objectType: "Update"
          ? selectedDataAgreement?.signature?.objectType
          : "revision",
        objectReference: "Update"
          ? selectedDataAgreement?.signature?.objectReference
          : "string",
      },
      active: active,
      forgettable:
        mode === "Update" ? selectedDataAgreement?.forgettable : false,
      compatibleWithVersionId: "Update"
        ? selectedDataAgreement?.forgettable
        : "string",
      lifecycle: lifecycle,

      dataAttributes: createdData?.dataAttributes?.map(
        (dataAttributes: any) => {
          return {
            id: mode === "Update" ? dataAttributes.id : "",
            name: dataAttributes.attributeName,
            description: dataAttributes.attributeDescription,
            sensitivity: mode === "Update" ? dataAttributes.sensitivity : false,
            category: mode === "Update" ? dataAttributes.category : "string",
          };
        }
      ),
      dataSources: [],
    },
  };

  // Update dataSources if AttributeType is "data_using_service" and all names are not empty
  if (
    createdData.AttributeType === "data_using_service" &&
    createdData.dataSources
  ) {
    const validDataSources = createdData.dataSources.filter(
      (source: any) => source.name !== ""
    );
    if (validDataSources.length === createdData.dataSources.length) {
      payload.dataAgreement.dataSources = validDataSources;
    }
  }

  return payload;
};

export function validateSources(data: any[]): boolean {
  if (!data || data.length === 0) {
    return true; // Return true for empty or undefined data
  }

  for (const item of data) {
    if (!item || typeof item !== "object") {
      return false; // Invalid item
    }

    const name = item.name || "";
    const location = item.location || "";
    const sector = item.sector || "";

    const allEmpty =
      name.length === 0 && location.length === 0 && sector.length === 0;
    const allValidLength =
      name.length >= 3 && location.length >= 3 && sector.length >= 3;
    const anyNonEmpty =
      name.length > 0 || location.length > 0 || sector.length > 0;

    if (allEmpty) {
      continue; // This item is valid, check the next one
    }

    if (anyNonEmpty && !allValidLength) {
      return false; // If any field is non-empty, all must be at least 3 characters
    }
  }

  return true; // All items passed the check
}
