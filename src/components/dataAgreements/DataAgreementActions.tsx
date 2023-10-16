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
  AttributeName: string;
}

export const DataAgreementPayload = (
  createdData: createdDataProps,
  PublishFlag: boolean
) => {
  return {
    purposes: [
      {
        Name: createdData.Name,
        Description: createdData.Description,
        LawfulUsage: false,
        LawfulBasisOfProcessing: createdData.LawfulBasisOfProcessing,
        PolicyURL: createdData.PolicyURL,
        AttributeType: createdData.AttributeType,
        Jurisdiction: createdData.Jurisdiction,
        Disclosure: "true",
        IndustryScope: createdData.IndustryScope,
        DPIA: {
          DPIADate: createdData.DpiaDate,
          DPIASummaryURL: createdData.DpiaSummaryURL,
        },
        DataRetention: {
          RetentionPeriod: parseInt(createdData.DataRetentionPeriod),
          Enabled: false,
        },
        Restriction: createdData.Restriction,
        Shared3PP: createdData.Shared3PP,
        Version: createdData.Version,
        PublishFlag: PublishFlag,
      },
    ],
  };
};

export const AddDataAttributesPayload = (
  CreatedDataAttributes: any,
  purposeID: string
) => {
  return {
    templates: CreatedDataAttributes?.map((value: any) => {
      return {
        consent: value.attributeName,
        description: value.attributeDescription,
        purposeids: [purposeID],
      };
    }),
  };
};

export const UpdateDataAttributesPayload = (
  CreatedDataAttributes: any,
  purposeID: string
) => {
  return {
    Consent: CreatedDataAttributes.Consent,
    PurposeIDs: [...CreatedDataAttributes.PurposeIDs, purposeID],
    Description: CreatedDataAttributes.Description,
  };
};
