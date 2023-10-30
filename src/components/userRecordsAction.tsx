import { formatISODateToLocalString } from "../utils/formatISODateToLocalString";

export const getOptinValues = (optIn: boolean) => {
  if (optIn === true) {
    return "Opt-in";
  } else {
    return "Opt-out";
  }
};

export const convertConsentRecordsForClient = (consentRecords: any) => {
  const consentRecordsConvertedDataForClientPurpose =
    consentRecords.dataAgreementRecords.map((consentRecords: any) => {
      const { optIn, timestamp, ...otherProps } = consentRecords;
      return {
        optIn: getOptinValues(optIn),
        timestamp: formatISODateToLocalString(timestamp),
        ...otherProps,
      };
    });
  const convertedConsentRecords = {
    dataAgreementRecords: consentRecordsConvertedDataForClientPurpose,
    pagination: consentRecords.pagination,
  };

  return convertedConsentRecords;
};
