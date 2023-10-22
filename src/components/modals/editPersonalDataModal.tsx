import * as React from "react";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { Drawer, Typography, Button, Box, TextField } from "@mui/material";
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
import { FormProvider, useForm } from "react-hook-form";
import { HttpService } from "../../service/HTTPService";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  onRefetch: any
}

export default function EditPersonalDataModal(props: Props) {
  const { open, setOpen, headerText, onRefetch } = props;

  const methods = useForm({
    mode: "onChange",
  });
  const { register } = methods;

  const params = useParams();
  const selectedDataAttributeId = params["*"];
  const [selectedDataAttribute, setSelectedDataAttribute] = useState<any>();

  useEffect(() => {
    if (selectedDataAttributeId) {
      HttpService.getDataAttributeById(selectedDataAttributeId).then(
        (response) => {
          let dataAttributes = response.data.dataAttribute;
          setSelectedDataAttribute(dataAttributes);
          const { description, ...otherprops } = dataAttributes;
          methods.reset({
            description: description,
            ...otherprops,
          });
        }
      );
    }
  }, [selectedDataAttributeId, open]);

  const onSubmit = (createdData: any) => {
    if (methods.formState.isValid === true) {
      let payload = {
        dataAttribute: createdData,
      };

      HttpService.updateDataAttributes(payload, selectedDataAttributeId).then(
        () => {
          onRefetch()
          setOpen(false)
        }
      );
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
                  <Typography color="#F3F3F6">
                    {headerText} {selectedDataAttribute?.name}
                  </Typography>
                  <Typography color="#F3F3F6">
                    {selectedDataAttributeId}
                  </Typography>
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
                    sx={{ margin: 0 }}
                    autoFocus
                    variant="standard"
                    fullWidth
                    placeholder="Please type atleast 3 characters..."
                    {...register("description", {
                      required: true,
                      minLength: 3,
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
                  variant="outlined"
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
