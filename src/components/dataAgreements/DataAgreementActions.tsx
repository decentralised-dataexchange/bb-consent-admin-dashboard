export interface createdDataProps {
  Name: string;
  Version: string;
  AttributeType: number;
  Description: string;
  LawfulBasisOfProcessing: number;
  PolicyURL: string;
  Jurisdiction: string;
  IndustryScope: string;
  StorageLocation: string;
  dataRetentionPeriodDays: string;
  Restriction: string;
  Shared3PP: boolean;
  DpiaDate: any;
  DpiaSummaryURL: string;
  dataAttributes: any;
}

export const DataAgreementPayload = (
  createdData: createdDataProps,
  active: boolean,
  lifecycle: string,
  mode: string,
  selectedDataAgreement?: any
): any => {
  return {
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
        dataRetentionPeriodDays: createdData.dataRetentionPeriodDays,
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
      dataAttributes: createdData?.dataAttributes?.map((dataAttributes: any) => {
        return {
          id: mode === "Update" ? dataAttributes.id : "",
          name: dataAttributes.attributeName,
          description: dataAttributes.attributeDescription,
          sensitivity: mode === "Update" ? dataAttributes.sensitivity : false,
          category: mode === "Update" ? dataAttributes.category : "string",
        };
      }),
    },
  };
};