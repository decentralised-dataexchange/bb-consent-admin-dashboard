import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-admin";

import {
  Drawer,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import DataAgreementPersonalDataTable from "../dataAgreements/DataAgreementPersonalDataTable";
import { Container, HeaderContainer, DetailsContainer } from "./modalStyle";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
}

const DataSchemaTemplate = [
  "Aadhar Card",
  "EU Covid19 Test Certificate",
  "EU Covid19 Vaccination Certificate",
  "EU Passport",
  "India Covid19 Vaccination Certificate",
  "My Data Profile",
];

export default function DataSchemaModal(props: Props) {
  const { open, setOpen, mode } = props;
  const [schemaValue, setShcemaValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof schemaValue>) => {
    const {
      target: { value },
    } = event;
    setShcemaValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container sx={{ width: "495px" }}>
          <Form>
            <HeaderContainer>
              <Box pl={2} style={{ display: "flex", alignItems: "center" }}>
                <ChevronLeftIcon
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: 1, cursor: "pointer", color: "#F3F3F6" }}
                />
                <Typography color="#F3F3F6">
                  Choose Existing Schema: Data Using Service (Verifier)
                </Typography>
              </Box>
            </HeaderContainer>
            <DetailsContainer>
              <Box p={1.5}>
                <Typography variant="subtitle1" mt={1.5}>
                  Data Schema Template
                </Typography>
                <Box sx={{ minWidth: 120, marginBottom: "10px" }}>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={schemaValue}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select...</em>;
                        }

                        return selected.join(", ");
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {DataSchemaTemplate.map((DataSchemaTemplate) => (
                        <MenuItem
                          key={DataSchemaTemplate}
                          value={DataSchemaTemplate}
                        >
                          {DataSchemaTemplate}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <DataAgreementPersonalDataTable
                  mode={mode}
                  subtext={
                    "Attribute names must be exact match of the credentials"
                  }
                />
              </Box>
            </DetailsContainer>
          </Form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
