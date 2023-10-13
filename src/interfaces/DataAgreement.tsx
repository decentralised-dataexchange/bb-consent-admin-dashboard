export interface DataAgreements {
  OrgID: string;
  Purposes: Purpose[];
}

export interface Purpose {
  ID: string;
  Name: string;
  Description: string;
  LawfulUsage: boolean;
  LawfulBasisOfProcessing: number;
  PolicyURL: string;
  AttributeType: number;
  Jurisdiction: string;
  Disclosure: string;
  IndustryScope: string;
  DataRetention: DataRetention;
  Restriction: string;
  Shared3PP: boolean;
  Version: string;
  PublishFlag: boolean;
}
export interface DataRetention {
  RetentionPeriod: number;
  Enabled: boolean;
}

export interface PurposeForDataProvider
  extends Omit<
    Purpose,
    "ID" | "AttributeType" | "LawfulBasisOfProcessing" | "PublishFlag"
  > {
  id: string;
  MethodOfUse: string;
  LawfulBasisOfProcessing: string;
  PublishFlag: string;
}

enum DataExchangeModes {
  DataSource = "Data Source",
  DataUsingService = "Data Using Service",
  None = "None",
}

enum LawfulBasisOfProcessingEnum {
  ConsentBasis = "Consent Basis",
  ContractBasis = "Contract Basis",
  LegalObligationBasis = "Legal Obligation Basis",
  VitalInterestBasis = "Vital Interest Basis",
  PublicTaskBasis = "Public Task Basis",
  LegitimateInterestBasis = "Legitimate Interest Basis",
}

enum PublishFlagEnum {
  Saved = "Saved",
  Published = "Published",
}

export const getMethodOfUse = (attributeType: number) => {
  if (attributeType === 0) {
    return DataExchangeModes.None;
  } else if (attributeType === 1) {
    return DataExchangeModes.DataSource;
  } else {
    return DataExchangeModes.DataUsingService;
  }
};

export const getLawfulBasisOfProcessing = (LawfulBasisOfProcessing: number) => {
  if (LawfulBasisOfProcessing === 0) {
    return LawfulBasisOfProcessingEnum.ConsentBasis;
  } else if (LawfulBasisOfProcessing === 1) {
    return LawfulBasisOfProcessingEnum.ContractBasis;
  } else if (LawfulBasisOfProcessing === 2) {
    return LawfulBasisOfProcessingEnum.LegalObligationBasis;
  } else if (LawfulBasisOfProcessing === 3) {
    return LawfulBasisOfProcessingEnum.VitalInterestBasis;
  } else if (LawfulBasisOfProcessing === 4) {
    return LawfulBasisOfProcessingEnum.PublicTaskBasis;
  } else {
    return LawfulBasisOfProcessingEnum.LegitimateInterestBasis;
  }
};

export const getPublishValues = (PublishFlag: boolean) => {
  if (PublishFlag === false) {
    return PublishFlagEnum.Saved;
  } else {
    return PublishFlagEnum.Published;
  }
};

export const convertPurposeForClient = (
  purposes: Purpose[]
): PurposeForDataProvider[] => {
  return purposes.map((purpose) => {
    const {
      ID,
      AttributeType,
      LawfulBasisOfProcessing,
      PublishFlag,
      ...otherProps
    } = purpose;
    return {
      id: ID.toLowerCase(),
      MethodOfUse: getMethodOfUse(AttributeType),
      LawfulBasisOfProcessing: getLawfulBasisOfProcessing(
        LawfulBasisOfProcessing
      ),
      PublishFlag: getPublishValues(PublishFlag),
      ...otherProps,
    };
  });
};
