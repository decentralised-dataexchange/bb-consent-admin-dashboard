import * as React from 'react';
import { useState } from 'react';
import { Form, TextInput } from 'react-admin';

import { Drawer, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {Container, HeaderContainer, DetailsContainer, FooterContainer, buttonStyle, disabledButtonstyle } from "./modalStyle"

export default function GeneralModal(props) {
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
                <Typography color='#F3F3F6' >
                  {headerText} {dataExchange}
                </Typography>
                <Typography color='#F3F3F6'>
                  {daId}
                </Typography>
              </Box>
              <CloseIcon onClick={() => {setOpen(false); setIsOk(false)}} sx={{ paddingRight: 2, cursor: "pointer", color:'#F3F3F6' }} />
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
