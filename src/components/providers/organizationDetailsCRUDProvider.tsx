import React, { FC, useEffect, useState } from "react";
import { HttpService } from "../../service/HTTPService";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";

interface OrganizationDetailsCRUDProviderProps {
  children: React.ReactNode;
}

export const OrganizationDetailsCRUDProvider: FC<
  OrganizationDetailsCRUDProviderProps
> = ({ children }) => {
  const [organisationDetails, setOrganisationDetails] = useState({});
  const [coverImageBase64, setCoverImageBase64] = useState();
  const [logoImageBase64, setLogoImageBase64] = useState();

  useEffect(() => {
    HttpService.getOrganisationDetails()
      .then((organisation) => {
        setOrganisationDetails(organisation);

        HttpService.getCoverImage().then((coverImage) => {
          setCoverImageBase64(coverImage);
        });
        HttpService.getLogoImage().then((logoImage) => {
          setLogoImageBase64(logoImage);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <OrganizationDetailsCRUDContext.Provider
      value={{
        organisationDetails,
        coverImageBase64,
        logoImageBase64,
      }}
    >
      {children}
    </OrganizationDetailsCRUDContext.Provider>
  );
};
