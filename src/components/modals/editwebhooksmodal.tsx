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
}

export default function EditWebooks(props: Props) {
  const { open, setOpen, headerText, mode, onRefetch } = props;
  const methods = useForm({
    mode: "onChange",
  });

  const { control, register, reset } = methods;

  const [webhookContentTypes, setWebhookContentTypes] = useState<string[]>([]);
  const [webhookEventTypes, setWebhookEventTypes] = useState<string[]>([]);
  const [eventTypesValid, setEventTypesValid] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<any>();

  const params = useParams();
  const selectedWebhooksId = params["*"];
  const [
    subscribedEventsFromWebhooksById,
    setSubscribedEventsFromWebhooksById,
  ] = useState<any>();

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
  }, []);

  useEffect(() => {
    let defaultValues = {
      orgId: organisationDetails.id,
      payloadUrl: "",
      contentType: "application/json",
      secretKey: "",
      disabled: false,
      skipSslVerification: false,
      timestamp: "1693459838",
    };

    if (selectedWebhooksId && mode === "Update") {
      HttpService.getWebhookById(selectedWebhooksId).then((res) => {
        let webhooks = res.data.webhook;
        setSubscribedEventsFromWebhooksById(res.data.webhook.subscribedEvents);
        const { subscribedEvents, ...otherProps } = webhooks;
        reset({
          ...otherProps,
        });
      });
    } else reset({ ...defaultValues });
  }, [open, selectedWebhooksId]);

  const onSubmit = (createdData: any) => {
    console.log("created", createdData);
    if (methods.formState.isValid && eventTypesValid === true) {
      const payload = {
        webhook: {
          ...createdData,
          subscribedEvents: selectedEventData?.map((event: any) => {
            return event.name;
          }),
        },
      };
      console.log("paylo", payload);

      if (mode === "Update") {
        HttpService.updateWebhookById(payload, selectedWebhooksId).then(() => {
          onRefetch();
          setOpen(false);
        });
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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                    Skip Ssl Verification
                  </Typography>
                  <WebhookSelect
                    filterValues={[
                      { label: "True", value: true },
                      { label: "False", value: false },
                    ]}
                    control={control}
                    nameOfSelect={"skipSslVerification"}
                  />
                  <Typography variant="subtitle1" mt={1.5}>
                    Disabled
                  </Typography>
                  <WebhookSelect
                    filterValues={[
                      { label: "True", value: true },
                      { label: "False", value: false },
                    ]}
                    control={control}
                    nameOfSelect={"disabled"}
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
                  <CheckboxTree
                    webhookEventTypes={webhookEventTypes}
                    setEventTypesValid={setEventTypesValid}
                    setSelectedEventData={setSelectedEventData}
                    subscribedEventsFromWebhooksById={
                      subscribedEventsFromWebhooksById
                    }
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
                    methods.formState.isValid && eventTypesValid === true
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor:
                      methods.formState.isValid && eventTypesValid === true
                        ? "pointer"
                        : "not-allowed",
                    marginRight: "20px",
                    color: methods.formState.isValid && eventTypesValid === true ? "black" : "#6D7676",
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
          </FormProvider>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
