import * as React from "react";
import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { HttpService } from "../../service/HTTPService";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText: string;
  headerText: string;
  dataExchange?: string;
  modalDescriptionText: any;
  onRefetch?: any;
  userAccessId?: string;
  resourceName?: string
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
    resourceName
  } = props;
  const [isOk, setIsOk] = useState(false);
  const [confirmationTextInput, setConfirmationTextInput] = useState("");
  const params = useParams();
  const daId = params["*"];
  const [dataAgreementValue, setDataAgreementValue] = useState<any>();
  const handleCancelConfirmationText = (event: any) => {
    setConfirmationTextInput(event.target.value);
    event.target.value === confirmText ? setIsOk(true) : setIsOk(false);
  };

  useEffect(() => {
    if (daId && resourceName !== "webhooks") {
      HttpService.getDataAgreementByID(daId).then((response) => {
        setDataAgreementValue(response.data.dataAgreement);
      });
    }
  }, [daId]);

  const onSubmit = () => {
    if (isOk === true) {
      if (confirmText === "DELETE" && daId && resourceName !== "webhooks") {
        HttpService.deleteDataAgreement(daId).then((response) => {
          onRefetch();
          setOpen(false);
        });
      } else if (confirmText === "PUBLISH" && daId) {
        const { active, lifecycle, controllerUrl, ...otherProps } =
          dataAgreementValue;
        const updateDAPayload = {
          dataAgreement: {
            active: true,
            lifecycle: "complete",
            // dummy value should change once backend is changed
            controllerUrl: "string",
            ...otherProps,
          },
        };
        HttpService.updateDataAgreementById(updateDAPayload, daId).then(
          (response) => {
            onRefetch();
            setOpen(false);
          }
        );
      } else if (confirmText === "DELETE" && userAccessId) {
        HttpService.deleteIdpBy(userAccessId).then(() => {
          setOpen(false);
        });
      } else if(confirmText === "DELETE" && daId && resourceName === "webhooks"){
        HttpService.deleteWebhook(daId)
        .then(()=>{
          onRefetch();
          setOpen(false);
        })
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
                  {headerText} {dataAgreementValue?.purpose}
                </Typography>
                <Typography color="#F3F3F6">{daId}</Typography>
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
                sx={{ marginRight: "10px" }}
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
