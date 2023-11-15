/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Form, TextInput, useLogin } from "react-admin";
import {
  Box,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import Logo from "../../assets/GovstackLogoBlue.svg";
import SnackbarComponent from "../../components/notification";
import { configStore } from "../../store/configStore";

const FooterContainer = styled("div")({
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  textAlign: "center",
});

export const Login = () => {
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState("");
  let version = configStore.appVersion;

  const submit = () => {
    login({ username, password })
      .then((res) => {})
      .catch((error) => {
        if (error === "password: non zero value required") {
          setError("Password: Value required");
          setOpenSnackBar(true);
        } else if (error === "Username: non zero value required") {
          setError("User ID: Value required");
          setOpenSnackBar(true);
        } else if (
          error ===
          "password: non zero value required;username: non zero value required"
        ) {
          setError("Password & User ID: Value required");
          setOpenSnackBar(true);
        } else if (error.substring(0, 28) === "Failed to get token for user") {
          setError(
            "Invalid login credentials. Please double-check your username and password and try again."
          );
          setOpenSnackBar(true);
        } else {
          setError(
            "Invalid login credentials. Please double-check your username and password and try again."
          );
          setOpenSnackBar(true);
        }
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <Box
      style={{
        display: "grid",
        minHeight: "90dvh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFF",
      }}
    >
      <Form onSubmit={submit}>
        <SnackbarComponent
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          message={error}
        />
        <Box sx={{ width: 350 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={Logo} alt="Logo1" />
          </Box>
          <Box
            sx={{
              marginTop: ".5em",
              marginBottom: ".5em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Login to Admin Dashboard</Typography>
          </Box>
          <Box
            style={{
              boxSizing: "border-box",
              padding: 5,
              border: "1px solid #cecece",
              borderRadius: 7,
            }}
          >
            <TextInput
              autoFocus
              name="email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              source="username"
              variant="standard"
              sx={{ height: "25px" }}
              label={false}
              placeholder="User ID"
              fullWidth
              InputProps={{
                startAdornment: (
                  <PersonOutlineOutlinedIcon style={{ color: "#A1A1A1" }} />
                ),
                disableUnderline: true,
                onKeyPress: handleKeyPress,
              }}
            />
            <Divider />
            <TextInput
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              source="password"
              variant="standard"
              label={false}
              placeholder="Password"
              fullWidth
              sx={{ height: "25px" }}
              InputProps={{
                startAdornment: <LockOpenIcon style={{ color: "#A1A1A1" }} />,
                disableUnderline: true,
                onKeyPress: handleKeyPress,
                endAdornment: (
                  <ArrowCircleRightOutlinedIcon
                    style={{ color: "#A1A1A1", cursor: "pointer" }}
                    onClick={submit}
                  />
                ),
              }}
            />
          </Box>
          <FormGroup>
            <Box
              sx={{
                width: "100%",
                marginTop: ".5em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "#A1A1A1",
                      "&.Mui-checked": {
                        color: "#1890FF",
                      },
                    }}
                  />
                }
                label={<Typography variant="body2">Remember Me</Typography>}
                style={{ color: "#A1A1A1" }}
              />
            </Box>
          </FormGroup>
        </Box>
      </Form>
      <FooterContainer>
        <Typography mb={0.5} variant="caption">
          {version}
        </Typography>
        <Box mb={2} display={"flex"} justifyContent={"center"}>
          <Typography color="grey" variant="caption">
            Powered by{" "}
            <a
              href="https://igrant.io/"
              target="blank"
              style={{
                textDecoration: "none",
                color: "#1890ff",
              }}
            >
              iGrant.io
            </a>
            , Sweden
          </Typography>
        </Box>
      </FooterContainer>
    </Box>
  );
};

export default Login;
