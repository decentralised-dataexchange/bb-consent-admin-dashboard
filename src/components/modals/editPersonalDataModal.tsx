import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import { Drawer, Typography, Button, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
} from "./modalStyle";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  dataExchange: string;
  daId: string;
}

export default function EditPersonalDataModal(props: Props) {
  const {
    open,
    setOpen,
    headerText,
    dataExchange,
    daId,
  } = props;

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
            <HeaderContainer>
              <Box pl={2}>
                <Typography color="#F3F3F6">
                  {headerText} {dataExchange}
                </Typography>
                <Typography color="#F3F3F6">{daId}</Typography>
              </Box>
              <CloseIcon
                onClick={() => setOpen(false)}
                sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
              />
            </HeaderContainer>
            <DetailsContainer>
              <Box p={1.5}>
                <Typography variant="subtitle1" mb={0}>
                  Attribute Description
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <TextField
                  sx={{margin:0}}
                  autoFocus
                  variant="standard"
                  label={false}
                  fullWidth
                  placeholder="Please type atleast 3 characters..."
                />
              </Box>
            </DetailsContainer>
            <FooterContainer>
              <Button
                onClick={() => setOpen(false)}
                style={buttonStyle}
                sx={{ marginRight: "10px" }}
                variant="outlined"
              >
                CLOSE
              </Button>
              <Button
                style={buttonStyle}
                variant="outlined"
                sx={{
                  marginRight: "20px",
                  // cursor: !isOk ? "not-allowed" : "pointer",
                }}
                // onClick={() => console.log("ddddd")}
              >
                SAVE{" "}
              </Button>
            </FooterContainer>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
