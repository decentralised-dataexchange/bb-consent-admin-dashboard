import { useEffect, useState } from "react";

import { Form } from "react-admin";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../components/Breadcrumbs";
import OrgCoverImageUpload from "../../components/OrganisationDetails/OrgCoverImageUpload";

import { HttpService } from "../../service/HTTPService";
import OrganisationDetailsContainer from "../../components/OrganisationDetails/OrgDetailsContainer";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  padding: 10,
});

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f7f6f6",
  padding: theme.spacing(1),
  justifyContent: "center",
  color: "#0000",
  height: 100,
  borderRadius: 7,
  border: "1px solid grey",
}));

const GettingStarted = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [coverImageBase64, setCoverImageBase64] = useState<any>(null);
  const [logoImageBase64, setLogoImageBase64] = useState<any>(null);
  const [organisationDetails, setOganisationDetails] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    HttpService.getOrganisationDetails()
      .then((organisation) => {
        setOganisationDetails(organisation);

        HttpService.getCoverImage().then(
          (coverImage) => {
            setCoverImageBase64(coverImage);
          }
        );
        HttpService.getLogoImage().then((logoImage) => {
          setLogoImageBase64(logoImage);
        });
      })
      .catch((error) => {
         console.log(error);
      });
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Form>
      <Container>
        <BreadCrumb Link="Getting Started" />
        <OrgCoverImageUpload
          editMode={editMode}
          coverImageBase64={coverImageBase64}
        />
        <OrganisationDetailsContainer
          editMode={editMode}
          logoImageBase64={logoImageBase64}
          organisationDetails={organisationDetails}
          handleEdit={handleEdit}
          setOganisationDetails={setOganisationDetails}
        />

        <DetailsContainer sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/dataagreement")}
              >
                <Typography variant="body1" color="grey">
                  Prepare Data Agreements
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/developerapi")}
              >
                <Typography variant="body1" color="grey">
                  Developer APIs
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/manageadmin")}
              >
                <Typography variant="body1" color="grey">
                  Manage Admin Users
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item sx={{ cursor: "pointer" }}>
                <a
                  href="https://docs.igrant.io/docs/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body1" color="grey">
                    Developer Documentation
                  </Typography>
                </a>
              </Item>
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    </Form>
  );
};

export default GettingStarted;
