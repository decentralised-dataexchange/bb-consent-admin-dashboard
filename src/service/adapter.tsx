import { formatISODateToLocalString } from "../utils/formatISODateToLocalString";

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