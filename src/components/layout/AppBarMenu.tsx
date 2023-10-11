import { useState } from "react";
import { useLogout } from "react-admin";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../service/localStorageService";

import { Box, Menu, Avatar, Typography, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type Props = {
  firstName: string;
  email: string;
  lastVisited: string;
  image: any;
};

export const AppBarMenu = (props: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logout = useLogout();
  const handleClickLogOut = () => {
    logout();
    LocalStorageService.clear();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleMenu}
        sx={{ marginLeft: "auto" }}
      >
        <AccountCircle style={{ height: 60, width: 60 }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box
          style={{
            display: "grid",
            justifyItems: "center",
            width: 200,
            padding: 10,
          }}
        >
          <Avatar
            style={{ width: "70px", height: "70px" }}
            src={props.image}
            alt="img"
          />
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", marginBottom: "4px" }}
          >
            {props.firstName}
          </Typography>
          <Typography style={{ fontSize: 12, marginBottom: "6px" }}>
            {props.email}
          </Typography>
          <Typography style={{ fontSize: 12, marginBottom: "3px" }}>
            {props.lastVisited}
          </Typography>
        </Box>
        <Box style={{ color: "black", borderTop: "1px solid #BDBDBD" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              padding: 7,
              paddingLeft: 15,
              cursor: "pointer",
            }}
            onClick={() => navigate("/manageadmin")}
          >
            <SettingsOutlinedIcon />
            <Typography ml={1}>Settings</Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              padding: 7,
              paddingLeft: 15,
              cursor: "pointer",
              marginTop: 5,
            }}
            onClick={handleClickLogOut}
          >
            <ExitToAppIcon />
            <Typography ml={1}>Signout</Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
};
