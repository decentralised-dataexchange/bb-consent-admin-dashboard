export const STAGING_BASE_URL = "https://staging-consent-bb-api.igrant.io/v2";
export const DEMO_BASE_URL = "https://demo-consent-bb-api.igrant.io/v2";
export const CLIENTID = "igrant-ios-app";

export const ENDPOINTS = {
  login: () => {return "/onboard/admin/login"},
  // logout: () => {return "/users/logout"},
  refreshToken:() => {return "/onboard/token/refresh"  },
  getOrganisationDetails: () => {return `/onboard/organisation`},
  updateOrganisationLogoImage:() => { return `/onboard/organisation/logoimage`},
  updateOrganisationCoverImage:() => { return `/onboard/organisation/coverimage`},
  getCoverImage: () => { return `/onboard/organisation/coverimage`},
  getLogoImage: () => { return `/onboard/organisation/logoimage`},
  updateOrganisationDetails: () => {return `/onboard/organisation`},
  listDataAgreements: (offsetValue:number, pageSize: number) => { return `/config/data-agreements?limit=${pageSize}&offset=${offsetValue}`},
  addDataAgreements: () => { return '/config/data-agreement'},
  listDataAttributes: () => { return '/config/data-agreements/data-attributes'},
  addDataAttributes: () => { return '/config/data-agreements/data-attribute'},
  updateDataAttributesById: (dataAttributeId: string) => { return `/config/data-agreements/data-attribute/${dataAttributeId}`},
  deleteDataAgreement: (dataAgreementId: string) => { return `/config/data-agreement/${dataAgreementId}`},
  getDataAgreementByID: (dataAgreementId:string) =>{ return `/config/data-agreement/${dataAgreementId}`},
  getDataAttributesByDataAgreementId: (dataAgreementId: string) => { return `/config/data-agreement/${dataAgreementId}/data-attributes`},
  updateDataAgreementById: (dataAgreementId: string | undefined)=>{return `/config/data-agreement/${dataAgreementId}`},
  listAllPolicies: () => {return `/config/policies`},
  addPolicy: () => { return `/config/policy` },
  updatePolicyById: (policyId: string | undefined) => { return `/config/policy/${policyId}` }
};

