import { List, Datagrid, TextField, EmailField, DeleteButton } from 'react-admin';
import { useState } from 'react';

import { Form, ListContextProvider, } from 'react-admin';
import { Box, Grid, Avatar, Typography, Button, Card, Tooltip, Radio, RadioGroup, FormControlLabel} from '@mui/material'
import { styled } from '@mui/material/styles';

// icons
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import BreadCrumb from '../components/Breadcrumbs'

const Container = styled('p')(({ theme }) => ({
    margin: '52px 15px 0 15px',
    background: '#FFFF',
    [theme.breakpoints.down('sm')]: {
        margin: '52px 0 10px 0'
    },
}));

const HeaderContainer = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 15
});

const buttonStyle = {
    color: 'black',
    borderRadius: 0,
    border: '1px solid black',
    backgroundColor: '#E5E4E4'
}


export const UserList = (props) => {

    const DatagridUsersProps = {
        rowStyle: (record, index) => {
            return {
                color: "#FFCC00",
                backgroundColor: 'red',
            };
        }
    };
    return (
            <Container >

<Form >
                <BreadCrumb Link="Data Agreements" />

                <HeaderContainer sx={{ flexGrow: 1 }}>
                    <Box style={{
                        maxWidth: "300px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography variant='h6' fontWeight="bold">Data Agreements</Typography>
                        <Tooltip title="Create Data Agreement" placement='top'>
                            <AddCircleOutlineOutlinedIcon style={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Box>
                    <Box style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                        <Box>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="All"
                                name="radio-buttons-group"
                                row

                            >
                                <FormControlLabel value="All" control={<Radio color="default" />} label="All" />
                                <FormControlLabel value="Published" control={<Radio color="default" />} label="Published" />
                            </RadioGroup>
                        </Box>
                        <Box>
                            <Button style={buttonStyle} variant='contained' >GLOBAL DATA POLICY</Button>
                        </Box>
                    </Box>



                </HeaderContainer>
                <Typography variant='body1' mt={1}>Manage data agreements for your organisation.</Typography>
        

        </Form>
        <List {...DatagridUsersProps}>

            <Datagrid classes={{backgroundColor:"blue"}} {...DatagridUsersProps}>
              <TextField source="id" sx={{backgroundColor:"red"}} />
              <TextField source="name" sx={{backgroundColor:"red"}} />
              <TextField source="username" label={"User Name"} />
              <EmailField source="email" />
              <TextField source="phone" />
              <TextField source="company" />
              <DeleteButton />
              <AddCircleOutlineOutlinedIcon />

            </Datagrid>
        </List>
        </Container>

    )
}