import { useState } from "react";

import {
  Avatar,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import OrgImageUpload from "../../components/OrgImageUpload";

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
  marginTop: '10px',
});

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
});

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 10,
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
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    setEditMode(!editMode);
  };

  const handleEditPassword = (event: React.MouseEvent<HTMLElement>) => {
    setPasswordEditMode(!passwordEditMode);
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
        <Typography variant="body1" mt={1.25} mb={1.5}>
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
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ height: "130px" }}
                >
                  <Box sx={{width:"100%",height:"100%",display:"flex", justifyContent:{xs:"center", sm:"center", md:"normal"} }}>
                    <Avatar
                      src=""
                      style={{
                        position: "absolute",
                        opacity: editMode ? 0.75 : 1,
                        width: "130px",
                        height: "130px",
                        border: "solid white 6px",
                      }}
                    />
                    {editMode && (
                      <Box style={{ position: "relative" }}>
                        <OrgImageUpload imageType="logo" size={"small"} />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ display: "grid", alignContent: "center" }}
                >
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body1">Name:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      {editMode ? (
                        <TextField
                          variant="standard"
                          placeholder="Name"
                          sx={{ marginTop: -1.5 }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{wordWrap: "break-word"}}>John Doe</Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body1">Email:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      <Typography variant="body1" sx={{wordWrap: "break-word"}}>johndoe@gmail.com</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                      <Typography variant="body1">User ID:</Typography>
                    </Grid>
                    <Grid item lg={9} md={5} sm={5} xs={5}>
                      <Typography variant="body1"  sx={{wordWrap: "break-word"}}>
                        603e67db69dd720001c74f90
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
                    <Button style={buttonStyle} variant="outlined">
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Typography
                    onClick={handleEdit}
                    style={{
                      cursor: "pointer",
                      textAlign: "right",
                      color: "grey",
                      width: "100%",
                    }}
                  >
                    Edit
                  </Typography>
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
                  width: "80%",
                }}
              >
                <Typography variant="body1">Password:</Typography>
                <TextField
                  variant="standard"
                  placeholder="xxxxxxxxx"
                  type={showPassword ? "password" : "text"}
                  disabled={passwordEditMode ? false : true}
                  InputProps={{
                    disableUnderline: passwordEditMode ? false : true,
                    endAdornment:
                      passwordEditMode === true &&
                      (showPassword ? (
                        <VisibilityOutlinedIcon
                          style={{ color: "#A1A1A1", cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          style={{ color: "#A1A1A1", cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )),
                  }}
                />
              </Box>
              <Box sx={{height:"30px"}}>
                {passwordEditMode ? (
                  <Box style={{ textAlign: "right", width: "100%" }}>
                    <Button
                      onClick={handleEditPassword}
                      style={buttonStyle}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button style={buttonStyle} variant="outlined">
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Typography
                    onClick={handleEditPassword}
                    style={{
                      cursor: "pointer",
                      textAlign: "right",
                      color: "grey",
                      width: "100%",
                    }}
                  >
                    Change Password
                  </Typography>
                )}
              </Box>
            </Item>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default ManageAdmin;
