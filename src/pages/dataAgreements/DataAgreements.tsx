import { useState } from "react"
import { List, Datagrid, TextField, Form, } from 'react-admin';

import { Box, Typography, Button, Tooltip, Radio, RadioGroup, FormControlLabel, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';

// icons
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import BreadCrumb from '../../components/Breadcrumbs'
import GlobalDataPolicyConfigModal from '../../components/modals/globalDataPolicyConfig';

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
    marginTop: 10
});

const buttonStyle = {
    color: 'black',
    borderRadius: 0,
    border: '1px solid black',
    backgroundColor: '#E5E4E4'
}

const DataAgreement = () => {
    // const { data, ids, loading, error } = useGetList(
    //     'dataagreement',
    //     { page: 1, perPage: 10 },
    //     { field: 'published_at', order: 'DESC' }
    // );
    const [openGlobalDataPolicyModal, setOpenGlobalDataPolicyModal] = useState(false)

    return (
        <Container >
            <List actions={false} sx={{ width: "100%", overflow: "hidden" }}>
                <Form >
                    <BreadCrumb Link="Data Agreements" />
                    <HeaderContainer >
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
                                <Button style={buttonStyle} variant='contained' onClick={() => setOpenGlobalDataPolicyModal(true)} >GLOBAL DATA POLICY</Button>
                            </Box>
                        </Box>
                    </HeaderContainer>
                    <Typography variant='body1' mt={1}>Manage data agreements for your organisation.</Typography>
                </Form>
                <Grid mt={1}>

                    <Datagrid bulkActionButtons={false} sx={{ overflow: "auto" }} >
                        <TextField source="usagePurpose" label={"Usage Purpose"} />
                        <TextField source="version" label={"Version"} />
                        <TextField source="dataExchange" label={"Data Exchange"} />
                        <TextField source="status" />
                        <TextField source="lawfulBasisOfProcessing" label={"Lawful Basis Of Processing"} />
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", width: "100%" }}>
                            <Tooltip title="Publish Data Agreement" placement='top'>
                                <UploadOutlinedIcon fontSize="small" color="disabled" style={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="View Data Agreement" placement='top'>
                                <RemoveRedEyeOutlinedIcon fontSize="small" color="disabled" style={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Edit Data Agreement" placement='top'>
                                <EditOutlinedIcon fontSize="small" color="disabled" style={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Delete Data Agreement" placement='top'>
                                <DeleteOutlineOutlinedIcon fontSize="small" color="disabled" style={{ cursor: "pointer" }} />
                            </Tooltip>
                        </Box>
                    </Datagrid>
                </Grid>
            </List>
            {/* Modals */}
            <GlobalDataPolicyConfigModal open={openGlobalDataPolicyModal} setOpen={setOpenGlobalDataPolicyModal} />
        </Container>

    )
}

export default DataAgreement