import { useState } from "react";
import { useLogout } from "react-admin";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../service/localStorageService";
import { formatISODateToLocalString } from "../../utils/formatISODateToLocalString";
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
        {props.image ? (
          <Avatar
            style={{ width: "50px", height: "50px" }}
            src={`data:image/jpeg;charset=utf-8;base64,${props.image}`}
            alt="img"
          />
        ) : (
          <AccountCircle style={{ height: 60, width: 60 }} />
        )}
      </IconButton>
      <Menu
        sx={{ mt: "65px" }}
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
            minWidth: 220,
            padding: 10,
          }}
        >
          <Avatar
            style={{ width: "70px", height: "70px" }}
            src={`data:image/jpeg;charset=utf-8;base64,${props.image}`}
            alt="img"
          />
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            {props.firstName}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "6px" }}>
            {props.email}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "3px" }}>
            Last visit: {formatISODateToLocalString(props.lastVisited)}
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
            <Typography ml={1} variant="body2">
              Settings
            </Typography>
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
            <Typography ml={1} variant="body2">
              Signout
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
};
