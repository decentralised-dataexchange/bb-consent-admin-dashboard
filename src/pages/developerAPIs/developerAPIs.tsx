import { useState } from "react";

import {
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import BreadCrumb from "../../components/Breadcrumbs";

const Container = styled('div')(({ theme }) => ({
  margin: '58px 15px 0px 15px',
  paddingBottom:"50px",
  [theme.breakpoints.down('sm')]: {
      margin: '52px 0 10px 0'
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
  paddingLeft:20,
  height: "auto",
  borderRadius: 2,
  border: "1px solid #CECECE",
}));

const DeveloperAPIs = () => {
  const [showAPI, setShowAPI] = useState(false);

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
                603e683c69dd720001c74f93
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
                603e683c69dd720001c74f93
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
                staging-consentbb.igrant.io
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                API Key
              </Typography>
              <Grid container direction="row">
                <Grid item lg={10} md={9} sm={8} xs={12}>
                  {showAPI ? (
                    <Typography
                      color="grey"
                      variant="subtitle1"
                      sx={{ wordBreak: "break-all" }}
                    >
                      **************************************************************************************************************************************************************************
                    </Typography>
                  ) : (
                    <Typography
                      color="grey"
                      variant="subtitle1"
                      sx={{ wordBreak: "break-all" }}
                    >
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MDNlNjdkYjY5ZGQ3MjAwMDFjNzRmOTAiLCJvcmdpZCI6IiIsImVudiI6IiIsImV4cCI6MTcyNDI0MTM0MH0.1FqFrQm3GArNtV1fagh_2YDNn1J1YQQE04YMNawfXyM
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                  <Box
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {showAPI ? (
                      <Box
                        onClick={() => setShowAPI(!showAPI)}
                        sx={{ cursor: "pointer", display:"flex", alignItems:"center" }}
                      >
                        <VisibilityOutlinedIcon style={{marginRight:5}}/>
                        <Typography
                          variant="subtitle1"
                          sx={{ wordBreak: "break-all" }}
                        >
                          Show
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        onClick={() => setShowAPI(!showAPI)}
                        sx={{ cursor: "pointer", display:"flex", alignItems:"center" }}
                      >
                        <VisibilityOffOutlinedIcon style={{marginRight:5}}/>
                        <Typography
                          variant="subtitle1"
                          sx={{ wordBreak: "break-all" }}
                        >
                          Hide
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ cursor: "pointer", display:"flex", alignItems:"center" }}>
                      <ContentCopyOutlinedIcon style={{marginRight:5}} />
                      <Typography
                        variant="subtitle1"
                        sx={{ wordBreak: "break-all" }}
                      >
                        Copy
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
