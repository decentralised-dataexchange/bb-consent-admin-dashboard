import fakeDataProvider from "ra-data-fakerest";
import { combineDataProviders } from "react-admin";
import { HttpService } from "../../service/HTTPService";
import { paginate } from "../../utils/paginateFunction";

const fakePersonalDataDataProvider = [
  {
    id: 0,
    dataAttributeName: "Aadhar name",
    description: "Aadhar names",
    dataAgreement: "Verify Aadhaar",
  },
  {
    id: 1,
    dataAttributeName: "Aadhar name",
    description: "Aadhar names",
    dataAgreement: "Verify Aadhaar",
  },
  {
    id: 2,
    dataAttributeName: "Aadhar name",
    description: "Aadhar names",
    dataAgreement: "Verify Aadhaar",
  },
  {
    id: 3,
    dataAttributeName: "Aadhar name",
    description: "Aadhar names",
    dataAgreement: "Verify Aadhaar",
  },
  {
    id: 4,
    dataAttributeName: "Aadhar name",
    description: "Aadhar names",
    dataAgreement: "Verify Aadhaar",
  },
];

const fakeUserRecordDataProvider = [
  {
    id: 0,
    subscriberID: "e8b045f4-5401-4722-a447-3a4d6031a492",
    purpose: "Market and Campaign",
    lawfulBasis: "Consent",
    agreementEvent: "Opt-in",
    timestamp: "2023-08-26T18:52:33z",
  },
  {
    id: 1,
    subscriberID: "e9b045f4-5401-4722-a447-3a4d6031a492",
    purpose: "Campaign",
    lawfulBasis: "Consent",
    agreementEvent: "Opt-in",
    timestamp: "2023-08-26T18:52:33z",
  },
  {
    id: 2,
    subscriberID: "e9b045f4-5401-4722-a447-3a4d6031a492",
    purpose: "Marketing",
    lawfulBasis: "Consent",
    agreementEvent: "Opt-in",
    timestamp: "2023-08-26T18:52:33z",
  },
  {
    id: 3,
    subscriberID: "e9b045f4-5401-4722-a447-3a4d6031a492",
    purpose: "Market and Campaign",
    lawfulBasis: "Consent",
    agreementEvent: "Opt-in",
    timestamp: "2023-08-26T18:52:33z",
  },
  {
    id: 4,
    subscriberID: "e9b045f4-5401-4722-a447-3a4d6031a492",
    purpose: "Market and Campaign",
    lawfulBasis: "Consent",
    agreementEvent: "Opt-in",
    timestamp: "2023-08-26T18:52:33z",
  },
];

const fakeViewLogsDataProvider = [
  {
    id: 0,
    action: "admin@retail.com logged in",
    category: "Security",
    timestamp: "2023-09-22 05:26:58 +0000 UTC",
  },
  {
    id: 1,
    action: "admin@retail.com logged in",
    category: "Security",
    timestamp: "2023-09-22 05:26:58 +0000 UTC",
  },
  {
    id: 2,
    action: "admin@retail.com logged in",
    category: "Security",
    timestamp: "2023-09-22 05:26:58 +0000 UTC",
  },
  {
    id: 3,
    action: "admin@retail.com logged in",
    category: "Security",
    timestamp: "2023-09-22 05:26:58 +0000 UTC",
  },
  {
    id: 4,
    action: "admin@retail.com logged in",
    category: "Security",
    timestamp: "2023-09-22 05:26:58 +0000 UTC",
  },
];

const fakeWebhookDataProvider = [
  { id: 0, callBackURL: "https://webhook.igrant.io", status: "Active" },
  { id: 1, callBackURL: "https://webhook.igrant.io", status: "Active" },
  { id: 2, callBackURL: "https://webhook.igrant.io", status: "Active" },
  { id: 3, callBackURL: "https://webhook.igrant.io", status: "Active" },
  { id: 4, callBackURL: "https://webhook.igrant.io", status: "Active" },
];

export const fakeConsentBBDataProvider = fakeDataProvider({
  dataagreement: [
    {
      id: 0,
      Name: "User Registration",
      Version: "1.0.0",
      MethodOfUse: "Data Using Service",
      PublishFlag: "Saved",
      LawfulUsage: "Contractual",
    },
    {
      id: 1,
      Name: "User Registration",
      Version: "1.1.0",
      MethodOfUse: "Data Source",
      PublishFlag: "Saved",
      LawfulUsage: "Contractual",
    },
    {
      id: 2,
      Name: "User Registration",
      Version: "1.0.2",
      MethodOfUse: "Data Using Service",
      PublishFlag: "Saved",
      LawfulUsage: "Consent",
    },
    {
      id: 3,
      Name: "User Registration",
      Version: "1.0.0",
      MethodOfUse: "Data Using Service",
      PublishFlag: "Saved",
      LawfulUsage: "Contractual",
    },
    {
      id: 4,
      Name: "User Registration",
      Version: "1.1.0",
      MethodOfUse: "Data Source",
      PublishFlag: "Saved",
      LawfulUsage: "Contractual",
    },
    {
      id: 5,
      Name: "User Registration",
      Version: "1.0.2",
      MethodOfUse: "Data Using Service",
      PublishFlag: "Saved",
      LawfulUsage: "Consent",
    },
  ],
  personaldata: fakePersonalDataDataProvider,
  userrecords: fakeUserRecordDataProvider,
  viewlogs: fakeViewLogsDataProvider,
  webhooks: fakeWebhookDataProvider,
});

const dataAgreementDataProvider = {
  getList: (resource: any, params: any) => {
    return HttpService.listDataAgreements()
      .then((dataAgreements) => {
        let pageSize = params.pagination.perPage;
        let pageNumber = params.pagination.page;
        const paginateddataAgreements = paginate(
          dataAgreements,
          pageSize,
          pageNumber
        );

        return { data: paginateddataAgreements, total: dataAgreements.length };
      })
      .catch((error) => {
        // throw error.response
      });
  },
};

export const dataProvider = combineDataProviders((resource): any => {
  switch (resource) {
    case "dataagreement":
      return dataAgreementDataProvider;
    default:
      return fakeConsentBBDataProvider;
  }
});
