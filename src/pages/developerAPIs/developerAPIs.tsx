import { useContext, useEffect, useState } from "react";

import { Grid, Typography, Box, Tooltip } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import { HttpService } from "../../service/HTTPService";
import { DEMO_BASE_URL, STAGING_BASE_URL } from "../../settings/settings";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { LocalStorageService } from "../../service/localStorageService";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "10px",
});

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
});

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 10,
  paddingLeft: 20,
  height: "auto",
  borderRadius: 2,
  border: "1px solid #CECECE",
}));

const DeveloperAPIs = () => {
  const { organisationDetails } = useContext(OrganizationDetailsCRUDContext);
  const [showAPI, setShowAPI] = useState(false);
  const [firstAPIKeyDetailsInListApiKey, setFirstAPIKeyDetailsInListApiKey] =
    useState<any>();
  const [showHideButton, setShowHideButton] = useState<boolean>(false);
  const [apiKeyValue, setApiKeyValue] = useState<any>();
  let stagingURL =
    process.env.REACT_APP_ENV === "staging" ? STAGING_BASE_URL : DEMO_BASE_URL;

  useEffect(() => {
    HttpService.listAllApiKeys().then((res) => {
      setFirstAPIKeyDetailsInListApiKey(res.apiKeys);
    });
  }, []);

  const createNewApiKey = () => {
    if (firstAPIKeyDetailsInListApiKey?.length === 0) {
      let payload = {
        apiKey: {
          scopes: ["service"],
        },
      };

      HttpService.addNewApiKey(payload).then((res) => {
        setShowAPI(true);
        setShowHideButton(true);
        setApiKeyValue(res.data.apiKey.apiKey);
      });
    }
  };

  const deleteApiKey = () => {
    if (firstAPIKeyDetailsInListApiKey?.length !== 0) {
      HttpService.deleteApiKey(firstAPIKeyDetailsInListApiKey[0].id).then(
        () => {}
      );
    }
  };

  const handleCopy = () => {
    if (showAPI) {
      navigator.clipboard.writeText(apiKeyValue);
    }
  };

  const onChangeShowHideButton = () => {
    if (showAPI === true) {
      setShowHideButton(!showHideButton);
    }
  };
  const { id } = LocalStorageService.getUser()


  return (
    <Container>
      <BreadCrumb Link="Account" Link2="Developer APIs" />
      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          Developer APIs and Credentials
        </Typography>
      </HeaderContainer>
      <DetailsContainer sx={{ flexGrow: 1 }}>
        <Typography variant="body1" mt={1.25} mb={1}>
          All API requests require you to authenticate using the credentials
          below
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Organization ID
              </Typography>
              <Typography color="grey" variant="subtitle1">
                {organisationDetails.id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Your User ID
              </Typography>
              <Typography color="grey" variant="subtitle1">
                {id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                Configured base URL
              </Typography>
              <Typography color="grey" variant="subtitle1">
                {stagingURL}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Item>
              <Box style={{ display: "flex", alignItems: "center" }} mb={0.5}>
                <Typography color="black" variant="subtitle1" fontWeight="bold">
                  API Key
                </Typography>
                <Tooltip title="Create API Key" placement="top">
                  <AddCircleOutlineOutlinedIcon
                    onClick={createNewApiKey}
                    style={{
                      cursor:
                        firstAPIKeyDetailsInListApiKey?.length === 0
                          ? "pointer"
                          : "not-allowed",
                      marginLeft: "7px",
                    }}
                  />
                </Tooltip>
              </Box>
              <Grid container direction="row">
                <Grid item lg={9} md={7} sm={6} xs={12}>
                  {(showAPI === false || showHideButton === false) && (
                    <Typography
                      color="grey"
                      variant="subtitle1"
                      sx={{ wordBreak: "break-all" }}
                    >
                      **************************************************************************************************************************************************************************
                    </Typography>
                  )}
                  {showAPI && showHideButton === true && (
                    <Typography
                      color="grey"
                      variant="subtitle1"
                      sx={{ wordBreak: "break-all" }}
                    >
                      {apiKeyValue}
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={3} md={5} sm={6} xs={12}>
                  <Box
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {showHideButton === true && (
                      <Box
                        onClick={onChangeShowHideButton}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: showAPI ? "pointer" : "not-allowed",
                        }}
                      >
                        <VisibilityOffOutlinedIcon style={{ marginRight: 5 }} />
                        <Typography
                          variant="subtitle1"
                          sx={{ wordBreak: "break-all" }}
                        >
                          Hide
                        </Typography>
                      </Box>
                    )}
                    {showHideButton === false && (
                      <Box
                        onClick={onChangeShowHideButton}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: showAPI ? "pointer" : "not-allowed",
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ marginRight: 5 }} />

                        <Typography
                          variant="subtitle1"
                          sx={{ wordBreak: "break-all" }}
                        >
                          Show
                        </Typography>
                      </Box>
                    )}
                    <Box
                      sx={{
                        cursor: showAPI ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleCopy}
                    >
                      <ContentCopyOutlinedIcon style={{ marginRight: 5 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ wordBreak: "break-all" }}
                      >
                        Copy
                      </Typography>
                    </Box>
                    <Box
                      onClick={deleteApiKey}
                      sx={{
                        cursor:
                          firstAPIKeyDetailsInListApiKey?.length !== 0
                            ? "pointer"
                            : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon style={{ marginRight: 5 }} />
                      <Typography
                        variant="subtitle1"
                        sx={{ wordBreak: "break-all" }}
                      >
                        Delete
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DeveloperAPIs;
