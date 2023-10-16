/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const submit = () => {
    login({ username, password })
      .then((res) => {
      })
      .catch((error) => {
        setError(error);
        setOpenSnackBar(true);
      });
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
      <Form noValidate>
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
              fontSize: "20px",
            }}
          >
            Login to Admin Dashboard
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
                endAdornment: (
                  <ArrowCircleRightOutlinedIcon
                    style={{ color: "#A1A1A1", cursor: "pointer" }}
                    // type="submit"
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
                label="Remember Me"
                style={{ color: "#A1A1A1" }}
              />
            </Box>
          </FormGroup>
        </Box>
      </Form>
      <FooterContainer>
        <Typography mb={0.5}>v2023.8.1</Typography>
        <Box mb={2} display={"flex"} justifyContent={"center"}>
          <Typography color="grey" variant="subtitle2">
            Powered by{" "}
          </Typography>
          <Link
            to="https://igrant.io/"
            target="blank"
            style={{
              textDecoration: "none",
              color: "#1890ff",
              fontSize: "14px",
            }}
          >
            &nbsp;iGrant.io
          </Link>
          <Typography color="grey" variant="subtitle2">
            , Swedan
          </Typography>
        </Box>
      </FooterContainer>
    </Box>
  );
};

export default Login;
