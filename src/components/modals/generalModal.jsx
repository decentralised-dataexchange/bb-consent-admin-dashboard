import * as React from 'react';
import { useState } from 'react';
import { Form, TextInput } from 'react-admin';

import { Drawer, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


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

const DetailsContainer = styled('div')(({ theme }) => ({
  // height: "auto",
  width: '480px',
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  // marginTop: '60px',
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
  backgroundColor: 'white',
  zindex: 1,
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

const disabledButtonstyle = {
  color: "#6D7676",
  height: 30,
  width: 150,
  borderRadius: 0,
  border: '1px solid #EAEAEA'
}

export default function DeleteDataAgreementModal(props) {
  const { open, setOpen, confirmText, headerText, dataExchange, daId, modalDescriptionText } = props
  const [isOk, setIsOk] = useState(false);
  const [confirmationTextInput, setConfirmationTextInput] = useState("");

  const handleCancelConfirmationText = (event) => {
    setConfirmationTextInput(event.target.value);
    event.target.value === confirmText ? setIsOk(true) : setIsOk(false);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={open}
      >
        <Container>
          <Form>
            <HeaderContainer>
              <Box pl={2}>
                <Typography >
                  {headerText} {dataExchange}
                </Typography>
                <Typography color='#9F9F9F'>
                  {daId}
                </Typography>
              </Box>
              <CloseIcon onClick={() => {setOpen(false); setIsOk(false)}} sx={{ paddingRight: 2, cursor: "pointer" }} color="disabled" />
            </HeaderContainer>
            <DetailsContainer>
              <Box p={1.5}>
                {modalDescriptionText}
                <TextInput
                  autoFocus
                  source="username"
                  variant="outlined"
                  label={false}
                  fullWidth
                  value={confirmationTextInput}
                  onChange={handleCancelConfirmationText}
                />
              </Box>
            </DetailsContainer>
            <FooterContainer>
              <Button
                onClick={() => {setOpen(false); setIsOk(false)}}
                style={buttonStyle} sx={{ marginRight: "10px" }} v
                ariant="outlined">
                CANCEL
              </Button>
              <Button style={!isOk ? disabledButtonstyle : buttonStyle} variant="outlined"
                sx={{ marginRight: "20px", cursor: !isOk ? "not-allowed" : "pointer" }}
              // onClick={() => console.log("ddddd")}
              >
                {confirmText}
              </Button>
            </FooterContainer>
          </Form>
        </Container>
      </Drawer>
    </React.Fragment>
  )
}
