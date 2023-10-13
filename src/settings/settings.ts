export const STAGING_BASE_URL = "https://staging-consent-bb-api.igrant.io/v1";
export const DEMO_BASE_URL = "https://demo-consent-bb-api.igrant.io/v1";
export const CLIENTID = "igrant-ios-app";

export const ENDPOINTS = {
  login: () => {return "/users/admin/login"},
  logout: () => {return "/users/logout"},
  refreshToken:() => {return "/users/token"  },
  getOrganisationDetails: (organizationId: string) => {return `/organizations/${organizationId}`},
  updateOrganisationLogoImage:(organizationId: string) => { return `organizations/${organizationId}/logoimage`},
  updateOrganisationCoverImage:(organizationId: string) => { return `organizations/${organizationId}/coverimage`},
  getCoverImage: (organizationId: string, imageId: string) => { return `/organizations/${organizationId}/image/${imageId}`},
  getLogoImage: (organizationId: string, imageId: string) => { return `/organizations/${organizationId}/image/${imageId}`},
  updateOrganisationDetails: (organizationId: string,) => {return `/organizations/${organizationId}`},
  getDataAgreements: (organizationId: string) => { return `/organizations/${organizationId}/purposes`}
};

