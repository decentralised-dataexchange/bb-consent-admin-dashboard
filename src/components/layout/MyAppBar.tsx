import { useState } from 'react'

// icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { AppBar, Box, Toolbar, IconButton, Menu, Avatar, Typography } from '@mui/material';

import { useSidebarState } from "ra-ui-materialui";
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/GovstackLogo.svg"

export default function MyAppBar() {
    const navigate = useNavigate()
    const [open, setOpen] = useSidebarState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box>
            <AppBar sx={{ backgroundColor: "#0A065E", height: 80, display: "flex", justifyContent: "center" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon style={{ height: 60, width: 60}} />
                    </IconButton>
                    <img src={Logo} alt="Logo" />

                    <Typography sx={{ flexGrow: 1, display: {xs: "none", sm:"contents"}, fontSize:{sm:20, md:24}}}>
                        Consent Building Block - Admin Dashboard
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenu}
                        sx={{marginLeft:"auto"}}
                    >
                        <AccountCircle style={{ height: 60, width: 60 }} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Box style={{ display: "grid", justifyItems: "center", width: 200, padding: 10 }}>
                            <Avatar style={{ width: "70px", height: "70px" }} />
                            <Typography style={{ fontSize: 16, fontWeight:"bold", marginBottom:"4px" }}>
                                John Doe
                            </Typography>
                            <Typography style={{ fontSize: 12, marginBottom:"6px" }}>
                                johndoe@gmail.com
                            </Typography>
                            <Typography style={{ fontSize: 12,  marginBottom:"3px" }}>
                                Last Visit : September 7, 12.58PM
                            </Typography>
                        </Box>
                        <Box style={{ color: "black", borderTop: "1px solid #BDBDBD" }}>
                            <Box style={{display:"flex", alignItems:"center",padding:7, paddingLeft:15, cursor:"pointer"}} onClick={()=>navigate('/manageadmin')}>
                                <SettingsOutlinedIcon />
                                <Typography ml={1}>
                                    Settings
                                </Typography>
                            </Box>
                            <Box style={{display:"flex", alignItems:"center",padding:7, paddingLeft:15, cursor:"pointer", marginTop:5}} onClick={()=>navigate('/login')}>
                                <ExitToAppIcon />
                                <Typography ml={1}>
                                    Signout
                                </Typography>
                            </Box>
                        </Box>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
