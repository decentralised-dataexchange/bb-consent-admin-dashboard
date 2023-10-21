import { useState } from "react";
import { TextInput } from "react-admin";

import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import OrgLogoImageUpload from "../../components/OrganisationDetails/OrgLogoImageUpload";
import { HttpService } from "../../service/HTTPService";
import { UpdateOrganisationReq } from "../../interfaces/UpdateOrganisation";

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  padding: 10,
});

const editStyleEnable: React.CSSProperties = {
  borderWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE0E1",
  height: 23,
};

const buttonStyle = {
  color: "black",
  height: 30,
  width: 100,
  borderRadius: 0,
  border: "1px solid #DFDFDF",
};

type Props = {
  editMode: boolean;
  logoImageBase64: string;
  organisationDetails: any;
  handleEdit: () => void;
  setOganisationDetails: any;
};

const OrganisationDetailsContainer = (props: Props) => {
  const {
    editMode,
    logoImageBase64,
    organisationDetails,
    handleEdit,
    setOganisationDetails,
  } = props;
  const [organisationName, setOrganisationName] = useState("");
  const [organisationLocation, setOrganisationLocation] = useState("");
  const [organisationPolicyURL, setOrganisationPolicyURL] = useState("");
  const [organisationOverView, setOrganisationOverView] = useState("");

  const handleSave = () => {
    const payload: UpdateOrganisationReq = {
      name: organisationName,
      location: organisationLocation,
      description: organisationOverView,
      policyUrl: organisationPolicyURL,
    };
    HttpService.updateOrganisationDetails(payload)
      .then((res) => {
        HttpService.getOrganisationDetails().then((organisation) => {
          handleEdit();
          setOganisationDetails(organisation);
        });
      }).catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <DetailsContainer sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={12} xs={12} style={{ height: "90px" }}>
          <OrgLogoImageUpload
            editMode={editMode}
            logoImageBase64={logoImageBase64}
          />
        </Grid>
        <Grid item lg={6} md={5} sm={12} xs={12} height={23}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {editMode ? (
              <>
                <TextInput
                  autoFocus
                  source="organisationname"
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                  variant="standard"
                  label={false}
                  placeholder="Organisation Name"
                  fullWidth
                  style={{ ...editStyleEnable, marginTop: "3px" }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <Typography
                  color="#9F9F9F"
                  height="23px"
                  style={{ marginTop: "2px" }}
                >
                  Sector
                </Typography>
                <TextInput
                  autoFocus
                  source="location"
                  variant="standard"
                  label={false}
                  value={organisationLocation}
                  onChange={(e) => setOrganisationLocation(e.target.value)}
                  placeholder="Location"
                  fullWidth
                  style={{ ...editStyleEnable, marginTop: "-1px" }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <TextInput
                  autoFocus
                  source="policyurl"
                  variant="standard"
                  label={false}
                  value={organisationPolicyURL}
                  onChange={(e) => setOrganisationPolicyURL(e.target.value)}
                  placeholder="Policy URL"
                  fullWidth
                  style={{ ...editStyleEnable, marginTop: "-4px" }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold">
                  {organisationDetails.name}
                </Typography>
                <Typography variant="body1" height="23px">
                  Sector: {organisationDetails.Type?.Type}
                </Typography>
                <Typography variant="body1" height="23px">
                  Location: {organisationDetails.location}
                </Typography>
                <Typography variant="body1" height="23px">
                  Policy URL: {organisationDetails.policyUrl}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          {editMode ? (
            <Box style={{ textAlign: "right" }}>
              <Button
                onClick={handleEdit}
                style={buttonStyle}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                style={buttonStyle}
                variant="outlined"
              >
                Save
              </Button>
            </Box>
          ) : (
            <Typography
              onClick={handleEdit}
              style={{ cursor: "pointer", textAlign: "right" }}
            >
              Edit
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid sx={{ marginTop: 7 }}>
        <Typography variant="h6" fontWeight="bold">
          Overview
        </Typography>
        <Box sx={{ minHeight: 100, maxHeight: 150, overflow: "auto" }}>
          {editMode ? (
            <TextInput
              source="overview"
              autoFocus
              variant="standard"
              value={organisationOverView}
              onChange={(e) => setOrganisationOverView(e.target.value)}
              multiline={true}
              label={false}
              placeholder="Description of organisation with character limit of 500 characters"
              fullWidth
              style={{ marginTop: "1px" }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          ) : (
            <Typography
              variant="subtitle1"
              align="left"
              style={{ wordWrap: "break-word" }}
            >
              {organisationDetails.description}
            </Typography>
          )}
        </Box>
      </Grid>
    </DetailsContainer>
  );
};

export default OrganisationDetailsContainer;
