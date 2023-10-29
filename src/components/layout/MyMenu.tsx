import { Menu, MenuProps } from "react-admin";
import { Typography, Box } from "@mui/material";
import { useSidebarState } from "ra-ui-materialui";
import { useState } from "react";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import SubMenu from "./SubMenu";

type MenuName = "manageusers" | "account";

export default function MyMenu({ dense = false }: MenuProps) {
  const [open] = useSidebarState();
  let version = process.env.REACT_APP_VERSION;
  const [state, setState] = useState({
    manageusers: false,
    account: false,
  });

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Menu
      sx={{
        marginTop: 0,
        position: "fixed",
        height: "100vh",
        backgroundColor: "#F7F6F6",
        paddingTop: "54px",
      }}
    >
      <Menu.ResourceItem name="start" />
      <Menu.ResourceItem name="dataagreement" />
      <Menu.ResourceItem name="personaldata" />
      <SubMenu
        handleToggle={() => handleToggle("manageusers")}
        isOpen={state.manageusers}
        name="Manage Users"
        icon={<PeopleAltOutlinedIcon />}
        dense={!dense}
      >
        <Menu.Item to="/configuration" primaryText="Configuration" />
        <Menu.Item to="/userrecords" primaryText="User Records" />
      </SubMenu>
      <Menu.ResourceItem name="privacyboard" />
      <SubMenu
        handleToggle={() => handleToggle("account")}
        isOpen={state.account}
        name="Account"
        icon={<LockOutlinedIcon />}
        dense={!dense}
      >
        <Menu.Item to="/manageadmin" primaryText="Manage Admin" />
        <Menu.Item to="/developerapi" primaryText="Developer APIs" />
        <Menu.Item to="/viewlogs" primaryText="View Logs" />
        <Menu.Item to="/webhooks" primaryText="Webhooks" />
      </SubMenu>

      {open ? (
        <Box sx={{
          marginTop: "auto",
          paddingBottom: 10,
          textAlign: "center",
        }} display={"flex"} flexDirection="column">
          <Typography

            variant="caption"
          >
            {version}
          </Typography>
          <Typography color="grey" variant="caption">
            Powered by{" "}

            <a href="https://igrant.io/" target="blank" style={{
              textDecoration: "none",
              color: "#1890ff",
            }}>iGrant.io</a>
            , Swedan
          </Typography>
        </Box>

      ) : null}
    </Menu>
  );
}
