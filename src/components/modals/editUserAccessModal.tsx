import * as React from "react";
import { Dispatch, SetStateAction } from "react";

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
  Switch,
} from "@mui/material";
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
  setConfigured: Dispatch<SetStateAction<boolean>>;
}

const OrganisationSubscriptionMethod = ["Open-ID Connect", "Key Based"];

export default function EditUserAccesModal(props: Props) {
  const { open, setOpen, headerText, setConfigured } = props;
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof subscriptionMethodValue>) => {
    const {
      target: { value },
    } = event;
    setSubscriptionMethodValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
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
                Organisation Subscription Method
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
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <Typography variant="subtitle1">
                  Open-ID Connect Configuration
                </Typography>
                <Switch color="default" />
              </Box>

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
              />

              <Typography variant="subtitle1" mb={0}>
                Token URL
              </Typography>
              <TextField
                sx={{ margin: 0, marginBottom: "10px" }}
                autoFocus
                variant="outlined"
                fullWidth
                placeholder="Authorisation URL"
              />

              <Typography variant="subtitle1" mb={0}>
                Logout URL
              </Typography>
              <TextField
                sx={{ margin: 0, marginBottom: "10px" }}
                autoFocus
                variant="outlined"
                fullWidth
                placeholder="Authorisation URL"
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
              onClick={() => {
                setConfigured(true);
                setOpen(false);
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
