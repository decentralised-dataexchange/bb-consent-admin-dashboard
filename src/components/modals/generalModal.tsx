import * as React from "react";
import { useState } from "react";
import { Form, TextInput } from "react-admin";
import { Dispatch, SetStateAction } from "react";

import { Drawer, Typography, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import { HttpService } from "../../service/HTTPService";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText: string;
  headerText: string;
  modalDescriptionText: any;
  onRefetch?: any;
  userAccessId?: string;
  resourceName: string;
  developerApiDeleteID?:string
  selectededDataAgreementFromDataAgreement?: any
  selectedWebhookDetails?: any
}

export default function DeleteModal(props: Props) {
  const {
    open,
    setOpen,
    confirmText,
    headerText,
    modalDescriptionText,
    onRefetch,
    userAccessId,
    resourceName,
    developerApiDeleteID,
    selectededDataAgreementFromDataAgreement,
    selectedWebhookDetails
  } = props;
  const [isOk, setIsOk] = useState(false);
  const [confirmationTextInput, setConfirmationTextInput] = useState("");

  const handleCancelConfirmationText = (event: any) => {
    setConfirmationTextInput(event.target.value);
    event.target.value === confirmText ? setIsOk(true) : setIsOk(false);
  };

  const onSubmit = () => {
    if (isOk === true) {
      if (confirmText === "DELETE" && resourceName === "dataagreements") {
        HttpService.deleteDataAgreement(selectededDataAgreementFromDataAgreement.id).then((response) => {
          onRefetch();
          setOpen(false);
        });
      } else if (confirmText === "PUBLISH" && resourceName === "dataagreements") {
        console.log("selectededDataAgreementFromDataAgreement", selectededDataAgreementFromDataAgreement)
        const { active, lifecycle, controllerUrl, ...otherProps } =
        selectededDataAgreementFromDataAgreement;
        const updateDAPayload = {
          dataAgreement: {
            active: true,
            lifecycle: "complete",
            // dummy value should change once backend is changed
            controllerUrl: "string",
            ...otherProps,
          },
        };
        HttpService.updateDataAgreementById(updateDAPayload, selectededDataAgreementFromDataAgreement.id).then(
          (response) => {
            onRefetch();
            setOpen(false);
          }
        );
      } else if (confirmText === "DELETE" && userAccessId) {
        HttpService.deleteIdpBy(userAccessId).then(() => {
          setOpen(false);
        });
      } else if (confirmText === "DELETE" && resourceName === "developerapi") {
        HttpService.deleteApiKey(developerApiDeleteID).then(() => {
          onRefetch();
          setOpen(false);
        });
      } else if (
        confirmText === "DELETE" &&
        resourceName === "webhooks"
      ) {
        HttpService.deleteWebhook(selectedWebhookDetails.id).then(() => {
          onRefetch();
          setOpen(false);
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <Form>
            <HeaderContainer>
              <Box pl={2}>
                <Typography color="#F3F3F6">
                  {headerText} {selectededDataAgreementFromDataAgreement?.purpose}
                </Typography>
                <Typography color="#F3F3F6">{resourceName=== "developerapi" && developerApiDeleteID}</Typography>
                <Typography color="#F3F3F6">{resourceName=== "dataagreements" && selectededDataAgreementFromDataAgreement?.id}</Typography>
                <Typography color="#F3F3F6">{resourceName=== "webhooks" && selectedWebhookDetails?.id}</Typography>

              </Box>
              <CloseIcon
                onClick={() => {
                  setOpen(false);
                  setIsOk(false);
                }}
                sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
              />
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
                onClick={() => {
                  setOpen(false);
                  setIsOk(false);
                }}
                style={buttonStyle}
                sx={{
                  marginRight: "10px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                variant="outlined"
              >
                CANCEL
              </Button>
              <Button
                onClick={onSubmit}
                style={!isOk ? disabledButtonstyle : buttonStyle}
                variant="outlined"
                sx={{
                  marginRight: "20px",
                  cursor: !isOk ? "not-allowed" : "pointer",
                  color: !isOk ? "#6D7676" : "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                {confirmText}
              </Button>
            </FooterContainer>
          </Form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
