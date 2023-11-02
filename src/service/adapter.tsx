import { formatISODateToLocalString } from "../utils/formatISODateToLocalString";

export const getOptinValues = (optIn: boolean) => {
  if (optIn === true) {
    return "Opt-in";
  } else {
    return "Opt-out";
  }
};

enum LawfulBasisOfProcessingEnum {
  ConsentBasis = "Consent",
  ContractBasis = "Contract",
  LegalObligationBasis = "Legal Obligation",
  VitalInterestBasis = "Vital Interest",
  PublicTaskBasis = "Public Task",
  LegitimateInterestBasis = "Legitimate Interest",
}

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

export const convertConsentRecordsForClient = (consentRecords: any) => {
  const consentRecordsConvertedDataForClientPurpose =
    consentRecords.consentRecords.map((consentRecords: any) => {
      const { optIn, timestamp,dataAgreement, ...otherProps } = consentRecords;
      return {
        optIn: getOptinValues(optIn),
        timestamp: formatISODateToLocalString(timestamp),
        dataAgreement:{
          lawfulBasis: getLawfulBasisOfProcessing(dataAgreement.lawfulBasis),
          purpose:dataAgreement.purpose
        },
        ...otherProps,
      };
    });
  const convertedConsentRecords = {
    consentRecords: consentRecordsConvertedDataForClientPurpose,
    pagination: consentRecords.pagination,
  };

  return convertedConsentRecords;
};

export const convertViewLogsForClient = (viewLogs: any) => {
  const viewLogsConvertedDataForClientPurpose =
  viewLogs.logs.map((viewLogs: any) => {
      const { timestamp, ...otherProps } = viewLogs;
      return {
        timestamp: formatISODateToLocalString(timestamp),
        ...otherProps,
      };
    });
  const convertedViewLogs = {
    logs: viewLogsConvertedDataForClientPurpose,
    pagination: viewLogs.pagination,
  };

  return convertedViewLogs;
};