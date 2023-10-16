import { createContext } from "react";
import { Organization } from "../interfaces/Organisation";

export interface OrganizationDetailsCRUDProps {
  organisationDetails: any;
  coverImageBase64: string | undefined;
  logoImageBase64: string | undefined;
}

export const OrganizationDetailsCRUDContext =
  createContext<OrganizationDetailsCRUDProps>(
    {} as OrganizationDetailsCRUDProps
  );
