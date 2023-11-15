import { useEffect, useState } from "react";

import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import ManageAdminProfilePicUpload from "../../components/manageAdminProfilePicUpload";
import { HttpService } from "../../service/HTTPService";
import { LocalStorageService } from "../../service/localStorageService";
import SnackbarComponent from "../../components/notification";
import { useFilterStore } from "../../store/store";

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
  height: 30,
  width: 100,
  borderRadius: 0,
  border: "1px solid #DFDFDF",
};

const editStyleEnable: React.CSSProperties = {
  borderWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE0E1",
  height: 23,
};

const ManageAdmin = () => {
  const [editMode, setEditMode] = useState(false);
  const [adminDetails, setAdminDetails] = useState<any>();
  const [logoImageBase64, setLogoImageBase64] = useState<any>(null);
  const [adminName, setAdminName] = useState(adminDetails?.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formDataForImageUpload, setFormDataForImageUpload] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const changeAvatar = useFilterStore.getState().changeAvatar
  const changeAdminName = useFilterStore.getState().changeAdminName

  useEffect(() => {
    if (adminDetails?.name) {
      setAdminName(adminDetails.name);
    }
  }, [adminDetails]);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEditMode(!editMode);
    setFormDataForImageUpload("");
    setPreviewImage("");
  };

  useEffect(() => {
    HttpService.getOrganisationAdminDetails().then((res) => {
      setAdminDetails(res.data);
      HttpService.getAdminAvatarImage().then((imageBase64) => {
        setLogoImageBase64(imageBase64);
        LocalStorageService.updateProfilePic(imageBase64);
      });
    });
  }, []);


  const onClickSave = () => {
    let payload = {
      organisationAdmin: {
        name: adminName ? adminName : adminDetails.name,
      },
    };
    HttpService.updateOrganisationAdminDetails(payload).then((res) => {
      setAdminDetails(res.data.organisationAdmin);
      LocalStorageService.updateUser(res.data.organisationAdmin);
      useFilterStore.getState().updateChangeAdminName(!changeAdminName);

      if (formDataForImageUpload) {
        HttpService.updateAdminAvatar(formDataForImageUpload)
          .then((res) => {
            HttpService.getAdminAvatarImage().then((imageBase64) => {
              setLogoImageBase64(imageBase64);
              LocalStorageService.updateProfilePic(imageBase64);
              useFilterStore.getState().updateChangeAvatar(!changeAvatar);
            });
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          });
        }
    });

    setFormDataForImageUpload("");
    setPreviewImage("");
    setEditMode(false);
  };

  const onClickRestPassWord = () => {
    setSuccess("");
    setError("");
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm new password should be same");
      setOpenSnackBar(true);
    } else if (
      currentPassword.length > 7 &&
      newPassword.length > 7 &&
      confirmNewPassword.length > 7 &&
      newPassword === confirmNewPassword
    ) {
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      HttpService.resetPassword(payload)
        .then(() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");

          setSuccess("Password Changed");
          setOpenSnackBar(true);
        })
        .catch((error) => {
          setError(error.message);
          setOpenSnackBar(true);
        });
    }
  };

  return (
    <Container>
      <BreadCrumb Link="Account" Link2="Manage Admin" />
      <SnackbarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={error}
        topStyle={100}
        successMessage={success}
      />
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
                      setFormDataForImageUpload={setFormDataForImageUpload}
                      previewImage={previewImage}
                      setPreviewImage={setPreviewImage}
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
                  <Grid container height={"20px"}>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body2">Name:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      {editMode ? (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          placeholder="Name"
                          sx={{ marginTop: -0.1 }}
                          style={{
                            ...editStyleEnable,
                          }}
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          InputProps={{
                            disableUnderline: true,
                            style: { fontSize: 14 },
                          }}
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
                  <Grid container height={"20px"}>
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
                  <Grid container height={"20px"}>
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
                      sx={{
                        color: "black",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={buttonStyle}
                      variant="outlined"
                      onClick={onClickSave}
                      sx={{
                        color: "black",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
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
                  inputProps={{
                    autoComplete: "new-password",
                  }}
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
