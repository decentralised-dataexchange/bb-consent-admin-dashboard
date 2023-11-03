export interface DataAgreementsResponse {
  dataAgreements: DataAgreement[];
  pagination: Pagination;
}

export interface DataAgreement {
  id: string;
  version: string;
  controllerId: string;
  controllerUrl: string;
  controllerName: string;
  policy: Policy;
  purpose: string;
  purposeDescription: string;
  lawfulBasis: string;
  methodOfUse: any;
  dpiaDate: string;
  dpiaSummaryUrl: string;
  signature: any;
  active: boolean;
  forgettable: boolean;
  compatibleWithVersionId: string;
  lifecycle: string;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
  url: string;
  jurisdiction: string;
  industrySector: string;
  dataRetentionPeriodDays: number;
  geographicRestriction: string;
  storageLocation: string;
}

enum DataExchangeModes {
  DataSource = "Data Source",
  DataUsingService = "Data Using Service",
  None = "None",
}

enum LawfulBasisOfProcessingEnum {
  ConsentBasis = "Consent",
  ContractBasis = "Contract",
  LegalObligationBasis = "Legal Obligation",
  VitalInterestBasis = "Vital Interest",
  PublicTaskBasis = "Public Task",
  LegitimateInterestBasis = "Legitimate Interest",
}

export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

enum PublishFlagEnum {
  Saved = "Draft",
  Published = "Published",
}

export const getMethodOfUse = (methodOfUse: string) => {
  if (methodOfUse === "null") {
    return DataExchangeModes.None;
  } else if (methodOfUse === "data_source") {
    return DataExchangeModes.DataSource;
  } else {
    return DataExchangeModes.DataUsingService;
  }
};

export const getLawfulBasisOfProcessing = (LawfulBasisOfProcessing: string) => {
  if (LawfulBasisOfProcessing === "consent") {
    return LawfulBasisOfProcessingEnum.ConsentBasis;
  } else if (LawfulBasisOfProcessing === "contract") {
    return LawfulBasisOfProcessingEnum.ContractBasis;
  } else if (LawfulBasisOfProcessing === "legal_obligation") {
    return LawfulBasisOfProcessingEnum.LegalObligationBasis;
  } else if (LawfulBasisOfProcessing === "vital_interest") {
    return LawfulBasisOfProcessingEnum.VitalInterestBasis;
  } else if (LawfulBasisOfProcessing === "public_task") {
    return LawfulBasisOfProcessingEnum.PublicTaskBasis;
  } else {
    return LawfulBasisOfProcessingEnum.LegitimateInterestBasis;
  }
};

export const getPublishValues = (lifecycle: string) => {
  if (lifecycle === "draft") {
    return PublishFlagEnum.Saved;
  } else {
    return PublishFlagEnum.Published;
  }
};