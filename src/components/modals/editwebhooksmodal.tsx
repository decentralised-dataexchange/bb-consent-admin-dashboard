import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import {
  Drawer,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ContentTypeDropdown from "../dropdowns/webhookContentTypeDropdown";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
} from "./modalStyle";
import CheckboxTree from "../webhooks/checkboxTree";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
}

export default function EditWebooks(props: Props) {
  const { open, setOpen, headerText } = props;

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <HeaderContainer>
            <Typography color="#F3F3F6" pl={2}>
              {headerText}
            </Typography>
            <CloseIcon
              onClick={() => setOpen(false)}
              sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
            />
          </HeaderContainer>
          <DetailsContainer>
            <Box p={1.5}>
              <Typography variant="subtitle1" mb={0}>
                Payload URL
                <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
              </Typography>
              <TextField
                autoFocus
                variant="standard"
                fullWidth
                placeholder="Please provide the callback URL"
              />
              <Typography variant="subtitle1" mt={1.5}>
                Content Type
              </Typography>
              <ContentTypeDropdown displayValue={"Select..."} selectWidth={"100%"} />
              <Typography variant="subtitle1" mt={1.5}>
                Secret Key
                <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
              </Typography>
              <TextField
                autoFocus
                variant="standard"
                fullWidth
                placeholder="Please provide a secret key"
              />
             <CheckboxTree />
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
              }}
            >
              SAVE{" "}
            </Button>
          </FooterContainer>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
