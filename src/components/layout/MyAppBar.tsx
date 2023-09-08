import { useState } from 'react'

// icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Menu, Avatar, Typography } from '@mui/material';

import { useSidebarState } from "ra-ui-materialui";
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/GovstackLogo.svg"

const AppBarName = styled('p')(({ theme }) => ({
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
        fontSize: 20
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: 14
    },
}));

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ backgroundColor: "#0A065E", height: 80, display: "flex", justifyContent: "center" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon style={{ height: 60, width: 60 }} />
                    </IconButton>
                    <img src={Logo} alt="Logo" />

                    <AppBarName sx={{ flexGrow: 1 }}>
                        Consent Building Block - Admin Dashboard
                    </AppBarName>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenu}
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
                            <Typography variant='h6'>
                                John Doe
                            </Typography>
                            <Typography style={{ fontSize: 12 }}>
                                johndoe@gmail.com
                            </Typography>
                            <Typography style={{ fontSize: 12 }}>
                                Last Visit : September 7, 12.58PM
                            </Typography>
                        </Box>
                        <Box style={{ color: "black" }}>
                            <Box style={{display:"flex", alignItems:"center", paddingLeft:12}} onClick={()=>navigate('/personaldata')}>
                                <SettingsSuggestIcon />
                                <Typography ml={1}>
                                    Settings
                                </Typography>
                            </Box>
                            <Box style={{display:"flex", alignItems:"center", paddingLeft:12, marginTop:9}} onClick={()=>navigate('/login')}>
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
