import * as React from "react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

import { Drawer, Typography, Button, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ContentTypeDropdown from "../dropdowns/webhookContentTypeDropdown";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import CheckboxTree from "../webhooks/checkboxTree";
import { HttpService } from "../../service/HTTPService";
import { FormProvider, useForm } from "react-hook-form";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import WebhookSelect from "../dropdowns/webhookSelects";
import { useParams } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  mode: string;
  onRefetch: any;
  webhookDetailsForUpdate: any;
}

export default function EditWebooks(props: Props) {
  const {
    open,
    setOpen,
    headerText,
    mode,
    onRefetch,
    webhookDetailsForUpdate,
  } = props;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    register,
    formState,
    reset,
  } = useForm<any>({
    mode: "onChange",
  });

  const [webhookContentTypes, setWebhookContentTypes] = useState<string[]>([]);
  const [webhookEventTypes, setWebhookEventTypes] = useState<string[]>([]);
  const [checkWebhookIsSelected, setCheckWebhookIsSelected] = useState(false);

  const { organisationDetails } = React.useContext(
    OrganizationDetailsCRUDContext
  );

  useEffect(() => {
    HttpService.listWebhookContentTypes().then((res) => {
      setWebhookContentTypes(res.ContentTypes);
    });

    HttpService.listWebhookEventTypes().then((resp) => {
      setWebhookEventTypes(resp.eventTypes);
    });
  }, [open]);

  useEffect(() => {
    let defaultValues = {
      orgId: organisationDetails.id,
      payloadUrl: "",
      contentType: "application/json",
      secretKey: "",
      radioGroup: "selected",
      disabled: false,
      skipSslVerification: false,
      timestamp: "1693459838",
      webhookEventTypes: {
        allowed: false,
        disallowed: false,
      },
    };

    if (webhookDetailsForUpdate && mode === "Update") {
      let { subscribedEvents, ...otherProps } = webhookDetailsForUpdate;
      let newSubscribedEvents: any = {};
      subscribedEvents.forEach((value: any) => {
        newSubscribedEvents[value] = true;
      });

      reset({
        webhookEventTypes: {
          allowed:
            newSubscribedEvents["consent.allowed"] === true ? true : false,
          disallowed:
            newSubscribedEvents["consent.disallowed"] === true ? true : false,
        },
        radioGroup: subscribedEvents.length === 2 ? "all" : "selected",
        ...otherProps,
      });
    } else reset({ ...defaultValues });
  }, [open, webhookDetailsForUpdate]);

  const onSubmit = (createdData: any) => {
    // console.log("created data", createdData)
    const { webhookEventTypes, radioGroup, ...otherProps } = createdData;
    let EventTypes = Object.keys(webhookEventTypes).map((key) => ({
      key: key,
      value: webhookEventTypes[key],
    }));

    let selectedEventTypes = EventTypes.filter(
      (type: any) => type.value === true
    ).map((type: any) => {
      return `consent.${type.key}`;
    });

    if (formState.isValid && checkWebhookIsSelected === true) {
      const payload = {
        webhook: {
          ...otherProps,
          subscribedEvents: selectedEventTypes,
        },
      };
      if (mode === "Update") {
        HttpService.updateWebhookById(payload, webhookDetailsForUpdate.id).then(
          () => {
            onRefetch();
            setOpen(false);
          }
        );
      } else {
        HttpService.addWebhooks(payload).then(() => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("payloadUrl", {
                    required: true,
                    minLength: 3,
                  })}
                />
                <Typography variant="subtitle1" mt={1.5}>
                  Content Type
                </Typography>
                <ContentTypeDropdown
                  filterValues={webhookContentTypes}
                  control={control}
                  nameOfSelect={"contentType"}
                />

                <Typography variant="subtitle1" mt={1.5}>
                  Secret Key
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  fullWidth
                  placeholder="Please provide a secret key"
                  {...register("secretKey", {
                    required: true,
                    minLength: 3,
                  })}
                />
                <Typography variant="subtitle1" mt={1.5}>
                  Trigger Events
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <CheckboxTree
                  webhookEventTypesFromAPI={webhookEventTypes}
                  control={control}
                  getValues={getValues}
                  setValue={setValue}
                  setCheckWebhookIsSelected={setCheckWebhookIsSelected}
                  // setEventTypesValid={setEventTypesValid}
                  // setSelectedEventData={setSelectedEventData}
                  // subscribedEventsFromWebhooksById={
                  //   subscribedEventsFromWebhooksById
                  // }
                />
              </Box>
            </DetailsContainer>
            <FooterContainer>
              <Button
                onClick={() => setOpen(false)}
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
                CLOSE
              </Button>
              <Button
                variant="outlined"
                style={
                  formState.isValid && checkWebhookIsSelected === true
                    ? buttonStyle
                    : disabledButtonstyle
                }
                sx={{
                  cursor:
                    formState.isValid && checkWebhookIsSelected === true
                      ? "pointer"
                      : "not-allowed",
                  marginRight: "20px",
                  color:
                    formState.isValid && checkWebhookIsSelected === true
                      ? "black"
                      : "#6D7676",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                type="submit"
              >
                SAVE{" "}
              </Button>
            </FooterContainer>
          </form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
