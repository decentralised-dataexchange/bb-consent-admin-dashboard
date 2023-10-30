import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import { Box } from "@mui/system";
import ConfigurePrivacyboard from "../../components/modals/configurePrivacyboard";
import { HttpService } from "../../service/HTTPService";

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

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "25px 30px 25px 30px",
  marginTop: "15px",
  justifyContent: "space-between",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const ItemGrid = styled("div")({
  display: "Grid",
  backgroundColor: "#fff",
  padding: "15px 30px 15px 30px",
  marginTop: "13px",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const Privacyboard = () => {
  const [openEditUserAccessModal, setOpenEditUserAccessModal] = useState(false);
  const [privacyBoardDetails, setPrivacyBoardDetails] = useState<any>();
  const [statusData, setStatusData] = useState<any>();

  useEffect(() => {
    HttpService.getPrivacyBoard().then((res) => {
      setPrivacyBoardDetails(res.data);
    });
    HttpService.getStatus().then((res) => {
      setStatusData(res.data);
    });
  }, []);

  return (
    <Container>
      <BreadCrumb Link="Privacy Board" />
      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          Privacy Dashboard
        </Typography>
      </HeaderContainer>
      <Typography variant="body1" mt={1.25}>
        Deploy and manage privacy dashboard for your organisation towards end users.
      </Typography>

      <Item>
        <Typography color="black" variant="subtitle1" fontWeight="bold">
          Current Status
        </Typography>
        <Box sx={{ display: { xs: "grid", sm: "flex" }, alignItems: "center" }}>
          <Typography color="black" variant="subtitle1" fontWeight="bold">
            {privacyBoardDetails?.statusStr}
          </Typography>
          <Button
            variant="outlined"
            disabled={statusData?.applicationMode === "single-tenant" ? true : false}
            onClick={() =>
              setOpenEditUserAccessModal(true)
            }
            sx={{
              marginLeft: { sx: 0, md: "20px" },
              border: "1px solid black",
              color: "black",
              background: "white",
              fontSize: "16px",
              borderRadius: 0,
              width: "190px",
              cursor:
                statusData?.applicationMode === "single-tenant"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            CONFIGURE
          </Button>
        </Box>
      </Item>
      <ItemGrid>
        <Typography color="black" variant="subtitle1" fontWeight="bold">
          Privacy Dashboard Settings
        </Typography>
        <Grid container mt={1.5}>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Typography color="black" variant="subtitle1">
              Deployed version:
            </Typography>
          </Grid>
          <Grid item lg={2} md={3} sm={3} xs={12}>
            <Typography color="grey" variant="subtitle1">
              {privacyBoardDetails?.hostname ? privacyBoardDetails?.hostname : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Typography color="black" variant="subtitle1">
              Deployed Domain Address:
            </Typography>
          </Grid>
          <Grid item lg={2} md={3} sm={3} xs={12}>
            <Typography color="grey" variant="subtitle1">
              {privacyBoardDetails?.version ? privacyBoardDetails?.version : ""}
            </Typography>
          </Grid>
        </Grid>
      </ItemGrid>

      {/* Modals */}

      <ConfigurePrivacyboard
        open={openEditUserAccessModal}
        setOpen={setOpenEditUserAccessModal}
        headerText={"Privacy Dashboard Configuration"}
      />
    </Container>
  );
};

export default Privacyboard;
