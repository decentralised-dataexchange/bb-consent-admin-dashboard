import { useState } from 'react';

import { Form, TextInput, } from 'react-admin';
import { Box, Grid, Avatar, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";

import Banner from '../../assets/DummyBanner.jpeg'

import BreadCrumb from '../../components/Breadcrumbs'
import OrgImageUpload from '../../components/OrgImageUpload';

const Container = styled('p')(({ theme }) => ({
    margin: '52px 15px 0 15px',
    background: '#FFFF',
    [theme.breakpoints.down('sm')]: {
        margin: '52px 0 10px 0'
    },
}));

const BannerContainer = styled('div')({
    height: 300,
    width: '100%',
    borderRadius: 2,
    backgroundColor: "#E6E6E6",
    marginTop: "1em",
    position: 'relative',
    top: 0,
    left: 0
});

const DetailsContainer = styled('div')({
    height: "auto",
    width: '100%',
    borderRadius: 2,
    backgroundColor: "#FFFFF",
    padding: 10,
});

const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    justifyContent: 'center',
    color: '#0000',
    height: 100,
    borderRadius: 7,
    border: "1px solid #EEEEEE"
}));

const editStyledisabled: React.CSSProperties = {
    fontSize: 23,
    fontWeight: 800,
    color: '#495057'
}

const editStyleEnable: React.CSSProperties = {
    borderWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#DFE0E1",
    height: 23,
    margin: 0
};

const buttonStyle = {
    color: "black",
    height: 30,
    width: 100,
    borderRadius: 0,
    border: '1px solid #DFDFDF'
}

const GettingStarted = () => {
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)

    const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
        setEditMode(!editMode)
    };

    return (
        <Form >
            <Container >
                <BreadCrumb Link="Getting Started" />
                <BannerContainer>
                    <Box
                        style={{ height: "100%", width: "100%" }}
                        component="img"
                        alt="Banner"
                        src={Banner}
                        sx={{ opacity: editMode ? 0.25 : 1 }}
                    />
                    {editMode &&
                        <Box style={{ position: "absolute", right: 20, top: 10 }} >
                            <OrgImageUpload imageType='banner' />
                        </Box>}
                </BannerContainer>
                <DetailsContainer sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} md={4} sm={12} xs={12} style={{ height: '90px' }}>
                            <Box>
                                <Avatar
                                    src=''
                                    style={{
                                        position: "absolute",
                                        opacity: editMode ? 0.75 : 1,
                                        marginLeft: 50,
                                        marginTop: '-100px',
                                        width: "200px",
                                        height: "200px",
                                        border: "solid white 6px",
                                    }}
                                />
                                {editMode &&
                                    <Box style={{ position: "relative", top: "-75px", marginLeft: "75px" }}>
                                        <OrgImageUpload imageType="logo" />
                                    </Box>}
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={5} sm={12} xs={12} maxHeight={23}>
                            <Box style={{ position: "relative", display: "inline-block" }}>
                                {editMode ? <>
                                    <TextInput
                                        autoFocus
                                        source="organisationname"
                                        variant="standard"
                                        label={false}
                                        placeholder='Organisation Name'
                                        fullWidth
                                        style={editStyleEnable}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                    <Typography color='#9F9F9F' height='23px' >Sector: Retail</Typography>
                                    <TextInput
                                        autoFocus
                                        source="location"
                                        variant="standard"
                                        label={false}
                                        placeholder='Location'
                                        fullWidth
                                        style={editStyleEnable}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                    <TextInput
                                        autoFocus
                                        source="policyurl"
                                        variant="standard"
                                        label={false}
                                        placeholder='Policy URL'
                                        fullWidth
                                        style={editStyleEnable}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </> :
                                    <>
                                        <Typography style={editStyledisabled}>Organisation Name</Typography>
                                        <Typography color='#9F9F9F' height='23px' >Sector: </Typography>
                                        <Typography color='#9F9F9F' height='23px' >Location:</Typography>
                                        <Typography color='#9F9F9F' height='23px' >Policy URL:</Typography>
                                    </>
                                }
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            {editMode ?
                                <Box style={{ textAlign: "right" }}>
                                    <Button onClick={handleEdit} style={buttonStyle} variant="outlined">Cancel</Button>
                                    <Button style={buttonStyle} variant="outlined" >Save</Button>
                                </Box>
                                :
                                <Typography onClick={handleEdit} style={{ cursor: "pointer", textAlign: "right" }} >Edit</Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: 7 }}>
                        <Typography variant='subtitle1' fontWeight="bold">Overview</Typography>
                        <Box sx={{ minHeight: 100, maxHeight: 150, overflow: "auto" }}>
                            {editMode ?
                                <TextInput
                                    source="overview"
                                    autoFocus
                                    variant="standard"
                                    multiline={true}
                                    label={false}
                                    placeholder='<Description of orgainsation with character limit of 500 characters>'
                                    fullWidth
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                                :
                                <Typography
                                    variant="subtitle1"
                                    align="left"
                                    style={{ wordWrap: "break-word", }}
                                >
                                    Description of orgainsation with character limit of 500 characters
                                </Typography>
                            }
                        </Box>
                    </Grid>
                </DetailsContainer>

                <DetailsContainer sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <Item sx={{ cursor: "pointer" }} onClick={() => navigate('/dataagreement')}>
                                <Typography color="black" variant="h6">Prepare Consent Agreements</Typography>
                            </Item>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12} >
                            <Item sx={{ cursor: "pointer" }} onClick={() => navigate('/developerapi')}>
                                <Typography color="black" variant="h6">Developer APIs</Typography>
                            </Item>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12} >
                            <Item sx={{ cursor: "pointer" }} onClick={() => navigate('/manageadmin')}>
                                <Typography color="black" variant="h6">Manage Admin Users</Typography>
                            </Item>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12} >
                            <Item sx={{ cursor: "pointer" }}>
                                <a href="https://docs.igrant.io/docs/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                                    <Typography color="black" variant="h6">Developer Documentation</Typography>
                                </a>
                            </Item>
                        </Grid>
                    </Grid>
                </DetailsContainer>
            </Container>
        </Form>
    );
}

export default GettingStarted;