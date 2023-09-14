import * as React from 'react';
import { useState } from 'react';

import { Box, Drawer, Typography, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import Banner from '../../assets/DummyBanner.jpeg'

const Container = styled('div')(({ theme }) => ({
  height: '100vh',
  backgroundColor: 'white',
  marginTop: 0,
  width: '480px',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    width: '380px',
  },
}));

const HeaderContainer = styled('div')({
  fontSize: '16px',
  backgroundColor: "#eeeeee",
  display: "flex",
  alignItems: "center",
  height: '65px',
  width: '100%',
  justifyContent: "space-between",
})

const BannerContainer = styled('div')(({ theme }) => ({
  height: 200,
  width: '480px',
  backgroundColor: "#E6E6E6",
  marginTop: '0px',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    width: '380px',
  },
}));

const DetailsContainer = styled('div')(({ theme }) => ({
  height: "auto",
  width: '480px',
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  marginTop: '60px',
  [theme.breakpoints.down('md')]: {
    width: '370px',
  },
}));

const FooterContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: '0px',
  width: '480px',
  borderTop: '1px solid #E9ECEF',
  height: "65px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  backgroundColor:'white',
  zindex:1,
  [theme.breakpoints.down('md')]: {
    width: '380px',
  },
}));

const buttonStyle = {
  color: "black",
  height: 30,
  width: 150,
  borderRadius: 0,
  border: '1px solid #DFDFDF'
}

const tableCellStyle = {
  fontWeight: 'normal',
  fontSize: '14px',
  border: 'solid 1px #dee2e6',
  textAlign: 'left',
}

const inputDataConfigStyle = {
  border: "none",
  outline: 'none',
  fontSize: "14px",
  width:"100%"
};

const dropDownStyle = {
  border: "none",
  outline: 'none',
  fontSize: "14px",
  width: "100%",
  backgroundColor: "#ffff",
};


export default function GlobalDataPolicyConfigModal(props) {
  const { open, setOpen } = props
  const geographicRestrictions = [{
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Not restricted",
    label: "Not restricted",
  },]

  //orgTypes Values to be fetched from api
  const [orgTypes, setOrgTypes] = useState([{ type: "Retail" }, { type: "Government" }, { type: "Finance" }]);

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={open}
      >
        <Container>
          <HeaderContainer>
            <Typography pl={2}>
              Global Data Policy Configurations{" "}
            </Typography>
            <CloseIcon onClick={() => setOpen(false)} sx={{ paddingRight: 2, cursor: "pointer" }} color="disabled" />
          </HeaderContainer>
          <BannerContainer>
            <Box
              style={{ height: "200px", width: "100%" }}
              component="img"
              alt="Banner"
              src={Banner}
            />
          </BannerContainer>
          <Box>
            <Avatar
              src=''
              style={{
                position: "absolute",
                marginLeft: 50,
                marginTop: '-75px',
                width: "130px",
                height: "130px",
                border: "solid white 6px",
              }}
            />
          </Box>
          <DetailsContainer>
            <Box p={1.5}>
              <Typography variant='h6' fontWeight="bold">Organisation Name</Typography>
              <Typography color='#9F9F9F' mt={1}>Location</Typography>
              <Typography variant='subtitle1' mt={2}>Overview</Typography>
              <Typography color='#9F9F9F' mt={1} sx={{ wordWrap: "breakWord" }}>For queries about how we are managing your data please contact the Data Protection Officer, dpo@retail.com</Typography>

              <Box mt={2}>
                <Typography variant='subtitle1'> Global Data Policy Configurations </Typography>
                <table style={{ border: 'solid 1px #dee2e6', width: '100%', maxWidth: '100%', marginBottom: '5rem', marginTop:'.5rem' }}>
                  <tbody>
                    <tr>
                      <th style={tableCellStyle} scope="row">
                        Policy URL
                      </th>

                      <td style={tableCellStyle}>
                        <input
                          autoComplete="off"
                          type="text"
                          style={inputDataConfigStyle}
                          name={"policyUrl"}
                        // value={'policyUrl'}
                        // onChange={handleChangeConfig}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th style={tableCellStyle} scope="row">
                        Jurisdiction
                      </th>

                      <td style={tableCellStyle}>
                        <input
                          autoComplete="off"
                          type="text"
                          style={inputDataConfigStyle}
                          name={"jurisdiction"}
                        // value={jurisdiction}
                        // onChange={handleChangeConfig}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th style={tableCellStyle} scope="row">
                        Industry scope
                      </th>

                      <td style={tableCellStyle}>
                        <select
                          type="text"
                          style={dropDownStyle}
                          name={"industryScope"}
                        // value={industryScope}
                        // onChange={handleChangeConfig}
                        >
                          {orgTypes.map((type, i) => {
                            return (
                              <option key={i} value={type.ID}>
                                {type.type}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <th style={tableCellStyle} scope="row">
                        Data retention period in year(s)
                      </th>

                      <td style={tableCellStyle}>
                        <input
                          autoComplete="off"
                          type="number"
                          style={inputDataConfigStyle}
                          name={"dataRetentionPeriod"}
                        // value={dataRetentionPeriod}
                        // onChange={handleChangeConfig}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th style={tableCellStyle}>
                        Geographic restriction
                      </th>

                      <td style={tableCellStyle}>
                        <select
                          type="text"
                          style={dropDownStyle}
                          name={"selectedGeographicRestriction"}
                        >
                          {geographicRestrictions.map((type, i) => {
                            return (
                              <option key={i} value={type.ID}>
                                {type.label}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </DetailsContainer>
          <FooterContainer>
            <Button onClick={() => setOpen(false)} style={buttonStyle} sx={{ marginRight: "10px" }} variant="outlined">Close</Button>
            <Button style={buttonStyle} variant="outlined" sx={{ marginRight: "20px" }} >Save</Button>
          </FooterContainer>
        </Container>
      </Drawer>
    </React.Fragment>
  )
}
