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
  DataRetentionPeriod: string;
  Restriction: string;
  Shared3PP: boolean;
  DpiaDate: any;
  DpiaSummaryURL: string;
  dataAttributes: any
}
// 3rd party sharing value should be added to the payload once added from the backend
//  value =  createdData.Shared3PP,
export const DataAgreementPayload = (
  createdData: createdDataProps,
  active: boolean,
  lifecycle: string
): any => {
  return {
    dataAgreement: {
      version: createdData.Version,
      controllerId: "string",
      controllerUrl: "string",
      controllerName: "string",
      policy: {
        name: "string",
        version: "string",
        url: createdData.PolicyURL,
        jurisdiction: createdData.Jurisdiction,
        industrySector: createdData.IndustryScope,
        dataRetentionPeriodDays: parseInt(createdData.DataRetentionPeriod),
        geographicRestriction: createdData.Restriction,
        storageLocation: createdData.StorageLocation,
      },
      purpose: createdData.Name,
      purposeDescription: createdData.Description,
      lawfulBasis: createdData.LawfulBasisOfProcessing,
      methodOfUse: createdData.AttributeType,
      dpiaDate: createdData.DpiaDate,
      dpiaSummaryUrl: createdData.DpiaSummaryURL,
      signature: {
        payload: "string",
        signature: "string",
        verificationMethod: "string",
        verificationPayload: "string",
        verificationPayloadHash: "string",
        verificationArtifact: "string",
        verificationSignedBy: "string",
        verificationSignedAs: "string",
        verificationJwsHeader: "string",
        timestamp: "string",
        signedWithoutObjectReference: false,
        objectType: "revision",
        objectReference: "string",
      },
      active: active,
      forgettable: false,
      compatibleWithVersionId: "string",
      lifecycle: lifecycle,
    },
  };
};

export const AddDataAttributesPayload = (
  CreatedDataAttributes: any,
  responsePurpose:  {id: string, purpose: string}
) => {
  return {
    dataAttribute: {
        version: "1.0.0",
        agreements: [responsePurpose],
        agreementIds: [responsePurpose.id],
        name: CreatedDataAttributes.attributeName,
        description: CreatedDataAttributes.attributeName,
        sensitivity: false,
        category: "string",
    }
  };
};

export const UpdateDataAttributesPayload = (
  CreatedDataAttributes: any,
  responsePurpose: {id: string, purpose: string}
) => {
  return {
    dataAttribute: {
      id: CreatedDataAttributes.id,
      version: CreatedDataAttributes.version,
      agreements: [responsePurpose],
      agreementIds: [
        ...CreatedDataAttributes.agreementIds
        , responsePurpose.id
      ],
      name: CreatedDataAttributes.name,
      description: CreatedDataAttributes.description,
      sensitivity: CreatedDataAttributes.sensitivity,
      category: CreatedDataAttributes.sensitivity
    }
  }
};
