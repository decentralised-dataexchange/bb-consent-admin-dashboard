import { Form, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
import { Box, Divider, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

// icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Logo from "../../assets/GovstackLogoBlue.svg"


export const Login = () => {
    const navigate = useNavigate()

    return (
        <Form noValidate>
            <Box
                style={{
                    display: 'flex',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: "center",
                }}
            >
                <Box sx={{ width: 350 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={Logo} alt="Logo1" />
                    </Box>
                    <Box
                        sx={{
                            marginTop: '.5em',
                            marginBottom: '.5em',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '20px',
                        }}
                    >
                        Login to Admin Dashboard
                    </Box>
                    <Box
                        style={{
                            boxSizing: "border-box",
                            padding: 5,
                            border: '1px solid #cecece',
                            borderRadius: 7
                        }}>
                        <TextInput
                            autoFocus
                            source="username"
                            variant="standard"
                            sx={{ height: "25px" }}
                            label={false}
                            placeholder='User ID'
                            fullWidth
                            InputProps={{
                                startAdornment: <PersonOutlineOutlinedIcon  style={{ color: "#A1A1A1" }} />,
                                disableUnderline: true,
                            }}
                        />
                        <Divider />
                        <TextInput
                            source="password"
                            variant="standard"
                            label={false}
                            type="password"
                            placeholder='Password'
                            fullWidth
                            sx={{ height: "25px" }}
                            InputProps={{
                                startAdornment: <LockOpenIcon style={{ color: "#A1A1A1" }} />,
                                disableUnderline: true,
                                endAdornment: <ArrowCircleRightOutlinedIcon 
                                style={{ color: "#A1A1A1", cursor: "pointer" }}
                                onClick={()=>navigate('/start')} />,
                            }}
                        />
                    </Box>
                    <FormGroup>
                        <Box sx={{ width: "100%", marginTop: ".5em", display: "flex", justifyContent: "center" }}>
                            <FormControlLabel
                                control={<Checkbox defaultChecked
                                    sx={{
                                        color: "#A1A1A1",
                                        '&.Mui-checked': {
                                            color: "#1890FF",
                                        },
                                    }} />}
                                label="Remember Me" style={{ color: "#A1A1A1" }} />
                        </Box>
                    </FormGroup>
                </Box>
            </Box>
        </Form >
    );
};

export default Login;

