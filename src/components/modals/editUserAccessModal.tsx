import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";

import {
  Drawer,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import { FormProvider, useForm } from "react-hook-form";
import { HttpService } from "../../service/HTTPService";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  idpDetails: any;
}

const OrganisationSubscriptionMethod = ["Open-ID Connect"];

export default function EditUserAccesModal(props: Props) {
  const { open, setOpen, headerText, idpDetails } = props;
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<
    string[]
  >([]);

  const handleChange = (
    event: SelectChangeEvent<typeof subscriptionMethodValue>
  ) => {
    const {
      target: { value },
    } = event;
    setSubscriptionMethodValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const methods = useForm({
    mode: "onChange",
  });

  const { register, reset } = methods;

  useEffect(() => {
    let defaultValues = {
      authorisationUrl: "",
      tokenUrl: "",
      issuerUrl: "",
      logoutUrl: "",
      userInfoUrl: "",
      jwksUrl: "",
      clientId: "",
      clientSecret: "",
      defaultScope: "",
    };

    if (idpDetails) {
      defaultValues = idpDetails;
    }
    reset({ ...defaultValues });
  }, [open]);

  const onSubmit = (createdData: any) => {
    const payload = {
      idp: createdData,
    };

    if (idpDetails) {
      HttpService.updateIdpByid(payload, idpDetails.id).then(() => {
        setOpen(false);
      });
    } else {
      HttpService.addNewIDP(payload).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <HeaderContainer>
                <Box pl={2}>
                  <Typography color="#F3F3F6">{headerText}</Typography>
                </Box>
                <CloseIcon
                  onClick={() => setOpen(false)}
                  sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
                />
              </HeaderContainer>
              <DetailsContainer>
                <Box p={1.5}>
                  <Typography variant="subtitle1" mb={0}>
                    Authentication Protocol
                  </Typography>
                  <FormControl fullWidth sx={{ marginBottom: "15px" }}>
                    <Select
                      displayEmpty
                      value={subscriptionMethodValue}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Open-ID Connect</em>;
                        }

                        return selected.join(", ");
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {OrganisationSubscriptionMethod.map(
                        (OrganisationSubscriptionMethod) => (
                          <MenuItem
                            key={OrganisationSubscriptionMethod}
                            value={OrganisationSubscriptionMethod}
                          >
                            {OrganisationSubscriptionMethod}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                  <Typography variant="subtitle1" mb={0}>
                    Authorisation URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Authorisation URL"
                    {...register("authorisationUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Token URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Token URL"
                    {...register("tokenUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Logout URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Logout URL"
                    {...register("logoutUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Issue URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Issue URL"
                    {...register("issuerUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    User Info URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="User Info URL"
                    {...register("userInfoUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    JWKS URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="JWKS URL"
                    {...register("jwksUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Client ID URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Client ID URL"
                    {...register("clientId", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Client Secret URL
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Client Secret URL"
                    {...register("clientSecret", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    Default Scopes
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "100px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder="Default Scopes"
                    {...register("defaultScope", {
                      required: true,
                      minLength: 1,
                    })}
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
                  variant="outlined"
                  type="submit"
                  style={
                    methods.formState.isValid
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor: methods.formState.isValid
                      ? "pointer"
                      : "not-allowed",
                    marginRight: "20px",
                  }}
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
