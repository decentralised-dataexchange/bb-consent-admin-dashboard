import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTranslation } from "react-i18next";

interface Props {
  open: any;
  setOpen: Dispatch<SetStateAction<any>>;
  anchorRef: any;
  handleToggle: any;
}

const LanguageSelectorForAppBarMenu = (props: Props) => {
  const { open, setOpen, anchorRef, handleToggle } = props;
  const { i18n } = useTranslation("translation");

  const handleChange = (value: any) => {
    i18n.changeLanguage(value);
    localStorage.setItem("i18nextLng", value);
    setOpen(false);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement="bottom-start"
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleToggle}>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorRef.current}
            keepMounted
            open={open}
            onClose={handleToggle}
            TransitionProps={TransitionProps}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: { width: "240px" },
            }}
          >
            <MenuItem onClick={() => handleChange("en")}>English</MenuItem>
            <MenuItem onClick={() => handleChange("sv")}>Swedish</MenuItem>
            <MenuItem onClick={() => handleChange("fi")}>Finnish</MenuItem>
          </Menu>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default LanguageSelectorForAppBarMenu;
