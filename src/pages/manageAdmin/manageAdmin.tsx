import { useEffect, useState } from "react";

import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import ManageAdminProfilePicUpload from "../../components/manageAdminProfilePicUpload";
import { HttpService } from "../../service/HTTPService";
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
  paddingLeft: 30,
  height: "215px",
  borderRadius: 2,
  border: "1px solid #CECECE",
  [theme.breakpoints.down("md")]: {
    height: "auto",
  },
}));

const buttonStyle = {
  color: "black",
  height: 30,
  width: 100,
  borderRadius: 0,
  border: "1px solid #DFDFDF",
};

const ManageAdmin = () => {
  const [editMode, setEditMode] = useState(false);
  const [adminDetails, setAdminDetails] = useState<any>();
  const [logoImageBase64, setLogoImageBase64] = useState<any>(null);
  const [adminName, setAdminName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    HttpService.getOrganisationAdminDetails().then((res) => {
      setAdminDetails(res.data);
      HttpService.getAdminAvatarImage().then((imageBase64) => {
        setLogoImageBase64(imageBase64);
      });
    });
  }, []);

  const onClickSave = () => {
    if (adminName.length > 2) {
      const { name, ...otherProps } = adminDetails;
      let payload = {
        organisationAdmin: {
          name: adminName,
          ...otherProps,
        },
      };
      HttpService.updateOrganisationAdminDetails(payload).then((res) => {
        setEditMode(false);
        setAdminDetails(res.data.organisationAdmin);
        LocalStorageService.updateUser(res.data.organisationAdmin);
      });
    }
  };

  const onClickRestPassWord = () => {
    if (
      currentPassword.length > 7 &&
      newPassword.length > 7 &&
      confirmNewPassword.length > 7 &&
      newPassword === confirmNewPassword
    ) {
      console.log("success");
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      HttpService.resetPassword(payload).then(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      });
    }
  };

  return (
    <Container>
      <BreadCrumb Link="Account" Link2="Manage Admin" />
      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          Admin User
        </Typography>
      </HeaderContainer>
      <DetailsContainer sx={{ flexGrow: 1 }}>
        <Typography variant="body2" mt={1.25} mb={1.5}>
          Manage admin user configurations.
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
              >
                User Settings
              </Typography>
              <Grid container>
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ height: "130px" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: {
                        xs: "center",
                        sm: "center",
                        md: "normal",
                        lg: "center",
                      },
                    }}
                  >
                    <ManageAdminProfilePicUpload
                      editMode={editMode}
                      logoImageBase64={logoImageBase64}
                      setLogoImageBase64={setLogoImageBase64}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={9}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ display: "grid", alignContent: "center" }}
                >
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body2">Name:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      {editMode ? (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          placeholder="Name"
                          sx={{ marginTop: -1.5 }}
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                        />
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ wordWrap: "break-word" }}
                        >
                          {adminDetails?.name}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body2">Email:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      <Typography
                        variant="body2"
                        sx={{ wordWrap: "break-word" }}
                      >
                        {adminDetails?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body2">User ID:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      <Typography
                        variant="body2"
                        sx={{ wordWrap: "break-word" }}
                      >
                        {adminDetails?.id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {editMode ? (
                  <Box style={{ textAlign: "right", width: "100%" }}>
                    <Button
                      onClick={handleEdit}
                      style={buttonStyle}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      style={buttonStyle}
                      variant="outlined"
                      onClick={onClickSave}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography
                      onClick={handleEdit}
                      variant="body2"
                      style={{
                        cursor: "pointer",
                        color: "grey",
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Item>
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Item sx={{ display: "grid", alignContent: "space-between" }}>
              <Typography color="black" variant="subtitle1" fontWeight="bold">
                User Credentials
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2">Current Password:</Typography>
                <TextField
                  variant="standard"
                  placeholder="Enter Current Password"
                  type="password"
                  sx={{ width: "50%", marginRight: "20px" }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2">New Password:</Typography>
                <TextField
                  variant="standard"
                  placeholder="Enter New Password"
                  type="password"
                  sx={{ width: "50%", marginRight: "20px" }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2">Confirm New Password:</Typography>
                <TextField
                  variant="standard"
                  placeholder="Confirm New Password"
                  type="password"
                  sx={{ width: "50%", marginRight: "20px" }}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Box>

              <Box sx={{ height: "30px", marginRight: "20px" }}>
                <Typography
                  onClick={onClickRestPassWord}
                  variant="body2"
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    color: "grey",
                    width: "100%",
                  }}
                >
                  Change Password
                </Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default ManageAdmin;
